import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { logPerformanceMetrics } from './utils/performanceMonitoring'
import { initMeshPointer } from './utils/meshPointer'

// Log performance metrics in development
if (import.meta.env.DEV) {
  logPerformanceMetrics()
}

initMeshPointer()

// Render app immediately for faster FCP
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
