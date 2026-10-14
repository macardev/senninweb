import { useLayoutEffect } from "react"

// Prerendered pages ship their content as static HTML in #hero-host (postbuild.mjs)
// so it paints before JS. Each page calls this once its own content is rendered;
// swapping earlier would flash an empty page and shift the layout (CLS).
// On "/" the host holds the static hero, which <Hero /> adopts instead.
export default function useReleaseStaticBody(ready = true) {
  useLayoutEffect(() => {
    if (!ready) return
    const host = document.getElementById("hero-host")
    if (!host || host.hidden) return
    if (!host.querySelector("[data-static-hero]")) host.replaceChildren()
    host.hidden = true
  }, [ready])
}
