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
      "İnternet (web) sitesi veya siteleri, bizim dijitaldeki 7/24 çalışan dükkanlarımızdır. Birçok farklı kategorisi vardır: blog, portfolyo, e-ticaret, haber siteleri, topluluk ve forum siteleri vs. İnternet siteleri, kendinizin veya işletmenizi tanıtmak için müthiş ve bir o kadar da etkili araçlardır. Günümüzde internet sitesi olmayan bir işletme hayal etmek bile tuhaf geliyor — artık işletme sahipleri veya freelance olarak çalışan şahıslar için bir zorunluluk haline geldi. Müşteri çekmek, satış yapmak, sponsor ve/veya yatırımcı bulmak için olmazsa olmazlardır."
  },
  {
    question: "Web siteleri nasıl yapılır, tasarlanır?",
    answer:
      "Günümüzde bunun birden fazla yolu var. Figma-Webflow gibi tasarım araçları, baştan sona elle kodlayarak yazma, vibe coding (son birkaç yılda ortaya çıkan bir kodlama yöntemi — sadece yapay zekaya ne yapması gerektiği söylenerek profesyonel kalitede web sitesi tasarımları ortaya çıkarılabiliyor) bunlardan birkaç tanesidir. Sennin Web olarak biz bu üçünü harmanlayarak daha etkili sonuçlar elde ediyoruz. Sitenin UI/UX tasarımı için Figma kullanarak kullanıcının etkileşime girdiği arayüzü modern, estetik ve hızlı bir şekilde tasarlıyoruz. Ardından geliştirici ekibimiz bunu yapay zeka ajanlarının yardımıyla hem kodluyor hem de debug (hata giderme) işlemini yapıyor."
  },
  {
    question: "Web sitem Google'da neden çıkmıyor?",
    answer:
      "En sık duyduğumuz sorulardan biridir bu. Birkaç farklı sebebi olabilir, en yaygın olanlarına bir bakalım.\n\nBirincisi: siteniz çok yeni olabilir. Google'ın yeni bir siteyi keşfetmesi, taraması ve sıralamaya koyması zaman alır. İkincisi: siteniz teknik olarak Google'ın istediği kriterleri karşılamıyor olabilir. Mobil uyumluluk, hız, SSL sertifikası, düzgün bir site haritası — bunlar olmadan Google sizi görmezden gelir. Üçüncüsü: içerik yetersizliği. Sitenizde bir iki cümlelik sayfalar varsa, Google'a \"bu sayfa bir şey anlatmıyor\" sinyali gönderirsiniz.\n\nDördüncüsü de şu: hiç SEO çalışması yapılmamış olabilir. Güzel bir site yapıp yayına almak yetmez. Doğru anahtar kelimeleri hedeflemek, etiketleri düzenlemek, yerel SEO'yu kurmak — bunların hepsi ayrı birer çalışma gerektirir.\n\nKısacası: siteniz var diye Google'da çıkacağının garantisi yok. Ama doğru adımları atarsanız çıkma ihtimali epey artar."
  },
  {
    question: "Hazır tema mı kullanıyorsunuz, yoksa sıfırdan mı tasarlıyorsunuz?",
    answer:
      "Kesinlikle sıfırdan tasarlıyoruz. Hazır temalar — özellikle WordPress için olanlar — hız, güvenlik ve SEO açısından ciddi dezavantajlar yaratabiliyor. Biz her projeye sıfırdan başlıyor, işletmenin ihtiyaçlarını analiz ediyor, hedef kitlesini tanıyor ve ona göre bir tasarım çıkarıyoruz.\n\nBunun en büyük avantajı: siteniz size özel oluyor. Başka hiçbir yerde görmeyeceğiniz bir arayüz, markanızın renkleriyle bütünleşmiş bir deneyim. Hazır tema kullandığınızda ise aynı siteyi onlarca farklı işletmede görmeniz mümkün. Bu da hem prestij hem de özgünlük açısından can sıkıcı."
  },
  {
    question: "Mobil uyumlu (responsive) site yapıyor musunuz?",
    answer:
      "Tabii ki. Günümüzde internet trafiğinin %60'ı mobilden geliyor. Google da mobil uyumluluğu en kritik sıralama faktörlerinden biri olarak değerlendiriyor. Mobil uyumlu olmayan bir site yapmak, 2026 yılında dükkânınızın kapısına \"girmeyin\" yazısı asmak gibi bir şey.\n\nTüm projelerimizi mobil öncelikli tasarlıyoruz. Önce telefon ekranında kusursuz görünsün, sonra tablet ve masaüstüne uyarlıyoruz. Buton boyutlarından yazı puntolarına, menü düzeninden görsel optimizasyonuna kadar her şey mobil kullanıcı düşünülerek hazırlanıyor."
  },
  {
    question: "Siteyi kendim güncelleyebilecek miyim, admin paneli var mı?",
    answer:
      "Evet, tüm projelerimizi kullanıcı dostu bir yönetim paneliyle teslim ediyoruz. Hiç kod bilmeseniz bile içeriklerinizi kolayca güncelleyebilir, yeni sayfalar ekleyebilir, görselleri değiştirebilirsiniz.\n\nTeslimat sonrası kısa bir eğitim de veriyoruz — paneli nasıl kullanacağınızı, nelere dikkat etmeniz gerektiğini anlatıyoruz. Yine de \"uğraşamam, siz yönetin\" derseniz, onun için de aylık bakım seçeneklerimiz mevcut."
  },
  {
    question: "Web sitesi yaptırmak ne kadar sürer?",
    answer:
      "Projenin kapsamına göre değişir, ama ortalama bir kurumsal site için 8-10 gün civarında teslim yapıyoruz. İlk 48 saat içinde demo tasarımı gönderiyoruz, siz onayladıktan sonra geliştirme aşamasına geçiyoruz.\n\nTabii e-ticaret gibi daha karmaşık projelerde bu süre 2-3 haftayı bulabilir. Ama net zaman çizelgesini her zaman ilk görüşmede sizinle paylaşıyoruz — ne zaman ne olacağını bilmek istemez misiniz?"
  },
  {
    question: "Siteyi yayına aldıktan sonra destek / bakım veriyor musunuz?",
    answer:
      "Evet, veriyoruz. Yayın sonrası 30 gün boyunca ücretsiz destek sağlıyoruz. Bu süreçte karşılaştığınız herhangi bir sorun, küçük değişiklik talepleri veya uyum sorunlarıyla ilgileniyoruz.\n\n30 gün sonrası için ise aylık bakım planlarımız var. Güvenlik güncellemeleri, performans takibi, içerik güncellemeleri ve yedekleme gibi hizmetleri düzenli olarak sağlıyoruz. Uzun vadeli çözüm ortağınız olmak isteriz."
  },
  {
    question: "SEO nedir ve neden önemlidir?",
    answer:
      "SEO (arama motoru optimizasyonu), web sitenizin Google ve diğer arama motorlarında organik olarak üst sıralarda yer alması için yapılan çalışmaların bütünüdür. Teknik altyapı, içerik stratejisi ve yerel optimizasyon olmak üzere üç temel disiplinden oluşur.\n\nSEO uzun vadeli bir yatırımdır. Çalışmalar yapılır, içerik üretilir, teknik altyapı düzeltilir — ve zamanla sıralamalar oturur. Organik olarak kazandığınız sıralamalar size ait olmaya devam eder.\n\nNeden önemli? Çünkü internet kullanıcılarının %90'ı arama motorlarını kullanıyor ve tıklamaların büyük çoğunluğu ilk sayfadaki organik sonuçlara gidiyor. Doğru bir SEO stratejisi ile işletmenizi sürekli olarak potansiyel müşterilerin karşısına çıkarabilirsiniz."
  },
  {
    question: "SEO ne kadar sürede sonuç verir? Garanti verebiliyor musunuz?",
    answer:
      "Açık olacağım: SEO'da garanti diye bir şey yoktur. Google, yılda binlerce algoritma güncellemesi yapar ve sıralama 200'den fazla faktöre bağlıdır. Size \"bir ay sonra birinci sıradayız\" diyen bir ajans varsa, ya size yalan söylüyordur ya da kendine.\n\nAma gerçekçi bir zaman çizelgesi verebilirim. Teknik düzenlemelerin etkisi 4-8 hafta içinde görülmeye başlar. Düşük ve orta rekabetli kelimelerde ilk sıralama hareketleri 3. aydan itibaren gözlemlenir. Kalıcı ve güçlü sonuçlar ise 6-12 ay arasında oturur.\n\nGaranti veremeyiz — bunu veren bir ajans varsa kaçın derim. Ama şeffaf raporlama ile her ay ne yaptığımızı, hangi kelimelerde ilerlediğimizi, trafiğin nasıl değiştiğini gösteririz. Sonuçlar konuşur."
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
    question: "Sadece SEO hizmeti alabilir miyim?",
    answer:
      "Evet, sadece SEO hizmeti de alabilirsiniz. Mevcut bir siteniz varsa ve sadece Google'da görünürlüğünü artırmak istiyorsanız, SEO paketlerimizden birini seçip başlayabiliriz. Önce sitenizin mevcut durumunu analiz ediyor, sonra size özel bir strateji belirliyoruz.\n\nAma şunu da söylemeden geçemeyeceğim: bazen sitenin teknik altyapısı SEO çalışmasının tam verim almasını engelleyebiliyor. Eğer böyle bir durumla karşılaşırsak, sizi uyarır ve önce siteyi iyileştirmeyi öneririz. Yoksa \"sadece SEO yapalım, sonra siteyi düşünürüz\" yaklaşımı pek sağlıklı olmuyor."
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
  },
  {
    question: "Sizi rakiplerinizden ayıran nedir? Neden SenninWeb'i tercih etmeliyim?",
    answer:
      "Güzel soru. Bizi diğer ajanslardan ayıran birkaç şey var.\n\nBirincisi: hazır tema kullanmıyoruz. Her projeyi sıfırdan, markaya özel tasarlıyoruz. Çoğu ajans bir tema alıp üzerinden iki günde site çıkarırken, biz her pikselle tek tek ilgileniyoruz.\n\nİkincisi: SEO sadece bir hizmetimiz değil, felsefemizin temeli. \"Güzel görünmek yetmez, Google'da da görünmek lazım\" sözü boşuna değil. Tasarım ve SEO'yu birbirinden ayırmıyor, her projede ikisini birlikte düşünüyoruz.\n\nÜçüncüsü: işimizi hızlı yapıyoruz. Ortalama 8 günde teslim, 48 saatte demo tasarım. Çoğu ajansın haftalarca sürdüğü işi biz günlerle ölçüyoruz.\n\nDördüncüsü: şeffafız. Ne yapıyoruz, neden yapıyoruz, ne zaman bitecek — her şeyi baştan konuşuyoruz. Sürpriz yok, gizli maliyet yok.\n\nBeşincisi: AEO ve GEO gibi yeni nesil arama motoru optimizasyonu konularında da çalışıyoruz. Çoğu ajansın henüz adını bile duymadığı bu alanlarda projeler üretiyoruz. Yapay zeka çağında sadece Google'da değil, ChatGPT'de, Gemini'de, Perplexity'de de görünür olmanız için çalışıyoruz."
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
    upsertMetaByName("description", "Web siteniz neden Google'da çıkmıyor? SEO ne kadar sürer? Web tasarım fiyatları ne kadar? Tüm sorularınızı yanıtlıyoruz.")
    upsertMetaByName("robots", "index, follow")
    upsertMetaByProperty("og:title", "Sıkça Sorulan Sorular | SenninWeb")
    upsertMetaByProperty("og:description", "Web siteniz neden Google'da çıkmıyor? SEO ne kadar sürer? Web tasarım fiyatları ne kadar? Tüm sorularınızı yanıtlıyoruz.")
    upsertMetaByProperty("og:type", "website")
    upsertMetaByProperty("og:url", canonicalUrl)
    upsertMetaByProperty("og:image", "https://www.senninweb.com/og-image.svg")
    upsertMetaByProperty("og:image:width", "1200")
    upsertMetaByProperty("og:image:height", "630")

    upsertMetaByName("twitter:card", "summary_large_image")
    upsertMetaByName("twitter:title", "Sıkça Sorulan Sorular | SenninWeb")
    upsertMetaByName("twitter:description", "Web siteniz neden Google'da çıkmıyor? SEO ne kadar sürer? Web tasarım fiyatları ne kadar? Tüm sorularınızı yanıtlıyoruz.")

    upsertLinkByRel("canonical", canonicalUrl)

    return () => {
      document.title = prevTitle
      if (prevDesc !== null) upsertMetaByName("description", prevDesc)
      if (prevOgTitle !== null) upsertMetaByProperty("og:title", prevOgTitle)
      if (prevOgDesc !== null) upsertMetaByProperty("og:description", prevOgDesc)
      if (prevCanonical !== null) upsertLinkByRel("canonical", prevCanonical)
    }
  }, [canonicalUrl])

  const today = new Date().toISOString().split('T')[0]

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "name": "Sıkça Sorulan Sorular | SenninWeb",
    "description": "Web tasarım, SEO, mobil uyumluluk, Google'da görünürlük ve daha fazlası hakkında sıkça sorulan sorular.",
    "dateModified": today,
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
            Web tasarım, SEO, mobil uyumluluk ve dijital pazarlama hakkında en çok merak edilenleri
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
