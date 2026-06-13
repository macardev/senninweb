#!/usr/bin/env node

import fs from "fs"
import path from "path"
import { execSync } from "child_process"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, "..")
const DATA_FILE = path.join(ROOT, "public", "data", "blog-posts.json")
const ENV_FILE = path.join(ROOT, ".env")
const LOG_DIR = path.join(ROOT, "logs")
const LOG_FILE = path.join(LOG_DIR, "create-post.log")

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
  if (process.env.OPENAI_API_KEY) return
  if (!fs.existsSync(ENV_FILE)) {
    log("FATAL: OPENAI_API_KEY bulunamadi. .env dosyasi da yok.", colors.red)
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
  if (!process.env.OPENAI_API_KEY) {
    log("FATAL: OPENAI_API_KEY bulunamadi.", colors.red)
    process.exit(1)
  }
}

const isGitHubActions = process.env.GITHUB_ACTIONS === "true"

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\u00e7\u015f\u011f\u00fc\u00f6\u0131\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
}

function calculateReadingTime(text) {
  const words = text.split(/\s+/).length
  const minutes = Math.max(1, Math.round(words / 200))
  return `${minutes} dk`
}

async function fetchRssHeadlines(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; SenninWebBot/1.0)" },
  })
  if (!res.ok) return []
  const xml = await res.text()
  const titles = []
  const itemRegex = /<item>[\s\S]*?<\/item>/gi
  const titleRegex = /<title[^>]*>(.*?)<\/title>/i
  let match
  while ((match = itemRegex.exec(xml)) !== null) {
    const titleMatch = titleRegex.exec(match[0])
    if (titleMatch) {
      const title = titleMatch[1].replace(/<!\[CDATA\[|\]\]>/g, "").trim()
      if (title) titles.push(title)
    }
  }
  return titles
}

async function researchTopics() {
  log("Trend konular arastiriliyor... (Google News RSS)", colors.cyan)
  writeLog("Fetching Google News RSS feeds...")

  const queries = [
    "web+tasarım+trend+2026",
    "SEO+güncel+strateji+2026",
    "dijital+pazarlama+yenilik+2026",
    "yapay+zeka+web+tasarım+SEO",
    "yerel+SEO+kucuk+isletme+2026",
  ]

  const allHeadlines = []
  for (const q of queries) {
    const url = `https://news.google.com/rss/search?q=${q}&hl=tr&gl=TR&ceid=TR:tr`
    try {
      const headlines = await fetchRssHeadlines(url)
      allHeadlines.push(...headlines)
      writeLog(`  ${q}: ${headlines.length} baslik bulundu`)
    } catch (err) {
      writeLog(`  ${q}: hata - ${err.message}`)
    }
  }

  const unique = [...new Set(allHeadlines)]
  writeLog(`Toplam ${unique.length} benzersiz baslik`)

  if (unique.length === 0) {
    log("Google News'ten baslik alinamadi, varsayilan konular kullanilacak", colors.yellow)
    writeLog("No headlines fetched, using fallback topics")
    return [
      "Web sitenizi 2026'da nasıl Google'da ilk sıraya taşırsınız?",
      "Yapay zeka çağında web tasarımı ve SEO stratejileri",
      "Küçük işletmeler için 2026 dijital pazarlama trendleri",
      "Core Web Vitals ve mobil performans: 2026'da Google sıralamasını etkileyen faktörler",
      "Yerel SEO ile müşteri bulma: 2026'da Google Maps optimizasyonu",
    ]
  }

  return unique.slice(0, 20)
}

