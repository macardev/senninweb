import { useEffect, useState } from 'react'
import { useIsMobile } from './useIsMobile'

/**
 * Performance mode hook for mobile devices
 * Disables expensive animations and effects on low-end devices
 */
export function usePerformanceMode() {
  const isMobile = useIsMobile()
  const [isLowEndDevice, setIsLowEndDevice] = useState(false)

  useEffect(() => {
    // Detect low-end devices based on device memory
    const getLowEndStatus = () => {
      // Check if device is mobile and has limited RAM
      if (typeof navigator !== 'undefined' && 'deviceMemory' in navigator) {
        return isMobile && navigator.deviceMemory <= 4
      }
      // Fallback: assume older iPhones/Androids have lower performance
      if (typeof navigator !== 'undefined') {
        const userAgent = navigator.userAgent.toLowerCase()
        const isOldPhone = /iphone|android/.test(userAgent) && !/iphone (1[56]|17)|pixel [3-5]/.test(userAgent)
        return isMobile && isOldPhone
      }
      return false
    }

    setIsLowEndDevice(getLowEndStatus())
  }, [isMobile])

  return {
    isMobile,
    isLowEndDevice,
    // Disable expensive animations on mobile
    enableAnimations: !isMobile,
    // Reduce animation duration on mobile
    animationDuration: isMobile ? 0.3 : 0.6,
    // Disable parallax on mobile
    enableParallax: !isMobile && !isLowEndDevice,
    // Disable blur effects on mobile
    enableBlur: !isMobile && !isLowEndDevice,
    // Disable complex 3D on mobile
    enable3D: !isMobile && !isLowEndDevice,
  }
}
