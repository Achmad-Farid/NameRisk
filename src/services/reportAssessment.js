import { MAX_NAME_LENGTH, brandWords, checkNameRisk, similarSpelling } from './nameRiskService.js'

export const RISK_CATEGORIES = {
  Offensive: 'Terms that can insult or demean a person.',
  Profanity: 'Swearing and expletives.',
  Sexual: 'Sexual or intimate anatomical associations.',
  'Negative meaning': 'Meanings that can undermine the intended brand message.',
  'Phonetic similarity': 'One possible reading resembles a sensitive word.',
  Homophone: 'Different words that share a pronunciation.',
  'Hidden words': 'An unintended word appears when spacing changes.',
  Slang: 'Informal or regional expressions.',
  'Cultural sensitivity': 'Associations whose impact depends on cultural context.',
  'Similar spelling': 'Written forms one edit apart.',
}

const regions = { en: 'e.g. US, UK', de: 'e.g. Germany, Austria', ja: 'Japan', id: 'Indonesia', fr: 'e.g. France, Canada', es: 'e.g. Spain, Mexico', ar: 'e.g. Egypt, Jordan', it: 'Italy', jv: 'Java, Indonesia' }
const defaultCategories = { offensive: ['Offensive'], negative: ['Negative meaning'], wordplay: ['Hidden words'] }
const rank = { High: 3, Medium: 2, Low: 1 }

function assessFinding(item) {
  const categories = [...(item.categories ?? defaultCategories[item.tone] ?? [])]
  const severity = item.severity ?? (item.tone === 'offensive' ? 'High' : 'Medium')
  let confidence = 'High'
  let explanation = item.match === 'exact' ? 'The full name matches a recorded written form.' : 'A whole word or phrase in the name matches a recorded form.'
  let comparison = item.word
  if (item.match === 'phonetic') {
    categories.push('Phonetic similarity')
    confidence = 'Low'
    explanation = item.reading.explanation
  } else if (item.match === 'similar') {
    categories.push('Similar spelling')
    confidence = 'Low'
    comparison = item.comparedForm ?? similarSpelling(item, item.matchedText) ?? item.word
    explanation = '“' + item.matchedText + '” and “' + comparison + '” differ by one letter. The resemblance is based on spelling.'
  } else if (item.tone === 'wordplay') {
    confidence = 'Medium'
    explanation = 'Removing the space allows a second word boundary in “penisland”. How often readers notice it has not been measured.'
  }
  return { ...item, word: item.flaggedWord ?? item.word, categories, severity, confidence, explanation }
}

function recommendation(issues, neutral) {
  if (issues.some(item => item.severity === 'High' && item.confidence === 'High')) {
    return { label: 'Consider renaming', reason: 'A word in the name directly matches a strongly offensive term. Test alternatives with local speakers before investing in this name.' }
  }
  if (issues.length) {
    return { label: 'Use with caution', reason: 'Test the full name, its spoken form, and its likely nickname with speakers of the flagged languages.' }
  }
  if (neutral.length) {
    return { label: 'Safe to use in the matched context', reason: 'The recorded meanings are ordinary. Regional slang and readings outside these entries still need local review.' }
  }
  return { label: 'Seek local review', reason: 'No reference entry matched. There is too little evidence to recommend this name confidently.' }
}

export function assessReport(report) {
  const issues = report.findings.filter(item => item.signal !== 'neutral').map(assessFinding)
    .sort((a, b) => rank[b.severity] - rank[a.severity] || rank[b.confidence] - rank[a.confidence])
  const neutral = report.findings.filter(item => item.signal === 'neutral')
  const languages = report.languages.map(item => {
    const matches = issues.filter(finding => finding.language === item.code)
    const ordinary = neutral.filter(finding => finding.language === item.code)
    return { ...item, region: item.market ?? regions[item.code], matches, ordinary, severity: matches[0]?.severity }
  })
  const [firstWord, ...rest] = report.name.trim().split(/\s+/)
  const keepEnding = issues.length === 1 && brandWords(firstWord) === issues[0].matchedText
  const candidates = ['Lumen', 'Nova'].map(root => keepEnding ? [root, ...rest].join(' ') : root)
  const alternatives = issues.length ? candidates.filter(name => {
    if (name.length > MAX_NAME_LENGTH) return false
    const candidate = checkNameRisk(name)
    return candidate.findings.length && !candidate.flaggedCount
  }) : []
  const sources = new Map()
  for (const item of report.findings) {
    sources.set(item.source, item.sourceName ?? 'Cambridge Dictionary · ' + (item.flaggedWord ?? item.word))
    if (item.usageSource) sources.set(item.usageSource, item.usageSourceName)
    if (item.match === 'phonetic') {
      sources.set(item.reading.source, item.reading.sourceName + ' · ' + item.reading.input)
      sources.set(item.reading.contextSource, 'Northern Illinois University · Indonesian letter C')
    }
  }
  return {
    issues, neutral, languages, alternatives, sources: [...sources],
    affected: languages.filter(item => item.matches.length).length,
    high: issues.filter(item => item.severity === 'High').length,
    medium: issues.filter(item => item.severity === 'Medium').length,
    overall: issues[0]?.severity ?? (neutral.length ? 'No flagged issue' : 'Undetermined'),
    recommendation: recommendation(issues, neutral),
  }
}
