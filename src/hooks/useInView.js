import { useEffect, useRef, useState } from 'react'

export default function useInView(options = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Use a more efficient threshold for mobile and desktop
    const threshold = options.threshold ?? 0.15
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          // Once triggered, unobserve to avoid repeated callbacks
          observer.unobserve(el)
        }
      },
      { 
        threshold,
        // Only observe elements currently in viewport + some buffer
        rootMargin: '50px',
        ...options 
      }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [options.threshold])

  return { ref, inView }
}
