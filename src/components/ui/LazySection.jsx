import { useEffect, useRef, useState } from "react"

export const MOUNT_ALL_EVENT = "sw:mount-all"

// Mounts below-the-fold sections only when they approach the viewport, so their JS
// (and libraries like framer-motion) doesn't compete with the first render.
// scrollToIdWithRetry() fires MOUNT_ALL_EVENT when an anchor target isn't mounted yet.
export default function LazySection({ children, minHeight = 400, anchor }) {
  const ref = useRef(null)
  const [show, setShow] = useState(
    () => typeof IntersectionObserver === "undefined" || (anchor && window.location.hash === `#${anchor}`)
  )

  useEffect(() => {
    if (show) return
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setShow(true) },
      { rootMargin: "900px 0px" }
    )
    io.observe(ref.current)
    const mountAll = () => setShow(true)
    window.addEventListener(MOUNT_ALL_EVENT, mountAll)
    return () => {
      io.disconnect()
      window.removeEventListener(MOUNT_ALL_EVENT, mountAll)
    }
  }, [show])

  if (show) return children
  return <div ref={ref} style={{ minHeight }} aria-hidden="true" />
}
