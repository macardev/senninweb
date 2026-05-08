import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { scrollToIdWithRetry } from "@/utils/scrollToId"

function upsertMetaByName(name, content) {
  let el = document.head.querySelector(`meta[name="${name}"]`)
  if (!el) {
    el = document.createElement("meta")
    el.setAttribute("name", name)
    document.head.appendChild(el)
  }
  el.setAttribute("content", content)
  return el
}

function upsertMetaByProperty(property, content) {
  let el = document.head.querySelector(`meta[property="${property}"]`)
  if (!el) {
    el = document.createElement("meta")
    el.setAttribute("property", property)
    document.head.appendChild(el)
  }
  el.setAttribute("content", content)
  return el
}

const gebzeContent = {
  title: "Gebze Web Tasarım ve SEO Hizmetleri | SenninWeb",
  shortTitle: "Gebze Web Tasarım & SEO",
  metaDescription: "Gebze'de profesyonel web tasarım, SEO ve dijital pazarlama hizmetleri. Yerel işletmeniz için Google'da üst sıralarda yer alın.",
  description: "Gebze bölgesindeki işletmeler için özel olarak tasarlanmış web tasarım ve SEO çözümleri.",
  sections: [
    {
      type: "heroSection",
      title: "Gebze'de Web Tasarım ve SEO Hizmetleri",
      subtitle: "Yerel işletmenizi dijitalde büyütün"
    },
    {
      type: "paragraph",
      content: "Gebze, Kocaeli'nin hızla gelişen bir ilçesi olarak dijital rekabetin her geçen gün arttığı bir bölge. İşletmenizin bu rekabette öne çıkması için <strong>yerel SEO</strong> ve <strong>premium web tasarım</strong> hizmetlerimizle yanınızdayız."
    },
    {
      type: "heading2",
      content: "Neden Gebze İçin Yerel SEO Önemli?"
    },
    {
      type: "paragraph",
      content: "Google'da <strong>\"Gebze web tasarım\"</strong>, <strong>\"Gebze SEO\"</strong> gibi aramalarda üst sıralarda yer almak, bölgedeki potansiyel müşterilere ulaşmanın en etkili yoludur."
    },
    {
      type: "bulletList",
      items: [
        "Gebze yerel aramalarında ilk sayfada yer alma",
        "Google Maps (Google Haritalar) üzerinde görünürlük",
        "Bölgeye özel anahtar kelime optimizasyonu",
        "Gebze'deki hedef kitlenize direkt erişim",
        "Yerel rakiplerin önüne geçin"
      ]
    },
    {
      type: "heading2",
      content: "Gebze'ye Özel Web Tasarım Çözümlerimiz"
    },
    {
      type: "section",
      content: "Gebze bölgesindeki işletmelerin ihtiyaçlarına uygun, dönüşüm odaklı web siteleri tasarlıyoruz.",
      subsections: [
        {
          heading: "Kurumsal Web Siteleri",
          content: "Gebze'deki kurumsal firmalar için profesyonel, hızlı ve SEO uyumlu web siteleri geliştiriyoruz."
        },
        {
          heading: "E-Ticaret Çözümleri",
          content: "Gebze merkezli e-ticaret işletmeleri için satış odaklı online mağazalar kuruyoruz."
        },
        {
          heading: "Yerel SEO Hizmeti",
          content: "Gebze özelinde anahtar kelime analizi, içerik optimizasyonu ve teknik SEO çalışmaları yapıyoruz."
        }
      ]
    },
    {
      type: "finalCta",
      question: "Gebze'deki işletmeniz için profesyonel bir web sitesi ve SEO hizmeti mi arıyorsunuz?",
      ctaText: "Hemen iletişime geçin, Gebze'de dijitalde büyüyün."
    }
  ]
}

