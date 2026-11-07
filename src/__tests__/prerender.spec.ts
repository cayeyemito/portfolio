import { describe, expect, it } from 'vitest'
import { render, routes } from '@/entry-server'
import { messages } from '@/i18n'
import { projectsFor } from '@/lib/projects'

describe('prerender', () => {
  it('covers every page in both languages', () => {
    expect(routes.map((r) => r.file).sort()).toEqual([
      'como-esta-hecha/index.html',
      'en/how-it-is-built/index.html',
      'en/index.html',
      'index.html',
    ])
  })

  it.each(routes.filter((r) => r.page === 'home'))(
    '$file has the profile, every section and the contact',
    async ({ locale }) => {
      const html = await render('home', locale)
      const m = messages[locale]
      expect(html).toContain('Yeste Morant')
      expect(html).toContain(m.profile.focus)
      for (const project of projectsFor(locale)) expect(html).toContain(project.title)
      for (const job of m.experience) expect(html).toContain(job.company)
      for (const id of ['projects', 'experience', 'stack', 'contact'])
        expect(html).toContain(`id="${id}"`)
      expect(html).toContain('mailto:cayetanoym@gmail.com')
    },
  )

  it.each(routes.filter((r) => r.page === 'build'))(
    '$file has the build page title and the diagram',
    async ({ locale }) => {
      const html = await render('build', locale)
      expect(html).toContain(messages[locale].build.title)
      expect(html).toContain('<svg')
    },
  )
})
