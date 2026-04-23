import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import TorusScene from '@/components/three/TorusScene'

const fadeUp = {
  hidden:  { opacity: 0, y: 40,  filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0,   filter: 'blur(0px)' },
}

const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative w-full h-screen min-h-[700px] flex items-center overflow-hidden bg-black"
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
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="max-w-2xl"
        >
          {/* Üst etiket */}
          <motion.div variants={fadeUp} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
            <span className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.2em] uppercase text-gold-500 mb-8">
              <span className="w-8 h-px bg-gold-500" />
              Premium Web Tasarım & SEO
            </span>
          </motion.div>

          {/* Ana başlık */}
          <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="font-display font-bold leading-[1.05] tracking-tight mb-6"
            >
              <span className="block text-5xl md:text-6xl lg:text-7xl text-white">
                İşletmeniz için
              </span>
              <span className="block text-5xl md:text-6xl lg:text-7xl text-white">
                profesyonel 
              </span>
              <span className="block text-5xl md:text-6xl lg:text-7xl text-gold-gradient">
                web tasarım ve Seo hizmeti
              </span>
          </motion.h1>

          {/* Alt açıklama */}
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-base md:text-lg text-white/50 leading-relaxed mb-10 max-w-lg"
          >
            Etkileyici web tasarımı ve güçlü SEO ile işletmenizi dijitalde
            rakiplerinizin önüne geçiriyoruz.
          </motion.p>

          {/* CTA Butonlar */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-4"
          >
            {/* Primary CTA */}
            <a href="#contact">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="relative px-8 py-4 rounded-full font-medium text-sm tracking-wide overflow-hidden group"
              >
                <span className="absolute inset-0 rounded-full bg-gold-500 group-hover:bg-gold-400 transition-colors duration-300" />
                <span className="relative z-10 text-black font-semibold">
                  Ücretsiz Teklif Al
                </span>
              </motion.button>
            </a>

            {/* Secondary CTA */}
            <a href="#references">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2.5 text-sm font-medium text-white/60 hover:text-white transition-colors duration-300 group"
              >
                <span className="w-10 h-10 rounded-full border border-white/15 group-hover:border-white/40 flex items-center justify-center transition-colors duration-300">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                Çalışmalarımızı Gör
              </motion.button>
            </a>
          </motion.div>

          {/* Alt metrik bar */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-8 mt-16 pt-8 border-t border-white/8"
          >
            {[
              { value: '48s',  label: 'Ortalama yanıt süresi' },
              { value: 'SEO',  label: 'Dahil her pakette'     },
              { value: '100%', label: 'Müşteri memnuniyeti'   },
            ].map((item) => (
              <div key={item.label}>
                <p className="font-display font-bold text-xl text-white mb-0.5">
                  {item.value}
                </p>
                <p className="text-xs text-white/35 tracking-wide">
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
