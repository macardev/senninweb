import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useIsMobile } from '@/hooks/useIsMobile'

const words = [
  'Güzel',
  'görünmek',
  'yetmez',
  '—',
  'Google\'da',
  'da',
  'görünmek',
  'lazım.',
]

export default function Manifesto() {
  const isMobile = useIsMobile()
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  // Disable spring animation on mobile
  const smooth = isMobile ? scrollYProgress : useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    mass: 0.5,
  })

  // Section scale ve opacity (disable on mobile)
  const opacity = isMobile ? 1 : useTransform(smooth, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale   = isMobile ? 1 : useTransform(smooth, [0, 0.2, 0.8, 1], [0.92, 1, 1, 0.95])

  return (
    <section
      ref={containerRef}
      className="relative w-full py-48 px-6 md:px-12 overflow-hidden bg-black"
    >
      {/* Arka plan glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                        w-[600px] h-[300px] rounded-full
                        bg-gold-500/5 blur-[120px]" />
      </div>

      {/* Üst çizgi */}
      <div className="max-w-7xl mx-auto mb-20">
        <div className="gold-line opacity-20" />
      </div>

      {/* Manifesto metni */}
      <motion.div
        style={{ opacity, scale }}
        className="max-w-6xl mx-auto"
      >
        {/* Küçük etiket */}
        <div className="flex items-center gap-3 mb-12">
          <span className="w-8 h-px bg-gold-500" />
          <span className="text-xs tracking-[0.25em] uppercase text-gold-500/70 font-medium">
            Felsefemiz
          </span>
        </div>

        {/* Kelime bazlı animasyonlu metin */}
        <WordReveal progress={smooth} isMobile={isMobile} />
      </motion.div>

      {/* Alt çizgi */}
      <div className="max-w-7xl mx-auto mt-20">
        <div className="gold-line opacity-20" />
      </div>
    </section>
  )
}

function WordReveal({ progress, isMobile }) {
  return (
    <h2 className="font-display font-bold text-4xl md:text-6xl lg:text-7xl leading-tight tracking-tight flex flex-wrap gap-x-[0.25em] gap-y-2">
      {words.map((word, i) => (
        <AnimatedWord
          key={i}
          word={word}
          index={i}
          total={words.length}
          progress={progress}
          isMobile={isMobile}
        />
      ))}
    </h2>
  )
}

function AnimatedWord({ word, index, total, progress, isMobile }) {
  // Skip scroll animations on mobile for better performance
  const start = 0.15 + (index / total) * 0.35
  const end   = start + 0.15

  const opacity = isMobile ? 1 : useTransform(progress, [start, end], [0.1, 1])
  const y       = isMobile ? 0 : useTransform(progress, [start, end], [20, 0])
  const color   = isMobile ? undefined : useTransform(
    progress,
    [start, end],
    ['rgba(255,255,255,0.15)', 'rgba(245,245,245,1)']
  )

  // "—" işareti altın rengi
  const isAccent = word === '—'
  // Son 2 kelime altın rengi
  const isGold   = index >= total - 2

  return (
    <motion.span
      style={{
        opacity,
        y,
        color: isAccent || isGold ? undefined : color,
        willChange: isMobile ? 'auto' : 'opacity, transform, color'
      }}
      className={`inline-block ${
        isAccent ? 'text-gold-500' :
        isGold   ? 'text-gold-gradient' : ''
      }`}
    >
      {word}
    </motion.span>
  )
}