async function generateTopic(headlines, existingSlugs) {
  const existingList = existingSlugs.join(", ")
  const headlineList = headlines.join("\n")

  log("AI ile konu belirleniyor...", colors.cyan)
  writeLog("Generating topic from headlines via AI...")

  const systemPrompt = `Sen SenninWeb icin blog konusu ureten bir stratejistsin.
SenninWeb, web tasarim, SEO ve dijital pazarlama hizmetleri sunan bir ajans. Merkezi Kocaeli/Gebze.

Gorevin: Google News'ten gelen guncel basliklari analiz et ve SenninWeb blogunda yayinlanmak uzere
OZGUN, TRENDING ve SEO dostu bir blog konusu uret.

KURALLAR:
- Konu TURKCE olmali
- Web tasarim, SEO, dijital pazarlama ile ilgili olmali
- Halihazirda kullanilmis slug'lardan farkli olmali: ${existingList}
- Trend olan bir konuyu SenninWeb'in hizmetleriyle iliskilendir
- Kisaca konuyu 1-2 cumleyle acikla
- JSON formatinda dondur: { "title": "Konu basligi", "description": "Kisa aciklama" }
- Sadece JSON dondur, baska metin yazma`

  const userPrompt = `Bugunun Google News basliklari:\n\n${headlineList}\n\nBu basliklardan yola cikarak SenninWeb blogu icin bir konu uret.`

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
      temperature: 0.8,
      max_tokens: 500,
    }),
  })

  if (!response.ok) {
    const err = await response.text()
    throw new Error(`Topic generation failed (${response.status}): ${err}`)
  }

  const data = await response.json()
  let content = data.choices[0].message.content.trim()
  const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/)
  const jsonStr = jsonMatch ? jsonMatch[1] : content
  const topic = JSON.parse(jsonStr)

  log(`   Konu: ${topic.title}`, colors.cyan)
  log(`   Aciklama: ${topic.description}`, colors.cyan)
  writeLog(`Generated topic: ${topic.title}`)

  return topic
}

