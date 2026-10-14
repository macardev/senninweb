import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { PHONE_HREF, GUIDE_PATH, whatsappHref, whatsappMessageFor } from "@/utils/leads"
import WhatsAppIcon from "@/components/ui/WhatsAppIcon"

const NUDGE_KEY = "sw_nudge_dismissed"
const NUDGE_DELAY_MS = 30000

function readDismissed() {
  try { return sessionStorage.getItem(NUDGE_KEY) === "1" } catch { return false }
}

export default function LeadDock() {
  const location = useLocation()
  const [visible, setVisible] = useState(false)
  const [nudge, setNudge] = useState(false)
  const [dismissed, setDismissed] = useState(readDismissed)

  const waHref = whatsappHref(whatsappMessageFor(location.pathname))

  // Show after the hero; hide while the contact section is on screen (it has its own CTAs)
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const pastHero = window.scrollY > window.innerHeight * 0.6
      const contact = document.getElementById("contact")
      let contactInView = false
      if (contact) {
        const r = contact.getBoundingClientRect()
        contactInView = r.top < window.innerHeight * 0.75 && r.bottom > 0
      }
      setVisible(pastHero && !contactInView)
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [location.pathname])

  useEffect(() => {
    if (dismissed) return
    const id = setTimeout(() => setNudge(true), NUDGE_DELAY_MS)
    return () => clearTimeout(id)
  }, [dismissed])

  const dismissNudge = () => {
    setNudge(false)
    setDismissed(true)
    try { sessionStorage.setItem(NUDGE_KEY, "1") } catch { /* storage unavailable */ }
  }

  // The guide page is itself the lead magnet, so don't nudge toward it there
  const onGuide = location.pathname.startsWith(GUIDE_PATH)
  const showNudge = visible && nudge && !dismissed && !onGuide

  return (
    <>
      {/* Desktop: floating WhatsApp button + one-time nudge */}
      <div
        data-lead-zone="dock-desktop"
        className={`lead-dock hidden md:flex fixed bottom-6 right-6 z-[60] flex-col items-end gap-3 ${visible ? "is-visible" : ""}`}
        aria-hidden={!visible}
      >
        {showNudge && (
          <div className="lead-nudge relative w-72 rounded-2xl border border-gold-500/25 bg-surface-100/95 backdrop-blur-md p-4 pr-9 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)]">
            <button
              type="button"
              onClick={dismissNudge}
              aria-label="Kapat"
              className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full text-white/50 hover:text-white hover:bg-white/10 flex items-center justify-center text-sm"
            >
              ×
            </button>
            <p className="text-sm text-white font-medium leading-snug mb-1">
              Kliniğinize yurt dışından hasta mı çekmek istiyorsunuz?
            </p>
            <p className="text-xs text-white/60 leading-relaxed mb-3">
              15 sayfalık ücretsiz rehberde tüm sistemi adım adım anlattık.
            </p>
            <Link
              to={GUIDE_PATH}
              data-lead-placement="nudge"
              onClick={dismissNudge}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold-300 hover:text-gold-400"
            >
              Rehberi ücretsiz indir
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        )}

        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={visible ? 0 : -1}
          data-lead-placement="dock-fab"
          className="lead-fab group relative flex items-center gap-0 h-14 pl-4 pr-4 rounded-full bg-[#25D366] text-white shadow-[0_12px_40px_-8px_rgba(37,211,102,0.55)] hover:gap-2.5 hover:pr-6"
          aria-label="WhatsApp'tan yazın"
        >
          <span className="lead-fab-ring" aria-hidden="true" />
          <WhatsAppIcon size={24} />
          <span className="lead-fab-label text-sm font-semibold whitespace-nowrap">
            WhatsApp'tan yazın
          </span>
        </a>
      </div>

      {/* Mobile: sticky action bar */}
      <div
        data-lead-zone="dock-mobile"
        className={`lead-dock md:hidden fixed inset-x-0 bottom-0 z-[60] px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 bg-gradient-to-t from-black via-black/95 to-black/0 ${visible ? "is-visible" : ""}`}
        aria-hidden={!visible}
      >
        <div className="grid grid-cols-[1.4fr_0.8fr_1.2fr] gap-2">
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={visible ? 0 : -1}
            data-lead-placement="mobile-bar"
            className="flex items-center justify-center gap-2 h-12 rounded-xl bg-[#25D366] text-white text-sm font-semibold active:scale-[0.97] transition-transform duration-150"
          >
            <WhatsAppIcon size={18} />
            WhatsApp
          </a>
          <a
            href={PHONE_HREF}
            tabIndex={visible ? 0 : -1}
            data-lead-placement="mobile-bar"
            className="flex items-center justify-center h-12 rounded-xl border border-white/15 bg-white/[0.04] text-white text-sm font-medium active:scale-[0.97] transition-transform duration-150"
          >
            Ara
          </a>
          <Link
            to={GUIDE_PATH}
            tabIndex={visible ? 0 : -1}
            data-lead-placement="mobile-bar"
            className="flex items-center justify-center h-12 rounded-xl bg-gold-500 text-black text-sm font-semibold active:scale-[0.97] transition-transform duration-150"
          >
            Ücretsiz Rehber
          </Link>
        </div>
      </div>
    </>
  )
}
