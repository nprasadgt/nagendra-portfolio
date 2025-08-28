import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/nagendra-portfolio/',
  build: {
    outDir: 'dist',
    sourcemap: true,
  }
})
