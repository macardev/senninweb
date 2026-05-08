import { useState, useEffect, useRef, useCallback } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom"
import { scrollToIdWithRetry } from "@/utils/scrollToId"

const navLinks = [
  { label: 'Hizmetler',   href: '/#services' },
  { label: 'Referanslar', href: '/#references' },
  { label: 'İletişim',    href: '/#contact' },
  { label: 'Dijital Rehber', href: '/blog' },
  {
    label: 'Hizmet Verdiğimiz Bölgeler',
    href: '#',
    submenu: [
      { label: 'Gebze', href: '/gebze' },
      { label: 'Kocaeli (Yakında)', href: '#', disabled: true },
      { label: 'İstanbul (Yakında)', href: '#', disabled: true },
      { label: 'Bursa (Yakında)', href: '#', disabled: true },
    ]
  }
]

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [regionsOpen, setRegionsOpen] = useState(false)
  const [mobileRegionsOpen, setMobileRegionsOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const scrollRAF = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRAF.current) return
      scrollRAF.current = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 50)
        scrollRAF.current = null
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollRAF.current) cancelAnimationFrame(scrollRAF.current)
    }
  }, [])

  const handleNav = useCallback((e, href) => {
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
  }, [location.pathname, navigate])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 animate-slideDown ${
        scrolled
          ? 'bg-black/80 backdrop-blur-xl border-b border-white/5 py-4'
          : 'bg-transparent py-7'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">

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
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 rounded-full border border-gold-500/60 group-hover:border-gold-400 transition-colors duration-300" />
            <div className="absolute inset-[5px] rounded-full bg-gold-500/20 group-hover:bg-gold-500/30 transition-colors duration-300" />
            <div className="absolute inset-[9px] rounded-full bg-gold-500 group-hover:scale-110 transition-transform duration-300" />
          </div>
          <span className="font-display font-bold text-lg tracking-tight text-white">
            Sennin<span className="text-gold-gradient">Web</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-10">
         {navLinks.map(link => {
          if (link.submenu) {
            return (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => setRegionsOpen(true)}
                onMouseLeave={() => setRegionsOpen(false)}
              >
                <button
                  className="text-sm font-medium text-white/60 hover:text-white transition-colors duration-300 tracking-wide flex items-center gap-1"
                >
                  {link.label}
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {regionsOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-black/95 backdrop-blur-xl border border-white/10 rounded-xl py-2 z-50">
                    {link.submenu.map((item, idx) => {
                      if (item.disabled) {
                        return (
                          <span
                            key={idx}
                            className="block px-4 py-2 text-sm text-white/55 cursor-not-allowed"
                          >
                            {item.label}
                          </span>
                        )
                      }
                      return (
                        <Link
                          key={item.href}
                          to={item.href}
                          className="block px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors min-h-[44px] flex items-center"
                          onClick={() => setRegionsOpen(false)}
                        >
                          {item.label}
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          }

          const isRoute = link.href.startsWith("/")

          if (isRoute) {
            return (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm font-medium text-white/60 hover:text-white transition-colors duration-300 tracking-wide"
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
                className="text-sm font-medium text-white/60 hover:text-white transition-colors duration-300 tracking-wide"
              >
                {link.label}
              </a>
            )
          })}
        </nav>

        <div className="hidden md:block">
          <a href="/#contact" onClick={e => handleNav(e, '/#contact')}>
            <button
              className="relative px-8 py-3 text-base font-medium tracking-wide overflow-hidden group rounded-full hover:scale-[1.03] active:scale-[0.97] transition-transform duration-200"
            >
              <span className="absolute inset-0 rounded-full border border-gold-500/50 group-hover:border-gold-400 transition-colors duration-300" />
              <span className="absolute inset-0 rounded-full bg-gold-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
              <span className="relative z-10 text-gold-400 group-hover:text-black transition-colors duration-300">
                Teklif Al
              </span>
            </button>
          </a>
        </div>

        <button
          className="md:hidden flex flex-col gap-[5px] p-3 z-50 min-w-[44px] min-h-[44px] items-center justify-center"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Menüyü aç"
        >
          <span
            className={`block w-6 h-px bg-white origin-center transition-transform duration-300 ${
              menuOpen ? 'rotate-45 translate-y-[7px]' : ''
            }`}
          />
          <span
            className={`block w-6 h-px bg-white transition-all duration-300 ${
              menuOpen ? 'opacity-0 scale-x-0' : ''
            }`}
          />
          <span
            className={`block w-6 h-px bg-white origin-center transition-transform duration-300 ${
              menuOpen ? '-rotate-45 -translate-y-[7px]' : ''
            }`}
          />
        </button>
      </div>

      <div
        className={`md:hidden overflow-hidden bg-black/95 backdrop-blur-xl border-t border-white/5 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          menuOpen
            ? 'opacity-100 max-h-[600px] pointer-events-auto'
            : 'opacity-0 max-h-0 pointer-events-none'
        }`}
      >
        <div className="px-6 py-8 flex flex-col gap-7">
          {navLinks.map(link => {
            if (link.submenu) {
              return (
                <div key={link.label}>
                  <button
                    onClick={() => setMobileRegionsOpen(o => !o)}
                    className="text-xl font-display font-semibold text-white/70 hover:text-white transition-colors flex items-center gap-2 min-h-[44px]"
                  >
                    {link.label}
                    <svg className={`w-4 h-4 transition-transform duration-300 ${mobileRegionsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {mobileRegionsOpen && (
                    <div className="ml-4 mt-3 flex flex-col gap-3">
                      {link.submenu.map((item, idx) => {
                        if (item.disabled) {
                          return (
                            <span key={idx} className="text-lg text-white/55 cursor-not-allowed min-h-[44px] flex items-center">
                              {item.label}
                            </span>
                          )
                        }
                        return (
                          <Link
                            key={item.href}
                            to={item.href}
                            onClick={() => {
                              setMenuOpen(false)
                              setMobileRegionsOpen(false)
                            }}
                            className="text-lg text-white/70 hover:text-white transition-colors min-h-[44px] flex items-center"
                          >
                            {item.label}
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            }

            const isRoute = link.href.startsWith("/")
            const isSection = link.href.startsWith("/#")

            if (isSection) {
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    handleNav(e, link.href)
                    setMenuOpen(false)
                  }}
                  className="text-xl font-display font-semibold text-white/70 hover:text-white transition-colors min-h-[44px] flex items-center"
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
                  className="text-xl font-display font-semibold text-white/70 hover:text-white transition-colors min-h-[44px] flex items-center"
                >
                  {link.label}
                </Link>
              )
            }

            return (
              <a
                key={link.href}
                href={link.href}
                onClick={e => {
                  handleNav(e, link.href)
                  setMenuOpen(false)
                }}
                className="text-xl font-display font-semibold text-white/70 hover:text-white transition-colors min-h-[44px] flex items-center"
              >
                {link.label}
              </a>
            )
          })}
          <a href="/#contact" onClick={e => handleNav(e, '/#contact')}>
            <button className="w-full py-4 rounded-full border border-gold-500/50 text-gold-400 text-base font-medium tracking-wide hover:bg-gold-500/10 transition-colors">
              Teklif Al
            </button>
          </a>
        </div>
      </div>
    </header>
  )
}
