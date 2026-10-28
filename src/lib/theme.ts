// Light/dark theme. With no choice saved the site follows the system; a choice
// is stored in localStorage and set as data-theme on <html>, which main.css reads.
// The inline script in each page's <head> applies the stored choice before the
// first paint, so there is no flash of the wrong theme.
export type Theme = 'light' | 'dark'

export const THEME_KEY = 'theme'

export function storedTheme(storage: Storage = localStorage): Theme | null {
  try {
    const value = storage.getItem(THEME_KEY)
    return value === 'light' || value === 'dark' ? value : null
  } catch {
    // Private mode or blocked storage: behave as if nothing was chosen.
    return null
  }
}

export function systemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function currentTheme(root: HTMLElement = document.documentElement): Theme {
  const chosen = root.dataset.theme
  return chosen === 'light' || chosen === 'dark' ? chosen : systemTheme()
}

export function setTheme(
  theme: Theme,
  root: HTMLElement = document.documentElement,
  storage: Storage = localStorage,
): void {
  root.dataset.theme = theme
  try {
    storage.setItem(THEME_KEY, theme)
  } catch {
    // The choice still applies to this page, it just is not remembered.
  }
}
