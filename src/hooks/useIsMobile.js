import { useEffect, useState } from 'react'

/**
 * Hook to detect if the viewport is mobile size (< 769px)
 * Returns true for mobile, false for tablet/desktop
 * Optimized for performance: only updates on resize with debounce
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.innerWidth < 769
  })

  useEffect(() => {
    let timeout
    const handleResize = () => {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        setIsMobile(window.innerWidth < 769)
      }, 150)
    }

    // Set initial value immediately
    setIsMobile(window.innerWidth < 769)

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(timeout)
    }
  }, [])

  return isMobile
}
