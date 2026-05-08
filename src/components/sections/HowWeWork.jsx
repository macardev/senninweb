import { useRef } from 'react'
import { useIsMobile } from '@/hooks/useIsMobile'
import useInView from '@/hooks/useInView'

const steps = [
  {
    number: '01',
    title: 'Keşif & Strateji',
    description:
      'İşletmenizi, hedef kitlenizi ve rakiplerinizi analiz ediyoruz. Sizi öne çıkaracak dijital stratejiyi birlikte belirliyoruz.',
    duration: '1–2 gün',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="11" cy="11" r="2.5" fill="currentColor"/>
        <path d="M11 2v2M11 18v2M2 11h2M18 11h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Tasarım & Onay',
    description:
      'Markanıza özel tasarım konsepti hazırlıyoruz. Siz onaylayana kadar revize ediyoruz — sınırsız düzeltme hakkı.',
    duration: '3–5 gün',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="3" y="3" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M7 19h8M11 15v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M7 9l2.5 2.5L15 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Geliştirme',
    description:
      'Onaylanan tasarımı hayata geçiriyoruz. Hızlı, animasyonlu ve mobil uyumlu — production-ready kod.',
    duration: '5–10 gün',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M7 8l-4 3 4 3M15 8l4 3-4 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M13 5l-4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Yayın & SEO',
    description:
      'Sitenizi yayına alıyor, domain & hosting kurulumunu yapıyor ve temel SEO optimizasyonunu tamamlıyoruz.',
    duration: '1–2 gün',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M11 3C6.58 3 3 6.58 3 11s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M3 11h18M11 3c-2.5 2.5-4 5.6-4 8s1.5 5.5 4 8M11 3c2.5 2.5 4 5.6 4 8s-1.5 5.5-4 8" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
]

function StepCard({ step, index, total }) {
  const { ref, inView } = useInView({ threshold: 0.2 })
  const isLast = index === total - 1

  return (
    <div
      ref={ref}
      className={`relative flex gap-6 md:gap-10 transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
        inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-[30px]'
      }`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <div className="flex flex-col items-center flex-shrink-0">
        <div
          className={`relative w-12 h-12 rounded-full border border-gold-500/30
                     bg-gold-500/5 flex items-center justify-center
                     text-gold-400 flex-shrink-0 z-10 transition-all duration-500 ${
            inView ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
          }`}
          style={{ transitionDelay: `${index * 120 + 200}ms` }}
        >
          {step.icon}
        </div>

        {!isLast && (
          <div
            className={`w-px flex-1 mt-3 bg-gradient-to-b from-gold-500/20 to-transparent transition-all duration-[800ms] ease-out ${
              inView ? 'scale-y-100' : 'scale-y-0'
            }`}
            style={{ transformOrigin: 'top', transitionDelay: `${index * 120 + 400}ms` }}
          />
        )}
      </div>

      <div className="pb-14">
        <div className="flex items-center gap-4 mb-3">
          <span className="text-[10px] tracking-[0.3em] uppercase text-gold-400 font-medium">
            {step.number}
          </span>
          <span className="px-2.5 py-1 rounded-full bg-white/4 border border-white/8
                           text-[10px] tracking-wider text-white/60">
            {step.duration}
          </span>
        </div>

        <h3 className="font-display font-bold text-2xl md:text-3xl text-white mb-3 tracking-tight">
          {step.title}
        </h3>

        <p className="text-white/60 text-sm leading-relaxed max-w-md">
          {step.description}
        </p>
      </div>
    </div>
  )
}

export default function HowWeWork() {
  const { ref, inView } = useInView()
  const containerRef    = useRef(null)

  return (
    <section
      id="how"
      ref={containerRef}
      className="relative bg-black section-pad overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px]
                        bg-gold-500/3 blur-[160px] rounded-full -translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32">

          <div>
            <div
              ref={ref}
              className={`lg:sticky lg:top-32 transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[30px]'
              }`}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-px bg-gold-500" />
                <span className="text-xs tracking-[0.25em] uppercase text-gold-400 font-medium">
                  Süreç
                </span>
              </div>

              <h2 className="font-display font-bold text-5xl md:text-6xl
                             tracking-tight leading-tight mb-6">
                <span className="text-white">Nasıl</span>
                <br />
                <span className="text-gold-gradient">çalışıyoruz?</span>
              </h2>

              <p className="text-white/60 text-sm leading-relaxed mb-10 max-w-sm">
                Şeffaf, hızlı ve sonuç odaklı bir süreç. Başlangıçtan yayına
                kadar her adımda ne olduğunu bilirsiniz.
              </p>

              <div className="inline-flex items-center gap-3 px-5 py-3
                              rounded-full border border-gold-500/20 bg-gold-500/5">
                <div className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                <span className="text-sm text-gold-400 font-medium">
                  Ortalama 10–19 günde teslim
                </span>
              </div>

              <div
                className={`mt-16 p-6 rounded-2xl border border-white/6 bg-white/[0.02] transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                }`}
                style={{ transitionDelay: '0.2s' }}
              >
                <p className="text-xs tracking-[0.2em] uppercase text-white/60 mb-5">
                  Neden SenninWeb?
                </p>
                {[
                  'Sınırsız revizyon hakkı',
                  'Proje boyunca doğrudan iletişim',
                  'Yayın sonrası 30 gün destek',
                  'SEO her pakette standart',
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-3 py-3 border-b border-white/5 last:border-0 transition-all duration-[600ms] ${
                      inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-[10px]'
                    }`}
                    style={{ transitionDelay: `${400 + i * 100}ms` }}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M2.5 7l3 3 6-6"
                        stroke="#D97706"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="text-sm text-white/60">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-2">
            {steps.map((step, i) => (
              <StepCard
                key={step.number}
                step={step}
                index={i}
                total={steps.length}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
