export function initMeshPointer() {
  if (typeof window === "undefined") return
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return
  // lite/off tiers hide the glow layer (index.css), so skip the pointer work too
  if (document.documentElement.dataset.motion !== "full") return

  let rafId = null

  document.addEventListener("pointermove", (e) => {
    if (rafId) return
    rafId = requestAnimationFrame(() => {
      document.documentElement.style.setProperty("--x", e.clientX + "px")
      document.documentElement.style.setProperty("--y", e.clientY + "px")
      rafId = null
    })
  }, { passive: true })
}
