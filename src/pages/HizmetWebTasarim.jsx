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
  title: "Profesyonel Web Tasarım Hizmeti ve Fiyatları | SenninWeb",
  shortTitle: "Web Tasarım Hizmeti",
  metaDescription: "Mobil uyumlu, hızlı açılan ve SEO altyapılı kurumsal web siteniz 2-4 haftada yayında. Size özel tasarım, şeffaf fiyat. Hemen ücretsiz teklif alın.",
  description: "Web tasarım, web sitelerinin kullanıcı arayüzü, görsel estetik ve teknik performans bileşenlerinin planlanarak geliştirilmesidir. Mobil cihazlarla uyumluluk, hızlı yüklenme süreleri ve arama motoru görünürlüğü modern web tasarımının temel gereklilikleridir. Kurumsal web siteleri, marka kimliğini dijital ortamda temsil eden önemli bir iletişim aracıdır.",
  sections: [
    {
      type: "heroSection",
      title: "Modern ve Etkileyici Web Tasarımı ile Dijital Varlığınızı Güçlendirin",
      subtitle: "Premium web tasarım, 3D animasyonlar ve dönüşüm optimizasyonu ile rakiplerinizin önüne geçin"
    },
    {
      type: "paragraph",
      "isHtml": true,
      content: "Web Tasarım hizmeti, işletmenizin dijital dünyadaki kimliğini profesyonel, mobil uyumlu ve hızlı yüklenen web siteleri ile güçlendirmesidir. SenninWeb olarak markanızın hedef kitlesinde güven ve etki yaratacak özel tasarımlar geliştiriyor, dönüşüm odaklı çözümler sunuyoruz."
    },
    {
      type: "paragraph",
      "isHtml": true,
      "content": "Her web sitesi, işletmenizin benzersiz ihtiyaçlarına göre özel olarak tasarlanır. Hazır şablonlar kullanmıyor, her pikseli sizin markanız için özenle yerleştiriyoruz. Mobil öncelikli yaklaşımımız sayesinde siteniz tüm cihazlarda kusursuz görüntülenir."
    },
    {
      type: "comparisonTable",
      title: "Özel Tasarım vs Hazır Tema — Hangisi Sizin İçin Doğru?",
      headers: ["Kriter", "Özel Tasarım (SenninWeb)", "Hazır Tema (WordPress vb.)"],
      rows: [
        ["Özgünlük", "%100 size özel, benzersiz tasarım", "Binlerce sitede aynı tasarım"],
        ["Performans", "Hafif kod, optimize edilmiş hız", "Şişirilmiş kod, yavaş açılış"],
        ["Güvenlik", "Sıfırdan yazılmış, güvenli altyapı", "Eklenti bağımlı, güvenlik açıkları"],
        ["SEO Altyapısı", "Semantic HTML, schema markup hazır", "Eklenti gerektirir, ek maliyet"],
        ["Mobil Uyum", "Mobil öncelikli, test edilmiş", "Temaya bağlı, değişken kalite"],
        ["Özelleştirme", "Sınırsız — her şey mümkün", "Tema/eklenti sınırlamaları"]
      ]
    },
    {
      type: "statBlock",
      stat: "%75",
      label: "Kullanıcıların %75'i web sitesinin kredibilitesini tasarımına göre değerlendiriyor.",
      source: "Stanford Web Credibility Research, 2025"
    },
    {
      type: "statBlock",
      stat: "0.05s",
      label: "Ziyaretçiler ilk izlenimi 0.05 saniyede oluşturuyor. Profesyonel tasarım güven verir.",
      source: "Google Web Fundamentals, 2025"
    },
    {
      type: "heading2",
      content: "Web Tasarım Hizmetimiz Neleri Kapsar?"
    },
    {
      type: "section",
      content: "Size özel geliştirdiğimiz web tasarım çözümlerimizle dijitalde fark yaratın.",
      subsections: [
        {
          heading: "Özel Tasarım & Kurumsal Kimlik Entegrasyonu",
          content: "Markanızın renkleri, fontları ve görsel diliyle tam uyumlu, özel olarak tasarlanmış web siteleri. Logo, kartvizit ve diğer kurumsal kimlik öğelerinizle tutarlı bir dijital deneyim sunuyoruz."
        },
        {
          heading: "Mobil Öncelikli & Duyarlı Tasarım",
          content: "Ziyaretçilerinizin %70'ten fazlası mobil cihazlardan geliyor. Tüm web sitelerimizi önce mobil için tasarlıyor, ardından tablet ve masaüstüne genişletiyoruz. Her ekranda kusursuz görüntü."
        },
        {
          heading: "3D Animasyonlar & İnteraktif Efektler",
          content: "Sıradan web sitelerinin ötesine geçin. Three.js, GSAP ve Framer Motion ile hazırlanmış özel 3D animasyonlar ve scroll efektleriyle ziyaretçilerinizi etkileyin."
        },
        {
          heading: "Hız & Performans Optimizasyonu",
          content: "Google Core Web Vitals uyumlu, 90+ PageSpeed puanı hedefleyen optimizasyonlar. Lazy loading, resim sıkıştırma, code splitting ve CDN ile anlık yükleme deneyimi."
        },
        {
          heading: "SEO Altyapısı & Schema İşaretleme",
          content: "Web siteniz yayına alınırken SEO temelleri hazır olsun. Semantic HTML, schema.org JSON-LD işaretlemesi, meta etiket optimizasyonu ve yapılandırılmış verilerle Google'da öne çıkın."
        }
      ]
    },
    {
      type: "heading2",
      content: "Neden Profesyonel Web Tasarım?"
    },
    {
      type: "bulletList",
      "isHtml": true,
      items: [
        "İlk izlenim 0.05 saniyede oluşur — profesyonel tasarım güven verir",
        "Google mobil uyumlu siteleri ödüllendirir, sıralamada yükseltir",
        "Hızlı yüklenen siteler dönüşüm oranını %20'ye kadar artırır",
        "Özel tasarım marka bilinirliğini ve akılda kalıcılığı güçlendirir",
        "SEO dostu altyapı, uzun vadede organik trafik getirir"
      ]
    },
    {
      type: "heading2",
      content: "Hizmet Verdiğimiz Şehirlerde Web Tasarım"
    },
    {
      type: "paragraph",
      "isHtml": true,
      content: "Web tasarım hizmetimizi Türkiye'nin her şehrindeki işletmelere sunuyoruz. Özellikle <a href=\"/bilecik\" class=\"text-gold-400 hover:text-gold-300 underline transition-colors\">Bilecik web tasarım</a> ve Gebze dahil tüm <a href=\"/kocaeli\" class=\"text-gold-400 hover:text-gold-300 underline transition-colors\">Kocaeli web tasarım</a> hizmetlerimizle yerel işletmelerin dijital dönüşümüne liderlik ediyoruz."
    },
    {
      type: "paragraph",
      "isHtml": true,
      "content": "Her şehirdeki işletmelerin ihtiyaçları farklıdır. Yerel dinamiklere hakim ekibimizle, işletmenizin bulunduğu bölgeye özel stratejiler geliştiriyor, rekabet avantajı elde etmenizi sağlıyoruz."
    },
    {
      type: "paragraph",
      "isHtml": true,
      "content": "İlk adım çok basit: <strong>Ücretsiz teklifinizi alın</strong>, mevcut web sitenizi analiz edelim ve ihtiyaçlarınıza göre bir yol haritası çıkaralım. Gerisini biz hallederiz."
    },
    {
      type: "caseStudy",
      title: "Örnek Projeler",
      items: [
        {
          client: "Miss Butik Pasta",
          domain: "missbutikpasta.com",
          category: "Butik Pasta · Gebze",
          description: "Gebze bölgesinde siparişe özel tasarımlı pasta üreten butik pastacı için modern, mobil uyumlu ve görsel odaklı bir web sitesi geliştirildi. Sıfırdan tasarlanan site, markanın dijital vitrini olarak hizmet vermektedir.",
          features: ["Özel gün pastaları tasarımı", "Siparişe özel kişiselleştirme", "Modern dijital vitrin", "Mobil uyumlu arayüz"],
          url: "https://missbutikpasta.com"
        },
        {
          client: "Utsuri AI",
          domain: "utsuriai.com",
          category: "AI SaaS · Moda Teknolojisi",
          description: "Moda markaları için yapay zeka destekli model fotoğrafı üretim platformu. Gerçek fotoğraf çekimi olmadan, dakikalar içinde profesyonel ürün görselleri üreten SaaS ürünü için kapsamlı bir web sitesi tasarlandı.",
          features: ["AI destekli model fotoğrafı üretimi", "Çoklu şablon & stil sistemi", "Türkçe arayüz & yerel destek", "SaaS abonelik altyapısı"],
          url: "https://www.utsuriai.com"
        }
      ]
    },
    {
      type: "finalCta",
      question: "Web siteniz sizi yansıtıyor mu?",
      ctaText: "Hemen ücretsiz teklif alın, işletmenize özel web tasarımına bugün başlayalım."
    }
  ]
}

