#!/usr/bin/env node

import fs from "fs"
import path from "path"
import nodemailer from "nodemailer"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, "..")
const PROSPECTS_FILE = path.join(ROOT, "public", "data", "prospects.json")
const STATE_FILE = path.join(ROOT, "scripts", "outreach-state.json")
const ENV_FILE = path.join(ROOT, ".env")
const LOG_DIR = path.join(ROOT, "logs")
const LOG_FILE = path.join(LOG_DIR, "send-outreach.log")

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
  if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD && process.env.OPENAI_API_KEY) return
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
  if (!process.env.GMAIL_USER) {
    log("FATAL: GMAIL_USER bulunamadi.", colors.red)
    process.exit(1)
  }
  if (!process.env.GMAIL_APP_PASSWORD) {
    log("FATAL: GMAIL_APP_PASSWORD bulunamadi.", colors.red)
    process.exit(1)
  }
  if (!process.env.OPENAI_API_KEY) {
    log("FATAL: OPENAI_API_KEY bulunamadi.", colors.red)
    process.exit(1)
  }
}

function loadState() {
  const defaults = {
    warmupDay: 0,
    warmupWeek: 1,
    totalSent: 0,
    consecutiveSendDays: 0,
    lastSendDate: null,
  }
  if (!fs.existsSync(STATE_FILE)) return defaults
  try {
    return { ...defaults, ...JSON.parse(fs.readFileSync(STATE_FILE, "utf8")) }
  } catch {
    return defaults
  }
}

function saveState(state) {
  const dir = path.dirname(STATE_FILE)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2) + "\n", "utf8")
}

function getDailyLimit(state) {
  if (state.consecutiveSendDays === 0 && state.totalSent === 0) return 10
  const week = state.warmupWeek || 1
  return 10 + (week - 1) * 20
}

const GAP_DAYS = [0, 3, 4, 5]

const PRIORITY_CATEGORIES = ["ev tadilat", "çatı ustası", "konteynır ev", "boya badana", "inşaat firması"]

function daysSince(dateStr) {
  if (!dateStr) return Infinity
  const d1 = new Date(dateStr)
  const d2 = new Date()
  return Math.floor((d2 - d1) / (1000 * 60 * 60 * 24))
}

let transporter = null

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })
  }
  return transporter
}

async function sendGmailEmail(to, subject, text) {
  const transport = getTransporter()
  return transport.sendMail({
    from: `"SenninWeb" <${process.env.GMAIL_USER}>`,
    to,
    subject,
    text,
  })
}

function buildEmailSystemPrompt(stage, prospect) {
  const stageTemplates = {
    1: {
      role: `Birinci e-posta — Google'da gozlem ve ucretsiz analiz teklifi`,
      instructions: `Aciklayici ve dikkat cekici bir konu satiri kullan (isletme adi veya sektore dair kisa bir sey).
Google'da isletmeyi arattiginda ne buldugunu anlat. Web sitesi yoksa bunu belirt, varsa eksiklerden bahset.
SenninWeb'in ucretsiz web sitesi saglik raporu sundugunu soyle. Dusuk eforlu bir CTA: "Uygun bir vakitte ucretsiz analiz gondereyim mi?"
Kisa, samimi, profesyonel Turkce. 4-5 cumle.`,
    },
    2: {
      role: `Ikinci e-posta — Basari hikayesi (ornek olay)`,
      instructions: `Gecen hafta gonderdigin epostaya atif yapmadan, direkt ornege gel.
Miss Butik Pasta (gebze'de bir pasta butigi) ornegini ver: Sifirdan profesyonel web sitesi yaptik, simdi Google'da ilk sayfada ve musteri cekiyor.
Onlar da ayni sekilde Google'da gorunur hale gelebilir.
CTA olarak "Sizin isletmeniz icin de bir ornek gondereyim mi?" veya "Uygun musunuz?" de.
4-5 cumle, samimi.`,
    },
    3: {
      role: `Ucuncu e-posta — Engel giderme (fiyat/sure kaygisi)`,
      instructions: `Fiyat ve teslim suresiyle ilgili kaygilari anladigini belirt.
8 gunde yayinda olduklarini, her seyin tek fiyatla (sakli maliyet yok) sunuldugunu anlat.
30 gun ucretsiz destek, 48 saatte demo gibi somut vaatler ver.
"Ortalama 8 gunde siteniz yayinda — bunu duymak sasirtici mi?" gibi bir soru sor.
5 cumle.`,
    },
    4: {
      role: `Dorduncu e-posta — Veda (son sans)`,
      instructions: `Rahatsiz etmek istemedigini ama bir kez daha hatirlatmak istedigini belirt.
Web sitesi olmayan isletmelerin Google'da gorunmesinin imkansiz oldugunu kibarca hatirlat.
Teklifin hala gecerli oldugunu, hazir olduklarinda burada oldugunu soyle.
Kisa ve saygili. "Hayirli gunler, Cagatay" ile bitir.
3-4 cumle.`,
    },
  }

  const stageInfo = stageTemplates[stage] || stageTemplates[1]

  return `Sen SenninWeb adina musteri adaylarina e-posta gonderen bir pazarlamacisin.

SenninWeb, web tasarim, SEO ve dijital pazarlama hizmetleri sunan bir ajans. Merkezi Kocaeli/Gebze.

Simdi: ${stageInfo.role}

Isletme bilgileri:
- Isletme: ${prospect.business}
- Kategori: ${prospect.category}
- Web sitesi: ${prospect.website || "YOK"}
- Google puani: ${prospect.rating || "Bilinmiyor"}
- Adres: ${prospect.address || "Bilinmiyor"}

Kisisellestirme notu: ${prospect.personalizationNote || "Genel bir yaklasim kullan"}

KURALLAR:
- Sadece e-posta icerigini yaz (konu + govde)
- Konu satirini 2-5 kelime, kucuk harf, noktalama isareti yok
- Govde duz metin, HTML degil
- Samimi ve profesyonel Turkce
- "I hope this email finds you well" veya benzeri kalip ifadeler KULLANMA
- Cagatay Macar olarak imzala
- JSON formatinda: { "subject": "...", "body": "..." }
- Sadece JSON dondur, baska metin yazma`
}

