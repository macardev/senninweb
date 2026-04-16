import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const footerLinks = [
  {
    title: 'Hizmetler',
    links: [
      { label: 'Web Tasarım',      href: '#services'    },
      { label: 'SEO & Büyüme',     href: '#services'    },
      { label: 'Kurumsal Kimlik',  href: '#services'    },
    ],
  },
  {
    title: 'Şirket',
    links: [
      { label: 'Referanslar',  href: '#references' },
      { label: 'Nasıl Çalışırız', href: '#how'     },
      { label: 'İletişim',     href: '#contact'    },
    ],
  },
]

const legalTexts = {
  kvkk: {
    title: 'KVKK Aydınlatma Metni',
    content: `KİŞİSEL VERİLERİN KORUNMASI KANUNU AYDINLATMA METNİ

WebRise ("Şirket") olarak kişisel verilerinizin güvenliği hususuna azami hassasiyet göstermekteyiz. Bu bilinçle, Şirket olarak ürün ve hizmetlerimizden faydalanan kişiler dahil, Şirket ile ilişkili tüm şahıslara ait her türlü kişisel verinin 6698 sayılı Kişisel Verilerin Korunması Kanunu'na ("KVK Kanunu") uygun olarak işlenerek, muhafaza edilmesine büyük önem atfetmekteyiz.

VERİ SORUMLUSU

KVK Kanunu kapsamında kişisel verileriniz; veri sorumlusu sıfatıyla WebRise tarafından aşağıda açıklanan kapsamda işlenecektir.

HANGİ KİŞİSEL VERİLERİNİZİ İŞLİYORUZ?

Şirketimiz tarafından işlenen kişisel veriler şu şekilde sıralanabilir:
• Ad, soyad, telefon numarası, e-posta adresi gibi kimlik ve iletişim bilgileri
• Şirketinizin adı, sektörü ve iletişim bilgileri
• İnternet sitesi kullanım verileri (çerezler aracılığıyla toplanan veriler dahil)
• Tarafımıza ilettiğiniz her türlü talep ve şikayete ilişkin veriler

KİŞİSEL VERİLERİNİZİ HANGİ AMAÇLARLA İŞLİYORUZ?

Toplanan kişisel verileriniz; sunduğumuz hizmetlerin ifası, sizinle iletişim kurulması, hizmetlerimizin iyileştirilmesi ve yasal yükümlülüklerimizin yerine getirilmesi amaçlarıyla işlenmektedir.

VERİ GÜVENLİĞİ

Kişisel verilerinizin yetkisiz kişilerce erişilmesini engellemek ve güvenli biçimde saklanmasını sağlamak amacıyla gerekli teknik ve idari güvenlik önlemleri alınmaktadır.

HAKLARINIZ

KVK Kanunu'nun 11. maddesi uyarınca; kişisel verilerinizin işlenip işlenmediğini öğrenme, işlenmişse buna ilişkin bilgi talep etme, işlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme, yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme, eksik veya yanlış işlenmişse düzeltilmesini isteme, silinmesini veya yok edilmesini isteme haklarına sahipsiniz.

İletişim: macarcagatay@gmail.com`,
  },
  gizlilik: {
    title: 'Gizlilik Politikası',
    content: `GİZLİLİK POLİTİKASI

Son güncelleme: Ocak 2025

WebRise olarak gizliliğinize saygı duyuyor ve kişisel verilerinizi korumayı taahhüt ediyoruz. Bu Gizlilik Politikası, web sitemizi ziyaret ettiğinizde veya hizmetlerimizi kullandığınızda hangi bilgileri topladığımızı, bu bilgileri nasıl kullandığımızı ve koruduğumuzu açıklamaktadır.

TOPLANAN BİLGİLER

Hizmetlerimizi kullanmanız sırasında aşağıdaki bilgileri toplayabiliriz:
• İletişim formu aracılığıyla sağladığınız ad, soyad, e-posta ve telefon bilgileri
• Tarayıcı türü, IP adresi ve ziyaret edilen sayfalar gibi teknik veriler
• Çerezler ve benzer izleme teknolojileri aracılığıyla toplanan kullanım verileri

BİLGİLERİN KULLANIMI

Topladığımız bilgileri; hizmet taleplerinize yanıt vermek, size özelleştirilmiş teklifler sunmak, hizmet kalitemizi geliştirmek ve yasal yükümlülüklerimizi yerine getirmek amacıyla kullanmaktayız.

ÇEREZLER

Web sitemiz, kullanıcı deneyimini iyileştirmek amacıyla çerez kullanmaktadır. Tarayıcı ayarlarınızdan çerezleri devre dışı bırakabilirsiniz; ancak bu durumda bazı hizmetlerimizden tam olarak yararlanamayabilirsiniz.

ÜÇÜNCÜ TARAFLARLA PAYLAŞIM

Kişisel verileriniz; yasal zorunluluklar dışında üçüncü taraflarla paylaşılmamaktadır.

İLETİŞİM

Gizlilik politikamıza ilişkin sorularınız için: macarcagatay@gmail.com`,
  },
  kullanim: {
    title: 'Kullanım Koşulları',
    content: `KULLANIM KOŞULLARI

Son güncelleme: Ocak 2025

Bu web sitesini kullanarak aşağıdaki kullanım koşullarını kabul etmiş sayılırsınız. Lütfen bu koşulları dikkatlice okuyunuz.

HİZMETLERİN KAPSAMI

WebRise, küçük ve orta ölçekli işletmelere web tasarım, SEO danışmanlığı ve kurumsal kimlik hizmetleri sunmaktadır. Sunulan hizmetlerin kapsamı ve bedeli, taraflar arasında imzalanacak sözleşme ile belirlenir.

FİKRİ MÜLKİYET

Bu web sitesinde yer alan tüm içerik, tasarım, metin, görsel ve yazılım unsurları WebRise'ın mülkiyetindedir ve telif hukuku kapsamında korunmaktadır. İzinsiz kopyalanması ve kullanılması yasaktır.

MÜŞTERİ PROJELERİ

Proje sürecinde müşteriden temin edilen tüm bilgi ve belgeler gizli tutulur. WebRise, müşteri onayı olmaksızın bu bilgileri üçüncü taraflarla paylaşmaz. Tamamlanan projeler, müşteri izniyle referans olarak kullanılabilir.

SORUMLULUK SINIRI

WebRise, sunduğu hizmetleri özenle ve profesyonellikle yerine getirmeyi taahhüt eder. Ancak internet ortamının doğasından kaynaklanan aksaklıklar, üçüncü taraf platform değişiklikleri veya mücbir sebepler nedeniyle oluşabilecek zararlardan sorumlu tutulamaz.

DEĞİŞİKLİKLER

WebRise, kullanım koşullarını önceden haber vermeksizin güncelleme hakkını saklı tutar. Güncel koşullar her zaman bu sayfada yayınlanacaktır.

İletişim: macarcagatay@gmail.com`,
  },
}

