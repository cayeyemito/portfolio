import { describe, expect, it } from 'vitest'
import { activeSection } from '@/lib/scrollspy'

// Viewport of 1000px: the line is at 300px from the top.
const tops = (a: number, b: number, c: number) => [
  { id: 'one', top: a },
  { id: 'two', top: b },
  { id: 'three', top: c },
]

describe('activeSection', () => {
  it('is the first section before any has reached the line', () => {
    expect(activeSection(tops(500, 1500, 2500), 1000, false)).toBe('one')
  })

  it('is the last section whose top has passed the line', () => {
    expect(activeSection(tops(-800, 250, 1200), 1000, false)).toBe('two')
    expect(activeSection(tops(-1800, -700, 301), 1000, false)).toBe('two')
  })

  it('is the last section at the bottom of the page, even if it is short', () => {
    expect(activeSection(tops(-1800, -200, 600), 1000, true)).toBe('three')
  })

  it('handles a page without sections', () => {
    expect(activeSection([], 1000, false)).toBeUndefined()
  })
})
