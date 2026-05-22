import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { scrollToIdWithRetry } from "@/utils/scrollToId"
import { AnimatePresence, motion } from "framer-motion"
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

const faqs = [
  {
    question: "Nedir bu İnternet Sitesi?",
    answer:
      "İnternet (web) sitesi veya siteleri, bizim dijitaldeki 7/24 çalışan dükkanlarımızdır. Birçok farklı kategorisi vardır: blog, portfolyo, e-ticaret, haber siteleri, topluluk ve forum siteleri vs. İnternet siteleri, kendinizin veya işletmenizin reklamını yapmak için müthiş ve bir o kadar da etkili araçlardır. Günümüzde internet sitesi olmayan bir işletme hayal etmek bile tuhaf geliyor — artık işletme sahipleri veya freelance olarak çalışan şahıslar için bir zorunluluk haline geldi. Müşteri çekmek, satış yapmak, sponsor ve/veya yatırımcı bulmak için olmazsa olmazlardır."
  },
  {
    question: "Web siteleri nasıl yapılır, tasarlanır?",
    answer:
      "Günümüzde bunun birden fazla yolu var. Figma-Webflow gibi tasarım araçları, baştan sona elle kodlayarak yazma, vibe coding (son birkaç yılda ortaya çıkan bir kodlama yöntemi — sadece yapay zekaya ne yapması gerektiği söylenerek profesyonel kalitede web sitesi tasarımları ortaya çıkarılabiliyor) bunlardan birkaç tanesidir. Sennin Web olarak biz bu üçünü harmanlayarak daha etkili sonuçlar elde ediyoruz. Sitenin UI/UX tasarımı için Figma kullanarak kullanıcının etkileşime girdiği arayüzü modern, estetik ve hızlı bir şekilde tasarlıyoruz. Ardından geliştirici ekibimiz bunu yapay zeka ajanlarının yardımıyla hem kodluyor hem de debug (hata giderme) işlemini yapıyor."
  },
  {
    question: "SEO Yetmiyormuş Gibi, AEO ve GEO Nereden Çıktı?",
    answer:
      "Önce SEO'dan bahsedelim. SEO (search engine optimization — arama motoru optimizasyonu), web sitenizi kullanıcı dostu hale getirerek Google'da üst sıralarda çıkması için yapılan işlemdir. Bunu zaten duymayan yoktur herhalde? Gelelim AEO'ya. AEO (answer engine optimization — cevap motoru optimizasyonu), yapay zeka destekli arama motorları tarafından kullanıcıya en doğru cevabı verebilmek için içeriklerin optimize edilmesidir. Örneğin Gemini veya ChatGPT'ye bir soru sorduğunuzda, bu yapay zekaların sizin sitenizdeki bilgilerden yola çıkarak kullanıcıya cevap vermesini sağlayan bir işlemdir. GEO ise AEO'ya benzer. Generative Engine Optimization (üretici motor optimizasyonu), içeriklerinizi üretken yapay zeka destekli arama motorlarının daha kolay bulması, anlaması ve yanıtlarına kaynak olarak göstermesi için yapılan işlemdir."
  },
  {
    question: "AEO ve GEO İçin Ne Yapmalı?",
    answer:
      "Açık konuşacağım, şu an ortada öyle aman aman kesin yöntemler yok. SEO'daki gibi kalıplaşmış yöntemler yok desek daha doğru olur. Dediğim gibi ama şu anlık."
  },
  {
    question: "Fiyatlar Neye Göre Belirleniyor?",
    answer:
      "Fiyat konusunun birçok farklı etkeni var. Sitenin kategorisine (blog, portfolyo veya e-ticaret) göre, sayfa sayısı, animasyonların kompleks olup olmadığı veya 3D animasyonlar gibi konular örneklerden birkaç tanesi olarak gösterilebilir."
  },
  {
    question: "E-ticaret Siteleri Neden Hep Daha Pahalı Oluyor?",
    answer:
      "E-ticaret sitelerinin daha pahalı olmasının iki ana sebebi var. Birincisi: Web sitesi tasarımı ve geliştirmesinde iki ana başlık bulunur. Birisi front-end (ön uç), diğeri ise back-end (arka uç) olarak isimlendirilir. Front-end, kullanıcının siteye girdiği zaman gördüğü her şeydir: yazılar, renkler, kartlar, görseller, ikonlar, logo vs. Back-end ise sitenin arkaplanında siteye fonksiyonellik katmak için kullanılır. Abonelik işlemleri, kayıt olmak veya sitede hesap açma, ödeme altyapıları ekleme, ürün satışları back-end ile yapılır. Blog ve portfolyo türündeki siteler için çoğu zaman front-end yeterlidir. E-ticaret sitelerinde ise back-end işin içine girdiği için maliyet artar."
  }
]

