import React, { useState } from 'react'
import { motion } from 'framer-motion'
import useInView from '@/hooks/useInView'

function ModelPlaceholder() {
  return (
    <svg viewBox="0 0 400 260" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="model-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#DB2777" stopOpacity="0.12" />
        </linearGradient>
        <radialGradient id="model-glow" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#A855F7" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#A855F7" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="260" fill="#0A0A0A" />
      <rect width="400" height="260" fill="url(#model-grad)" />
      <rect width="400" height="260" fill="url(#model-glow)" />
      <circle cx="200" cy="95" r="32" stroke="#A855F7" strokeWidth="1.2" fill="none" opacity="0.45" />
      <path d="M158 172 c0-32 42-52 42-52 0 0 42 20 42 52" stroke="#A855F7" strokeWidth="1.2" fill="none" opacity="0.45" />
      <circle cx="130" cy="75" r="1.5" fill="#A855F7" opacity="0.6" />
      <circle cx="270" cy="110" r="1" fill="#A855F7" opacity="0.5" />
      <circle cx="150" cy="145" r="1.2" fill="#C084FC" opacity="0.4" />
      <circle cx="260" cy="80" r="1" fill="#C084FC" opacity="0.4" />
      <circle cx="180" cy="65" r="0.8" fill="#A855F7" opacity="0.3" />
      <line x1="120" y1="195" x2="280" y2="195" stroke="#A855F7" strokeWidth="0.5" opacity="0.15" strokeDasharray="3 4" />
      <text x="200" y="230" textAnchor="middle" fill="#A855F7" fillOpacity="0.15"
        fontFamily="system-ui" fontSize="10" fontWeight="500" letterSpacing="4">
        AI · FASHION
      </text>
    </svg>
  )
}

function CakePlaceholder() {
  return (
    <svg viewBox="0 0 400 260" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="cake-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#EC4899" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#FCD34D" stopOpacity="0.1" />
        </linearGradient>
        <radialGradient id="cake-glow" cx="50%" cy="55%" r="45%">
          <stop offset="0%" stopColor="#F472B6" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#F472B6" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="260" fill="#0A0A0A" />
      <rect width="400" height="260" fill="url(#cake-grad)" />
      <rect width="400" height="260" fill="url(#cake-glow)" />
      <rect x="145" y="135" width="110" height="55" rx="3" stroke="#F472B6" strokeWidth="1.2" fill="none" opacity="0.5" />
      <rect x="135" y="118" width="130" height="22" rx="3" stroke="#FCD34D" strokeWidth="1.2" fill="none" opacity="0.5" />
      <rect x="155" y="150" width="10" height="12" rx="1" stroke="#F472B6" strokeWidth="0.8" fill="none" opacity="0.3" />
      <rect x="235" y="150" width="10" height="12" rx="1" stroke="#F472B6" strokeWidth="0.8" fill="none" opacity="0.3" />
      {[170, 192, 214].map((x, i) => (
        <React.Fragment key={i}>
          <rect x={x} y={95 + (i % 2 === 0 ? 0 : 3)} width="1.5" height="23" rx="0.75" fill="#FCD34D" opacity="0.6" />
          <circle cx={x + 0.75} cy={93 + (i % 2 === 0 ? 0 : 3)} r="2.5" fill="#FCD34D" opacity="0.8" />
          <circle cx={x + 0.75} cy={93 + (i % 2 === 0 ? 0 : 3)} r="5" fill="#FCD34D" opacity="0.2" />
        </React.Fragment>
      ))}
      <circle cx="115" cy="100" r="1.2" fill="#F472B6" opacity="0.6" />
      <circle cx="285" cy="105" r="1" fill="#F472B6" opacity="0.5" />
      <circle cx="125" cy="85" r="0.8" fill="#FCD34D" opacity="0.4" />
      <circle cx="275" cy="85" r="0.8" fill="#FCD34D" opacity="0.4" />
      <text x="200" y="230" textAnchor="middle" fill="#F472B6" fillOpacity="0.15"
        fontFamily="system-ui" fontSize="10" fontWeight="500" letterSpacing="4">
        BUTIK · PASTA
      </text>
    </svg>
  )
}

