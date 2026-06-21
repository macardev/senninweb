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

const bilecikContent = {
  title: "Bilecik Web Tasarım & SEO | SenninWeb",
  shortTitle: "Bilecik Web Tasarım & SEO",
  metaDescription: "Bilecik'te işletmeniz Google'da görünmüyor mu? Yerel SEO ve profesyonel web tasarımıyla rakiplerinizi geçin, müşteriler size gelsin.",
  description: "Bilecik bölgesindeki işletmeler için özel web tasarım, yerel SEO ve dijital pazarlama çözümleri.",
  sections: [
    {
      type: "heroSection",
      title: "Bilecik'te İşletmeniz Büyümeyi Hak Ediyor",
      subtitle: "Premium web tasarım ve yerel SEO ile Bilecik'te Google'da görünün, müşteriler size gelsin"
    },
    {
      type: "paragraph",
      "isHtml": true,
      content: "Bir hayal edin: Bilecik'te işletmeniz Google'da ilk sırada. <strong>\"Bilecik web tasarım\"</strong>, <strong>\"Bozüyük avukat\"</strong> yazan herkes sizi buluyor. Telefonunuz durmadan çalıyor, her arayan yeni bir müşteri. Rakipleriniz size yetişemiyor, çünkü siz dijitalde çoktan zirveye yerleştiniz. Kulağa hoş geliyor değil mi?"
    },
    {
      type: "paragraph",
      "isHtml": true,
      content: "Şimdi bir de şu anki durumu düşünün. Google'da görünmüyorsanız, bu müşteriler fark etmeden rakibinize gidiyor. Oysa aynı potansiyel müşteriler, doğru bir <strong>web tasarımı</strong> ve <strong>yerel SEO stratejisi</strong> ile sizi tercih edebilir. Aradaki tek fark, dijitalde görünür olmak."
    },
    {
      type: "heading2",
      content: "Bilecik'te SenninWeb Farkı"
    },
    {
      type: "paragraph",
      "isHtml": true,
      content: "<strong>Bilecik'i biliyoruz.</strong> Sadece bir ajans değil, Bilecik'in dinamiklerine, rekabetine ve fırsatlarına hâkim bir ekibiz. Bu yüzden işletmeniz için geliştirdiğimiz stratejiler, hazır şablonlar gibi değil, size özel ve yerel."
    },
    {
      type: "paragraph",
      "isHtml": true,
      "content": "<strong>Hızlı başlıyoruz.</strong> Ortalama 2-4 haftada markanıza özel, mobil uyumlu ve SEO hazır web sitenizi yayına alıyoruz. Beklemek zorunda değilsiniz."
    },
    {
      type: "paragraph",
      "isHtml": true,
      "content": "<strong>Sonuç odaklıyız.</strong> Bilecik'teki işletmeler için geliştirdiğimiz stratejilerle Google görünürlüğünü ve müşteri sayısını artırıyoruz. Söz vermiyor, kanıtlıyoruz."
    },
    {
      type: "heading2",
      content: "Size Nasıl Yardımcı Olabiliriz?"
    },
    {
      type: "section",
      content: "Her işletmenin hikayesi farklıdır. Sizin ihtiyacınıza göre şekillenen çözümlerimizle dijitalde büyümenizi sağlıyoruz.",
      subsections: [
        {
          heading: "Kurumsal Web Sitesi ile Güven Kazanın",
          content: "Potansiyel müşterileriniz sitenize girdiği an profesyonel bir markayla karşılaştığını hissetsin. Bilecik merkez ve ilçelerinde faaliyet gösteren işletmenizi en iyi yansıtan, hızlı ve mobil uyumlu web siteleri tasarlıyoruz."
        },
        {
          heading: "Yerel SEO ile Google'da Zirveye Çıkın",
          content: "Bilecik özelinde anahtar kelime analizi, Google İşletme Profili optimizasyonu, teknik SEO ve içerik stratejisi. Bilecik, Bozüyük, Osmaneli, Söğüt ve Gölpazarı'nda Google'da üst sıralarda yer almanız için ihtiyacınız olan her şey."
        },
        {
          heading: "E-Ticaret ile Satışlarınızı Katlayın",
          content: "Bilecik merkezli e-ticaret işletmeniz için satış odaklı, ödeme entegrasyonlu ve SEO altyapılı online mağazanızı kuralım. 7/24 satış yapmaya hazır olun."
        }
      ]
    },
    {
      type: "heading2",
      content: "Tüm Hizmetlerimizi Keşfedin"
    },
    {
      type: "paragraph",
      "isHtml": true,
      content: "Bilecik'te işletmeniz için sunduğumuz tüm dijital çözümleri detaylı olarak inceleyin. Size özel <a href=\"/hizmet/web-tasarim\" class=\"text-gold-400 hover:text-gold-300 underline transition-colors\">web tasarım</a>, <a href=\"/hizmet/seo-ve-buyume\" class=\"text-gold-400 hover:text-gold-300 underline transition-colors\">SEO & büyüme</a>, <a href=\"/hizmet/eticaret-cozumleri\" class=\"text-gold-400 hover:text-gold-300 underline transition-colors\">e-ticaret çözümleri</a> ve <a href=\"/hizmet/dijital-pazarlama\" class=\"text-gold-400 hover:text-gold-300 underline transition-colors\">dijital pazarlama</a> hizmetlerimizle işletmenizi dijitalde büyütün."
    },
    {
      type: "paragraph",
      "isHtml": true,
      content: "İlk adım çok basit: <strong>Ücretsiz teklifinizi alın</strong>, web sitenizi ve Google görünürlüğünüzü analiz edelim. Gerisini biz hallederiz."
    },
    {
      type: "finalCta",
      question: "Bilecik'te rakipleriniz beklemiyor. Siz neden bekleyesiniz?",
      ctaText: "Hemen ücretsiz teklif alın, işletmenizi dijitalde büyütmeye bugün başlayın."
    }
  ]
}

