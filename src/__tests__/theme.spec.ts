import { afterEach, describe, expect, it, vi } from 'vitest'
import { currentTheme, setTheme, storedTheme, THEME_KEY } from '@/lib/theme'

// jsdom has no matchMedia: pretend the system prefers dark (or not).
function systemPrefersDark(dark: boolean) {
  vi.stubGlobal('matchMedia', (query: string) => ({ matches: dark, media: query }))
}

function memoryStorage(initial: Record<string, string> = {}): Storage {
  const data = new Map(Object.entries(initial))
  return {
    getItem: (key) => data.get(key) ?? null,
    setItem: (key, value) => void data.set(key, value),
    removeItem: (key) => void data.delete(key),
    clear: () => data.clear(),
    key: (i) => [...data.keys()][i] ?? null,
    get length() {
      return data.size
    },
  }
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('storedTheme', () => {
  it('returns the saved choice and ignores anything else', () => {
    expect(storedTheme(memoryStorage({ [THEME_KEY]: 'dark' }))).toBe('dark')
    expect(storedTheme(memoryStorage({ [THEME_KEY]: 'sepia' }))).toBeNull()
    expect(storedTheme(memoryStorage())).toBeNull()
  })

  it('treats blocked storage as no choice', () => {
    const blocked = {
      getItem: () => {
        throw new Error('SecurityError')
      },
    } as unknown as Storage
    expect(storedTheme(blocked)).toBeNull()
  })
})

describe('currentTheme', () => {
  it('follows the system until a theme is chosen', () => {
    const root = document.createElement('html')
    systemPrefersDark(true)
    expect(currentTheme(root)).toBe('dark')

    root.dataset.theme = 'light'
    expect(currentTheme(root)).toBe('light')
  })
})

describe('setTheme', () => {
  it('applies the theme to the root and remembers it', () => {
    const root = document.createElement('html')
    const storage = memoryStorage()

    setTheme('dark', root, storage)

    expect(root.dataset.theme).toBe('dark')
    expect(storage.getItem(THEME_KEY)).toBe('dark')
  })
})
