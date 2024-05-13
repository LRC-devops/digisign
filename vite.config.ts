import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: ["https://lrc-api.wm.r.appspot.com", "http://localhost:8080", "https://lrc-storagebucket.s3.us-west-1.amazonaws.com"],
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    }
  }
})
