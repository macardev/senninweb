import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { HERO_HTML, HERO_CSS } from './src/content/heroMarkup.js'

// Inlines the static home hero + its critical CSS into index.html
const staticHero = () => ({
  name: 'senninweb-static-hero',
  // 'pre' so it runs before Vite's own HTML/CSS processing strips the placeholders
  transformIndexHtml: {
    order: 'pre',
    handler: (html) => html.replace('<!--hero-html-->', HERO_HTML).replace('/*hero-css*/', HERO_CSS),
  },
})

export default defineConfig({
  plugins: [react(), staticHero()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    esbuild: {
      drop: ['console', 'debugger'],
    },
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor chunks - split heavy libraries
          if (id.includes('node_modules')) {
            if (id.includes('framer-motion')) {
              return 'vendor-motion'
            }
            if (id.includes('emailjs')) {
              return 'vendor-email'
            }
            if (id.includes('react') || id.includes('react-dom') || id.includes('scheduler')) {
              return 'vendor-react'
            }
            return 'vendor-other'
          }
          // Separate route chunks for lazy loading
          if (id.includes('pages/')) {
            const match = id.match(/pages\/([^/]+)\.jsx/)
            if (match) return `page-${match[1]}`
          }
          // Separate layout chunk
          if (id.includes('components/layout/')) {
            return 'layout'
          }
          // Separate sections chunks
          if (id.includes('components/sections/')) {
            const match = id.match(/sections\/([^/]+)\.jsx/)
            if (match) return `section-${match[1]}`
          }
        },
      },
    },
    chunkSizeWarningLimit: 500,
  },
})
