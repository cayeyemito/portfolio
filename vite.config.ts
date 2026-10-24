import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const page = (path: string) => fileURLToPath(new URL(path, import.meta.url))

// Multi-page static build: each HTML file becomes a folder in dist/, which CloudFront
// serves as /, /como-esta-hecha/ and /404.html. /status/ is uploaded by the health workflow.
export default defineConfig({
  plugins: [vue()],
  // No SPA fallback: unknown paths are 404s, as on CloudFront.
  appType: 'mpa',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      input: {
        home: page('./index.html'),
        build: page('./como-esta-hecha/index.html'),
        notFound: page('./404.html'),
      },
    },
  },
})
