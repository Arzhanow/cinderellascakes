import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks: {
          reactVendor: ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion'],
          threeScene: ['three', '@react-three/fiber', '@react-three/drei'],
        },
      },
    },
  },
})