export default function Bilecik() {
  const navigate = useNavigate()
  const canonicalUrl = useCanonicalUrl()

  const today = new Date().toISOString().split('T')[0]

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Bilecik Web Tasarım ve SEO Hizmetleri",
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
      {
        "@type": "City",
        "name": "Bilecik"
      },
      {
        "@type": "City",
        "name": "Bozüyük"
      },
      {
        "@type": "City",
        "name": "Osmaneli"
      },
      {
        "@type": "City",
        "name": "Söğüt"
      },
      {
        "@type": "City",
        "name": "Gölpazarı"
      }
    ],
    "serviceType": [
      "Web Tasarım",
      "SEO Hizmeti",
      "E-Ticaret Çözümleri",
      "Dijital Pazarlama"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Bilecik Dijital Hizmetler",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Kurumsal Web Sitesi"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "E-Ticaret Sitesi"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Yerel SEO"
          }
        }
      ]
    },
    "description": bilecikContent.metaDescription
  }

  useEffect(() => {
    const prevTitle = document.title
    const prevDesc = document.head.querySelector('meta[name="description"]')?.getAttribute("content") ?? null
    const prevOgTitle = document.head.querySelector('meta[property="og:title"]')?.getAttribute("content") ?? null
    const prevOgDesc = document.head.querySelector('meta[property="og:description"]')?.getAttribute("content") ?? null
    const prevCanonical = document.head.querySelector('link[rel="canonical"]')?.getAttribute("href") ?? null

    document.title = bilecikContent.title
    upsertMetaByName("description", bilecikContent.metaDescription)
    upsertMetaByName("robots", "index, follow")
    upsertMetaByProperty("og:title", bilecikContent.title)
    upsertMetaByProperty("og:description", bilecikContent.metaDescription)
    upsertMetaByProperty("og:type", "website")
    upsertMetaByProperty("og:url", canonicalUrl)
    upsertMetaByProperty("og:image", "https://www.senninweb.com/og-image.svg")
    upsertMetaByProperty("og:image:width", "1200")
    upsertMetaByProperty("og:image:height", "630")

    upsertMetaByName("twitter:card", "summary_large_image")
    upsertMetaByName("twitter:title", bilecikContent.title)
    upsertMetaByName("twitter:description", bilecikContent.metaDescription)

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
            <span className="text-gold-400/90 font-semibold">Bilecik</span>
            <span className="text-white/55">•</span>
            <span className="text-white/60">Yerel SEO</span>
            <span className="text-white/55">•</span>
            <span className="text-white/60">Web Tasarım</span>
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-display font-bold tracking-tight leading-tight">
            {bilecikContent.shortTitle}
          </h1>
          <p className="mt-5 text-sm md:text-base text-white/60 leading-relaxed">
            {bilecikContent.description}
          </p>

          <div className="mt-8 gold-line opacity-20" />
          <p className="mt-4 text-xs text-white/40">Son güncelleme: {today}</p>
        </div>

        <div className="space-y-10 text-white/70 leading-relaxed">
          {bilecikContent.sections.map((section, index) => {
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
              case "heading3":
                return (
                  <h3 key={index} className="text-xl md:text-2xl font-display font-semibold text-white">
                    {section.isHtml ? (
                      <span dangerouslySetInnerHTML={{ __html: section.content }} />
                    ) : (
                      section.content
                    )}
                  </h3>
                )
              case "paragraph":
                return (
                  <p key={index} className="text-sm md:text-base text-white/65 leading-relaxed">
                    {section.isHtml ? (
                      <span dangerouslySetInnerHTML={{ __html: section.content }} />
                    ) : (
                      section.content
                    )}
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
            <Link to="/blog/kucuk-isletme-web-sitesi" className="text-sm text-gold-400 hover:text-gold-300 transition-colors">
              Küçük işletmeler için web sitesi rehberi →
            </Link>
            <Link to="/blog/kucuk-isletmeler-google-da-gorunurluk-2026" className="text-sm text-gold-400 hover:text-gold-300 transition-colors">
              Google'da görünürlük rehberi →
            </Link>
            <Link to="/blog/web-sitesi-tasarim-fiyatlari-2026" className="text-sm text-gold-400 hover:text-gold-300 transition-colors">
              2026 web tasarım fiyatları →
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
