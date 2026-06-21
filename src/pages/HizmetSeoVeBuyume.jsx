import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { scrollToIdWithRetry } from "@/utils/scrollToId"
import useCanonicalUrl from "@/hooks/useCanonicalUrl"

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

function upsertLinkByRel(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement("link")
    el.setAttribute("rel", rel)
    document.head.appendChild(el)
  }
  el.setAttribute("href", href)
  return el
}

const content = {
  title: "SEO & Büyüme Hizmeti | SenninWeb - Arama Motoru Optimizasyonu",
  shortTitle: "SEO & Büyüme Hizmeti",
  metaDescription: "Profesyonel SEO hizmeti: yerel SEO, teknik SEO, AEO/GEO optimizasyonu ve anahtar kelime stratejisi. Google'da üst sıralara çıkın, organik trafiğinizi katlayın.",
  description: "Arama motorlarında üst sıralara çıkmanız için kapsamlı SEO stratejileri, yerel optimizasyon ve yapay zeka arama motorlarına uyumlu içerik çözümleri sunuyoruz.",
  sections: [
    {
      type: "heroSection",
      title: "Google'da Üst Sıralara Çıkın, Büyümenizi Katlayın",
      subtitle: "Yerel SEO, teknik SEO ve AEO/GEO stratejileriyle rakiplerinizin önüne geçin"
    },
    {
      type: "paragraph",
      "isHtml": true,
      content: "SEO ve Büyüme hizmeti, işletmelerin Google ve yapay zeka destekli arama motorlarında (ChatGPT, Perplexity, Gemini) bilgi ve güven kaynağı olarak kullanıcıya gösterilmesidir. SenninWeb ile arama sonuçlarında üst sıralara çıkarak görünürlük kazanın."
    },
    {
      type: "paragraph",
      "isHtml": true,
      "content": "Geleneksel SEO'nun ötesine geçiyoruz. 2026 yılında yapay zeka destekli arama motorları (ChatGPT, Perplexity, Google AI Overviews, Gemini, Claude) için de içeriklerinizi optimize ediyor, <strong>AEO (Answer Engine Optimization)</strong> ve <strong>GEO (Generative Engine Optimization)</strong> stratejilerimizle AI tabanlı aramalarda da görünür olmanızı sağlıyoruz."
    },
    {
      type: "heading2",
      content: "SEO Hizmetimiz Neleri Kapsar?"
    },
    {
      type: "section",
      content: "İşletmenizin ihtiyaçlarına göre şekillenen kapsamlı SEO çözümlerimizle dijitalde büyüyün.",
      subsections: [
        {
          heading: "Yerel SEO & Google İşletme Profili",
          content: "İşletmenizin bulunduğu bölgede Google'da zirveye çıkın. Google İşletme Profili optimizasyonu, yerel anahtar kelime stratejisi, NAP (Name, Address, Phone) tutarlılığı ve yerel backlink çalışmalarıyla müşterilerin size ulaşmasını sağlıyoruz."
        },
        {
          heading: "Teknik SEO & Site Altyapısı",
          content: "Web sitenizin teknik altyapısını Google standartlarına uygun hale getiriyoruz. Sayfa hızı optimizasyonu, mobil uyumluluk, Core Web Vitals iyileştirmeleri, XML sitemap, robots.txt, schema.org yapılandırılmış veri işaretlemesi ve canonical URL yönetimi."
        },
        {
          heading: "Anahtar Kelime & İçerik Stratejisi",
          content: "Hedef kitlenizin arama alışkanlıklarına göre belirlenmiş anahtar kelimelerle içerik stratejisi oluşturuyoruz. Rekabet analizi, uzun kuyruklu anahtar kelimeler, topic cluster modeli ve düzenli blog içerikleriyle otoritenizi artırın."
        },
        {
          heading: "AEO & GEO — AI Arama Motorları İçin Optimizasyon",
          content: "ChatGPT, Perplexity, Google AI Overviews ve diğer yapay zeka destekli arama motorlarında görünür olmak için içeriklerinizi optimize ediyoruz. Schema.org işaretlemesi, soru-cevap formatlı içerikler, otoriter kaynak gösterimi ve varlık optimizasyonu ile AI sonuçlarında yer alın."
        }
      ]
    },
    {
      type: "heading2",
      content: "SEO Sürecimiz Nasıl İşler?"
    },
    {
      type: "bulletList",
      "isHtml": true,
      items: [
        "<strong>Analiz:</strong> Web sitenizin mevcut durumunu, backlink profilinizi ve rakiplerinizi analiz ediyoruz",
        "<strong>Strateji:</strong> Hedeflerinize göre özelleştirilmiş kapsamlı bir SEO yol haritası çıkarıyoruz",
        "<strong>Uygulama:</strong> Teknik SEO iyileştirmeleri, içerik optimizasyonu ve yerel SEO çalışmalarını hayata geçiriyoruz",
        "<strong>Takip & Raporlama:</strong> Aylık performans raporları, sıralama takibi ve düzenli optimizasyon güncellemeleri"
      ]
    },
    {
      type: "heading2",
      content: "Hizmet Verdiğimiz Şehirlerde SEO"
    },
    {
      type: "paragraph",
      "isHtml": true,
      content: "SEO hizmetimizi Türkiye genelinde sunuyoruz. Özellikle <a href=\"/gebze\" class=\"text-gold-400 hover:text-gold-300 underline transition-colors\">Gebze SEO</a>, <a href=\"/bilecik\" class=\"text-gold-400 hover:text-gold-300 underline transition-colors\">Bilecik SEO</a> ve <a href=\"/kocaeli\" class=\"text-gold-400 hover:text-gold-300 underline transition-colors\">Kocaeli SEO</a> hizmetlerimizle yerel işletmelerin Google'da üst sıralara çıkmasına yardımcı oluyoruz."
    },
    {
      type: "paragraph",
      "isHtml": true,
      "content": "İlk adım çok basit: <strong>Ücretsiz teklifinizi alın</strong>, web sitenizi ve mevcut SEO durumunuzu analiz edelim. Gerisini biz hallederiz."
    },
    {
      type: "finalCta",
      question: "Google'da görünmüyor musunuz?",
      ctaText: "Hemen ücretsiz SEO analizi alın, işletmenizi arama sonuçlarında üst sıralara taşıyalım."
    }
  ]
}

