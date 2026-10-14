// Adaptive motion: <html data-motion="full|lite|off">.
// The initial tier is set by an inline script in index.html before first paint
// (reduced-motion, Save-Data / slow network, low RAM / few cores). After load we
// measure real frame times once and downgrade "full" to "lite" if the device drops
// frames, so the 3D effects never make the site stutter. CSS in index.css reads the
// attribute; JS effects call getMotionTier() before attaching pointer/scroll work.

const KEY = "sw_motion"

export function getMotionTier() {
  if (typeof document === "undefined") return "full"
  return document.documentElement.dataset.motion || "full"
}

function setTier(tier) {
  document.documentElement.dataset.motion = tier
  try { sessionStorage.setItem(KEY, tier) } catch { /* storage unavailable */ }
}

// Samples ~1s of animation frames while the page is idle and visible.
function probeFrameRate() {
  if (getMotionTier() !== "full" || document.hidden) return
  const deltas = []
  let last = performance.now()
  const tick = (now) => {
    deltas.push(now - last)
    last = now
    if (deltas.length < 60) {
      requestAnimationFrame(tick)
      return
    }
    deltas.sort((a, b) => a - b)
    const p75 = deltas[Math.floor(deltas.length * 0.75)]
    const slowShare = deltas.filter((d) => d > 34).length / deltas.length
    // ~30fps or worse for a quarter of frames: keep the site smooth, drop the heavy layers
    if (p75 > 28 || slowShare > 0.25) setTier("lite")
  }
  requestAnimationFrame(tick)
}

export function initMotionTier() {
  if (typeof window === "undefined") return
  const start = () => {
    const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 1500))
    idle(probeFrameRate, { timeout: 4000 })
  }
  if (document.readyState === "complete") start()
  else window.addEventListener("load", start, { once: true })

  // Reduced-motion can change while the page is open
  window.matchMedia("(prefers-reduced-motion: reduce)").addEventListener("change", (e) => {
    document.documentElement.dataset.motion = e.matches ? "off" : (sessionStorage.getItem(KEY) || "full")
  })
}