function buildAeoGeoPrompt(topicTitle, topicDescription, today) {
  return `Sen, SenninWeb blogunda yayinlanmak uzere blog yazilari yazan bir icerik ureticisisin.

SenninWeb, web tasarim, SEO ve dijital pazarlama hizmetleri sunan bir ajans. Merkezi Kocaeli/Gebze.

ONEMLI: Sadece gecerli JSON formatinda yanit ver. Baska hicbir metin ekleme.

KONU: ${topicTitle}
KONU ACSIKLAMASI: ${topicDescription}

Asagidaki JSON semasina TAMAMEN UYGUN bir blog postu uret. Her zaman TURKCE yaz, samimi ve profesyonel bir ton kullan.

BLOG POST JSON SEMASI:
{
  "slug": "otomatik-olusur-bos-birak",
  "title": "SEO basligi | SenninWeb (maks 70 karakter, sonunda | SenninWeb olmali)",
  "description": "Aciklama metni (2-3 cumle, maks 160 karakter)",
  "shortTitle": "Daha kisa baslik (| SenninWeb olmadan)",
  "desc": "Kart gorunumu icin kisa aciklama (maks 120 karakter)",
  "tag": "Uygun etiket: Web Tasarim, SEO & Buyume, Buyume, Dijital Pazarlama, Teknoloji",
  "readingTime": "Hesaplanacak, bos birak",
  "datePublished": "${today}",
  "dateModified": "${today}",
  "date": "${today}",
  "author": "Cagatay Macar",
  "authorTitle": "Senior Web Developer",
  "metaDescription": "Meta description (150-160 karakter, ana anahtar kelimeyi icer, SEO odakli)",
  "schemaUrl": "https://www.senninweb.com/blog/[slug]",
  "sections": []
}

## AEO (Answer Engine Optimization) KURALLARI ##
- En az 2 tane "question" tipinde blok kullan (Google "People Also Ask" icin)
- Paragraflarin ilk cumlesi dogrudan cevap niteliginde olmali (featured snippet almasi icin)
- Her heading2 altinda kisa bir "ozet cumle" olmali (Google snippet adayi)
- Istatistik ve veri iceren cumleler kullan (ornek: "arastirmalara gore %X...")
- "question" bloklarinda soru+cevap formati net olmali, cevaplar 2-3 cumleyi gecmemeli

## GEO (Generative Engine Optimization) KURALLARI ##
- Her heading2 bolumunun sonunda bulletList ile "ana cikarimlar" ekle (LLM'lerin extract etmesi icin)
- Kesin ve otoriter ifadeler kullan: "kesinlikle", "mutlaka", "en onemli" gibi (AI asistanlarin referans gostermesi icin)
- Tanim cumleleri yazin basinda kullan: "X, Y'dir" seklinde (AI'larin kavramlari ogrenmesi icin)
- Istatistik ve veri ekle, kaynak goster (ornek: Google'in 2026 Core Web Vitals guncellemesine gore...)
- Her section kendi icinde anlamli ve bagimsiz olmali (AI asistanin tek bir section'i alinti yapabilmesi icin)
- conclusion bolumunde mutlaka "3 maddede ozet" gibi extract edilebilir bir liste olmali

## SEO KURALLARI ##
- Ana anahtar kelimeyi heading2'de, ilk paragrafta ve metaDescription'da kullan
- LSI anahtar kelimeleri dogal akis icinde kullan
- URL dostu slug (otomatik olusacak)
- Okunabilirlik: kisa paragraflar, net basliklar
- Ic baglanti: /gebze, /blog/..., /#contact, /sss kullan

DESTEKLENEN SECTION TIPLERI:

1. heroSection: { "type": "heroSection", "title": "Buyuk baslik", "subtitle": "Alt baslik" }
2. intro: { "type": "intro", "content": "Giris paragrafi" }
3. question: { "type": "question", "question": "Soru", "answer": "Cevap" }
4. heading2: { "type": "heading2", "content": "Ana Baslik" }
5. heading3: { "type": "heading3", "content": "Alt Baslik" }
6. paragraph: { "type": "paragraph", "content": "Paragraf metni", "isHtml": true/false }
7. bulletList: { "type": "bulletList", "items": ["madde 1", "madde 2"], "isHtml": true/false }
8. section: { "type": "section", "heading": "Bolum basligi", "content": "Giris metni", "subsections": [{"heading": "Alt baslik", "content": "Icerik"}] }
9. conclusion: { "type": "conclusion", "intro": "Giris", "items": ["madde 1", "madde 2"], "closing": "Kapanis", "isHtml": true/false }
10. finalParagraph: { "type": "finalParagraph", "content": "Son paragraf", "isHtml": true/false }
11. finalCta: { "type": "finalCta", "question": "Soru cumlesi", "ctaText": "CTA metni" }

GENEL KURALLAR:
- Yazı uzunlugu: En az 2500 kelime. BU BIR ZORUNLULUKTUR, kisa yazma.
- En az 8 section kullan, en az 4 farkli section tipi kullan (sadece paragraph ve heading2 degil)
- Her paragraph en az 3-5 cumle olmali, tek cumlelik paragraflar kullanma
- Cesitli section tipleri kullan (sadece paragraph degil)
- isHtml: false olan metinlerde HTML tag kullanma
- Her yazida en az 1 isHtml: true blok olmali (linkler icin)
- finalCta ile bitir: harekete gecirici mesaj
- URL'ler gercek olmali: https://search.google.com/search-console, https://pagespeed.web.dev/, https://www.google.com/business/, /gebze, /#contact, /sss
- Iceride /blog/... seklinde SenninWeb'in diger blog yazilarina link ver

KULLANILABILIR GERCEK URL'LER:
- https://search.google.com/search-console
- https://pagespeed.web.dev/
- https://www.google.com/business/
- https://www.google.com/analytics/
- https://www.ssl.com/
- https://www.linkedin.com/
- /gebze
- /blog/[slug]
- /#contact
- /sss`
}