export default function HizmetSeoVeBuyume() {
  const navigate = useNavigate()
  const canonicalUrl = useCanonicalUrl()

  const today = new Date().toISOString().split('T')[0]

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "SEO & Büyüme Hizmeti - SenninWeb",
    "url": canonicalUrl,
    "dateModified": today,
    "provider": {
      "@type": "Organization",
      "name": "SenninWeb",
      "url": "https://www.senninweb.com",
      "telephone": "+90 (531) 405 15 84",
      "email": "business@senninweb.com"
    },
    "areaServed": [
      { "@type": "City", "name": "Gebze" },
      { "@type": "City", "name": "Bilecik" },
      { "@type": "City", "name": "Kocaeli" },
      { "@type": "City", "name": "İstanbul" }
    ],
    "serviceType": [
      "SEO",
      "Yerel SEO",
      "AEO",
      "GEO",
      "Teknik SEO",
      "Anahtar Kelime Araştırması"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "SEO & Büyüme Hizmetleri",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Yerel SEO"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Teknik SEO"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "AEO Optimizasyonu"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "GEO Optimizasyonu"
          }
        }
      ]
    },
    "description": content.metaDescription
  }

  useEffect(() => {
    const prevTitle = document.title
    const prevDesc = document.head.querySelector('meta[name="description"]')?.getAttribute("content") ?? null
    const prevOgTitle = document.head.querySelector('meta[property="og:title"]')?.getAttribute("content") ?? null
    const prevOgDesc = document.head.querySelector('meta[property="og:description"]')?.getAttribute("content") ?? null
    const prevCanonical = document.head.querySelector('link[rel="canonical"]')?.getAttribute("href") ?? null

    document.title = content.title
    upsertMetaByName("description", content.metaDescription)
    upsertMetaByName("robots", "index, follow")
    upsertMetaByProperty("og:title", content.title)
    upsertMetaByProperty("og:description", content.metaDescription)
    upsertMetaByProperty("og:type", "website")
    upsertMetaByProperty("og:url", canonicalUrl)
    upsertMetaByProperty("og:image", "https://www.senninweb.com/og-image.svg")
    upsertMetaByProperty("og:image:width", "1200")
    upsertMetaByProperty("og:image:height", "630")

    upsertMetaByName("twitter:card", "summary_large_image")
    upsertMetaByName("twitter:title", content.title)
    upsertMetaByName("twitter:description", content.metaDescription)

    upsertLinkByRel("canonical", canonicalUrl)

    return () => {
      document.title = prevTitle
      if (prevDesc !== null) upsertMetaByName("description", prevDesc)
      if (prevOgTitle !== null) upsertMetaByProperty("og:title", prevOgTitle)
      if (prevOgDesc !== null) upsertMetaByProperty("og:description", prevOgDesc)
      if (prevCanonical !== null) upsertLinkByRel("canonical", prevCanonical)
    }
  }, [canonicalUrl])

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
            <span className="text-gold-400/90 font-semibold">Hizmet</span>
            <span className="text-white/55">•</span>
            <span className="text-white/60">SEO & Büyüme</span>
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-display font-bold tracking-tight leading-tight">
            {content.shortTitle}
          </h1>
          <p className="mt-5 text-sm md:text-base text-white/60 leading-relaxed">
            {content.description}
          </p>

          <div className="mt-8 gold-line opacity-20" />
          <p className="mt-4 text-xs text-white/40">Son güncelleme: {today}</p>
        </div>

        <div className="space-y-10 text-white/70 leading-relaxed">
          {content.sections.map((section, index) => {
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

        <div className="mt-16 pt-8 border-t border-white/10">
          <p className="text-xs text-white/40 uppercase tracking-widest mb-3">Okumaya Devam Edin</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link to="/blog/kucuk-isletmeler-google-da-gorunurluk-2026" className="text-sm text-gold-400 hover:text-gold-300 transition-colors">
              Google'da görünürlük rehberi →
            </Link>
            <Link to="/blog/web-sitesi-tasarim-fiyatlari-2026" className="text-sm text-gold-400 hover:text-gold-300 transition-colors">
              2026 web tasarım fiyatları →
            </Link>
            <Link to="/hizmet/web-tasarim" className="text-sm text-gold-400 hover:text-gold-300 transition-colors">
              Web Tasarım hizmetimiz →
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
