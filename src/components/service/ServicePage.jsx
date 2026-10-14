import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import useCanonicalUrl from "@/hooks/useCanonicalUrl"
import useReleaseStaticBody from "@/hooks/useReleaseStaticBody"
import WhatsAppIcon from "@/components/ui/WhatsAppIcon"
import { GUIDE_PATH, whatsappHref, whatsappMessageFor } from "@/utils/leads"
import { SERVICES, serviceJsonLd, serviceFaqJsonLd } from "@/data/services"

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

function Html({ html, as: Tag = "span", className }) {
  return <Tag className={className} dangerouslySetInnerHTML={{ __html: html }} />
}

function renderSection(section, index, path) {
  switch (section.type) {
    case "heading2":
      return (
        <h2 key={index} className="text-2xl md:text-3xl font-display font-semibold text-white pt-8">
          {section.content}
        </h2>
      )
    case "paragraph":
      return <Html key={index} as="p" html={section.content} className="text-sm md:text-base text-white/65 leading-relaxed" />
    case "callout":
      return (
        <div key={index} className="relative rounded-2xl border-l-4 border-gold-500 bg-gold-500/[0.03] p-5 md:p-6">
          <Html as="p" html={section.content} className="text-sm text-white/65 leading-relaxed" />
        </div>
      )
    case "bulletList":
      return (
        <ul key={index} className="space-y-2 text-sm md:text-base text-white/65 leading-relaxed list-disc pl-5 marker:text-gold-500/80">
          {section.items.map((item, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </ul>
      )
    case "section":
      return (
        <div key={index} className="space-y-5">
          <Html as="p" html={section.content} className="text-sm md:text-base text-white/65 leading-relaxed" />
          <div className="grid sm:grid-cols-2 gap-4">
            {section.subsections.map((sub, i) => (
              <div key={i} className="reveal-3d rounded-2xl border border-white/8 bg-white/[0.02] p-5">
                <h3 className="font-display font-semibold text-lg text-white mb-2">{sub.heading}</h3>
                <Html as="p" html={sub.content} className="text-sm text-white/60 leading-relaxed" />
              </div>
            ))}
          </div>
        </div>
      )
    case "comparisonTable":
      return (
        <div key={index} className="space-y-4 pt-8">
          <h2 className="text-2xl md:text-3xl font-display font-semibold text-white">{section.title}</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm md:text-base text-white/65 leading-relaxed border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  {section.headers.map((h, i) => (
                    <th key={i} className="text-left py-3 px-4 font-display font-semibold text-white/80 first:pl-0 last:pr-0">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {section.rows.map((row, ri) => (
                  <tr key={ri} className="border-b border-white/5">
                    {row.map((cell, ci) => (
                      <td key={ci} className={`py-3 px-4 ${ci === 0 ? "font-medium text-white/80" : ""} first:pl-0 last:pr-0`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )
    case "faq":
      return (
        <div key={index} className="space-y-4 pt-8">
          <h2 className="text-2xl md:text-3xl font-display font-semibold text-white">{section.title}</h2>
          {section.items.map((item, i) => (
            <details key={i} className="group rounded-2xl border border-white/8 bg-white/[0.02] p-5 open:border-gold-500/30" open={i === 0}>
              <summary className="cursor-pointer list-none flex items-start justify-between gap-4 font-medium text-white">
                {item.q}
                <span className="text-gold-400 transition-transform duration-200 group-open:rotate-45" aria-hidden="true">+</span>
              </summary>
              <Html as="p" html={item.a} className="mt-3 text-sm text-white/65 leading-relaxed" />
            </details>
          ))}
        </div>
      )
    case "finalCta":
      return (
        <section key={index} data-lead-zone="service-cta" className="relative overflow-hidden rounded-3xl border border-gold-500/25 bg-white/[0.03] p-7 md:p-10">
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-gold-500/10 blur-[70px] pointer-events-none" />
          <h2 className="relative text-lg md:text-2xl font-display font-semibold text-white">{section.question}</h2>
          <p className="relative mt-3 text-sm md:text-base text-white/60 leading-relaxed max-w-xl">{section.ctaText}</p>
          <div className="relative mt-6 flex flex-col sm:flex-row gap-3">
            <Link
              to={GUIDE_PATH}
              data-lead-placement="service-cta"
              className="inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold bg-gold-500 text-black hover:bg-gold-400 transition-colors"
            >
              Ücretsiz rehberi indir
            </Link>
            <a
              href={whatsappHref(whatsappMessageFor(path))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-4 text-base font-medium border border-[#25D366]/50 hover:bg-[#25D366]/10 text-white/85 transition-colors"
            >
              <WhatsAppIcon size={18} className="text-[#25D366]" />
              Kısa analiz iste
            </a>
          </div>
        </section>
      )
    default:
      return null
  }
}

export default function ServicePage({ slug }) {
  const service = SERVICES[slug]
  useReleaseStaticBody()
  const canonicalUrl = useCanonicalUrl()
  const navigate = useNavigate()

  useEffect(() => {
    const prevTitle = document.title
    document.title = service.title
    upsertMeta("name", "description", service.metaDescription)
    upsertMeta("property", "og:title", service.title)
    upsertMeta("property", "og:description", service.metaDescription)
    upsertMeta("property", "og:url", canonicalUrl)
    upsertMeta("name", "twitter:title", service.title)
    upsertMeta("name", "twitter:description", service.metaDescription)
    upsertCanonical(canonicalUrl)
    return () => { document.title = prevTitle }
  }, [service, canonicalUrl])

  const faqLd = serviceFaqJsonLd(service)

  return (
    <article className="px-6 md:px-12 pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd(service, canonicalUrl)) }} />
      {faqLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />}

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
            <span className="text-gold-400/90 font-semibold">Hasta Kazanım Paketi</span>
            <span className="text-white/55">•</span>
            <span className="text-white/60">{service.breadcrumb}</span>
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-display font-bold tracking-tight leading-tight first-letter:uppercase">
            {service.shortTitle}
          </h1>
          <p className="mt-5 text-sm md:text-base text-white/60 leading-relaxed">{service.description}</p>
          <div className="mt-8 gold-line opacity-20" />
        </div>

        <div className="space-y-8 text-white/70 leading-relaxed">
          {service.sections.map((section, index) => renderSection(section, index, service.path))}
        </div>

        <div className="mt-16 pt-8 border-t border-white/10">
          <p className="text-xs text-white/40 uppercase tracking-widest mb-3">Okumaya Devam Edin</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {service.related.map(([href, label]) => (
              <Link key={href} to={href} className="text-sm text-gold-400 hover:text-gold-300 transition-colors">
                {label} →
              </Link>
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}