export default function Gebze() {
  const navigate = useNavigate()

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Gebze Web Tasarım ve SEO Hizmetleri",
    "provider": {
      "@type": "Organization",
      "name": "SenninWeb",
    },
    "areaServed": {
      "@type": "City",
      "name": "Gebze"
    },
    "description": gebzeContent.metaDescription
  }

  useEffect(() => {
    const prevTitle = document.title
    const prevDesc = document.head.querySelector('meta[name="description"]')?.getAttribute("content") ?? null
    const prevOgTitle = document.head.querySelector('meta[property="og:title"]')?.getAttribute("content") ?? null
    const prevOgDesc = document.head.querySelector('meta[property="og:description"]')?.getAttribute("content") ?? null

    document.title = gebzeContent.title
    upsertMetaByName("description", gebzeContent.metaDescription)
    upsertMetaByName("robots", "index, follow")
    upsertMetaByProperty("og:title", gebzeContent.title)
    upsertMetaByProperty("og:description", gebzeContent.metaDescription)
    upsertMetaByProperty("og:type", "website")
    upsertMetaByProperty("og:url", typeof window !== "undefined" ? window.location.href : "")

    return () => {
      document.title = prevTitle
      if (prevDesc !== null) upsertMetaByName("description", prevDesc)
      if (prevOgTitle !== null) upsertMetaByProperty("og:title", prevOgTitle)
      if (prevOgDesc !== null) upsertMetaByProperty("og:description", prevOgDesc)
    }
  }, [])

  return (
    <article className="px-6 md:px-12 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-3xl mx-auto">
        <div className="pt-6 pb-10">
          <button
            type="button"
            data-cursor
            onClick={() => {
              navigate("/")
              setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 0)
            }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03]
                       px-4 py-2 text-xs text-white/70 hover:text-white hover:border-white/20 transition-colors"
          >
            <span className="text-base leading-none">←</span>
            Ana Sayfaya Dön
          </button>

          <div className="mt-6 flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase">
            <span className="text-gold-400/90 font-semibold">Gebze</span>
            <span className="text-white/55">•</span>
            <span className="text-white/60">Yerel SEO</span>
            <span className="text-white/55">•</span>
            <span className="text-white/60">Web Tasarım</span>
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-display font-bold tracking-tight leading-tight">
            {gebzeContent.shortTitle}
          </h1>
          <p className="mt-5 text-sm md:text-base text-white/60 leading-relaxed">
            {gebzeContent.description}
          </p>

          <div className="mt-8 gold-line opacity-20" />
        </div>

        <div className="space-y-10 text-white/70 leading-relaxed">
          {gebzeContent.sections.map((section, index) => {
            switch (section.type) {
              case "heroSection":
                return (
                  <div key={index} className="space-y-4">
                    <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight leading-tight">
                      {section.title}
                    </h2>
                    <h3 className="text-xl md:text-2xl font-display font-semibold text-white/80">
                      {section.subtitle}
                    </h3>
                  </div>
                )
              case "heading2":
                return (
                  <h2 key={index} className="text-2xl md:text-3xl font-display font-semibold text-white pt-8">
                    {section.content}
                  </h2>
                )
              case "paragraph":
                return (
                  <p key={index} className="text-sm md:text-base text-white/65 leading-relaxed">
                    <span dangerouslySetInnerHTML={{ __html: section.content }} />
                  </p>
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
                    <p className="text-sm md:text-base text-white/65 leading-relaxed">
                      <span dangerouslySetInnerHTML={{ __html: section.content }} />
                    </p>
                    <div className="space-y-8">
                      {section.subsections?.map((sub, i) => (
                        <div key={i} className="space-y-3">
                          <h3 className="text-xl md:text-2xl font-display font-semibold text-white">
                            {sub.heading}
                          </h3>
                          <p className="text-sm md:text-base text-white/65 leading-relaxed">
                            <span dangerouslySetInnerHTML={{ __html: sub.content }} />
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              case "finalCta":
                return (
                  <section key={index} className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 md:p-10">
                    <div className="absolute -top-24 -right-24 w-72 h-72 bg-gold-500/10 blur-[70px] pointer-events-none" />
                    <h2 className="relative text-lg md:text-2xl font-display font-semibold text-white">
                      {section.question}
                    </h2>
                    <p className="relative mt-3 text-sm md:text-base text-white/60 leading-relaxed max-w-xl">
                      {section.ctaText}
                    </p>
                    <div className="relative mt-6">
                      <Link
                        to="/#contact"
                        data-cursor
                        onClick={(e) => {
                          e.preventDefault()
                          navigate("/")
                          setTimeout(() => scrollToIdWithRetry("contact"), 0)
                        }}
                        className="inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-medium tracking-wide
                                   bg-gold-500 text-black hover:bg-gold-400 transition-colors"
                      >
                        Ücretsiz Teklif Al
                      </Link>
                    </div>
                  </section>
                )
              default:
                return null
            }
          })}
        </div>
      </div>
    </article>
  )
}
