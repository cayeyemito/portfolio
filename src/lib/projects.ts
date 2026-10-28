import data from '@/data/projects.json'
import type { Locale } from '@/i18n'

type Localized = Record<Locale, string>

// As stored in projects.json: texts in both languages, links shared.
type ProjectSource = {
  slug: string
  title: Localized
  status: Localized
  problem: Localized
  stack: string[]
  role: Localized
  links: { repo?: string; demo?: string }
  image?: { src: string; alt: Localized; width: number; height: number }
}

// As the components use it: texts in one language.
export type Project = {
  slug: string
  title: string
  status: string
  problem: string
  stack: string[]
  role: string
  links: { repo?: string; demo?: string }
  image?: { src: string; alt: string; width: number; height: number }
}

const sources: ProjectSource[] = data

export function projectsFor(locale: Locale): Project[] {
  return sources.map((p) => ({
    ...p,
    title: p.title[locale],
    status: p.status[locale],
    problem: p.problem[locale],
    role: p.role[locale],
    image: p.image && { ...p.image, alt: p.image.alt[locale] },
  }))
}
