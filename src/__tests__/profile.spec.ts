import { describe, expect, it } from 'vitest'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { cvs, experience } from '@/data/profile'

describe('profile', () => {
  it.each(cvs)('$label exists in public/', (cv) => {
    expect(existsSync(join(process.cwd(), 'public', cv.href))).toBe(true)
  })

  it.each(experience)('$company has a role, a period and a summary', (job) => {
    expect(job.role.trim()).not.toBe('')
    expect(job.period.trim()).not.toBe('')
    expect(job.summary.trim()).not.toBe('')
  })
})