function AccordionItem({ faq, index, isOpen, onToggle }) {
  return (
    <div
      className={`group rounded-2xl border transition-all duration-300 ${
        isOpen
          ? "border-gold-500/30 bg-gold-500/[0.03]"
          : "border-white/6 bg-white/[0.02] hover:border-white/10"
      }`}
    >
      <button
        onClick={onToggle}
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
          className={`w-4 h-4 flex-shrink-0 text-gold-400 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 md:px-8 pb-6 md:pb-8">
              <div className="w-full h-px bg-gradient-to-r from-gold-500/20 via-gold-500/10 to-transparent mb-5" />
              <p className="text-sm md:text-base text-white/65 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function SSS() {
  const navigate = useNavigate()
  const [openIndex, setOpenIndex] = useState(null)
  const canonicalUrl = useCanonicalUrl()

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  useEffect(() => {
    const prevTitle = document.title
    const prevDesc = document.head.querySelector('meta[name="description"]')?.getAttribute("content") ?? null
    const prevOgTitle = document.head.querySelector('meta[property="og:title"]')?.getAttribute("content") ?? null
    const prevOgDesc = document.head.querySelector('meta[property="og:description"]')?.getAttribute("content") ?? null
    const prevCanonical = document.head.querySelector('link[rel="canonical"]')?.getAttribute("href") ?? null

    document.title = "Sıkça Sorulan Sorular | SenninWeb"
    upsertMetaByName("description", "Web tasarım, SEO, AEO, GEO ve daha fazlası hakkında sıkça sorulan sorular. SenninWeb ile dijital dünyada merak ettiklerinizi öğrenin.")
    upsertMetaByName("robots", "index, follow")
    upsertMetaByProperty("og:title", "Sıkça Sorulan Sorular | SenninWeb")
    upsertMetaByProperty("og:description", "Web tasarım, SEO, AEO, GEO ve daha fazlası hakkında sıkça sorulan sorular.")
    upsertMetaByProperty("og:type", "website")
    upsertMetaByProperty("og:url", canonicalUrl)

    upsertLinkByRel("canonical", canonicalUrl)

    return () => {
      document.title = prevTitle
      if (prevDesc !== null) upsertMetaByName("description", prevDesc)
      if (prevOgTitle !== null) upsertMetaByProperty("og:title", prevOgTitle)
      if (prevOgDesc !== null) upsertMetaByProperty("og:description", prevOgDesc)
      if (prevCanonical !== null) upsertLinkByRel("canonical", prevCanonical)
    }
  }, [canonicalUrl])

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer
      }
    }))
  }

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
            <span className="text-gold-400/90 font-semibold">SSS</span>
            <span className="text-white/55">•</span>
            <span className="text-white/60">Sıkça Sorulan Sorular</span>
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-display font-bold tracking-tight leading-tight">
            <span className="text-white">Sıkça</span>{" "}
            <span className="text-gold-gradient">Sorulan Sorular</span>
          </h1>
          <p className="mt-5 text-sm md:text-base text-white/60 leading-relaxed max-w-lg">
            Web tasarım, SEO ve dijital pazarlama hakkında en çok merak edilenleri
            burada derledik.
          </p>

          <div className="mt-8 gold-line opacity-20" />
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </div>

        <section className="mt-16 relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 md:p-10">
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-gold-500/10 blur-[70px] pointer-events-none" />

          <h2 className="relative text-lg md:text-2xl font-display font-semibold text-white">
            Başka sorularınız mı var?
          </h2>
          <p className="relative mt-3 text-sm md:text-base text-white/60 leading-relaxed max-w-xl">
            Cevaplanmamış bir sorunuz mu kaldı? Size özel teklif ve bilgi için
            bizimle iletişime geçmekten çekinmeyin.
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
              Bize Ulaşın
            </Link>
          </div>
        </section>
      </div>
    </article>
  )
}
