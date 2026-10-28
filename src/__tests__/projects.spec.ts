import { describe, expect, it } from 'vitest'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { projectsFor } from '@/lib/projects'

// Vitest runs from the project root.
const publicDir = join(process.cwd(), 'public')

describe.each(['es', 'en'] as const)('projects.json (%s)', (locale) => {
  const projects = projectsFor(locale)

  it('has between 2 and 4 projects', () => {
    expect(projects.length).toBeGreaterThanOrEqual(2)
    expect(projects.length).toBeLessThanOrEqual(4)
  })

  it.each(projects)('$slug has a title, a stack and at least one link', (project) => {
    expect(project.title.trim()).not.toBe('')
    expect(project.status.trim()).not.toBe('')
    expect(project.problem.trim()).not.toBe('')
    expect(project.role.trim()).not.toBe('')
    expect(project.stack.length).toBeGreaterThan(0)
    expect(project.links.repo ?? project.links.demo).toBeTruthy()
  })

  it.each(projects)('$slug links are absolute https or site-relative', (project) => {
    for (const link of Object.values(project.links)) {
      expect(link).toMatch(/^(https:\/\/|\/)/)
    }
  })

  it.each(projects.filter((p) => p.image))('$slug image exists and has alt text', (project) => {
    expect(existsSync(join(publicDir, project.image!.src))).toBe(true)
    expect(project.image!.alt.trim()).not.toBe('')
  })

  it('slugs are unique', () => {
    const slugs = projects.map((p) => p.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })
})
