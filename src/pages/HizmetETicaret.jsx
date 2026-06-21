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
  title: "E-Ticaret Çözümleri | SenninWeb - Online Satış Siteleri",
  shortTitle: "E-Ticaret Çözümleri",
  metaDescription: "Profesyonel e-ticaret sitesi kurulumu: ödeme entegrasyonu, SEO altyapısı, mobil uyumlu online mağaza. İşletmenizi 7/24 satış yapacak şekilde dijital dönüşüme hazırlıyoruz.",
  description: "E-ticaret, ürün ve hizmetlerin çevrimiçi platformlar üzerinden satışa sunulmasıdır. Bir e-ticaret sitesi; ödeme altyapısı, ürün yönetim sistemi, kargo entegrasyonu ve müşteri yönetimi gibi bileşenleri içerir. Güvenli ödeme, mobil uyumluluk ve SEO uyumu başarılı bir e-ticaret platformunun temel gereklilikleridir.",
  sections: [
    {
      type: "heroSection",
      title: "Online Satışlarınızı Katlayacak E-Ticaret Çözümleri",
      subtitle: "Ödeme entegrasyonlu, güvenli ve dönüşüm odaklı e-ticaret siteleri ile 7/24 satış yapın"
    },
    {
      type: "paragraph",
      "isHtml": true,
      "content": "E-Ticaret Çözümleri hizmeti, işletmelerin ürün ve hizmetlerini 7/24 online satışa sunmasını sağlayan dijital mağaza kurulumudur. SenninWeb olarak ödeme entegrasyonlu, güvenli ve SEO uyumlu e-ticaret siteleri ile işletmenizi dijital pazara taşıyoruz."
    },
    {
      type: "paragraph",
      "isHtml": true,
      "content": "Sadece bir mağaza kurmuyoruz — satış yapacak, müşteri kazanacak ve büyüyecek bir dijital platform inşa ediyoruz. Ödeme sistemlerinden kargo entegrasyonuna, ürün yönetiminden SEO'ya kadar her detayı sizin için düşünüyoruz."
    },
    {
      type: "heading2",
      "content": "E-Ticaret Hizmetimiz Neleri Kapsar?"
    },
    {
      type: "section",
      "content": "İşletmenizin büyüklüğüne ve sektörüne uygun e-ticaret çözümleri geliştiriyoruz.",
      subsections: [
        {
          heading: "Kurumsal E-Ticaret Sitesi",
          content: "Markanıza özel tasarlanmış, sınırsız ürün ekleme imkanı sunan, gelişmiş filtreleme ve arama özelliklerine sahip kurumsal e-ticaret platformları. Özel tema ve modüllerle ihtiyaçlarınıza tam uyum."
        },
        {
          heading: "Ödeme & Kargo Entegrasyonları",
          content: "İyzico, PayTR, PayPal gibi popüler ödeme sağlayıcılarıyla tam entegrasyon. Kredi kartı, havale/EFT ve kapıda ödeme seçenekleri. Yurtiçi Kargo, MNG, Aras Kargo gibi firmalarla otomatik gönderi takibi."
        },
        {
          heading: "SEO & Dijital Pazarlama Altyapısı",
          content: "Ürün sayfaları için optimize edilmiş meta etiketler, schema.org Product işaretlemesi, Google Shopping entegrasyonu, hız optimizasyonu ve blog modülü ile e-ticaret SEO'su."
        },
        {
          heading: "Mobil Uyumlu & Hızlı Alışveriş Deneyimi",
          content: "Mobil cihazlarda kusursuz çalışan, hızlı yüklenen ve kolay navigasyon sunan e-ticaret siteleri. Tek tıkla sepete ekle, hızlı ödeme ve misafir alışverişi desteği."
        },
        {
          heading: "Yönetim Paneli & Raporlama",
          content: "Kullanıcı dostu yönetim paneli ile sipariş takibi, stok yönetimi, müşteri yönetimi ve detaylı satış raporları. İşletmenizi tek ekrandan yönetin."
        }
      ]
    },
    {
      type: "heading2",
      "content": "Neden E-Ticaret Sitesine İhtiyacınız Var?"
    },
    {
      type: "bulletList",
      "isHtml": true,
      items: [
        "7/24 satış yapma imkanı ile fiziksel mağazanızın saat sınırlamalarını ortadan kaldırın",
        "Türkiye'nin her yerindeki potansiyel müşterilere ulaşın",
        "İşletme maliyetlerinizi düşürün, kar marjlarınızı artırın",
        "Müşteri verilerini analiz ederek satış stratejilerinizi optimize edin",
        "Rakiplerinizin önüne geçin, markanızı dijitalde büyütün"
      ]
    },
    {
      type: "heading2",
      "content": "Hizmet Verdiğimiz Şehirlerde E-Ticaret"
    },
    {
      type: "paragraph",
      "isHtml": true,
      "content": "E-ticaret çözümlerimizle Türkiye'nin dört bir yanındaki işletmelere ulaşıyoruz. Özellikle <a href=\"/gebze\" class=\"text-gold-400 hover:text-gold-300 underline transition-colors\">Gebze e-ticaret</a>, <a href=\"/bilecik\" class=\"text-gold-400 hover:text-gold-300 underline transition-colors\">Bilecik e-ticaret</a> ve <a href=\"/kocaeli\" class=\"text-gold-400 hover:text-gold-300 underline transition-colors\">Kocaeli e-ticaret</a> hizmetlerimizle yerel işletmeleri dijital pazara taşıyoruz."
    },
    {
      type: "paragraph",
      "isHtml": true,
      "content": "İlk adım çok basit: <strong>Ücretsiz teklifinizi alın</strong>, işletmenizi analiz edelim ve size özel e-ticaret çözümümüzü sunalım. Gerisini biz hallederiz."
    },
    {
      type: "caseStudy",
      title: "Örnek Projeler",
      items: [
        {
          client: "Miss Butik Pasta",
          domain: "missbutikpasta.com",
          category: "Butik Pasta · Gebze",
          description: "Gebze bölgesinde siparişe özel tasarımlı pasta üreten butik pastacı için dijital vitrin ve sipariş altyapısına sahip bir web sitesi geliştirildi. Site, ürünlerin görsel olarak sergilenmesini ve müşterilerin kolayca sipariş vermesini sağlamaktadır.",
          features: ["Özel gün pastaları tasarımı", "Siparişe özel kişiselleştirme", "Modern dijital vitrin", "Mobil uyumlu arayüz"],
          url: "https://missbutikpasta.com"
        }
      ]
    },
    {
      type: "finalCta",
      question: "Online satışa başlamaya hazır mısınız?",
      ctaText: "Hemen ücretsiz teklif alın, e-ticaret sitenizi kuralım ve satışlarınızı katlayalım."
    }
  ]
}

export default function HizmetETicaret() {
  const navigate = useNavigate()
  const canonicalUrl = useCanonicalUrl()

  const today = new Date().toISOString().split('T')[0]

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "E-Ticaret Çözümleri - SenninWeb",
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
      "E-Ticaret",
      "Online Mağaza",
      "Ödeme Entegrasyonu",
      "Dijital Pazarlama"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "E-Ticaret Hizmetleri",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Kurumsal E-Ticaret Sitesi"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Ödeme Sistemi Entegrasyonu"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "E-Ticaret SEO"
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
            <span className="text-white/60">E-Ticaret</span>
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
            <Link to="/hizmet/dijital-pazarlama" className="text-sm text-gold-400 hover:text-gold-300 transition-colors">
              Dijital Pazarlama hizmetimiz →
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
