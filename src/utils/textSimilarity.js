export function normalizeWord(value = '') {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s]/gu, '')
    .replace(/\s+/g, ' ')
}

export function compactWord(value = '') {
  return normalizeWord(value).replace(/\s+/g, '')
}

export function hasDirectMatch(left = '', right = '') {
  const a = compactWord(left)
  const b = compactWord(right)

  if (!a || !b) {
    return false
  }

  return a.includes(b) || b.includes(a)
}

function levenshteinDistance(left = '', right = '') {
  const a = compactWord(left)
  const b = compactWord(right)

  if (a === b) {
    return 0
  }

  if (!a.length) {
    return b.length
  }

  if (!b.length) {
    return a.length
  }

  const matrix = Array.from({ length: a.length + 1 }, () =>
    Array.from({ length: b.length + 1 }, () => 0),
  )

  for (let i = 0; i <= a.length; i += 1) {
    matrix[i][0] = i
  }

  for (let j = 0; j <= b.length; j += 1) {
    matrix[0][j] = j
  }

  for (let i = 1; i <= a.length; i += 1) {
    for (let j = 1; j <= b.length; j += 1) {
      const substitutionCost = a[i - 1] === b[j - 1] ? 0 : 1

      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + substitutionCost,
      )
    }
  }

  return matrix[a.length][b.length]
}

export function getSimilarityScore(left = '', right = '') {
  const a = compactWord(left)
  const b = compactWord(right)

  if (!a || !b) {
    return 0
  }

  if (a === b) {
    return 1
  }

  const distance = levenshteinDistance(a, b)
  const maxLength = Math.max(a.length, b.length)

  return 1 - distance / maxLength
}
