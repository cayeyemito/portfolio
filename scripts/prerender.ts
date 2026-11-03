// Runs after both builds (see "build-only" in package.json): renders every page with the
// SSR bundle in dist-ssr/ and writes the HTML into the empty #app of its file in dist/.
import { readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'

// What src/entry-server.ts exports (its own types need the app's tsconfig).
type Server = {
  routes: { page: string; locale: string; file: string }[]
  render: (page: string, locale: string) => Promise<string>
}

const root = join(import.meta.dirname, '..')
const { render, routes }: Server = await import(
  pathToFileURL(join(root, 'dist-ssr/entry-server.js')).href
)

const EMPTY_APP = '<div id="app"></div>'

for (const { page, locale, file } of routes) {
  const path = join(root, 'dist', file)
  const html = await readFile(path, 'utf8')
  const app = await render(page, locale)
  if (html.split(EMPTY_APP).length !== 2)
    throw new Error(`${file}: expected one empty ${EMPTY_APP}`)
  await writeFile(
    path,
    html.replace(EMPTY_APP, () => `<div id="app">${app}</div>`),
  )
  console.log(`prerendered ${file}`)
}
