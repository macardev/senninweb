import { useEffect, useState } from "react"
import emailjs from "@emailjs/browser"
import useCanonicalUrl from "@/hooks/useCanonicalUrl"
import WhatsAppIcon from "@/components/ui/WhatsAppIcon"
import GuideBook from "@/components/ui/GuideBook"
import { whatsappHref, trackLead, GUIDE_PDF_URL as PDF_URL } from "@/utils/leads"
import useReleaseStaticBody from "@/hooks/useReleaseStaticBody"
const TITLE = "Yurt Dışından Hasta Çekme Rehberi 2026 (Ücretsiz PDF) | SenninWeb"
const DESCRIPTION = "Saç ekim merkezleri, diş, estetik ve veteriner klinikleri için ücretsiz rehber: hedef ülke seçimi, çok dilli site, uluslararası SEO, backlink ve WhatsApp'ta hastaya dönüşüm."

const CLINIC_TYPES = ["Saç ekim merkezi", "Diş kliniği", "Estetik / güzellik", "Veteriner kliniği", "Diğer"]

const CHAPTERS = [
  ["Uluslararası hasta nasıl karar veriyor?", "7 aşamalı hasta yolculuğu ve kliniklerin en çok kaybettiği noktalar"],
  ["Doğru hedef ülkeyi seçmek", "6 kriter ve 30 dakikalık pazar doğrulama testi"],
  ["Yasal zemin ve güven temeli", "Yetki belgesi, reklam kuralları, KVKK ve GDPR"],
  ["Çok dilli web sitesi", "Olmazsa olmaz sayfalar ve hazır şablonun neden işe yaramadığı"],
  ["Hedef ülkede Google'da görünmek", "Hastanın arama dili, sayfa yapısı, E-E-A-T, schema"],
  ["Hedef ülkeden otorite kazanmak", "Backlink kaynakları ve gerçekçi bütçe"],
  ["Güven sinyalleri ve sosyal kanıt", "Yorum toplama sistemi"],
  ["İlk 5 dakika", "WhatsApp karşılama akışı ve hasta takip panosu"],
  ["Ölçüm", "Hasta hunisi ve aylık bakılacak 5 soru"],
  ["Sektöre özel notlar", "Saç ekimi, diş, estetik, veteriner"],
  ["90 günlük yol haritası", "Temel → yayın → büyüme → ölçek"],
  ["Kontrol listesi", "25 maddelik hazırlık puanı"],
]

const ANALYSIS_MESSAGE = "Merhaba, yurt dışından hasta çekme rehberinizi indirdim. Kliniğim için ücretsiz kısa analiz istiyorum."

function useGuideMeta(canonicalUrl) {
  useEffect(() => {
    const prevTitle = document.title
    document.title = TITLE
    const set = (selector, attr, key, value) => {
      let el = document.head.querySelector(selector)
      if (!el) {
        el = document.createElement(selector.startsWith("link") ? "link" : "meta")
        el.setAttribute(attr, key)
        document.head.appendChild(el)
      }
      el.setAttribute(selector.startsWith("link") ? "href" : "content", value)
    }
    set('meta[name="description"]', "name", "description", DESCRIPTION)
    set('meta[property="og:title"]', "property", "og:title", TITLE)
    set('meta[property="og:description"]', "property", "og:description", DESCRIPTION)
    set('meta[property="og:url"]', "property", "og:url", canonicalUrl)
    set('link[rel="canonical"]', "rel", "canonical", canonicalUrl)
    return () => { document.title = prevTitle }
  }, [canonicalUrl])
}

