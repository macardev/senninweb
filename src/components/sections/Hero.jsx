import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useIsMobile } from '@/hooks/useIsMobile'
import { usePerformanceMode } from '@/hooks/usePerformanceMode'

const fadeUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
}

// Mobile optimized: no blur, simpler animation
const fadeUpMobile = {
  hidden:  { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0 },
}

const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

// Mobile optimized: much faster stagger
const staggerMobile = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.03, delayChildren: 0 } },
}

export default function Hero() {
  const isMobile = useIsMobile()
  const { animationDuration } = usePerformanceMode()

  return (
    <section
      id="hero"
      className="relative w-full h-screen min-h-[700px] flex items-center overflow-hidden bg-black"
      style={{ willChange: 'contents' }}
    >
      {/* 3D Torus — sağ taraf */}
      {/* <div className="absolute right-0 top-0 w-full md:w-[55%] h-full opacity-90">
        <TorusScene />
      </div> */}

      {/* Gradient — sol tarafa geçiş */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-transparent pointer-events-none" />

      {/* Alt gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-40
                      bg-gradient-to-t from-black to-transparent pointer-events-none" />

      {/* İçerik */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
        <motion.div
          variants={isMobile ? staggerMobile : stagger}
          initial="hidden"
          animate="visible"
          className="max-w-2xl"
        >
          {/* Üst etiket */}
          <motion.div 
            variants={isMobile ? fadeUpMobile : fadeUp} 
            transition={{ duration: isMobile ? 0.4 : 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.2em] uppercase text-gold-500 mb-8">
              <span className="w-8 h-px bg-gold-500" />
              Premium Web Tasarım & SEO
            </span>
          </motion.div>

          {/* Ana başlık */}
          <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: isMobile ? 0.3 : 0.5, delay: isMobile ? 0 : 0.05 }}
              style={{ willChange: 'transform, opacity' }}
              className="font-display font-bold leading-[1.05] tracking-tight mb-6 max-w-full overflow-hidden break-words"
            >
              <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white break-words overflow-wrap-break-word">
                İşletmeniz için
              </span>
              <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white break-words overflow-wrap-break-word">
                profesyonel 
              </span>
              <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-gold-gradient break-words overflow-wrap-break-word">
                web tasarım ve Seo hizmeti
              </span>
          </motion.h1>

          {/* Alt açıklama */}
          <motion.p
            variants={isMobile ? fadeUpMobile : fadeUp}
            transition={{ duration: isMobile ? 0.4 : 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-base md:text-lg text-white/50 leading-relaxed mb-10 max-w-lg break-words overflow-wrap-break-word max-w-full"
          >
            Etkileyici web tasarımı ve güçlü SEO ile işletmenizi dijitalde
            rakiplerinizin önüne geçiriyoruz.
          </motion.p>

          {/* CTA Butonlar */}
          <motion.div
            variants={isMobile ? fadeUpMobile : fadeUp}
            transition={{ duration: isMobile ? 0.4 : 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row flex-wrap items-center gap-3 sm:gap-4 max-w-full overflow-hidden"
          >
            {/* Primary CTA - Teklif Al */}
            <a href="#contact" className="w-full sm:w-auto">
              <motion.button
                whileHover={isMobile ? {} : { scale: 1.03 }}
                whileTap={isMobile ? {} : { scale: 0.97 }}
                className="w-full sm:w-auto relative px-8 sm:px-10 py-4 sm:py-5 rounded-full font-medium text-base tracking-wide overflow-hidden group"
              >
                <span className="absolute inset-0 rounded-full bg-gold-500 group-hover:bg-gold-400 transition-colors duration-300" />
                <span className="relative z-10 text-black font-semibold whitespace-nowrap">
                  Ücretsiz Teklif Al
                </span>
              </motion.button>
            </a>

            {/* Secondary CTA - Blog */}
            <a href="/blog" className="w-full sm:w-auto">
              <motion.button
                whileHover={isMobile ? {} : { scale: 1.03 }}
                whileTap={isMobile ? {} : { scale: 0.97 }}
                className="w-full sm:w-auto flex items-center justify-center sm:justify-start gap-2.5 px-8 sm:px-10 py-4 sm:py-5 rounded-full border border-white/20 hover:border-white/40 text-base font-medium text-white/70 hover:text-white transition-all duration-300 group"
              >
                <span className="whitespace-nowrap">Blog'a Git</span>
              </motion.button>
            </a>
          </motion.div>

          {/* Alt metrik bar */}
          <motion.div
            variants={isMobile ? fadeUpMobile : fadeUp}
            transition={{ duration: isMobile ? 0.4 : 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mt-16 pt-8 border-t border-white/8 max-w-full overflow-hidden"
          >
            {[
              { value: '48s',  label: 'Ortalama yanıt süresi' },
              { value: 'SEO',  label: 'Dahil her pakette'     },
              { value: '100%', label: 'Müşteri memnuniyeti'   },
            ].map((item) => (
              <div key={item.label} className="min-w-0">
                <p className="font-display font-bold text-lg sm:text-xl text-white mb-0.5 break-words">
                  {item.value}
                </p>
                <p className="text-xs text-white/35 tracking-wide break-words">
                  {item.label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      {/* <div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-white/25">
          Kaydır
        </span>
        <div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-white/25 to-transparent"
        />
      </div> */}
    </section>
  )
}
