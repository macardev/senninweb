import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import useCanonicalUrl from "@/hooks/useCanonicalUrl"
import useReleaseStaticBody from "@/hooks/useReleaseStaticBody"
import WhatsAppIcon from "@/components/ui/WhatsAppIcon"
import { GUIDE_PATH, whatsappHref } from "@/utils/leads"
// Single source for the page, its FAQPage JSON-LD and the postbuild prerender/md mirror
import faqs from "@/data/faqs.json"

const TITLE = "Sağlık Turizmi Web Sitesi & SEO: Sık Sorulan Sorular | SenninWeb"
const DESCRIPTION = "Hasta Kazanım Paketi, yetki belgesi, yurt dışına yönelik site, sağlık turizmi SEO'su ve WhatsApp hasta akışı hakkında kliniklerin en çok sorduğu sorular."

function upsertMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement("meta")
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute("content", content)
}

function upsertCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]')
  if (!el) {
    el = document.createElement("link")
    el.setAttribute("rel", "canonical")
    document.head.appendChild(el)
  }
  el.setAttribute("href", href)
}

// CSS grid-rows accordion: answers stay in the DOM (crawlable when collapsed)
// and no animation library is needed for this page.
function AccordionItem({ faq, index, isOpen, onToggle }) {
  const panelId = `sss-panel-${index}`
  return (
    <div
      className={`group rounded-2xl border transition-colors duration-300 ${
        isOpen ? "border-gold-500/30 bg-gold-500/[0.03]" : "border-white/6 bg-white/[0.02] hover:border-white/10"
      }`}
    >
      <h2>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className="w-full flex items-center justify-between gap-4 px-6 md:px-8 py-5 md:py-6 text-left min-h-[44px]"
        >
          <span className="flex items-center gap-4">
            <span className="hidden md:flex w-8 h-8 rounded-full border border-gold-500/20 bg-gold-500/5 items-center justify-center flex-shrink-0 text-gold-400 text-xs font-semibold">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="font-display font-semibold text-base md:text-lg text-white/80 group-hover:text-white transition-colors">
              {faq.question}
            </span>
          </span>
          <svg
            className={`w-4 h-4 flex-shrink-0 text-gold-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </h2>
      <div
        id={panelId}
        role="region"
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.2,0,0,1)] ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-6 md:px-8 pb-6 md:pb-8">
            <div className="w-full h-px bg-gradient-to-r from-gold-500/20 via-gold-500/10 to-transparent mb-5" />
            <p className="text-sm md:text-base text-white/65 leading-relaxed whitespace-pre-line">{faq.answer}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SSS() {
  useReleaseStaticBody()
  const navigate = useNavigate()
  const [openIndex, setOpenIndex] = useState(0)
  const canonicalUrl = useCanonicalUrl()

  useEffect(() => {
    const prevTitle = document.title
    document.title = TITLE
    upsertMeta("name", "description", DESCRIPTION)
    upsertMeta("property", "og:title", TITLE)
    upsertMeta("property", "og:description", DESCRIPTION)
    upsertMeta("property", "og:url", canonicalUrl)
    upsertMeta("name", "twitter:title", TITLE)
    upsertMeta("name", "twitter:description", DESCRIPTION)
    upsertCanonical(canonicalUrl)
    return () => { document.title = prevTitle }
  }, [canonicalUrl])

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "name": TITLE,
    "description": DESCRIPTION,
    "mainEntity": faqs.map((f) => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": { "@type": "Answer", "text": f.answer },
    })),
  }

  return (
    <article className="px-6 md:px-12 pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-3xl mx-auto">
        <div className="pt-6 pb-10">
          <button
            type="button"
            data-cursor
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-white/70 hover:text-white hover:border-white/20 transition-colors"
          >
            <span className="text-base leading-none">←</span>
            Ana Sayfaya Dön
          </button>

          <div className="mt-6 flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase">
            <span className="text-gold-400/90 font-semibold">SSS</span>
            <span className="text-white/55">•</span>
            <span className="text-white/60">Hasta Kazanım Paketi</span>
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-display font-bold tracking-tight leading-tight">
            <span className="text-white">Sıkça</span> <span className="text-gold-gradient">Sorulan Sorular</span>
          </h1>
          <p className="mt-5 text-sm md:text-base text-white/60 leading-relaxed max-w-xl">
            Yurt dışından hasta çekmek isteyen saç ekim, diş, estetik ve veteriner kliniklerinin; paketimiz,
            sağlık turizmi web sitesi, SEO ve 2025 yönetmelikleri hakkında en çok sorduğu sorular.
          </p>
          <div className="mt-8 gold-line opacity-20" />
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={faq.question}
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>

        <section data-lead-zone="sss-cta" className="mt-16 relative overflow-hidden rounded-3xl border border-gold-500/25 bg-white/[0.03] p-7 md:p-10">
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-gold-500/10 blur-[70px] pointer-events-none" />
          <h2 className="relative text-lg md:text-2xl font-display font-semibold text-white">Sorunuzun cevabı burada yok mu?</h2>
          <p className="relative mt-3 text-sm md:text-base text-white/60 leading-relaxed max-w-xl">
            Ücretsiz rehberle başlayın ya da WhatsApp'tan yazın; kliniğinizi inceleyip kısa bir analizle dönelim.
          </p>
          <div className="relative mt-6 flex flex-col sm:flex-row gap-3">
            <Link
              to={GUIDE_PATH}
              data-lead-placement="sss-cta"
              className="inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold bg-gold-500 text-black hover:bg-gold-400 transition-colors"
            >
              Ücretsiz rehberi indir
            </Link>
            <a
              href={whatsappHref("Merhaba, SSS sayfanızı inceledim. Kliniğim için kısa analiz istiyorum.")}
              target="_blank"
              rel="noopener noreferrer"
              data-lead-placement="sss-cta"
              className="inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-4 text-base font-medium border border-[#25D366]/50 hover:bg-[#25D366]/10 text-white/85 transition-colors"
            >
              <WhatsAppIcon size={18} className="text-[#25D366]" />
              WhatsApp'tan sor
            </a>
          </div>
        </section>
      </div>
    </article>
  )
}