async function callOpenAI(topicTitle, topicDescription) {
  const today = new Date().toISOString().split("T")[0]
  const systemPrompt = buildAeoGeoPrompt(topicTitle, topicDescription, today)

  const userPrompt = `Yukaridaki konu hakkinda bir blog yazisi olustur:
  "${topicTitle}"

  JSON formatinda, semaya tam uygun. Sadece gecerli JSON dondur.`

  log("AI ile blog yazisi olusturuluyor...", colors.cyan)
  writeLog("Calling OpenAI for content generation...")

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
      max_tokens: 16384,
    }),
  })

  if (!response.ok) {
    const err = await response.text()
    throw new Error(`OpenAI API hatasi (${response.status}): ${err}`)
  }

  const data = await response.json()
  let content = data.choices[0].message.content.trim()

  const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/)
  const jsonStr = jsonMatch ? jsonMatch[1] : content

  return JSON.parse(jsonStr)
}

function validatePost(post) {
  const required = ["title", "description", "shortTitle", "desc", "tag", "metaDescription", "sections"]
  const missing = required.filter(f => !post[f])
  if (missing.length > 0) {
    throw new Error(`Eksik alanlar: ${missing.join(", ")}`)
  }
  if (!Array.isArray(post.sections) || post.sections.length < 8) {
    throw new Error("En az 8 section gerekli (sadece " + (post.sections ? post.sections.length : 0) + " var)")
  }
  const validTypes = ["heroSection", "intro", "question", "heading2", "heading3", "paragraph", "bulletList", "section", "conclusion", "finalParagraph", "finalCta"]
  for (const s of post.sections) {
    if (!validTypes.includes(s.type)) {
      throw new Error(`Gecersiz section tipi: ${s.type}`)
    }
  }
}

function getCurrentBranch() {
  try {
    return execSync("git rev-parse --abbrev-ref HEAD", { cwd: ROOT, encoding: "utf8" }).trim()
  } catch {
    return "main"
  }
}

