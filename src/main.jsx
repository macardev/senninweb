import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { logPerformanceMetrics } from './utils/performanceMonitoring'
import { initMeshPointer } from './utils/meshPointer'
import { initLeadTracking } from './utils/leads'
import { initMotionTier } from './utils/motionTier'

// Log performance metrics in development
if (import.meta.env.DEV) {
  logPerformanceMetrics()
}

initMeshPointer()
initLeadTracking()
initMotionTier()

// Static JSON-LD from postbuild prerender; pages inject their own at runtime
document.querySelectorAll('script[data-prerender]').forEach((n) => n.remove())

// The static hero/page body in #hero-host is already painted, so render as a
// transition: React can split the initial render into small tasks (lower TBT).
const root = ReactDOM.createRoot(document.getElementById('root'))
React.startTransition(() => {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
})
