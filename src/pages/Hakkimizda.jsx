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

export default function Hakkimizda() {
  const navigate = useNavigate()
  const canonicalUrl = useCanonicalUrl()

  useEffect(() => {
    const prevTitle = document.title
    const prevDesc = document.head.querySelector('meta[name="description"]')?.getAttribute("content") ?? null
    const prevOgTitle = document.head.querySelector('meta[property="og:title"]')?.getAttribute("content") ?? null
    const prevOgDesc = document.head.querySelector('meta[property="og:description"]')?.getAttribute("content") ?? null
    const prevOgType = document.head.querySelector('meta[property="og:type"]')?.getAttribute("content") ?? null
    const prevOgUrl = document.head.querySelector('meta[property="og:url"]')?.getAttribute("content") ?? null
    const prevCanonical = document.head.querySelector('link[rel="canonical"]')?.getAttribute("href") ?? null

    document.title = "Hakkımızda | SenninWeb - Web Tasarım & SEO Ajansı | Premium Çözümler"
    upsertMetaByName("description", "SenninWeb: 2025'te kurulan premium web tasarım ve SEO ajansı. KOBİ'ler için özel web tasarımı, SEO danışmanlığı ve kurumsal kimlik çözümleri.")
    upsertMetaByName("robots", "index, follow")

    upsertMetaByProperty("og:title", "Hakkımızda | SenninWeb - Web Tasarım & SEO Ajansı | Premium Çözümler")
    upsertMetaByProperty("og:description", "SenninWeb: 2025'te kurulan premium web tasarım ve SEO ajansı. KOBİ'ler için özel web tasarımı, SEO danışmanlığı ve kurumsal kimlik çözümleri.")
    upsertMetaByProperty("og:type", "website")
    upsertMetaByProperty("og:url", canonicalUrl)

    upsertLinkByRel("canonical", canonicalUrl)

    return () => {
      document.title = prevTitle
      if (prevDesc !== null) upsertMetaByName("description", prevDesc)
      if (prevOgTitle !== null) upsertMetaByProperty("og:title", prevOgTitle)
      if (prevOgDesc !== null) upsertMetaByProperty("og:description", prevOgDesc)
      if (prevOgType !== null) upsertMetaByProperty("og:type", prevOgType)
      if (prevOgUrl !== null) upsertMetaByProperty("og:url", prevOgUrl)
      if (prevCanonical !== null) upsertLinkByRel("canonical", prevCanonical)
    }
  }, [canonicalUrl])

  const aboutJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "name": "Hakkımızda | SenninWeb",
        "description": "2025'te kurulan SenninWeb, işletmelerin marka görünürlüğünü artırmak, müşteri kazanımını hızlandırmak ve aylık gelirlerini yükseltmek için premium web tasarım ve SEO hizmetleri sunar.",
        "url": canonicalUrl,
        "mainEntity": {
          "@type": "Organization",
          "name": "SenninWeb",
          "url": "https://www.senninweb.com"
        }
      },
      {
        "@type": "Person",
        "name": "Çağatay Macar",
        "jobTitle": ["Kurucu", "Senior Web Developer"],
        "worksFor": {
          "@type": "Organization",
          "name": "SenninWeb"
        },
        "image": "https://www.senninweb.com/images/cagatay-macar-biometrik.webp",
        "description": "SenninWeb kurucusu ve senior web geliştiricisi. Premium web tasarım ve SEO hizmetleri sunuyor."
      }
    ]
  }

  return (
    <article className="px-6 md:px-12 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
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
        </div>

        <div className="flex flex-col items-center text-center">
          <div className="w-36 md:w-44 h-36 md:h-44 rounded-full overflow-hidden border-2 border-gold-500/30 mb-6">
            <img
              src="/images/cagatay-macar-biometrik.webp"
              alt="Çağatay Macar — SenninWeb Kurucusu"
              width="176"
              height="176"
              className="w-full h-full object-cover"
              loading="lazy"
              fetchpriority="low"
            />
          </div>

          <h1 className="text-3xl md:text-5xl font-display font-bold tracking-tight leading-tight">
            Çağatay Macar
          </h1>
          <p className="mt-2 text-xs md:text-sm text-white/65 tracking-[0.2em] uppercase">
            SenninWeb — Kurucu, Senior Web Developer
          </p>
        </div>

        <div className="mt-8 gold-line opacity-20" />

        <div className="mt-10 space-y-5 text-sm md:text-base text-white/65 leading-relaxed">
          <p>
            SenninWeb, 2025 yılında Çağatay Macar tarafından kuruldu. Kuruluş amacımız basit ama iddialıydı: işletmelerin dijital dünyada hak ettikleri yeri almalarını sağlamak.
          </p>

          <p>
            Günümüzde bir işletmenin başarısı sadece fiziksel varlığıyla değil, dijital görünürlüğüyle de ölçülüyor. Müşteriler bir hizmet aradığında ilk durağı Google oluyor. O arama sonuçlarında yer almayan işletmeler, farkında olmadan potansiyel müşterilerini rakiplerine kaptırıyor.
          </p>

          <p>
            Biz SenninWeb olarak, işletmelerin bu dijital dönüşüm yolculuğunda yanlarında oluyoruz. Marka görünürlüğünü ve bilinirliğini artırmak, müşteri kazanımını hızlandırmak ve aylık gelirlerini yükseltmek için çalışıyoruz.
          </p>

          <p>
            Farkımız ne mi? İşimize yaklaşım şeklimiz. Her projeye sıfırdan başlıyor, işletmenin ihtiyaçlarını analiz ediyor, hedef kitlesini tanıyor ve ona göre bir strateji belirliyoruz. Hazır tema kullanmıyor, her siteyi markaya özel tasarlıyoruz. Hız, SEO ve dönüşüm odaklı bir yapı kuruyoruz.
          </p>
        </div>

        <div className="mt-12 space-y-8">
          <h2 className="text-2xl md:text-3xl font-display font-semibold text-white">
            Yaklaşımımız
          </h2>

          <div className="grid gap-6">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
              <h3 className="text-lg md:text-xl font-display font-semibold text-gold-400">
                Premium Tasarım
              </h3>
              <p className="mt-3 text-sm md:text-base text-white/65 leading-relaxed">
                Her markaya özel, sıfırdan tasarlanmış modern arayüzler. Hazır tema kullanmıyor, özgün ve akılda kalıcı tasarımlar üretiyoruz.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
              <h3 className="text-lg md:text-xl font-display font-semibold text-gold-400">
                SEO Odaklı Strateji
              </h3>
              <p className="mt-3 text-sm md:text-base text-white/65 leading-relaxed">
                Teknik SEO'dan yerel optimizasyona, Google'da üst sıralara çıkmanız için kapsamlı bir strateji belirliyor ve uyguluyoruz.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
              <h3 className="text-lg md:text-xl font-display font-semibold text-gold-400">
                Sonuç Odaklı Yaklaşım
              </h3>
              <p className="mt-3 text-sm md:text-base text-white/65 leading-relaxed">
                Siteniz sadece güzel görünmekle kalmaz, aynı zamanda müşteri getirir. Hız, performans ve dönüşüm odaklı bir altyapı kuruyoruz.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 gold-line opacity-20" />

        <div className="mt-12 text-center">
          <h2 className="text-lg md:text-xl font-display font-semibold text-white">
            Dijital Rehberimizi Keşfedin
          </h2>
          <p className="mt-2 text-sm md:text-base text-white/65 leading-relaxed max-w-lg mx-auto">
            Web tasarım, SEO ve dijital büyüme üzerine yazdığımız rehberleri okuyun.
          </p>
          <Link
            to="/blog"
            data-cursor
            className="mt-6 inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-medium tracking-wide
                       border border-gold-500/50 text-gold-400 hover:bg-gold-500 hover:text-black transition-all"
          >
            Dijital Rehber →
          </Link>
        </div>

        <section className="mt-12 relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 md:p-10">
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-gold-500/10 blur-[70px] pointer-events-none" />

          <h2 className="relative text-lg md:text-2xl font-display font-semibold text-white">
            Projenizi Konuşalım
          </h2>
          <p className="relative mt-3 text-sm md:text-base text-white/60 leading-relaxed max-w-xl">
            İşletmenizi dijitalde bir adım öne taşımak, Google'da görünürlüğünüzü artırmak ve daha fazla müşteri kazanmak için doğru yerdesiniz.
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
      </div>
    </article>
  )
}
