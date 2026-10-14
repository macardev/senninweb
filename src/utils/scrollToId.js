// Lazily mounted sections above the target can still grow after we scroll
// (LazySection + Suspense), pushing the target down. Re-align a few times while
// the layout settles, unless the user has started scrolling on their own.
const SETTLE_CHECKS_MS = [350, 800, 1500, 2500]

function keepAligned(el, block) {
  let userScrolled = false
  const stop = () => { userScrolled = true }
  const opts = { passive: true, once: true }
  window.addEventListener("wheel", stop, opts)
  window.addEventListener("touchstart", stop, opts)
  window.addEventListener("keydown", stop, opts)

  SETTLE_CHECKS_MS.forEach((ms, i) => {
    setTimeout(() => {
      if (!userScrolled && el.isConnected && Math.abs(el.getBoundingClientRect().top) > 40) {
        el.scrollIntoView({ behavior: "auto", block })
      }
      if (i === SETTLE_CHECKS_MS.length - 1) {
        window.removeEventListener("wheel", stop)
        window.removeEventListener("touchstart", stop)
        window.removeEventListener("keydown", stop)
      }
    }, ms)
  })
}

export function scrollToIdWithRetry(id, { behavior = "smooth", block = "start", maxAttempts = 240 } = {}) {
  if (typeof document === "undefined") return

  let attempts = 0

  const tick = () => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior, block })
      keepAligned(el, block)
      return
    }

    // Target may be a lazily mounted section (LazySection): ask them all to mount
    if (attempts === 0) window.dispatchEvent(new Event("sw:mount-all"))
    attempts += 1
    if (attempts < maxAttempts) requestAnimationFrame(tick)
  }

  requestAnimationFrame(tick)
}
