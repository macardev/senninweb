import React, { useState, useEffect } from 'react'
import { motion, useScroll } from 'framer-motion'
import { Link, useLocation, useNavigate } from "react-router-dom"
import { scrollToIdWithRetry } from "@/utils/scrollToId"

const navLinks = [
  { label: 'Hizmetler',   href: '/#services' },
  { label: 'Referanslar', href: '/#references' },
  { label: 'İletişim',    href: '/#contact' },
  { label: 'Dijital Rehber', href: '/blog' }
]

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const { scrollY } = useScroll()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    // Throttle scroll event to avoid excessive state updates
    let lastUpdate = 0
    const throttleDelay = 100
    
    const unsub = scrollY.on('change', v => {
      const now = Date.now()
      if (now - lastUpdate > throttleDelay) {
        setScrolled(v > 50)
        lastUpdate = now
      }
    })
    return unsub
  }, [scrollY])

  const handleNav = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)

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
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0,    opacity: 1  }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-black/80 backdrop-blur-xl border-b border-white/5 py-4'
          : 'bg-transparent py-7'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">

        {/* Logo */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault()
            setMenuOpen(false)
            if (location.pathname !== "/") navigate("/")
            setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 0)
          }}
          className="flex items-center gap-3 group"
        >
          {/* İkon: dönen halka referansı */}
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 rounded-full border border-gold-500/60 group-hover:border-gold-400 transition-colors duration-300" />
            <div className="absolute inset-[5px] rounded-full bg-gold-500/20 group-hover:bg-gold-500/30 transition-colors duration-300" />
            <div className="absolute inset-[9px] rounded-full bg-gold-500 group-hover:scale-110 transition-transform duration-300" />
          </div>
          <span className="font-display font-bold text-lg tracking-tight text-white">
            Sennin<span className="text-gold-gradient">Web</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-10">
         {navLinks.map(link => {

          const isRoute = link.href.startsWith("/")

          if (isRoute) {
            return (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm font-medium text-white/50 hover:text-white transition-colors duration-300 tracking-wide"
              >
                {link.label}
              </Link>
            )
          }

            return (
              <a
                key={link.href}
                href={link.href}
                onClick={e => handleNav(e, link.href)}
                className="text-sm font-medium text-white/50 hover:text-white transition-colors duration-300 tracking-wide"
              >
                {link.label}
              </a>
            )
          })}
        </nav>

        {/* CTA */}
        <div className="hidden md:block">
          <a href="/#contact" onClick={e => handleNav(e, '/#contact')}>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{  scale: 0.97 }}
              className="relative px-6 py-2.5 text-sm font-medium tracking-wide overflow-hidden group"
            >
              {/* Border */}
              <span className="absolute inset-0 rounded-full border border-gold-500/50 group-hover:border-gold-400 transition-colors duration-300" />
              {/* Gold fill on hover */}
              <span className="absolute inset-0 rounded-full bg-gold-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
              {/* Text */}
              <span className="relative z-10 text-gold-400 group-hover:text-black transition-colors duration-300">
                Teklif Al
              </span>
            </motion.button>
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-2 z-50"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Menüyü aç"
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            className="block w-6 h-px bg-white origin-center"
            transition={{ duration: 0.3 }}
          />
          <motion.span
            animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            className="block w-6 h-px bg-white"
            transition={{ duration: 0.3 }}
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            className="block w-6 h-px bg-white origin-center"
            transition={{ duration: 0.3 }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={menuOpen
          ? { opacity: 1, height: 'auto', pointerEvents: 'auto' }
          : { opacity: 0, height: 0,      pointerEvents: 'none' }
        }
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="md:hidden overflow-hidden bg-black/95 backdrop-blur-xl border-t border-white/5"
      >
        <div className="px-6 py-8 flex flex-col gap-7">
          {navLinks.map(link => {
            const isRoute = link.href.startsWith("/")
            const isSection = link.href.startsWith("/#")

            if (isSection) {
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNav(e, link.href)}
                  className="text-xl font-display font-semibold text-white/70 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              )
            }

            if (isRoute) {
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-xl font-display font-semibold text-white/70 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              )
            }

            return (
              <a
                key={link.href}
                href={link.href}
                onClick={e => handleNav(e, link.href)}
                className="text-xl font-display font-semibold text-white/70 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            )
          })}
          <a href="/#contact" onClick={e => handleNav(e, '/#contact')}>
            <button className="w-full py-3.5 rounded-full border border-gold-500/50 text-gold-400 text-sm font-medium tracking-wide">
              Teklif Al
            </button>
          </a>
        </div>
      </motion.div>
    </motion.header>
  )
}