export default function HizmetWebTasarim() {
  const navigate = useNavigate()
  const canonicalUrl = useCanonicalUrl()

  const today = new Date().toISOString().split('T')[0]

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Web Tasarım Hizmeti - SenninWeb",
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
      "Web Tasarım",
      "Kurumsal Web Sitesi",
      "Mobil Uyumlu Tasarım",
      "E-Ticaret Tasarımı"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Web Tasarım Hizmetleri",
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
            "name": "Landing Page"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Blog & İçerik Sitesi"
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
            <span className="text-white/60">Web Tasarım</span>
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
              case "statBlock":
                return (
                  <div key={index} className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
                    <span className="text-4xl md:text-5xl font-display font-bold text-gold-400 flex-shrink-0 leading-none">{section.stat}</span>
                    <div>
                      <p className="text-sm md:text-base text-white/65 leading-relaxed">{section.label}</p>
                      {section.source && (
                        <p className="text-xs text-white/40 mt-1">— Kaynak: {section.source}</p>
                      )}
                    </div>
                  </div>
                )
              case "callout":
                return (
                  <div key={index} className="relative rounded-2xl border-l-4 border-gold-500 bg-gold-500/[0.03] p-5 md:p-6">
                    <p className="text-sm md:text-base text-white/70 leading-relaxed italic">
                      <span dangerouslySetInnerHTML={{ __html: section.content }} />
                    </p>
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
              case "caseStudy":
                return (
                  <div key={index} className="space-y-6">
                    <h2 className="text-2xl md:text-3xl font-display font-semibold text-white pt-8">
                      {section.title}
                    </h2>
                    {section.items.map((item, i) => (
                      <div key={i} className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
                        <div className="flex items-center gap-3 mb-4">
                          <div>
                            <h3 className="font-display font-bold text-xl text-white">
                              {item.client}
                            </h3>
                            <p className="text-xs text-white/50">{item.domain} · {item.category}</p>
                          </div>
                        </div>
                        <p className="text-sm md:text-base text-white/65 leading-relaxed mb-5">
                          {item.description}
                        </p>
                        <div className="space-y-2 mb-5">
                          {item.features.map((feat, fi) => (
                            <div key={fi} className="flex items-center gap-2.5">
                              <span className="w-1 h-1 rounded-full bg-gold-500/60 flex-shrink-0" />
                              <span className="text-sm text-white/60">{feat}</span>
                            </div>
                          ))}
                        </div>
                        {item.url && (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm text-gold-400 hover:text-gold-300 transition-colors"
                          >
                            Siteyi Ziyaret Et →
                          </a>
                        )}
                      </div>
                    ))}
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
            <Link to="/blog/web-sitesi-tasarim-fiyatlari-2026" className="text-sm text-gold-400 hover:text-gold-300 transition-colors">
              2026 web tasarım fiyatları →
            </Link>
            <Link to="/hizmet/seo-ve-buyume" className="text-sm text-gold-400 hover:text-gold-300 transition-colors">
              SEO & Büyüme hizmetimiz →
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