function FurniturePlaceholder() {
  return (
    <svg viewBox="0 0 400 260" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="furniture-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#D97706" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#B45309" stopOpacity="0.1" />
        </linearGradient>
        <radialGradient id="furniture-glow" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor="#D97706" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#D97706" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="260" fill="#0A0A0A" />
      <rect width="400" height="260" fill="url(#furniture-grad)" />
      <rect width="400" height="260" fill="url(#furniture-glow)" />
      <rect x="162" y="145" width="76" height="45" rx="2" stroke="#D97706" strokeWidth="1.2" fill="none" opacity="0.5" />
      <line x1="162" y1="145" x2="162" y2="120" stroke="#D97706" strokeWidth="1.2" opacity="0.5" />
      <line x1="238" y1="145" x2="238" y2="120" stroke="#D97706" strokeWidth="1.2" opacity="0.5" />
      <line x1="162" y1="138" x2="238" y2="138" stroke="#D97706" strokeWidth="0.8" opacity="0.35" />
      <line x1="162" y1="190" x2="148" y2="210" stroke="#D97706" strokeWidth="1.2" opacity="0.5" />
      <line x1="238" y1="190" x2="252" y2="210" stroke="#D97706" strokeWidth="1.2" opacity="0.5" />
      <line x1="172" y1="158" x2="228" y2="158" stroke="#D97706" strokeWidth="0.5" opacity="0.25" />
      <line x1="172" y1="170" x2="228" y2="170" stroke="#D97706" strokeWidth="0.5" opacity="0.25" />
      <circle cx="140" cy="95" r="1.2" fill="#FBBF24" opacity="0.5" />
      <circle cx="260" cy="105" r="1" fill="#FBBF24" opacity="0.4" />
      <circle cx="155" cy="80" r="0.8" fill="#D97706" opacity="0.3" />
      <circle cx="248" cy="85" r="0.8" fill="#D97706" opacity="0.3" />
      <text x="200" y="230" textAnchor="middle" fill="#D97706" fillOpacity="0.15"
        fontFamily="system-ui" fontSize="10" fontWeight="500" letterSpacing="4">
        MOBILYA · TASARIM
      </text>
    </svg>
  )
}

const references = [
  {
    id: 'utsuri',
    name: 'Utsuri AI',
    domain: 'utsuriai.com',
    category: 'AI SaaS · Moda Teknolojisi',
    description:
      'Moda markaları için yapay zeka destekli model fotoğrafı üretim platformu. Gerçek fotoğraf çekimi olmadan, dakikalar içinde profesyonel ürün görselleri.',
    features: [
      'AI destekli model fotoğrafı üretimi',
      'Çoklu şablon & stil sistemi',
      'Türkçe arayüz & yerel destek',
      'SaaS abonelik altyapısı',
    ],
    metrics: [
      { value: 'SaaS', label: 'Platform türü' },
      { value: 'AI', label: 'Teknoloji' },
      { value: 'TR #1', label: 'AI Fashion' },
    ],
    tags: ['AI', 'SaaS', 'Moda'],
    placeholder: 'model',
    accent: { hex: '#A855F7', tailwind: 'purple' },
    url: 'https://www.utsuriai.com',
  },
  {
    id: 'ozkan',
    name: 'Özkan Mobilya',
    domain: 'ozkanmobilya.com',
    category: 'Mobilya & İç Tasarım · Bilecik',
    description:
      'Yerel mobilya ustasının dijital vitrini. Modern ürün galerisi ve yerel SEO ile müşteri sayısını katladık.',
    features: [
      'Modern ürün galerisi tasarımı',
      'Yerel SEO optimizasyonu',
      'Mobil uyumlu responsive yapı',
    ],
    metrics: [
      { value: '3x', label: 'Daha fazla müşteri' },
      { value: '2x', label: 'Web trafiği' },
    ],
    tags: ['Web Tasarım', 'SEO'],
    placeholder: 'furniture',
    accent: { hex: '#D97706', tailwind: 'amber' },
    url: null,
  },
  {
    id: 'missbutik',
    name: 'Miss Butik Pasta',
    domain: 'missbutikpasta.com',
    category: 'Butik Pasta · Gebze',
    description:
      'Gebze bölgesinde siparişe özel tasarımlı özel gün pastaları üreten butik pastacı. Lezzetleri dijital vitrinle sevenleriyle buluşturuyor.',
    features: [
      'Özel gün pastaları tasarımı',
      'Siparişe özel kişiselleştirme',
      'Modern dijital vitrin',
      'Mobil uyumlu arayüz',
    ],
    metrics: [
      { value: '🎂', label: 'Özel tasarım' },
      { value: '✨', label: 'Kişiye özel' },
    ],
    tags: ['Web Tasarım', 'E-Ticaret'],
    placeholder: 'cake',
    accent: { hex: '#EC4899', tailwind: 'pink' },
    url: 'https://missbutikpasta.com',
  },
]

