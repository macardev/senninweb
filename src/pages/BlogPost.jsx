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

export default function BlogPost() {
  const navigate = useNavigate()
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Küçük İşletmeler İçin Web Sitesi Nasıl Müşteri Getirir?",
    description:
      "Küçük işletmeler için web sitesinin nasıl müşteri getirdiğini öğrenin. SEO, hız ve doğru strateji ile daha fazla müşteri kazanın.",
    author: {
      "@type": "Person",
      name: "Çağatay Macar",
      jobTitle: "Senior Web Developer",
    },
    publisher: {
      "@type": "Organization",
      name: "SenninWeb",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://senninweb.com/blog/kucuk-isletme-web-sitesi",
    },
  }

  useEffect(() => {
    const prevTitle = document.title

    const prevDesc = document.head.querySelector('meta[name="description"]')?.getAttribute("content") ?? null
    const prevViewport = document.head.querySelector('meta[name="viewport"]')?.getAttribute("content") ?? null
    const prevRobots = document.head.querySelector('meta[name="robots"]')?.getAttribute("content") ?? null

    const prevOgTitle = document.head.querySelector('meta[property="og:title"]')?.getAttribute("content") ?? null
    const prevOgDesc = document.head.querySelector('meta[property="og:description"]')?.getAttribute("content") ?? null
    const prevOgType = document.head.querySelector('meta[property="og:type"]')?.getAttribute("content") ?? null
    const prevOgUrl = document.head.querySelector('meta[property="og:url"]')?.getAttribute("content") ?? null

    const title = "Küçük İşletmeler İçin Web Sitesi Nasıl Müşteri Getirir? | SenninWeb"
    const description =
      "Küçük işletmeler için web sitesinin nasıl müşteri getirdiğini öğrenin. SEO, hız ve doğru strateji ile daha fazla müşteri kazanın."

    document.title = title
    upsertMetaByName("description", description)
    upsertMetaByName("viewport", "width=device-width, initial-scale=1.0")
    upsertMetaByName("robots", "index, follow")

    upsertMetaByProperty("og:title", title)
    upsertMetaByProperty("og:description", description)
    upsertMetaByProperty("og:type", "article")
    upsertMetaByProperty("og:url", typeof window !== "undefined" ? window.location.href : "")

    return () => {
      document.title = prevTitle

      if (prevDesc !== null) upsertMetaByName("description", prevDesc)
      if (prevViewport !== null) upsertMetaByName("viewport", prevViewport)
      if (prevRobots !== null) upsertMetaByName("robots", prevRobots)

      if (prevOgTitle !== null) upsertMetaByProperty("og:title", prevOgTitle)
      if (prevOgDesc !== null) upsertMetaByProperty("og:description", prevOgDesc)
      if (prevOgType !== null) upsertMetaByProperty("og:type", prevOgType)
      if (prevOgUrl !== null) upsertMetaByProperty("og:url", prevOgUrl)
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

          <Link
            to="/blog"
            data-cursor
            className="mt-5 inline-flex items-center gap-2 text-xs text-white/45 hover:text-white/80 transition-colors"
          >
            <span className="text-base leading-none">←</span>
            Rehbere dön
          </Link>

          <div className="mt-6 flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase">
            <span className="text-gold-400/90 font-semibold">Büyüme</span>
            <span className="text-white/25">•</span>
            <span className="text-white/40">6 dk okuma</span>
            <span className="text-white/25">•</span>
            <span className="text-white/40">2026</span>
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-display font-bold tracking-tight leading-tight">
            Küçük İşletmeler İçin Web Sitesi Nasıl Müşteri Getirir?
          </h1>
          <p className="mt-3 text-xs md:text-sm text-white/60">
            Yazar: Çağatay Macar • Senior Web Developer
          </p>
          <p className="mt-5 text-sm md:text-base text-white/60 leading-relaxed">
            Günümüzde bir işletmenin sadece fiziksel olarak var olması yeterli değil...
          </p>

          <div className="mt-8 gold-line opacity-20" />
        </div>

        <div className="space-y-10 text-white/70 leading-relaxed">
          <section className="space-y-5">
            <p className="text-sm md:text-base text-white/65 leading-relaxed">
              Günümüzde bir işletmenin başarılı olabilmesi için sadece fiziksel bir mağazaya sahip olması yeterli değil.
              İnsanlar bir ürün veya hizmet aradığında ilk yaptıkları şey Google’da arama yapmak.
              Eğer işletmeniz bu aramalarda görünmüyorsa, potansiyel müşterilerinizi fark etmeden kaybediyorsunuz demektir.
            </p>

            <p className="text-sm md:text-base text-white/65 leading-relaxed">
              Peki bir web sitesi gerçekten müşteri getirir mi?
            </p>

            <p className="text-sm md:text-base text-white/65 leading-relaxed">
              Cevap: Evet, ama doğru yapılırsa.
            </p>

            <p className="text-sm md:text-base text-white/65 leading-relaxed">
              Birçok işletme web sitesi yaptırıyor ancak sonuç alamıyor. Bunun en büyük sebebi sitenin sadece “var olması”
              ama aktif olarak çalışmamasıdır. Yani SEO yapılmamış, yavaş açılan veya kullanıcıyı yönlendirmeyen bir site
              hiçbir işe yaramaz.
            </p>
          </section>

          <section className="space-y-5">
            <p className="text-sm md:text-base text-white/65 leading-relaxed">
              Gerçekten müşteri getiren bir web sitesi 3 temel üzerine kuruludur:
            </p>

            <div className="space-y-8">
              <section className="space-y-3">
                <h2 className="text-xl md:text-2xl font-display font-semibold text-white">
                  1. Google’da Görünürlük (SEO)
                </h2>
                <p className="text-sm md:text-base text-white/65 leading-relaxed">
                  İnsanlar hizmet ararken sizin sitenizi bulabilmeli. Bunun için doğru anahtar kelimeler, teknik SEO ve içerik stratejisi gerekir.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl md:text-2xl font-display font-semibold text-white">
                  2. Hız ve Performans
                </h2>
                <p className="text-sm md:text-base text-white/65 leading-relaxed">
                  Ziyaretçiler yavaş açılan siteleri anında terk eder. Hızlı bir site hem kullanıcı deneyimini artırır hem de Google sıralamasında yükselmenizi sağlar.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl md:text-2xl font-display font-semibold text-white">
                  3. Doğru Yönlendirme (CTA)
                </h2>
                <p className="text-sm md:text-base text-white/65 leading-relaxed">
                  Kullanıcı siteye geldiğinde ne yapacağını bilmeli. “Teklif al”, “iletişime geç” gibi yönlendirmeler olmadan ziyaretçiler müşteriye dönüşmez.
                </p>
              </section>
            </div>

            <p className="text-sm md:text-base text-white/65 leading-relaxed">
              Profesyonel bir web sitesi sizin için 7/24 çalışan bir satış temsilcisi gibidir. Doğru kurulduğunda size sürekli yeni müşteriler kazandırır.
            </p>

            <p className="text-sm md:text-base text-white/65 leading-relaxed">
              Eğer sizin de web siteniz:
            </p>

            <ul className="space-y-2 text-sm md:text-base text-white/65 leading-relaxed list-disc pl-5 marker:text-gold-500/80">
              <li>müşteri getirmiyorsa</li>
              <li>Google’da görünmüyorsa</li>
              <li>yavaş çalışıyorsa</li>
            </ul>

            <p className="text-sm md:text-base text-white/65 leading-relaxed">
              bunun çözümü doğru bir strateji ile mümkündür.
            </p>

            <p className="text-sm md:text-base text-white/65 leading-relaxed">
              İşletmenize özel, hızlı ve SEO uyumlu bir web sitesi ile dijitalde rakiplerinizin önüne geçebilirsiniz.
            </p>
          </section>

          <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 md:p-10">
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-gold-500/10 blur-[70px] pointer-events-none" />

            <h3 className="relative text-lg md:text-2xl font-display font-semibold text-white">
              Hazır mısınız?
            </h3>
            <p className="relative mt-3 text-sm md:text-base text-white/60 leading-relaxed max-w-xl">
              Web sitenizi müşteri kazandıran, premium bir sisteme dönüştürelim. Hız, SEO ve dönüşüm odaklı bir planı birlikte çıkaralım.
            </p>

            <div className="relative mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link
                to="/#contact"
                data-cursor
                onClick={(e) => {
                  e.preventDefault()
                  navigate("/")
                  setTimeout(() => scrollToIdWithRetry("contact"), 0)
                }}
                className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium tracking-wide
                           bg-gold-500 text-black hover:bg-gold-400 transition-colors w-full sm:w-auto"
              >
                Ücretsiz Teklif Al
              </Link>
              <span className="text-xs text-white/40">
                Ortalama dönüş süresi: 24 saat
              </span>
            </div>
          </section>
        </div>
      </div>
    </article>
  )
}