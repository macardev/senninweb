import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useIsMobile } from '@/hooks/useIsMobile'
import useInView from '@/hooks/useInView'

const services = [
  {
    number: '01',
    title: 'Web Tasarım',
    subtitle: 'Etkileyici Dijital Deneyimler',
    description:
      'Rakiplerinizden sıyrılan, ziyaretçilerinizi müşteriye dönüştüren premium web siteleri tasarlıyoruz. Her piksel özenle yerleştirilir.',
    features: [
      'Mobil öncelikli tasarım',
      '3D animasyon & interaktif efektler',
      'Hızlı yükleme optimizasyonu',
      'Özel kurumsal kimlik entegrasyonu',
    ],
    accent: 'Web',
    accentRest: 'Tasarım',
  },
  {
    number: '02',
    title: 'SEO & Büyüme',
    subtitle: 'Google\'da Üst Sıralara Çıkın',
    description:
      'Güzel bir site yetmez — bulunabilir olması gerekir. Yerel SEO uzmanlığımızla işletmenizi arama sonuçlarının tepesine taşıyoruz.',
    features: [
      'Yerel SEO optimizasyonu',
      'Anahtar kelime stratejisi',
      'Aylık performans raporu',
      'Google Business Profile yönetimi',
    ],
    accent: 'SEO',
    accentRest: '& Büyüme',
  },
  {
    number: '03',
    title: 'Kurumsal Kimlik',
    subtitle: 'Marka Kimliğinizi İnşa Edin',
    description:
      'Logo, kartvizit, sosyal medya şablonları — tutarlı ve premium bir marka kimliğiyle rakiplerinizden kalıcı olarak ayrışın.',
    features: [
      'Logo tasarımı',
      'Kartvizit & basılı materyaller',
      'Sosyal medya şablonları',
      'Marka rehberi (brand guide)',
    ],
    accent: 'Kurumsal',
    accentRest: 'Kimlik',
  },
]

function ServiceCard({ service, index }) {
  const isMobile = useIsMobile()
  const { ref, inView } = useInView()
  const cardRef = useRef(null)

  // Only use scroll parallax on desktop (not on mobile for better performance)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  })

  // Skip parallax on mobile - use dummy value
  const y = isMobile ? 0 : useTransform(scrollYProgress, [0, 1], [60, -60])

  return (
    <motion.div
      ref={(el) => {
        ref.current = el
        cardRef.current = el
      }}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.9,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative"
    >
      {/* Kart */}
      <div className="relative p-8 md:p-10 rounded-2xl border border-white/6
                      bg-white/[0.02] hover:bg-white/[0.04]
                      hover:border-gold-500/20
                      transition-all duration-500 overflow-hidden">

        {/* Hover glow */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100
                        transition-opacity duration-700 pointer-events-none"
          style={{
            background: 'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(217,119,6,0.06), transparent 40%)'
          }}
        />

        {/* Numara */}
        <div className="flex items-start justify-between mb-8">
          <span className="text-[10px] tracking-[0.3em] uppercase text-gold-500/60 font-medium">
            {service.number}
          </span>
          {/* Ok ikonu — hover'da görünür */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: index * 0.15 + 0.4, duration: 0.6 }}
            className="w-9 h-9 rounded-full border border-white/10
                       group-hover:border-gold-500/40
                       flex items-center justify-center
                       transition-colors duration-300"
          >
            <svg
              width="14" height="14" viewBox="0 0 14 14" fill="none"
              className="text-white/30 group-hover:text-gold-400 transition-colors duration-300"
            >
              <path
                d="M3 7h8M7 3l4 4-4 4"
                stroke="currentColor" strokeWidth="1.5"
                strokeLinecap="round" strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </div>

        {/* Başlık */}
        <div className="mb-4">
          <h3 className="font-display font-bold text-3xl md:text-4xl tracking-tight mb-2">
            <span className="text-gold-gradient">{service.accent}</span>
            <span className="text-white"> {service.accentRest}</span>
          </h3>
          <p className="text-xs tracking-[0.15em] uppercase text-white/35">
            {service.subtitle}
          </p>
        </div>

        {/* Açıklama */}
        <p className="text-white/55 text-sm leading-relaxed mb-8 max-w-sm">
          {service.description}
        </p>

        {/* Ayraç */}
        <div className="w-full h-px bg-white/6 mb-8" />

        {/* Özellikler */}
        <ul className="space-y-3">
          {service.features.map((feat, i) => (
            <li key={i} className="flex items-center gap-3 text-sm text-white/45">
              <span className="w-1 h-1 rounded-full bg-gold-500/70 flex-shrink-0" />
              {feat}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

export default function Services() {
  const isMobile = useIsMobile()
  const { ref, inView } = useInView()

  return (
    <section id="services" className="relative bg-black section-pad">

      {/* Arka plan efekti */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full
                        bg-gold-500/3 blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full
                        bg-gold-600/3 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Section header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-gold-500" />
            <span className="text-xs tracking-[0.25em] uppercase text-gold-500/70 font-medium">
              Hizmetler
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="font-display font-bold text-5xl md:text-6xl tracking-tight leading-tight">
              <span className="text-white">Tek çatı altında</span>
              <br />
              <span className="text-gold-gradient">her şey dahil.</span>
            </h2>

            <p className="text-white/40 text-sm leading-relaxed max-w-xs md:text-right">
              Web siteniz, SEO'nuz ve marka kimliğiniz —
              hepsini birlikte, hepsini premium kalitede sunuyoruz.
            </p>
          </div>
        </motion.div>

        {/* Kartlar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <ServiceCard key={service.number} service={service} index={i} />
          ))}
        </div>

        {/* Alt CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 flex flex-col sm:flex-row items-center justify-between
                     gap-6 p-8 rounded-2xl border border-white/6 bg-white/[0.02]"
        >
          <div>
            <p className="font-display font-semibold text-xl text-white mb-1">
              Hangi paketi seçeceğinizi bilmiyor musunuz?
            </p>
            <p className="text-sm text-white/40">
              Size özel ücretsiz danışmanlık için ulaşın.
            </p>
          </div>
          <a href="#contact">
            <motion.button
              whileHover={isMobile ? {} : { scale: 1.03 }}
              whileTap={isMobile ? {} : { scale: 0.97 }}
              className="relative flex-shrink-0 px-7 py-3.5 rounded-full
                         font-medium text-sm tracking-wide overflow-hidden group"
            >
              <span className="absolute inset-0 rounded-full bg-gold-500
                               group-hover:bg-gold-400 transition-colors duration-300" />
              <span className="relative z-10 text-black font-semibold">
                Ücretsiz Danış
              </span>
            </motion.button>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
