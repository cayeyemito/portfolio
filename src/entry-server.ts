// Build-time rendering: scripts/prerender.ts writes this HTML into each page of dist/,
// so the content is there without JavaScript. In the browser, mountPage() hydrates it.
import { createSSRApp, type Component } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { LOCALE, pages, type Locale, type PageName } from '@/i18n'
import BuildPage from '@/pages/BuildPage.vue'
import FrimeePage from '@/pages/FrimeePage.vue'
import HomePage from '@/pages/HomePage.vue'

const components: Record<PageName, Component> = {
  home: HomePage,
  build: BuildPage,
  frimee: FrimeePage,
}

/** Every page in every language, with its file in dist/ (e.g. en/how-it-is-built/index.html). */
export const routes = (Object.keys(pages) as PageName[]).flatMap((page) =>
  (Object.keys(pages[page]) as Locale[]).map((locale) => ({
    page,
    locale,
    file: `${pages[page][locale].slice(1)}index.html`,
  })),
)

export function render(page: PageName, locale: Locale): Promise<string> {
  return renderToString(createSSRApp(components[page]).provide(LOCALE, locale))
}
