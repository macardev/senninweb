export function initMeshPointer() {
  if (typeof window === "undefined") return
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return

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
