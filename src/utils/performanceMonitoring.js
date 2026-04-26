/**
 * Web Vitals Performance Monitoring
 * Tracks FCP, LCP, CLS, FID/INP
 */

export function measureWebVitals(onMetric) {
  // Measure First Contentful Paint (FCP)
  const observerFCP = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.name === 'first-contentful-paint') {
        console.log('FCP:', entry.startTime.toFixed(2), 'ms')
        onMetric?.({ name: 'FCP', value: entry.startTime })
      }
    }
  })
  observerFCP.observe({ entryTypes: ['paint'] })

  // Measure Largest Contentful Paint (LCP)
  const observerLCP = new PerformanceObserver((list) => {
    const entries = list.getEntries()
    const lastEntry = entries[entries.length - 1]
    console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime, 'ms')
    onMetric?.({ name: 'LCP', value: lastEntry.renderTime || lastEntry.loadTime })
  })
  observerLCP.observe({ entryTypes: ['largest-contentful-paint'] })

  // Measure Cumulative Layout Shift (CLS)
  let clsValue = 0
  const observerCLS = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (!entry.hadRecentInput) {
        clsValue += entry.value
        console.log('CLS:', clsValue.toFixed(4))
        onMetric?.({ name: 'CLS', value: clsValue })
      }
    }
  })
  observerCLS.observe({ entryTypes: ['layout-shift'] })

  // Measure First Input Delay / Interaction to Next Paint (INP)
  const observerINP = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      console.log('INP:', entry.processingDuration.toFixed(2), 'ms')
      onMetric?.({ name: 'INP', value: entry.processingDuration })
    }
  })
  observerINP.observe({ entryTypes: ['first-input', 'event'] })

  return {
    disconnect: () => {
      observerFCP.disconnect()
      observerLCP.disconnect()
      observerCLS.disconnect()
      observerINP.disconnect()
    }
  }
}

/**
 * Log performance metrics to console (dev only)
 */
export function logPerformanceMetrics() {
  if (typeof window === 'undefined') return

  window.addEventListener('load', () => {
    setTimeout(() => {
      const perfData = window.performance.timing
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart
      
      console.log('%c⚡ Performance Metrics', 'font-size: 14px; font-weight: bold; color: #D97706;')
      console.log('DNS Lookup:', perfData.domainLookupEnd - perfData.domainLookupStart, 'ms')
      console.log('TCP Connection:', perfData.connectEnd - perfData.connectStart, 'ms')
      console.log('DOM Interactive:', perfData.domInteractive - perfData.navigationStart, 'ms')
      console.log('DOM Complete:', perfData.domComplete - perfData.navigationStart, 'ms')
      console.log('Page Load Time:', pageLoadTime, 'ms')
    }, 0)
  })
}
