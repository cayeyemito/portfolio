import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const page = (path: string) => fileURLToPath(new URL(path, import.meta.url))

// Multi-page static build: each HTML file becomes a folder in dist/, which Azure Storage
// serves as /, /como-esta-hecha/, /en/, /en/how-it-is-built/ and /404.html. /status/ is
// uploaded by the health workflow.
export default defineConfig({
  plugins: [vue()],
  // No SPA fallback: unknown paths are 404s, as on the Azure static website.
  appType: 'mpa',
  // deploy.yml uploads right after building, so build time is the deploy time.
  define: {
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
  },
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
        homeEn: page('./en/index.html'),
        buildEn: page('./en/how-it-is-built/index.html'),
        notFound: page('./404.html'),
      },
    },
  },
})
