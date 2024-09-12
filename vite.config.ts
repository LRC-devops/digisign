import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default ({ mode }: { mode: string }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  console.log("[vite.config.ts]: process.env: ", process.env.SENTRY_AUTH_TOKEN)

  return defineConfig({
    plugins: [react(), sentryVitePlugin({
      org: "ucdenver",
      project: "digisign-web",
      authToken: process.env.SENTRY_AUTH_TOKEN,
    })],

    server: {
      proxy: {
        '/api': {
          target: ["https://lrc-api.wm.r.appspot.com", "http://localhost:8080", "https://lrc-storagebucket.s3.us-west-1.amazonaws.com"],
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        },
      }
    },

    build: {
      sourcemap: true
    }
  })

}
