import { Link } from "react-router-dom"
import GuideBook from "@/components/ui/GuideBook"
import WhatsAppIcon from "@/components/ui/WhatsAppIcon"
import { GUIDE_PATH, whatsappHref } from "@/utils/leads"

const INSIDE = [
  "Hangi ülkeden hasta çekmelisiniz? 30 dakikalık pazar testi",
  "Hastaya güven veren çok dilli sitenin olmazsa olmaz sayfaları",
  "Hedef ülkede Google'da görünmek ve otorite kazanmak",
  "WhatsApp'ta ilk 5 dakika: talebi randevuya çeviren akış",
  "90 günlük yol haritası + 25 maddelik kontrol listesi",
]

export default function LeadMagnet() {
  return (
    <section id="ucretsiz-rehber" data-lead-zone="lead-magnet" className="relative bg-black section-pad overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[420px] rounded-full bg-gold-500/[0.07] blur-[160px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10 reveal-3d">
        <div className="relative rounded-3xl border border-gold-500/25 bg-gradient-to-br from-surface-100 via-black to-surface-50 px-8 py-10 md:px-14 md:py-12 shadow-[0_40px_120px_-40px_rgba(217,119,6,0.35)]">
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-10 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-px bg-gold-500" />
                <span className="text-xs tracking-[0.25em] uppercase text-gold-400 font-medium">
                  Ücretsiz PDF · 15 sayfa
                </span>
              </div>
              <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight leading-tight mb-5">
                <span className="text-white">Yurt dışından hasta</span>
                <br />
                <span className="text-gold-gradient">çekme rehberi</span>
              </h2>
              <p className="text-white/60 text-sm md:text-base leading-relaxed mb-7 max-w-md">
                Saç ekim merkezleri, diş, estetik ve veteriner klinikleri için yazdık.
                Ajansla çalışsanız da çalışmasanız da uygulayabileceğiniz adım adım sistem.
              </p>
              <ul className="space-y-3 mb-9">
                {INSIDE.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-white/70">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5 flex-shrink-0 text-gold-400" aria-hidden="true">
                      <path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to={GUIDE_PATH}
                  data-lead-placement="lead-magnet"
                  className="inline-flex items-center justify-center h-14 px-8 rounded-full bg-gold-500 hover:bg-gold-400 text-black font-semibold transition-colors duration-200 active:scale-[0.98]"
                >
                  Rehberi ücretsiz indir
                </Link>
                <a
                  href={whatsappHref("Merhaba, kliniğim için yurt dışından hasta kazanımı hakkında kısa analiz istiyorum.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-lead-placement="lead-magnet"
                  className="inline-flex items-center justify-center gap-2.5 h-14 px-7 rounded-full border border-[#25D366]/50 hover:bg-[#25D366]/10 text-white/85 font-medium transition-colors duration-200 active:scale-[0.98]"
                >
                  <WhatsAppIcon size={18} className="text-[#25D366]" />
                  Direkt kısa analiz iste
                </a>
              </div>
            </div>

            <div className="hidden lg:block -my-10">
              <GuideBook />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
