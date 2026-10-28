import { describe, expect, it } from 'vitest'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { h } from 'vue'
import { mount } from '@vue/test-utils'
import RichText from '@/components/RichText.vue'
import { detectLocale, localizePath, messages, pages, type Locale } from '@/i18n'

const locales = Object.keys(messages) as Locale[]

// Every nested key path, e.g. "status.allOk", ignoring array contents.
function keyPaths(value: unknown, prefix = ''): string[] {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) return [prefix]
  return Object.entries(value).flatMap(([key, v]) => keyPaths(v, prefix ? `${prefix}.${key}` : key))
}

describe('messages', () => {
  it('English has exactly the same keys as Spanish', () => {
    expect(keyPaths(messages.en).sort()).toEqual(keyPaths(messages.es).sort())
  })

  it.each(locales)('%s: every CV exists in public/', (locale) => {
    const missing = messages[locale].cvs
      .map((cv) => cv.href)
      .filter((href) => !existsSync(join(process.cwd(), 'public', href)))
    expect(missing).toEqual([])
  })

  it('the English site only offers English CVs', () => {
    expect(messages.en.cvs.every((cv) => cv.href.endsWith('_EN.pdf'))).toBe(true)
  })

  it.each(locales)('%s: every job has a role, a period and a summary', (locale) => {
    for (const job of messages[locale].experience) {
      expect(job.role.trim()).not.toBe('')
      expect(job.period.trim()).not.toBe('')
      expect(job.summary.trim()).not.toBe('')
    }
  })
})

describe('detectLocale', () => {
  it('reads the language of the page', () => {
    expect(detectLocale('en')).toBe('en')
    expect(detectLocale('en-GB')).toBe('en')
    expect(detectLocale('es')).toBe('es')
    expect(detectLocale('')).toBe('es')
  })
})

describe('localizePath', () => {
  it('maps a site page to the same page in the other language', () => {
    expect(localizePath(pages.build.es, 'en')).toBe('/en/how-it-is-built/')
    expect(localizePath('/en/', 'es')).toBe('/')
  })

  it('leaves external links and files untouched', () => {
    expect(localizePath('https://frimee.es', 'en')).toBe('https://frimee.es')
    expect(localizePath('/cv/x.pdf', 'en')).toBe('/cv/x.pdf')
  })
})

describe('RichText', () => {
  // RichText renders a fragment (several root nodes), and wrapper.text() trims each
  // node on its own, so read the paragraph's textContent as a browser would.
  const inParagraph = (text: string) => mount({ render: () => h('p', [h(RichText, { text })]) })

  it('renders code, links and emphasis', () => {
    const wrapper = inParagraph('Run `npm ci`, read [the docs](/docs/) and *enjoy*.')
    expect(wrapper.find('code').text()).toBe('npm ci')
    expect(wrapper.find('a').attributes('href')).toBe('/docs/')
    expect(wrapper.find('em').text()).toBe('enjoy')
    expect(wrapper.element.textContent).toBe('Run npm ci, read the docs and enjoy.')
  })

  it('never renders markup from the text', () => {
    const wrapper = inParagraph('<img src=x onerror=alert(1)>')
    expect(wrapper.find('img').exists()).toBe(false)
    expect(wrapper.element.textContent).toBe('<img src=x onerror=alert(1)>')
  })
})
