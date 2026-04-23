import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Render app immediately
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// Defer font optimization for Lenis smooth scroll (non-critical)
if ('requestIdleCallback' in window) {
  requestIdleCallback(() => {
    // Fonts are already loaded in HTML, but this ensures smooth scroll lib loads after paint
  })
}
