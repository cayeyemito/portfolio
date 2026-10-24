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

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('es-ES', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Europe/Madrid',
  }).format(new Date(iso))
}

export async function fetchReport(url = REPORT_URL): Promise<Report | null> {
  const res = await fetch(url, { cache: 'no-store' })
  if (res.status === 404 || res.status === 403) return null
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return (await res.json()) as Report
}