async function main() {
  if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true })
  }
  logStream = fs.createWriteStream(LOG_FILE, { flags: "a" })

  console.log("")
  log(`========================================`, colors.bold)
  log(`   SenninWeb Automated Blog Post Creator`, colors.bold)
  log(`========================================`, colors.bold)
  log(`Basladi: ${ts()}`, colors.cyan)
  writeLog("=== Automated blog post creation started ===")

  loadEnv()
  writeLog("Environment loaded")

  const existingRaw = fs.readFileSync(DATA_FILE, "utf8")
  const existingPosts = JSON.parse(existingRaw)
  const existingSlugs = existingPosts.map(p => p.slug)
  writeLog(`Mevcut post sayisi: ${existingPosts.length}`)

  const headlines = await researchTopics()
  writeLog(`Arastirma tamam: ${headlines.length} baslik`)

  let topic
  try {
    topic = await generateTopic(headlines, existingSlugs)
  } catch (err) {
    log(`Topic olusturulamadi: ${err.message}`, colors.red)
    writeLog(`Topic generation failed: ${err.message}`)
    topic = {
      title: "2026'da Web Tasarim ve SEO Trendleri: Kucuk Isletmeler Icin Rehber",
      description: "Guncel web tasarim ve SEO trendlerini kucuk isletmeler ozelinde ele alan kapsamli bir rehber.",
    }
    writeLog(`Using fallback topic: ${topic.title}`)
  }

  let post
  try {
    post = await callOpenAI(topic.title, topic.description)
  } catch (err) {
    log(`AI icerik uretilemedi: ${err.message}`, colors.red)
    writeLog(`Content generation failed: ${err.message}`)
    process.exit(1)
  }

  const today = new Date()
  const isoDate = today.toISOString().split("T")[0]

  post.datePublished = isoDate
  post.dateModified = isoDate
  post.date = isoDate
  post.author = "Cagatay Macar"
  post.authorTitle = "Senior Web Developer"

  if (!post.slug) {
    post.slug = slugify(post.shortTitle || post.title)
  }

  if (existingSlugs.includes(post.slug)) {
    const suffix = String(Date.now()).slice(-4)
    post.slug = slugify(post.slug + "-" + suffix)
    writeLog(`Duplicate slug detected, appended suffix: ${post.slug}`)
  }

  post.schemaUrl = `https://www.senninweb.com/blog/${post.slug}`

  const allText = post.sections.map(s => {
    let text = ""
    if (s.content) text += " " + s.content
    if (s.question) text += " " + s.question
    if (s.answer) text += " " + s.answer
    if (s.items) text += " " + s.items.join(" ")
    if (s.intro) text += " " + s.intro
    if (s.closing) text += " " + s.closing
    if (s.subsections) {
      for (const sub of s.subsections) {
        if (sub.heading) text += " " + sub.heading
        if (sub.content) text += " " + sub.content
      }
    }
    return text
  }).join(" ")
  post.readingTime = calculateReadingTime(allText)

  const wordCount = allText.split(/\s+/).filter(w => w.length > 0).length
  if (wordCount < 1200) {
    log(`UYARI: Yazı kisa (${wordCount} kelime). En az 1200 kelime bekleniyor.`, colors.yellow)
    writeLog(`Warning: Short post (${wordCount} words)`)
  }

  log(`Kelime sayisi: ${wordCount}`, colors.cyan)

  try {
    validatePost(post)
  } catch (err) {
    log(`Dogrulama hatasi: ${err.message}`, colors.red)
    writeLog(`Validation error: ${err.message}`)
    process.exit(1)
  }

  existingPosts.unshift(post)
  fs.writeFileSync(DATA_FILE, JSON.stringify(existingPosts, null, 2) + "\n", "utf8")

  log(``, colors.reset)
  log(`Basariyla olusturuldu!`, colors.green)
  log(`  Slug: ${post.slug}`, colors.cyan)
  log(`  Baslik: ${post.shortTitle || post.title}`, colors.cyan)
  log(`  Bolum: ${post.sections.length}`, colors.cyan)
  log(`  Sure: ${post.readingTime}`, colors.cyan)
  log(`  Kelime: ${wordCount}`, colors.cyan)
  log(`  Post sayisi: ${existingPosts.length}`, colors.cyan)
  writeLog(`Post created: ${post.slug} | ${post.shortTitle || post.title} | ${post.sections.length} sections | ${post.readingTime} | ${wordCount} words`)

  if (isGitHubActions) {
    log("GitHub Actions ortami — git islemleri workflow tarafindan yapilacak", colors.cyan)
    writeLog("Running in GitHub Actions, skipping git operations (handled by workflow)")
  } else {
    const branch = getCurrentBranch()
    log(`Git islemleri baslatiliyor (branch: ${branch})...`, colors.cyan)
    writeLog(`Starting git operations on branch: ${branch}`)

    try {
      execSync(`git add "${path.relative(ROOT, DATA_FILE)}"`, { cwd: ROOT })
      log(`  git add tamam`, colors.green)
      writeLog("git add successful")

      execSync(`git commit -m "feat(blog): add ${post.slug}"`, { cwd: ROOT })
      log(`  git commit tamam`, colors.green)
      writeLog("git commit successful")

      execSync(`git push origin ${branch}`, { cwd: ROOT, stdio: "inherit" })
      log(`  git push tamam`, colors.green)
      writeLog("git push successful")

      log(``, colors.reset)
      log(`Yayinlandi: https://www.senninweb.com/blog/${post.slug}`, colors.green)
      writeLog(`Published: https://www.senninweb.com/blog/${post.slug}`)
    } catch (err) {
      log(`Git islemi basarisiz: ${err.message}`, colors.red)
      writeLog(`Git operation failed: ${err.message}`)
      log("JSON'a eklendi ancak push yapilamadi. Manuel:", colors.yellow)
      log(`  git add public/data/blog-posts.json`, colors.cyan)
      log(`  git commit -m "feat(blog): add ${post.slug}"`, colors.cyan)
      log(`  git push origin ${branch}`, colors.cyan)
    }
  }

  log(``, colors.reset)
  log(`Bitis: ${ts()}`, colors.cyan)
  writeLog("=== Automated blog post creation completed ===")
  console.log("")

  logStream.end()
}

main().catch(err => {
  log(`Beklenmeyen hata: ${err.message}`, colors.red)
  writeLog(`Fatal error: ${err.message}`)
  if (logStream) logStream.end()
  process.exit(1)
})
