export function normalizeWord(value = '') {
  return value
    .normalize('NFC')
    .toLowerCase()
    .replace(/[^\p{L}\p{M}\p{N}]+/gu, ' ')
    .trim()
}

// Suggestions allow one insertion, deletion or substitution within a whole word.
export function isOneEditApart(left, right) {
  const a = Array.from(left)
  const b = Array.from(right)
  if (Math.min(a.length, b.length) < 4 || Math.abs(a.length - b.length) > 1) return false

  let edits = 0
  let i = 0
  let j = 0
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) {
      i++
      j++
      continue
    }
    if (++edits > 1) return false
    if (a.length >= b.length) i++
    if (b.length >= a.length) j++
  }
  return edits + (a.length - i) + (b.length - j) === 1
}
