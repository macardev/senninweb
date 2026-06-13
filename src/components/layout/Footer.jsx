import { useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom"
import { scrollToIdWithRetry } from "@/utils/scrollToId"

const footerLinks = [
  {
    title: 'Hizmetler',
    links: [
      { label: 'Web Tasarım',      href: '/#services'    },
      { label: 'SEO & Büyüme',     href: '/#services'    },
      { label: 'Kurumsal Kimlik',  href: '/#services'    },
    ],
  },
  {
    title: 'Şirket',
    links: [
      { label: 'Hakkımızda',  href: '/hakkimizda' },
      { label: 'Referanslar',  href: '/#references' },
      { label: 'Nasıl Çalışırız', href: '/#how'     },
      { label: 'İletişim',     href: '/#contact'    },
      { label: 'Dijital Rehber', href: '/blog' },
      { label: 'Sıkça Sorulan Sorular', href: '/sss' },
    ],
  },
]

const legalTexts = {
  kvkk: {
    title: 'KVKK Aydınlatma Metni',
    content: `KİŞİSEL VERİLERİN KORUNMASI KANUNU AYDINLATMA METNİ

Sennin Web ("Şirket") olarak kişisel verilerinizin güvenliği hususuna azami hassasiyet göstermekteyiz. Bu bilinçle, Şirket olarak ürün ve hizmetlerimizden faydalanan kişiler dahil, Şirket ile ilişkili tüm şahıslara ait her türlü kişisel verinin 6698 sayılı Kişisel Verilerin Korunması Kanunu'na ("KVK Kanunu") uygun olarak işlenerek, muhafaza edilmesine büyük önem atfetmekteyiz.

VERİ SORUMLUSU

KVK Kanunu kapsamında kişisel verileriniz; veri sorumlusu sıfatıyla Sennin Web tarafından aşağıda açıklanan kapsamda işlenecektir.

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

İletişim: bussiness@senninweb.com`,
  },
  gizlilik: {
    title: 'Gizlilik Politikası',
    content: `GİZLİLİK POLİTİKASI

Son güncelleme: Ocak 2025

Sennin Web olarak gizliliğinize saygı duyuyor ve kişisel verilerinizi korumayı taahhüt ediyoruz. Bu Gizlilik Politikası, web sitemizi ziyaret ettiğinizde veya hizmetlerimizi kullandığınızda hangi bilgileri topladığımızı, bu bilgileri nasıl kullandığımızı ve koruduğumuzu açıklamaktadır.

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

Gizlilik politikamıza ilişkin sorularınız için: bussiness@senninweb.com`,
  },
  kullanim: {
    title: 'Kullanım Koşulları',
    content: `KULLANIM KOŞULLARI

Son güncelleme: Ocak 2025

Bu web sitesini kullanarak aşağıdaki kullanım koşullarını kabul etmiş sayılırsınız. Lütfen bu koşulları dikkatlice okuyunuz.

HİZMETLERİN KAPSAMI

Sennin Web, küçük ve orta ölçekli işletmelere web tasarım, SEO danışmanlığı ve kurumsal kimlik hizmetleri sunmaktadır. Sunulan hizmetlerin kapsamı ve bedeli, taraflar arasında imzalanacak sözleşme ile belirlenir.

FİKRİ MÜLKİYET

Bu web sitesinde yer alan tüm içerik, tasarım, metin, görsel ve yazılım unsurları Sennin Web'in mülkiyetindedir ve telif hukuku kapsamında korunmaktadır. İzinsiz kopyalanması ve kullanılması yasaktır.

MÜŞTERİ PROJELERİ

Proje sürecinde müşteriden temin edilen tüm bilgi ve belgeler gizli tutulur. Sennin Web, müşteri onayı olmaksızın bu bilgileri üçüncü taraflarla paylaşmaz. Tamamlanan projeler, müşteri izniyle referans olarak kullanılabilir.

SORUMLULUK SINIRI

Sennin Web, sunduğu hizmetleri özenle ve profesyonellikle yerine getirmeyi taahhüt eder. Ancak internet ortamının doğasından kaynaklanan aksaklıklar, üçüncü taraf platform değişiklikleri veya mücbir sebepler nedeniyle oluşabilecek zararlardan sorumlu tutulamaz.

DEĞİŞİKLİKLER

Sennin Web, kullanım koşullarını önceden haber vermeksizin güncelleme hakkını saklı tutar. Güncel koşullar her zaman bu sayfada yayınlanacaktır.

İletişim: bussiness@senninweb.com`,
  },
}

function LegalModal({ type, onClose }) {
  const data = legalTexts[type]
  if (!data) return null

  return (
    <div
      className="fixed inset-0 z-[9998] flex items-end sm:items-center
                 justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[80vh] rounded-2xl
                   border border-white/10 bg-[#0f0f0f] overflow-hidden
                   animate-modalIn"
      >
        <div className="flex items-center justify-between px-8 py-5
                        border-b border-white/6">
          <h3 className="font-display font-bold text-lg text-white">
            {data.title}
          </h3>
          <button
            onClick={onClose}
                    className="w-8 h-8 rounded-full border border-white/10
                               flex items-center justify-center
                               text-white/55 hover:text-white
                       hover:border-white/30 transition-colors"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 1l10 10M11 1L1 11"
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="px-8 py-6 overflow-y-auto max-h-[60vh]
                        scrollbar-thin scrollbar-track-transparent
                        scrollbar-thumb-white/10">
          <pre className="text-xs text-white/60 leading-relaxed
                          whitespace-pre-wrap font-sans">
            {data.content}
          </pre>
        </div>
      </div>
    </div>
  )
}

export default function Footer() {
  const [modal, setModal] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()

  const handleNav = (e, href) => {
    e.preventDefault()

    if (!href.includes('#')) {
      navigate(href)
      return
    }

    const hashIndex = href.indexOf("#")
    const targetId = hashIndex >= 0 ? href.slice(hashIndex + 1) : ""
    if (!targetId) return

    if (location.pathname !== "/") {
      navigate("/")
      setTimeout(() => scrollToIdWithRetry(targetId), 0)
      return
    }

    scrollToIdWithRetry(targetId)
  }

  return (
    <>
      <footer className="relative bg-black border-t border-white/5 overflow-hidden">

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2
                        w-[500px] h-[200px] bg-gold-500/3
                        blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 py-16">

            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-5">
                <svg viewBox="0 0 32 32" className="w-8 h-8">
                  <defs>
                    <linearGradient id="footerS" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#D97706" />
                      <stop offset="100%" stopColor="#B45309" />
                    </linearGradient>
                  </defs>
                  <path d="M 10 8 Q 10 6 12 6 L 20 6 Q 22 6 22 8 Q 22 10 20 10 L 12 10 Q 10 10 10 12 L 10 15 Q 10 17 12 17 L 20 17 Q 22 17 22 19 Q 22 21 20 21 L 12 21 Q 10 21 10 23 Q 10 26 12 26 L 20 26 Q 22 26 22 24"
                        fill="none" stroke="url(#footerS)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="font-display font-bold text-lg tracking-tight text-white">
                  Sennin<span className="text-gold-gradient">Web</span>
                </span>
              </div>

              <p className="text-sm text-white/60 leading-relaxed max-w-xs mb-6">
                İşletmeleriniz için premium web tasarım ve SEO ajansı.
                Dijitalde güçlü bir varlık için buradayız.
              </p>

              <div className="space-y-2">
                <a
                  href="mailto:bussiness@senninweb.com"
                  className="flex items-center gap-2.5 text-xs text-white/60
                             hover:text-gold-400 transition-colors duration-300 group"
                >
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none"
                    className="text-gold-500/50 group-hover:text-gold-400 transition-colors">
                    <path d="M1.5 3l5 4 5-4M1.5 3h10v8a.5.5 0 01-.5.5h-9a.5.5 0 01-.5-.5V3z"
                      stroke="currentColor" strokeWidth="1.2"
                      strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  bussiness@senninweb.com
                </a>
                <div className="flex items-center gap-2.5 text-xs text-white/60">
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none"
                    className="text-gold-500/50">
                    <path d="M6.5 1a4 4 0 100 8A4 4 0 006.5 1zM1 12c0-2 2.5-3 5.5-3s5.5 1 5.5 3"
                      stroke="currentColor" strokeWidth="1.2"
                      strokeLinecap="round"/>
                  </svg>
                  11702 Çukurören/Gölpazarı/Bilecik
                </div>
              </div>

              <a
                href="https://wa.me/905314051584?text=Merhaba%2C%20daha%20fazla%20bilgi%20alabilir%20miyim%3F"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 mt-6 px-4 py-2.5 rounded-xl
                           bg-gradient-to-r from-[#25D366] via-[#22C55E] to-[#16A34A]
                           shadow-[0_0_20px_rgba(37,211,102,0.2)]
                           hover:shadow-[0_0_30px_rgba(37,211,102,0.35)]
                           hover:scale-[1.03] transition-all duration-300
                           text-white text-sm font-semibold group"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span>Stratejinizi hemen planlayalım</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-white/70 group-hover:translate-x-0.5 transition-transform">
                  <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>

            {footerLinks.map(group => (
              <div key={group.title}>
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em]
                               text-white/60 mb-5">
                  {group.title}
                </span>
                <ul className="space-y-3">
                  {group.links.map(link => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        onClick={e => handleNav(e, link.href)}
                         className="text-sm text-white/70 hover:text-white
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

          <div className="gold-line opacity-10" />

          <div className="py-6 flex flex-col sm:flex-row items-center
                          justify-between gap-4">
            <p className="text-xs text-white/55 tracking-wide">
              © 2025 SenninWeb. Tüm hakları saklıdır.
            </p>

            <div className="flex items-center gap-6">
              {[
                { key: 'kvkk',     label: 'KVKK'               },
                { key: 'gizlilik', label: 'Gizlilik Politikası' },
                { key: 'kullanim', label: 'Kullanım Koşulları'  },
              ].map(item => (
                <button
                  key={item.key}
                  onClick={() => setModal(item.key)}
                  className="text-xs text-white/55 hover:text-white/70
                             transition-colors duration-300 underline
                             underline-offset-2 decoration-white/10 min-h-[44px] flex items-center"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {modal && (
        <LegalModal type={modal} onClose={() => setModal(null)} />
      )}
    </>
  )
}
