// Genera los CV en PDF (public/cv/) a partir de cv/content.mjs con Chrome sin interfaz.
// Uso: npm run cv   (CHROME=<ruta> si Chrome no está en la ruta por defecto)
import { execFileSync } from 'node:child_process'
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { cvs } from '../cv/content.mjs'

const root = resolve(import.meta.dirname, '..')
const chrome =
  process.env.CHROME ??
  [
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    '/usr/bin/google-chrome',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  ].find((path) => existsSync(path))
if (!chrome) throw new Error('No encuentro Chrome: indica la ruta con CHROME=')

const font = pathToFileURL(
  join(root, 'node_modules/@fontsource-variable/geist/files/geist-latin-wght-normal.woff2'),
).href
const css = readFileSync(join(root, 'cv/cv.css'), 'utf8').replace('__FONT__', font)

const esc = (text) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const rich = (text) => esc(text).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
const link = (url) => `<a href="https://${esc(url)}">${esc(url)}</a>`

function entry({ title, org, period, sub, points = [] }) {
  return `<div class="entry">
    <div class="entry-head"><p class="entry-title">${esc(title)} — <span class="org">${esc(org)}</span></p><p class="period">${esc(period)}</p></div>
    ${sub ? `<p class="sub">${esc(sub)}</p>` : ''}
    ${points.length ? `<ul>${points.map((p) => `<li>${rich(p)}</li>`).join('')}</ul>` : ''}
  </div>`
}

function render(cv) {
  const sections = {
    profile: `<p>${rich(cv.profile)}</p>`,
    skills: `<table class="skills">${cv.skills
      .map(([k, v]) => `<tr><th>${esc(k)}</th><td>${esc(v)}</td></tr>`)
      .join('')}</table>`,
    experience: cv.jobs.map((job) => entry({ ...job, title: job.role })).join(''),
    projects: `<ul class="projects">${cv.projects
      .map((p) => `<li><strong>${esc(p.name)}</strong> · ${link(p.link)} — ${rich(p.text)}</li>`)
      .join('')}</ul>`,
    education: cv.education.map((e) => entry(e)).join(''),
    languages: `<p>${esc(cv.languages)}</p>`,
  }
  const [place, site, email] = cv.contactLine
  return `<!doctype html><html lang="${cv.lang}"><head><meta charset="utf-8">
<title>${esc(cv.name)} · CV</title><style>${css}</style></head><body>
<header>
  <h1>${esc(cv.name)}</h1>
  <p class="headline">${esc(cv.headline)}</p>
  <p class="contact">${esc(place)} · ${link(site)} · <a href="mailto:${esc(email)}">${esc(email)}</a></p>
  <p class="contact">${cv.links.map(link).join(' · ')}</p>
</header>
${cv.order.map((key) => `<section><h2>${esc(cv.labels[key])}</h2>${sections[key]}</section>`).join('\n')}
</body></html>`
}

const work = mkdtempSync(join(tmpdir(), 'cv-'))
try {
  for (const cv of cvs) {
    const html = join(work, cv.file.replace(/\.pdf$/, '.html'))
    writeFileSync(html, render(cv))
    const out = join(root, 'public/cv', cv.file)
    execFileSync(
      chrome,
      [
        '--headless=new',
        '--disable-gpu',
        '--no-pdf-header-footer',
        `--user-data-dir=${join(work, 'profile')}`,
        `--print-to-pdf=${out}`,
        pathToFileURL(html).href,
      ],
      { stdio: 'ignore' },
    )
    console.log(`public/cv/${cv.file}`)
  }
} finally {
  rmSync(work, { recursive: true, force: true })
}
