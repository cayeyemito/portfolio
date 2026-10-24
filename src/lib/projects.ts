import data from '@/data/projects.json'

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

export const projects: Project[] = data