export default function Rehber() {
  useReleaseStaticBody()
  const canonicalUrl = useCanonicalUrl()
  useGuideMeta(canonicalUrl)

  const [form, setForm] = useState({ name: "", contact: "", clinic: "", website: "" })
  const [sending, setSending] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState("")

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.contact.trim()) {
      setError("Adınızı ve WhatsApp numaranızı ya da e-postanızı yazın.")
      return
    }
    setError("")
    setSending(true)
    const isEmail = form.contact.includes("@")
    try {
      await emailjs.send(
        "service_fku436a",
        "template_h8x9ylc",
        {
          from_name: form.name,
          from_email: isEmail ? form.contact : "Belirtilmedi",
          phone: isEmail ? "Belirtilmedi" : form.contact,
          q1: `[REHBER İNDİRME] Klinik türü: ${form.clinic || "Belirtilmedi"}`,
          q2: `Web sitesi: ${form.website || "Belirtilmedi"}`,
          q3: "Kaynak: Yurt Dışından Hasta Çekme Rehberi",
          q4: "Rehberi indirdi. 1-2 gün içinde WhatsApp'tan kısa analiz teklif edin.",
        },
        "xx85OmC9vAmhoFav0"
      )
    } catch (err) {
      // Never block the download on a mail failure; the lead is still tracked in GA4
      console.error("EmailJS hata:", err)
    }
    trackLead("guide_download", "guide-page")
    setSending(false)
    setDone(true)

    const a = document.createElement("a")
    a.href = PDF_URL
    a.download = ""
    document.body.appendChild(a)
    a.click()
    a.remove()
  }

  const inputClass = "w-full bg-white/[0.04] border border-white/10 hover:border-white/20 focus:border-gold-500/60 rounded-xl px-5 py-4 text-sm text-white placeholder-white/30 outline-none transition-colors duration-200"

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": TITLE,
    "description": DESCRIPTION,
    "inLanguage": "tr-TR",
    "url": canonicalUrl,
    "publisher": { "@id": "https://www.senninweb.com" },
    "about": "Sağlık turizmi, klinikler için uluslararası SEO ve hasta kazanımı",
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative bg-black overflow-hidden" data-lead-zone="guide-hero">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-40 right-0 w-[600px] h-[500px] rounded-full bg-gold-500/[0.07] blur-[160px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-10 pb-20 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-start">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.2em] uppercase text-gold-500 mb-6">
              <span className="w-8 h-px bg-gold-500" />
              Ücretsiz PDF Rehber · 15 sayfa
            </span>
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.05] mb-6">
              <span className="text-white">Yurt dışından hasta çekme </span>
              <span className="text-gold-gradient">rehberi 2026</span>
            </h1>
            <p className="text-white/65 text-base md:text-lg leading-relaxed mb-8 max-w-xl">
              Saç ekim merkezleri, diş klinikleri, estetik ve veteriner klinikleri için:
              yurtdışından hasta bulma sürecini hedef ülke seçiminden sağlık turizmi SEO'suna,
              hastanın kendi dilinde Google'da bulunmaktan WhatsApp'a gelen yabancı hasta talebini
              randevuya dönüştürmeye kadar adım adım anlatan sistem.
            </p>

            {!done ? (
              <form onSubmit={handleSubmit} className="rounded-2xl border border-white/10 bg-surface-50/80 backdrop-blur-sm p-6 md:p-7 max-w-xl space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="g-name" className="block text-xs text-white/60 uppercase tracking-wider mb-2">Ad Soyad</label>
                    <input id="g-name" autoComplete="name" className={inputClass} placeholder="Dr. Ayşe Yılmaz" value={form.name} onChange={(e) => update("name", e.target.value)} />
                  </div>
                  <div>
                    <label htmlFor="g-contact" className="block text-xs text-white/60 uppercase tracking-wider mb-2">WhatsApp veya e-posta</label>
                    <input id="g-contact" className={inputClass} placeholder="+90 5xx xxx xx xx" value={form.contact} onChange={(e) => update("contact", e.target.value)} />
                  </div>
                </div>
                <fieldset>
                  <legend className="block text-xs text-white/60 uppercase tracking-wider mb-2.5">Klinik türü</legend>
                  <div className="flex flex-wrap gap-2">
                    {CLINIC_TYPES.map((t) => (
                      <button
                        key={t}
                        type="button"
                        aria-pressed={form.clinic === t}
                        onClick={() => update("clinic", form.clinic === t ? "" : t)}
                        className={`px-4 py-2 rounded-full text-sm border transition-all duration-200 active:scale-[0.96] ${
                          form.clinic === t
                            ? "border-gold-500 bg-gold-500/15 text-gold-300"
                            : "border-white/10 bg-white/[0.03] text-white/65 hover:border-white/25 hover:text-white"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </fieldset>
                <div>
                  <label htmlFor="g-site" className="block text-xs text-white/60 uppercase tracking-wider mb-2">
                    Web siteniz <span className="normal-case tracking-normal text-white/40">(opsiyonel)</span>
                  </label>
                  <input id="g-site" inputMode="url" className={inputClass} placeholder="klinik.com" value={form.website} onChange={(e) => update("website", e.target.value)} />
                </div>
                {error && <p role="alert" className="text-sm text-red-400">{error}</p>}
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full h-14 rounded-xl bg-gold-500 hover:bg-gold-400 text-black font-semibold transition-colors duration-200 disabled:opacity-70 active:scale-[0.98]"
                >
                  {sending ? "Hazırlanıyor..." : "Rehberi ücretsiz indir"}
                </button>
                <p className="text-xs text-white/45 text-center">
                  Bilgileriniz yalnızca size rehberle ilgili dönüş yapmak için kullanılır.
                </p>
              </form>
            ) : (
              <div className="rounded-2xl border border-gold-500/30 bg-gold-500/[0.06] p-6 md:p-7 max-w-xl guide-success" data-lead-zone="guide-success">
                <p className="font-display font-bold text-2xl text-white mb-2">Rehberiniz hazır 🎉</p>
                <p className="text-sm text-white/65 mb-5">İndirme başlamadıysa aşağıdaki butonu kullanın.</p>
                <a
                  href={PDF_URL}
                  download
                  onClick={() => trackLead("guide_pdf", "guide-success")}
                  className="flex items-center justify-center w-full h-12 rounded-xl border border-white/15 hover:border-gold-500/50 text-white text-sm font-medium transition-colors duration-200 mb-6"
                >
                  PDF'i indir (15 sayfa)
                </a>
                <div className="border-t border-white/10 pt-5">
                  <p className="text-sm text-white font-medium mb-1">Sonraki adım: kliniğinize özel kısa analiz</p>
                  <p className="text-sm text-white/60 mb-4">
                    Sitenizi ve hedef ülkenizi inceleyip en hızlı sonuç alacağınız 3 adımı WhatsApp'tan ücretsiz gönderelim.
                  </p>
                  <a
                    href={whatsappHref(ANALYSIS_MESSAGE + (form.website ? ` Sitem: ${form.website}` : ""))}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-lead-placement="guide-success"
                    className="flex items-center justify-center gap-2.5 w-full h-14 rounded-xl bg-[#25D366] hover:bg-[#22c55e] text-white font-semibold shadow-[0_12px_40px_-10px_rgba(37,211,102,0.6)] transition-colors duration-200"
                  >
                    <WhatsAppIcon size={20} />
                    Kısa analizimi WhatsApp'tan iste
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Top-aligned so font swaps in the left column can't shift the book (CLS) */}
          <div className="hidden lg:block lg:pt-20">
            <GuideBook />
          </div>
        </div>
      </section>

      <section className="relative bg-black section-pad pt-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-gold-500" />
            <span className="text-xs tracking-[0.25em] uppercase text-gold-400 font-medium">İçindekiler</span>
          </div>
          <h2 className="font-display font-bold text-3xl md:text-5xl tracking-tight leading-tight mb-12">
            <span className="text-white">12 bölümde </span>
            <span className="text-gold-gradient">uluslararası hasta sistemi</span>
          </h2>
          <ol className="grid md:grid-cols-2 gap-4">
            {CHAPTERS.map(([title, desc], i) => (
              <li
                key={title}
                className="reveal-3d flex gap-5 p-5 rounded-2xl border border-white/8 bg-white/[0.02]"
                style={{ animationRange: `entry ${(i % 2) * 6}% cover ${28 + (i % 2) * 6}%` }}
              >
                <span className="font-display font-bold text-gold-500 text-lg w-8 flex-shrink-0">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-white font-medium mb-1">{title}</h3>
                  <p className="text-sm text-white/55">{desc}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-14 p-8 rounded-2xl border border-white/8 bg-white/[0.02]">
            <h2 className="font-display font-bold text-2xl text-white mb-3">Bu rehber kimin için?</h2>
            <p className="text-white/60 leading-relaxed">
              Türkiye'de hizmet veren ve yurt dışından hasta çekmek isteyen saç ekim, diş, estetik ve veteriner
              kliniklerinin sahipleri ve yöneticileri için. 2025'te değişen yetki belgesi ve tanıtım yönetmeliği
              kurallarını, yurt dışına yönelik ayrı sağlık turizmi web sitesi gerekliliğini de kapsar. Reklama sürekli bütçe harcamak yerine hedef ülkede Google'da kalıcı
              olarak bulunmak, aracı platformlara bağımlılığı azaltmak ve gelen her talebi randevuya
              dönüştürmek isteyen ekipler için yazıldı.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
