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
      'en/projects/frimee/index.html',
      'index.html',
      'proyectos/frimee/index.html',
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

  it.each(routes.filter((r) => r.page === 'frimee'))(
    '$file is the Frimee case: title, sections, code and the link to the next case',
    async ({ locale }) => {
      const html = await render('frimee', locale)
      const f = messages[locale].frimee
      expect(html).toContain('>Frimee</h1>')
      for (const title of [f.contextTitle, f.architectureTitle, f.decisionsTitle, f.challengeTitle])
        expect(html).toContain(title)
      expect(html).toContain('auth.getUser(token)')
      expect(html).toContain(f.capturesTitle)
      expect(html).toContain('src="/projects/frimee/demo.mp4"')
      for (const shot of [...f.captures.webShots, ...f.captures.mobileShots])
        expect(html).toContain(shot.src)
      expect(html).toContain(
        locale === 'es' ? 'href="/como-esta-hecha/"' : 'href="/en/how-it-is-built/"',
      )
    },
  )

  it.each(routes.filter((r) => r.page === 'build'))(
    '$file is the portfolio case: title, every section and the diagram',
    async ({ locale }) => {
      const html = await render('build', locale)
      const b = messages[locale].build
      const portfolio = projectsFor(locale).find((p) => p.slug === 'portfolio')!
      expect(html).toContain(`>${portfolio.title}</h1>`)
      for (const title of [b.architecture, b.pipeline, b.iacTitle, b.opsTitle])
        expect(html).toContain(title)
      expect(html).toContain('role="img"')
      expect(html).toContain(portfolio.links.repo)
    },
  )
})
