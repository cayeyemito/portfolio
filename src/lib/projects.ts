import data from '@/data/projects.json'
import type { Locale } from '@/i18n'

type Localized = Record<Locale, string>

// As stored in projects.json: texts in both languages, links shared.
type ProjectSource = {
  slug: string
  title: Localized
  status: Localized
  summary: Localized
  // "My part": only for team projects.
  part?: Localized
  // Short label/value pairs, e.g. Design: Vicky.
  facts?: { label: Localized; value: string }[]
  stack: string[]
  links: { repo?: string; demo?: string }
  // src is localized when the image itself has text in it.
  image?: { src: string | Localized; alt: Localized; width: number; height: number }
}

// As the components use it: texts in one language.
export type Project = {
  slug: string
  title: string
  status: string
  summary: string
  part?: string
  facts: { label: string; value: string }[]
  stack: string[]
  links: { repo?: string; demo?: string }
  image?: { src: string; alt: string; width: number; height: number }
}

const sources: ProjectSource[] = data

export function projectsFor(locale: Locale): Project[] {
  return sources.map((p) => ({
    ...p,
    title: p.title[locale],
    status: p.status[locale],
    summary: p.summary[locale],
    part: p.part?.[locale],
    facts: (p.facts ?? []).map((f) => ({ label: f.label[locale], value: f.value })),
    image: p.image && {
      ...p.image,
      src: typeof p.image.src === 'string' ? p.image.src : p.image.src[locale],
      alt: p.image.alt[locale],
    },
  }))
}

/** Label for a project's demo link: the host for external sites, the page name otherwise. */
export function demoLabel(href: string, sitePageLabel: string): string {
  return href.startsWith('https://') ? new URL(href).host : sitePageLabel
}