function PlaceholderImage({ type }) {
  switch (type) {
    case 'model': return <ModelPlaceholder />
    case 'cake': return <CakePlaceholder />
    case 'furniture': return <FurniturePlaceholder />
    default: return null
  }
}

function ReferenceCard({ data, index, inView }) {
  const a = data.accent

  return (
    <div
      className={`relative rounded-2xl overflow-hidden border border-white/6
                 bg-white/[0.02] mx-0 sm:mx-3 transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ minHeight: 500, transitionDelay: `${index * 150}ms` }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            background: `linear-gradient(135deg, ${a.hex}22, transparent 60%, ${a.hex}11)`,
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col h-full">

        <div className="relative w-full h-[200px] md:h-[260px] bg-black overflow-hidden">
          <PlaceholderImage type={data.placeholder} />
        </div>

        <div className="p-6 md:p-8 flex flex-col flex-1">

          <div className="flex items-center gap-3 mb-4">
            <span className="w-6 h-px" style={{ backgroundColor: a.hex }} />
            <span
              className="text-xs tracking-[0.25em] uppercase font-medium"
              style={{ color: `${a.hex}b3` }}
            >
              {data.category}
            </span>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
              style={{
                backgroundColor: `${a.hex}22`,
                borderColor: `${a.hex}44`,
                borderWidth: 1,
                color: a.hex,
              }}
            >
              {data.placeholder === 'cake' ? '🧁' : data.placeholder === 'model' ? '✦' : '🪑'}
            </div>
            <div>
              <h3 className="font-display font-bold text-2xl text-white tracking-tight">
                {data.name}
              </h3>
              <p className="text-xs text-white/60">{data.domain}</p>
            </div>
          </div>

          <p className="text-white/60 text-sm leading-relaxed mb-6">
            {data.description}
          </p>

          <div className="space-y-2.5 mb-8">
            {data.features.map((feat, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 transition-all duration-500 ${
                  inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-[10px]'
                }`}
                style={{ transitionDelay: `${300 + i * 80}ms` }}
              >
                <div
                  className="w-1 h-1 rounded-full flex-shrink-0"
                  style={{ backgroundColor: `${a.hex}b3` }}
                />
                <span className="text-sm text-white/60">{feat}</span>
              </div>
            ))}
          </div>

          <div className="w-full h-px bg-white/6 mb-6" />

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-auto">
            <div className="flex flex-wrap gap-3 sm:gap-6">
              {data.metrics.map((m, i) => (
                <div key={i}>
                  <p className="font-display font-bold text-base mb-0.5" style={{ color: a.hex }}>
                    {m.value}
                  </p>
                  <p className="text-[11px] text-white/60">{m.label}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {data.tags.map(tag => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-full text-[10px] font-medium
                             bg-white/4 border border-white/8 text-white/60"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {data.url && (
            <div className="mt-6 pt-4 border-t border-white/6">
              <a
                href={data.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="flex items-center gap-2.5 text-sm font-medium
                            transition-colors duration-300 group/btn"
                  style={{ color: `${a.hex}cc` }}
                >
                  <span>Siteyi Ziyaret Et</span>
                  <span
                    className="w-7 h-7 rounded-full border flex items-center justify-center
                               transition-colors duration-300"
                    style={{ borderColor: `${a.hex}44` }}
                  >
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                      <path d="M2 9L9 2M9 2H4M9 2v5"
                        stroke="currentColor" strokeWidth="1.5"
                        strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </button>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function References() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const { ref, inView } = useInView()
  const total = references.length

  const goTo = (i) => {
    setCurrentIndex(Math.max(0, Math.min(i, total - 1)))
  }

  const goNext = () => {
    if (currentIndex < total - 1) setCurrentIndex((p) => p + 1)
  }

  const goPrev = () => {
    if (currentIndex > 0) setCurrentIndex((p) => p - 1)
  }

  const handleDragEnd = (_, { offset, velocity }) => {
    const swipe = Math.abs(offset.x) * velocity.x
    if (swipe < -500 && currentIndex < total - 1) {
      setCurrentIndex((p) => p + 1)
    } else if (swipe > 500 && currentIndex > 0) {
      setCurrentIndex((p) => p - 1)
    }
  }

  return (
    <section id="references" className="relative bg-black section-pad overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[400px]
                        bg-purple-900/8 blur-[180px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[300px]
                        bg-gold-500/4 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div
          ref={ref}
          className={`mb-16 transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[30px]'
          }`}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-gold-500" />
            <span className="text-xs tracking-[0.25em] uppercase text-gold-400 font-medium">
              Referanslar
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl
                           tracking-tight leading-tight">
              <span className="text-white">Sonuçlar</span>
              <br />
              <span className="text-gold-gradient">konuşuyor.</span>
            </h2>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs md:text-right">
              Gerçek projeler, gerçek büyüme.
              Her biri sektöründe dijitalin gücünü kanıtlıyor.
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-2xl relative">
            <motion.div
              className="flex"
              animate={{ x: `-${(currentIndex / total) * 100}%` }}
              transition={{ type: 'spring', stiffness: 320, damping: 30 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.08}
              onDragEnd={handleDragEnd}
            >
              {references.map((data, i) => (
                <div key={data.id} className="min-w-full shrink-0">
                  <ReferenceCard data={data} index={i} inView={inView} />
                </div>
              ))}
            </motion.div>

            <button
              onClick={goPrev}
              className={`absolute left-3 top-1/2 -translate-y-1/2 z-20
                         w-11 h-11 rounded-full bg-black/60 backdrop-blur-sm
                         border border-white/10 flex items-center justify-center
                         text-white/70 hover:text-white hover:bg-black/80
                         hover:border-white/20 transition-all duration-300 ${
                currentIndex === 0 ? 'opacity-0 pointer-events-none' : ''
              }`}
              aria-label="Önceki referans"
              style={{ touchAction: 'manipulation' }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5"
                  strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              onClick={goNext}
              className={`absolute right-3 top-1/2 -translate-y-1/2 z-20
                         w-11 h-11 rounded-full bg-black/60 backdrop-blur-sm
                         border border-white/10 flex items-center justify-center
                         text-white/70 hover:text-white hover:bg-black/80
                         hover:border-white/20 transition-all duration-300 ${
                currentIndex === total - 1 ? 'opacity-0 pointer-events-none' : ''
              }`}
              aria-label="Sonraki referans"
              style={{ touchAction: 'manipulation' }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5"
                  strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 mt-10">
          {references.map((data, i) => (
            <button
              key={data.id}
              onClick={() => goTo(i)}
              className="transition-all duration-500 rounded-full p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label={`${data.name} referansına git`}
            >
              {i === currentIndex ? (
                <span className="block w-8 h-2 rounded-full bg-gold-500" />
              ) : (
                <span className="block w-2 h-2 rounded-full bg-white/20
                                 hover:bg-white/40 transition-colors duration-300" />
              )}
            </button>
          ))}
        </div>

        <p
          className={`text-center text-xs text-white/55 mt-10 tracking-wide transition-all duration-[800ms] ${
            inView ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDelay: '0.5s' }}
        >
          Özkan Mobilya showcase amaçlıdır.
          Utsuri AI ve Miss Butik Pasta canlı ve aktif referanslardır.
        </p>
      </div>
    </section>
  )
}
