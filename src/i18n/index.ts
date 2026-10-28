// Two languages, one set of components. Each HTML entry sets <html lang>, the
// page script reads it with detectLocale() and provides it to the app; any
// component then gets its strings with useMessages().
import { inject, type InjectionKey } from 'vue'
import { en } from './en'
import { es, type Messages } from './es'

export type Locale = 'es' | 'en'
export type { Messages }

export const LOCALE: InjectionKey<Locale> = Symbol('locale')

export const messages: Record<Locale, Messages> = { es, en }

// The same page in each language. Used by the language switch and to keep
// internal links (e.g. a project's demo) in the language being read.
export const pages = {
  home: { es: '/', en: '/en/' },
  build: { es: '/como-esta-hecha/', en: '/en/how-it-is-built/' },
} as const

export type PageName = keyof typeof pages

export function detectLocale(lang: string = document.documentElement.lang): Locale {
  return lang.toLowerCase().startsWith('en') ? 'en' : 'es'
}

export function useLocale(): Locale {
  return inject(LOCALE, 'es')
}

export function useMessages(): Messages {
  return messages[useLocale()]
}

/** A site path in the given language; anything else (external links, PDFs) as is. */
export function localizePath(path: string, locale: Locale): string {
  for (const page of Object.values(pages)) {
    if (path === page.es || path === page.en) return page[locale]
  }
  return path
}

export const otherLocale = (locale: Locale): Locale => (locale === 'es' ? 'en' : 'es')
