import '@/styles/main.css'
import { createApp, createSSRApp, type Component } from 'vue'
import { detectLocale, LOCALE } from '@/i18n'

// The built pages come prerendered (src/entry-server.ts), so the app hydrates the
// existing markup. The dev server serves them empty, so there it mounts as usual.
// The language comes from <html lang>.
export function mountPage(page: Component): void {
  const el = document.querySelector('#app')!
  const app = el.hasChildNodes() ? createSSRApp(page) : createApp(page)
  app.provide(LOCALE, detectLocale()).mount(el)
}
