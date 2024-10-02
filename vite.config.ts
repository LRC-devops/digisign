import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default ({ mode }: { mode: string }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  console.log("[vite.config.ts] \n    mode:", mode, "\n    building...")

  if (!process.env.SENTRY_AUTH_TOKEN && mode !== "development") {
    throw new Error("No sentry auth token found in env!")
  }

  return defineConfig({
    plugins: [react(), sentryVitePlugin({
      org: "ucdenver",
      project: "digisign-web",
      authToken: process.env.SENTRY_AUTH_TOKEN,
    })],

    server: {
      proxy: {
        '/dev-api': {
          changeOrigin: true,
          target: "http://localhost:8080",
          rewrite: (path) => path.replace(/^\/api/, '')
        },
        '/api': {
          target: "https://lrc-api.wm.r.appspot.com",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        },
        '/photos': {
          target: "https://lrc-storagebucket.s3.us-west-1.amazonaws.com",
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