function getStage1Email(prospect) {
  const greeting = prospect.contactName
    ? `Merhaba ${prospect.contactName},`
    : `Merhaba ${prospect.business} ekibi,`

  const body = `${greeting}

Ben Çağatay... Çağatay Macar, bunu konuşmamızın mantıklı olup olmadığını bilmiyorum ve elimde Google ve AI görünürlüğünüzün bir kopyasını tutuyorum. Birkaç dakikalığına bana yardımcı olur musunuz bu konuda?`

  return {
    subject: "Web ve AI ile potansiyel müşteri üretimi",
    body,
  }
}

async function generateEmail(stage, prospect) {
  if (stage === 1) {
    return getStage1Email(prospect)
  }

  const systemPrompt = buildEmailSystemPrompt(stage, prospect)

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
        { role: "user", content: `"${prospect.business}" isletmesi icin ${stage}. epostayi olustur.` },
      ],
      temperature: 0.7,
      max_tokens: 500,
    }),
  })

  if (!response.ok) {
    const err = await response.text()
    throw new Error(`OpenAI hatasi (${response.status}): ${err}`)
  }

  const data = await response.json()
  let content = data.choices[0].message.content.trim()

  const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/)
  const jsonStr = jsonMatch ? jsonMatch[1] : content

  return JSON.parse(jsonStr)
}

