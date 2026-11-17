// @vitest-environment node
import { afterEach, describe, expect, it, vi } from 'vitest'
import worker, { CANONICAL, ORIGIN } from './worker.js'

// Azure replaced by a fake fetch: each test says what the origin answers.
function origin(status: number, headers: Record<string, string> = {}, body = 'ok') {
  const fake = vi.fn(async () => new Response(status === 304 ? null : body, { status, headers }))
  vi.stubGlobal('fetch', fake)
  return fake
}

const get = (path: string, init?: RequestInit) =>
  worker.fetch(new Request(`https://${CANONICAL}${path}`, init))

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('worker', () => {
  it('redirects www to the main domain, keeping path and query', async () => {
    const res = await worker.fetch(new Request('https://www.cayeyeste.com/en/?a=1'))
    expect(res.status).toBe(301)
    expect(res.headers.get('Location')).toBe('https://cayeyeste.com/en/?a=1')
  })

  it('asks Azure under its own name for the same path', async () => {
    const fake = origin(200, { 'Content-Type': 'text/html' })
    const res = await get('/como-esta-hecha/?x=1')
    expect(res.status).toBe(200)
    const [url] = fake.mock.calls[0] as unknown as [URL]
    expect(String(url)).toBe(`https://${ORIGIN}/como-esta-hecha/?x=1`)
  })

  it('forwards only the cache and range headers', async () => {
    const fake = origin(304)
    await get('/', { headers: { 'If-None-Match': '"abc"', Cookie: 'secret=1' } })
    const [, init] = fake.mock.calls[0] as unknown as [URL, RequestInit]
    const sent = new Headers(init.headers)
    expect(sent.get('If-None-Match')).toBe('"abc"')
    expect(sent.get('Cookie')).toBeNull()
  })

  it('keeps the status of the origin, 404 included', async () => {
    origin(404)
    expect((await get('/no-existe')).status).toBe(404)
  })

  it('refuses anything that is not GET or HEAD', async () => {
    const fake = origin(200)
    const res = await get('/', { method: 'POST', body: 'x' })
    expect(res.status).toBe(405)
    expect(res.headers.get('Allow')).toBe('GET, HEAD')
    expect(fake).not.toHaveBeenCalled()
  })

  it('adds the security headers and drops the Azure ones', async () => {
    origin(200, { 'x-ms-request-id': '1', 'x-ms-version': '2', 'Content-Type': 'text/html' })
    const res = await get('/')
    expect(res.headers.get('Strict-Transport-Security')).toContain('max-age=31536000')
    expect(res.headers.get('X-Content-Type-Options')).toBe('nosniff')
    expect(res.headers.get('Referrer-Policy')).toBe('strict-origin-when-cross-origin')
    expect(res.headers.get('x-ms-request-id')).toBeNull()
    expect(res.headers.get('x-ms-version')).toBeNull()
    expect(res.headers.get('Content-Type')).toBe('text/html')
  })

  it('rewrites redirects from Azure to the main domain', async () => {
    origin(301, { Location: `https://${ORIGIN}/en/` })
    const res = await get('/en')
    expect(res.headers.get('Location')).toBe(`https://${CANONICAL}/en/`)
  })
})