function LegalModal({ type, onClose }) {
  const data = legalTexts[type]
  if (!data) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[9998] flex items-end sm:items-center
                 justify-center p-4 bg-black/80 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.97 }}
        animate={{ opacity: 1, y: 0,  scale: 1    }}
        exit={{    opacity: 0, y: 60, scale: 0.97 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[80vh] rounded-2xl
                   border border-white/10 bg-[#0f0f0f] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5
                        border-b border-white/6">
          <h3 className="font-display font-bold text-lg text-white">
            {data.title}
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-white/10
                       flex items-center justify-center
                       text-white/40 hover:text-white
                       hover:border-white/30 transition-colors"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 1l10 10M11 1L1 11"
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="px-8 py-6 overflow-y-auto max-h-[60vh]
                        scrollbar-thin scrollbar-track-transparent
                        scrollbar-thumb-white/10">
          <pre className="text-xs text-white/45 leading-relaxed
                          whitespace-pre-wrap font-sans">
            {data.content}
          </pre>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Footer() {
  const [modal, setModal] = useState(null)

  const handleNav = (e, href) => {
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <footer className="relative bg-black border-t border-white/5 overflow-hidden">

        {/* Subtle glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2
                        w-[500px] h-[200px] bg-gold-500/3
                        blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">

          {/* Üst — ana içerik */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 py-16">

            {/* Marka */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-5">
                <div className="relative w-8 h-8">
                  <div className="absolute inset-0 rounded-full border border-gold-500/60" />
                  <div className="absolute inset-[5px] rounded-full bg-gold-500/20" />
                  <div className="absolute inset-[9px] rounded-full bg-gold-500" />
                </div>
                <span className="font-display font-bold text-lg tracking-tight text-white">
                  Sennin<span className="text-gold-gradient">Web</span>
                </span>
              </div>

              <p className="text-sm text-white/35 leading-relaxed max-w-xs mb-6">
                İşletmeleriniz için premium web tasarım ve SEO ajansı.
                Dijitalde güçlü bir varlık için buradayız.
              </p>

              {/* İletişim bilgileri */}
              <div className="space-y-2">
                <a
                  href="mailto:macarcagatay@gmail.com"
                  className="flex items-center gap-2.5 text-xs text-white/35
                             hover:text-gold-400 transition-colors duration-300 group"
                >
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none"
                    className="text-gold-500/50 group-hover:text-gold-400 transition-colors">
                    <path d="M1.5 3l5 4 5-4M1.5 3h10v8a.5.5 0 01-.5.5h-9a.5.5 0 01-.5-.5V3z"
                      stroke="currentColor" strokeWidth="1.2"
                      strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  macarcagatay@gmail.com
                </a>
                <div className="flex items-center gap-2.5 text-xs text-white/35">
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none"
                    className="text-gold-500/50">
                    <path d="M6.5 1a4 4 0 100 8A4 4 0 006.5 1zM1 12c0-2 2.5-3 5.5-3s5.5 1 5.5 3"
                      stroke="currentColor" strokeWidth="1.2"
                      strokeLinecap="round"/>
                  </svg>
                  Bilecik & İstanbul, Türkiye
                </div>
              </div>
            </div>

            {/* Link grupları */}
            {footerLinks.map(group => (
              <div key={group.title}>
                <h4 className="text-[10px] font-semibold uppercase tracking-[0.2em]
                               text-white/25 mb-5">
                  {group.title}
                </h4>
                <ul className="space-y-3">
                  {group.links.map(link => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        onClick={e => handleNav(e, link.href)}
                        className="text-sm text-white/40 hover:text-white
                                   transition-colors duration-300"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Ayraç */}
          <div className="gold-line opacity-10" />

          {/* Alt — copyright + legal */}
          <div className="py-6 flex flex-col sm:flex-row items-center
                          justify-between gap-4">
            <p className="text-xs text-white/20 tracking-wide">
              © 2025 SenninWeb. Tüm hakları saklıdır.
            </p>

            {/* Legal linkler */}
            <div className="flex items-center gap-6">
              {[
                { key: 'kvkk',     label: 'KVKK'               },
                { key: 'gizlilik', label: 'Gizlilik Politikası' },
                { key: 'kullanim', label: 'Kullanım Koşulları'  },
              ].map(item => (
                <button
                  key={item.key}
                  onClick={() => setModal(item.key)}
                  className="text-xs text-white/25 hover:text-white/60
                             transition-colors duration-300 underline
                             underline-offset-2 decoration-white/10"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Modal */}
      <AnimatePresence>
        {modal && (
          <LegalModal type={modal} onClose={() => setModal(null)} />
        )}
      </AnimatePresence>
    </>
  )
}