async function main() {
  if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true })
  }
  logStream = fs.createWriteStream(LOG_FILE, { flags: "a" })

  console.log("")
  log(`========================================`, colors.bold)
  log(`   SenninWeb Outreach Email Sender`, colors.bold)
  log(`========================================`, colors.bold)
  log(`Basladi: ${ts()}`, colors.cyan)
  writeLog("=== Outreach email sending started ===")

  loadEnv()
  writeLog("Environment loaded")

  const isGitHubActions = process.env.GITHUB_ACTIONS === "true"

  if (!fs.existsSync(PROSPECTS_FILE)) {
    log("FATAL: prospects.json bulunamadi.", colors.red)
    process.exit(1)
  }

  const prospects = JSON.parse(fs.readFileSync(PROSPECTS_FILE, "utf8"))
  const state = loadState()
  const today = new Date().toISOString().split("T")[0]

  log(`Toplam prospect: ${prospects.length}`, colors.cyan)
  writeLog(`Total prospects: ${prospects.length}`)

  if (!state.lastSendDate) {
    state.consecutiveSendDays = 1
    state.lastSendDate = today
  } else if (state.lastSendDate !== today) {
    const lastDate = new Date(state.lastSendDate)
    const diff = Math.floor((new Date() - lastDate) / (1000 * 60 * 60 * 24))
    state.consecutiveSendDays = diff === 1 ? state.consecutiveSendDays + 1 : 1
    state.lastSendDate = today
  }

  if (state.consecutiveSendDays > 0 && state.consecutiveSendDays % 5 === 0) {
    state.warmupWeek = Math.floor(state.consecutiveSendDays / 5) + 1
  }

  const dailyLimit = getDailyLimit(state)
  log(`Gunluk limit: ${dailyLimit} | Bugune kadar gonderilen: ${state.totalSent}`, colors.cyan)
  writeLog(`Daily limit: ${dailyLimit}, total sent so far: ${state.totalSent}`)

  const available = prospects.filter(p => {
    if (p.replied || p.bounced) return false
    if (!p.email) return false
    if (p.outreachStage >= 4) return false
    if (p.outreachStage === 0) return true
    const gap = GAP_DAYS[p.outreachStage] || 3
    return daysSince(p.lastEmailDate) >= gap
  })

  available.sort((a, b) => {
    const aIsPriority = PRIORITY_CATEGORIES.includes(a.category)
    const bIsPriority = PRIORITY_CATEGORIES.includes(b.category)
    if (aIsPriority && !bIsPriority) return -1
    if (!aIsPriority && bIsPriority) return 1
    const scoreA = a.siteQuality?.score ?? 0
    const scoreB = b.siteQuality?.score ?? 0
    return scoreA - scoreB
  })

  log(`E-posta gonderilebilecek: ${available.length} prospect`, colors.cyan)
  log(`Once oncelikli kategoriler (insaat/ev), sonra en kotu sitelere`, colors.cyan)
  writeLog(`Available to send: ${available.length}, sorted by priority category then site quality asc`)

  const batch = available.slice(0, dailyLimit)
  log(`Bugun gonderilecek: ${batch.length} e-posta`, colors.cyan)
  writeLog(`Sending batch: ${batch.length}`)

  if (batch.length === 0) {
    log("Bugun gonderilecek e-posta yok.", colors.yellow)
    writeLog("No emails to send today.")
    logStream.end()
    return
  }

  let sent = 0
  let failed = 0

  for (const prospect of batch) {
    const stage = prospect.outreachStage + 1

    log(`[${sent + 1}/${batch.length}] ${prospect.business} -> ${prospect.email} (eposta ${stage}/4)`, colors.cyan)
    writeLog(`Generating email for ${prospect.business} (${prospect.email}), stage ${stage}`)

    let emailContent
    try {
      emailContent = await generateEmail(stage, prospect)
    } catch (err) {
      log(`   AI uretim hatasi: ${err.message}`, colors.red)
      writeLog(`AI generation error for ${prospect.business}: ${err.message}`)
      failed++
      continue
    }

    try {
      await sendGmailEmail(prospect.email, emailContent.subject, emailContent.body)
      prospect.outreachStage = stage
      prospect.lastEmailDate = today
      state.totalSent++
      sent++
      log(`   Gonderildi: ${emailContent.subject}`, colors.green)
      writeLog(`Sent to ${prospect.email}: ${emailContent.subject}`)
    } catch (err) {
      const msg = err.message || ""
      if (msg.includes("550") || msg.includes("Invalid") || msg.includes("address") || msg.includes("recipient")) {
        prospect.bounced = true
        writeLog(`Bounced (invalid address): ${prospect.email} - ${msg.slice(0, 200)}`)
      } else {
        log(`   Gonderim hatasi: ${msg.slice(0, 200)}`, colors.red)
        writeLog(`Send error for ${prospect.email}: ${msg.slice(0, 200)}`)
      }
      failed++
    }

    await new Promise(r => setTimeout(r, 2000))
  }

  fs.writeFileSync(PROSPECTS_FILE, JSON.stringify(prospects, null, 2) + "\n", "utf8")
  saveState(state)

  log(``, colors.reset)
  log(`Gun raporu:`, colors.bold)
  log(`  Basarili: ${sent}`, colors.green)
  log(`  Basarisiz: ${failed}`, failed > 0 ? colors.red : colors.reset)
  log(`  Toplam gonderim: ${state.totalSent}`, colors.cyan)
  log(`  Warmup gunu: ${state.consecutiveSendDays}`, colors.cyan)
  writeLog(`Report: ${sent} sent, ${failed} failed, ${state.totalSent} total`)

  log(``, colors.reset)
  log(`Bitis: ${ts()}`, colors.cyan)
  writeLog("=== Outreach email sending completed ===")
  console.log("")

  logStream.end()
}

main().catch(err => {
  log(`Beklenmeyen hata: ${err.message}`, colors.red)
  writeLog(`Fatal error: ${err.message}`)
  if (logStream) logStream.end()
  process.exit(1)
})
