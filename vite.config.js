import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // Optimize chunk sizes and code splitting
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor chunks
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('@react')) {
              return 'vendor-react'
            }
            if (id.includes('three') || id.includes('@react-three')) {
              return 'vendor-three'
            }
            if (id.includes('framer-motion')) {
              return 'vendor-motion'
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
        },
      },
    },
    // Increase chunk size warning limit for three.js and framer-motion
    chunkSizeWarningLimit: 1000,
  },
})
