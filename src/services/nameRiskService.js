import { LANGUAGE_CATALOG, LEXICON } from '../data/nameLexicon.js'
import { isOneEditApart, normalizeWord } from '../utils/textSimilarity.js'

export const MAX_NAME_LENGTH = 80
const priority = { offensive: 0, wordplay: 1, negative: 2, similar: 3, neutral: 4 }

export function validateName(name) {
  if (typeof name !== 'string' || !name.trim()) return 'Enter a brand name.'
  if (name.trim().length > MAX_NAME_LENGTH) return 'Use up to 80 characters.'
  if ((normalizeWord(name).match(/[\p{L}\p{N}]/gu) ?? []).length < 2) {
    return 'Use at least two letters or numbers.'
  }
  return ''
}

export function brandWords(name) {
  return normalizeWord(name.replace(/(\p{Ll})(\p{Lu})/gu, '$1 $2'))
}

function findMatch(entry, name, words) {
  const forms = [entry.word, ...(entry.aliases ?? [])].map(normalizeWord)
  if (forms.includes(name)) return { match: 'exact', matchedText: name }
  for (const form of forms) {
    if ((' ' + name + ' ').includes(' ' + form + ' ')) return { match: 'token', matchedText: form }
  }
  if (entry.tone === 'neutral' || entry.tone === 'wordplay') return
  for (const word of words) {
    const comparedForm = similarSpelling(entry, word)
    if (comparedForm) return { match: 'similar', matchedText: word, comparedForm }
  }
}

export function similarSpelling(entry, word) {
  return [entry.word, ...(entry.aliases ?? [])].find(form => isOneEditApart(word, normalizeWord(form)))
}

export function checkNameRisk(input) {
  const error = validateName(input)
  if (error) throw new Error(error)

  const normalized = brandWords(input)
  const words = normalized.split(' ')
  const findings = []
  for (const entry of LEXICON) {
    const match = findMatch(entry, normalized, words)
    if (match) findings.push({ ...entry, ...match, signal: match.match === 'similar' ? 'similar' : entry.tone })
  }
  findings.sort((a, b) => priority[a.signal] - priority[b.signal])

  const matched = new Set(findings.map(item => item.language))
  const unknown = LANGUAGE_CATALOG.filter(({ code }) => !matched.has(code))
  const flagged = new Set(findings.filter((item) => item.signal !== 'neutral').map((item) => item.language))
  return { name: input.trim(), languages: [...LANGUAGE_CATALOG], findings, unknown, flaggedCount: flagged.size }
}
