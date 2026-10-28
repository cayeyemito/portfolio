import { afterEach, describe, expect, it, vi } from 'vitest'
import { fetchReport, summarize, timeAgo, type Report } from '@/lib/status'

const report: Report = {
  generated_at: '2026-10-25T06:00:00+00:00',
  site_url: 'https://example.z6.web.core.windows.net',
  ok: false,
  checks: [
    { group: 'http', name: '/', ok: true, detail: '200 en 80 ms' },
    { group: 'tls', name: 'certificado', ok: true, detail: 'caduca en 60 días' },
    { group: 'blob', name: 'index.html', ok: false, detail: 'no está en $web' },
  ],
  errors_by_path: [],
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('summarize', () => {
  it('counts passed and failed checks', () => {
    expect(summarize(report)).toEqual({ passed: 2, failed: 1, total: 3 })
  })
})

describe('timeAgo', () => {
  const now = Date.parse('2026-10-25T08:00:00Z')

  it('uses the largest whole unit', () => {
    expect(timeAgo('2026-10-25T06:00:00Z', now)).toBe('hace 2 h')
    expect(timeAgo('2026-10-25T07:45:00Z', now)).toBe('hace 15 min')
  })

  it('reads recent times as now', () => {
    expect(timeAgo('2026-10-25T07:59:30Z', now)).toBe('ahora mismo')
  })
})

describe('fetchReport', () => {
  it('returns null when there is no report yet', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('', { status: 403 })))

    expect(await fetchReport()).toBeNull()
  })

  it('throws on server errors', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('', { status: 500 })))

    await expect(fetchReport()).rejects.toThrow('HTTP 500')
  })

  it('parses the report', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(Response.json(report)))

    expect(await fetchReport()).toEqual(report)
  })
})
