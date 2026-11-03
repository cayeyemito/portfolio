import type { Locale } from '@/i18n'

// Shape of status/report.json, written by ops/site_health.py.
export type Check = {
  group: string
  name: string
  ok: boolean
  detail: string
}

export type ErrorCount = {
  path: string
  status: number
  count: number
}

export type Report = {
  generated_at: string
  site_url: string
  ok: boolean
  checks: Check[]
  errors_by_path: ErrorCount[]
}

export const REPORT_URL = '/status/report.json'

export function summarize(report: Report): { passed: number; failed: number; total: number } {
  const passed = report.checks.filter((c) => c.ok).length
  return { passed, failed: report.checks.length - passed, total: report.checks.length }
}

// Intl locale per site language; en-GB keeps day/month order and the 24 h clock.
const INTL_LOCALE: Record<Locale, string> = { es: 'es-ES', en: 'en-GB' }
const JUST_NOW: Record<Locale, string> = { es: 'ahora mismo', en: 'just now' }

export function formatDate(iso: string, locale: Locale = 'es'): string {
  return new Intl.DateTimeFormat(INTL_LOCALE[locale], {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Europe/Madrid',
  }).format(new Date(iso))
}

const UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ['day', 86_400],
  ['hour', 3_600],
  ['minute', 60],
]

// "hace 2 h", "ayer" / "2 hr. ago", "yesterday"… Under a minute reads as "ahora mismo" / "just now".
export function timeAgo(iso: string, now = Date.now(), locale: Locale = 'es'): string {
  const seconds = (new Date(iso).getTime() - now) / 1000
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto', style: 'short' })
  for (const [unit, size] of UNITS) {
    if (Math.abs(seconds) >= size) return rtf.format(Math.round(seconds / size), unit)
  }
  return JUST_NOW[locale]
}

export async function fetchReport(url = REPORT_URL): Promise<Report | null> {
  const res = await fetch(url, { cache: 'no-store' })
  if (res.status === 404 || res.status === 403) return null
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return (await res.json()) as Report
}
