/**
 * Which section is being read: the last one whose top has scrolled past a line at 30 %
 * of the viewport height. At the very bottom of the page it is always the last section,
 * even when that one is too short to reach the line. Before the first section, the first.
 */
export function activeSection(
  tops: { id: string; top: number }[],
  viewportHeight: number,
  atBottom: boolean,
): string | undefined {
  if (atBottom) return tops[tops.length - 1]?.id
  const line = viewportHeight * 0.3
  let current = tops[0]?.id
  for (const { id, top } of tops) {
    if (top <= line) current = id
  }
  return current
}
