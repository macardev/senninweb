#!/usr/bin/env node

import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, "..")
const PROSPECTS_FILE = path.join(ROOT, "public", "data", "prospects.json")
const ENV_FILE = path.join(ROOT, ".env")
const LOG_DIR = path.join(ROOT, "logs")
const LOG_FILE = path.join(LOG_DIR, "prospect-clients.log")

const GEBZE_CENTER = { lat: 40.8028, lng: 29.4382 }

const colors = {
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  cyan: "\x1b[36m",
  reset: "\x1b[0m",
  bold: "\x1b[1m",
}

let logStream

function ts() {
  return new Date().toISOString().replace("T", " ").slice(0, 19)
}

function writeLog(msg) {
  if (logStream) {
    logStream.write(`[${ts()}] ${msg}\n`)
  }
}

function log(msg, color = "") {
  const str = typeof msg === "string" ? msg : ""
  console.log(`${color}${str}${colors.reset}`)
  writeLog(str.replace(/\x1b\[\d+m/g, ""))
}

function loadEnv() {
  if (process.env.GOOGLE_PLACES_KEY && process.env.OPENAI_API_KEY) return
  if (!fs.existsSync(ENV_FILE)) {
    log("FATAL: .env dosyasi bulunamadi.", colors.red)
    process.exit(1)
  }
  const content = fs.readFileSync(ENV_FILE, "utf8")
  for (const line of content.split("\n")) {
    const trimmed = line.trim()
    if (trimmed && !trimmed.startsWith("#")) {
      const eqIdx = trimmed.indexOf("=")
      if (eqIdx > 0) {
        const key = trimmed.slice(0, eqIdx).trim()
        const val = trimmed.slice(eqIdx + 1).trim()
        process.env[key] = val
      }
    }
  }
  if (!process.env.GOOGLE_PLACES_KEY) {
    log("FATAL: GOOGLE_PLACES_KEY bulunamadi.", colors.red)
    process.exit(1)
  }
  if (!process.env.OPENAI_API_KEY) {
    log("FATAL: OPENAI_API_KEY bulunamadi.", colors.red)
    process.exit(1)
  }
}

const CATEGORIES = [
  "restoran",
  "kafe pastane",
  "kuaför berber",
  "güzellik salonu",
  "avukat",
  "diş hekimi",
  "spor salonu fitness",
  "oto galeri",
  "emlak ofisi",
  "doktor klinik",
  "fotoğrafçı",
  "nakliyat",
  "inşaat firması",
  "bilgisayar tamir",
  "muhasebe mali müşavir",
  "terzi",
]

async function searchPlaces(category) {
  const url = "https://places.googleapis.com/v1/places:searchText"
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": process.env.GOOGLE_PLACES_KEY,
      "X-Goog-FieldMask": "places.displayName,places.formattedAddress,places.nationalPhoneNumber,places.websiteUri,places.rating,places.userRatingCount,places.googleMapsUri,places.id",
    },
    body: JSON.stringify({
      textQuery: `Gebze ${category}`,
      locationBias: {
        circle: {
          center: { latitude: GEBZE_CENTER.lat, longitude: GEBZE_CENTER.lng },
          radius: 5000,
        },
      },
      maxResultCount: 20,
      languageCode: "tr",
      regionCode: "TR",
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    writeLog(`  ${category}: API hatasi (${res.status}) - ${err}`)
    return []
  }

  const data = await res.json()
  if (!data.places) return []

  const results = data.places.map(p => ({
    id: p.id,
    business: p.displayName?.text || "Bilinmiyor",
    address: p.formattedAddress || "",
    phone: p.nationalPhoneNumber || "",
    website: p.websiteUri || null,
    rating: p.rating || null,
    userRatingCount: p.userRatingCount || 0,
    googleMapsUri: p.googleMapsUri || "",
    category: category,
    hasWebsite: !!p.websiteUri,
  }))

  writeLog(`  ${category}: ${results.length} isletme bulundu (${results.filter(r => r.hasWebsite).length} web siteli)`)
  return results
}

async function fetchWithTimeout(url, timeout = 10000) {
  try {
    const res = await fetch(url, {
      signal: AbortSignal.timeout(timeout),
      headers: { "User-Agent": "Mozilla/5.0 (compatible; SenninWebBot/1.0)" },
    })
    if (!res.ok) return null
    const text = await res.text()
    return text
  } catch {
    return null
  }
}

async function findEmailFromWebsite(url) {
  if (!url) return { email: null, html: null, fetchDurationMs: 0 }
  const start = Date.now()
  const html = await fetchWithTimeout(url, 10000)
  const fetchDurationMs = Date.now() - start
  if (!html) return { email: null, html: null, fetchDurationMs }

  const mailtoRegex = /mailto:([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/gi
  const matches = [...html.matchAll(mailtoRegex)]
  if (matches.length > 0) return { email: matches[0][1].toLowerCase(), html, fetchDurationMs }

  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g
  const emails = [...new Set(html.match(emailRegex) || [])]
    .filter(e => !e.includes("example.com") && !e.includes("@domain") && !e.endsWith(".png") && !e.endsWith(".jpg") && !e.endsWith(".svg"))
    .filter(e => !e.includes("sponsored") && !e.includes("noreply") && !e.includes("no-reply"))

  if (emails.length > 0) return { email: emails[0].toLowerCase(), html, fetchDurationMs }

  const contactPatterns = ["iletisim", "contact", "bize-ulasin"]
  for (const pattern of contactPatterns) {
    const contactUrl = `${url.replace(/\/$/, "")}/${pattern}`
    const subHtml = await fetchWithTimeout(contactUrl, 5000)
    if (!subHtml) continue
    const subMailto = [...subHtml.matchAll(mailtoRegex)]
    if (subMailto.length > 0) return { email: subMailto[0][1].toLowerCase(), html, fetchDurationMs }
    const subEmails = [...new Set(subHtml.match(emailRegex) || [])]
      .filter(e => !e.includes("example.com") && !e.includes("@domain"))
    if (subEmails.length > 0) return { email: subEmails[0].toLowerCase(), html, fetchDurationMs }
  }

  return { email: null, html, fetchDurationMs }
}

function analyzeSiteQuality(html, fetchDurationMs) {
  const issues = []
  let score = 100

  if (!/<meta\s+[^>]*name=["']viewport["']/i.test(html)) {
    issues.push("mobil uyumsuz")
    score -= 25
  }
  if (!/<title>/i.test(html) || /<title>\s*<\/title>/i.test(html)) {
    issues.push("SEO baslik yok")
    score -= 20
  }
  if (!/<meta\s+[^>]*name=["']description["']/i.test(html)) {
    issues.push("meta aciklama yok")
    score -= 15
  }
  const pageSizeKB = Math.round(html.length / 1024)
  if (pageSizeKB > 200) {
    issues.push(`sayfa cok agir (${pageSizeKB}KB)`)
    score -= 15
  }
  const inlineStyles = (html.match(/style\s*=\s*["']/gi) || []).length
  if (inlineStyles > 20) {
    issues.push(`inline CSS fazla (${inlineStyles} adet)`)
    score -= 10
  }
  if (fetchDurationMs > 5000) {
    issues.push(`yavas yuklenme (${(fetchDurationMs / 1000).toFixed(1)}s)`)
    score -= 10
  }
  if (!/<h1[\s>]/i.test(html)) {
    issues.push("h1 etiketi yok")
    score -= 5
  }
  if (!/<html[^>]*lang=/i.test(html)) {
    issues.push("dil etiketi yok (lang)")
    score -= 5
  }

  return {
    score: Math.max(0, score),
    issues,
    analyzedAt: new Date().toISOString().split("T")[0],
    pageSizeKB,
    fetchDurationMs,
  }
}

async function generatePersonalization(prospect) {
  const systemPrompt = `Sen SenninWeb icin musteri adayi profillerini analiz eden bir stratejistsin.

SenninWeb, web tasarim, SEO ve dijital pazarlama hizmetleri sunan bir ajans. Merkezi Kocaeli/Gebze.

Gorevin: Verilen isletme bilgilerine gore kisa bir kisisellestirme notu yaz. Bu not, e-posta pazarlama icin kullanilacak.

Site kalite analizi sonuclarina gore notu olustur:
- Web sitesi yoksa: Google Maps'te var olmanin yetmedigini, rakiplerinin online oldugunu belirt
- Site kalitesi dusukse (mobil uyumsuz, meta aciklamasi yok, agir sayfa, yavas): bu somut sorunlari belirterek SenninWeb'in nasil yardimci olabilecegini anlat
- Site kalitesi iyiyse: yine de gelistirilecek alanlar olabileceginden bahset

1-2 cumle, samimi ve profesyonel Turkce. Sadece notu yaz, baska metin ekleme.`

  const quality = prospect.siteQuality || {}
  const userPrompt = `Isletme: ${prospect.business}
Kategori: ${prospect.category}
Web sitesi: ${prospect.website || "YOK"}
Site kalite puani: ${quality.score ?? "Bilinmiyor"}/100
Tespit edilen sorunlar: ${(quality.issues || []).join(", ") || "Bilinmiyor"}
Google puani: ${prospect.rating || "Bilinmiyor"}
Adres: ${prospect.address || "Bilinmiyor"}

Bu isletme icin kisa bir kisisellestirme notu yaz.`

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.7,
        max_tokens: 200,
      }),
    })

    if (!response.ok) return ""

    const data = await response.json()
    return data.choices[0].message.content.trim()
  } catch {
    return ""
  }
}

function generateProspectId(existingIds) {
  let counter = existingIds.size + 1
  let id
  do {
    id = `gbz-${String(counter).padStart(3, "0")}`
    counter++
  } while (existingIds.has(id))
  return id
}

async function main() {
  if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true })
  }
  logStream = fs.createWriteStream(LOG_FILE, { flags: "a" })

  console.log("")
  log(`========================================`, colors.bold)
  log(`   SenninWeb Prospect Scraper`, colors.bold)
  log(`========================================`, colors.bold)
  log(`Basladi: ${ts()}`, colors.cyan)
  writeLog("=== Prospect scraping started ===")

  loadEnv()
  writeLog("Environment loaded")

  const isGitHubActions = process.env.GITHUB_ACTIONS === "true"

  let existingProspects = []
  if (fs.existsSync(PROSPECTS_FILE)) {
    existingProspects = JSON.parse(fs.readFileSync(PROSPECTS_FILE, "utf8"))
  }
  const existingIds = new Set(existingProspects.map(p => p.id))
  const existingNames = new Set(existingProspects.map(p => p.business.toLowerCase().trim()))

  log(`Mevcut prospect sayisi: ${existingProspects.length}`, colors.cyan)
  writeLog(`Existing prospects: ${existingProspects.length}`)

  const allNew = []
  let totalFetched = 0

  // === FAZ 1: Google Places'den isletmeleri topla (email scraping yok) ===
  for (const category of CATEGORIES) {
    log(`${category} araniyor...`, colors.cyan)
    writeLog(`Searching: ${category}`)

    const places = await searchPlaces(category)
    totalFetched += places.length

    let categoryNew = 0
    for (const place of places) {
      const nameKey = place.business.toLowerCase().trim()
      if (existingNames.has(nameKey)) continue
      if (allNew.some(p => p.business.toLowerCase().trim() === nameKey)) continue

      allNew.push({
        id: generateProspectId(new Set([...existingIds, ...allNew.map(p => p.id)])),
        business: place.business,
        category: place.category,
        phone: place.phone,
        website: place.website,
        email: null,
        address: place.address,
        rating: place.rating,
        userRatingCount: place.userRatingCount,
        googleMapsUri: place.googleMapsUri,
        hasWebsite: place.hasWebsite,
        siteQuality: place.website
          ? { score: 0, issues: ["analiz edilmedi"], analyzedAt: null, pageSizeKB: 0, fetchDurationMs: 0 }
          : { score: 0, issues: ["web sitesi yok"], analyzedAt: new Date().toISOString().split("T")[0], pageSizeKB: 0, fetchDurationMs: 0 },
        personalizationNote: "",
        outreachStage: 0,
        lastEmailDate: null,
        replied: false,
        bounced: false,
        addedDate: new Date().toISOString().split("T")[0],
      })

      existingNames.add(nameKey)
      categoryNew++
    }

    log(`   ${categoryNew} yeni eklendi`, categoryNew > 0 ? colors.green : colors.reset)
    writeLog(`  ${category}: ${categoryNew} new prospects`)
  }

  log(``, colors.reset)
  log(`Toplam: ${totalFetched} isletme bulundu, ${allNew.length} yeni eklenecek`, colors.cyan)
  writeLog(`Total fetched: ${totalFetched}, new: ${allNew.length}`)

  // === FAZ 2: Websitelerinden e-posta adreslerini parallel tara ===
  const websiteProspects = allNew.filter(p => p.website)
  if (websiteProspects.length > 0) {
    log(`\nWebsitesi olan ${websiteProspects.length} isletmenin e-posta adresleri taranıyor (10 parallel)...`, colors.cyan)
    writeLog(`Email scraping phase: ${websiteProspects.length} websites`)
    let emailFound = 0
    for (let i = 0; i < websiteProspects.length; i += 10) {
      const batch = websiteProspects.slice(i, i + 10)
      await Promise.all(
        batch.map(async (prospect) => {
          const { email, html, fetchDurationMs } = await findEmailFromWebsite(prospect.website)
          prospect.email = email
          if (html) {
            prospect.siteQuality = analyzeSiteQuality(html, fetchDurationMs)
          } else {
            prospect.siteQuality = { score: 0, issues: ["web sitesi erisilemez"], analyzedAt: new Date().toISOString().split("T")[0], pageSizeKB: 0, fetchDurationMs }
          }
          if (email) {
            emailFound++
            log(`  ✓ ${prospect.business}: ${email} (site: ${prospect.siteQuality.score}/100)`, colors.green)
            writeLog(`  EMAIL FOUND: ${prospect.business} -> ${email}, quality: ${prospect.siteQuality.score}`)
          } else {
            log(`  ✗ ${prospect.business}: email bulunamadi (site: ${prospect.siteQuality.score}/100)`, colors.yellow)
          }
        })
      )
      log(`  Email scraping: ${Math.min(i + 10, websiteProspects.length)}/${websiteProspects.length}`, colors.cyan)
    }
    log(`  Toplam ${emailFound}/${websiteProspects.length} email bulundu`, colors.cyan)
    writeLog(`Email scraping done: ${emailFound}/${websiteProspects.length} found`)
  } else {
    log(`\nWebsitesi olan isletme yok, email scraping atlaniyor.`, colors.yellow)
  }

  if (allNew.length === 0) {
    log("Yeni prospect bulunamadi.", colors.yellow)
    writeLog("No new prospects found.")
    logStream.end()
    return
  }

  log("AI ile kisisellestirme notlari olusturuluyor...", colors.cyan)
  writeLog("Generating personalization notes via AI...")

  const batchSize = 5
  let generated = 0

  for (let i = 0; i < allNew.length; i += batchSize) {
    const batch = allNew.slice(i, i + batchSize)
    await Promise.all(
      batch.map(async (prospect) => {
        const note = await generatePersonalization(prospect)
        if (note) {
          prospect.personalizationNote = note
          generated++
        }
      })
    )
    log(`   ${Math.min(i + batchSize, allNew.length)}/${allNew.length} islendi`, colors.cyan)
    writeLog(`Personalization progress: ${Math.min(i + batchSize, allNew.length)}/${allNew.length}`)
  }

  existingProspects.push(...allNew)
  fs.writeFileSync(PROSPECTS_FILE, JSON.stringify(existingProspects, null, 2) + "\n", "utf8")

  log(``, colors.reset)
  log(`Basariyla kaydedildi!`, colors.green)
  log(`  Toplam prospect: ${existingProspects.length}`, colors.cyan)
  log(`  Bu seans: ${allNew.length} yeni`, colors.cyan)
  log(`  Kisisellestirme: ${generated} adet`, colors.cyan)
  writeLog(`Saved: ${existingProspects.length} total, ${allNew.length} new, ${generated} personalized`)

  log(``, colors.reset)
  log(`Bitis: ${ts()}`, colors.cyan)
  writeLog("=== Prospect scraping completed ===")
  console.log("")

  logStream.end()
}

main().catch(err => {
  log(`Beklenmeyen hata: ${err.message}`, colors.red)
  writeLog(`Fatal error: ${err.message}`)
  if (logStream) logStream.end()
  process.exit(1)
})
