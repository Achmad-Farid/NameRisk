import {
  LANGUAGE_CATALOG,
  SIMILARITY_LEXICON,
  TRANSLATION_DICTIONARY,
  TRANSLATION_RISK_RULES,
} from '../data/dummyRiskData'
import { getSimilarityScore, hasDirectMatch, normalizeWord } from '../utils/textSimilarity'

const SIMULATED_DELAY_MS = 700

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

function toPercentage(value) {
  return Math.max(0, Math.min(100, Math.round(value * 100)))
}

function computeRiskStatus(score) {
  if (score >= 70) {
    return 'High'
  }

  if (score >= 40) {
    return 'Medium'
  }

  return 'Low'
}

function buildDefaultMeaning(name, languageCode) {
  const dictionary = {
    en: `${name} (brand token)`,
    id: `${name} (brand token)`,
    es: `${name} (brand token)`,
    fr: `${name} (brand token)`,
    ja: `${name} (brand token)`,
    ar: `${name} (brand token)`,
  }

  return dictionary[languageCode] ?? name
}

function buildTranslationRows(normalizedName, rawName) {
  const dictionaryEntry = TRANSLATION_DICTIONARY[normalizedName]

  return LANGUAGE_CATALOG.map(({ code, language }) => {
    const meaning = dictionaryEntry?.[code] ?? buildDefaultMeaning(rawName, code)
    const note = dictionaryEntry ? 'dummy dictionary' : 'dummy generated'

    return {
      language,
      meaning,
      note,
    }
  })
}

function buildSimilarityRows(rawName) {
  const ranked = SIMILARITY_LEXICON.map((entry) => {
    const score = getSimilarityScore(rawName, entry.term)
    const direct = hasDirectMatch(rawName, entry.term)
    const finalScore = direct ? Math.max(score, 0.66) : score

    return {
      word: entry.term,
      language: entry.language,
      meaning: entry.meaning,
      label: entry.label,
      severity: entry.severity,
      similarityScore: toPercentage(finalScore),
    }
  })
    .sort((left, right) => right.similarityScore - left.similarityScore)
    .filter((row, index) => row.similarityScore >= 35 || index < 5)
    .slice(0, 8)

  return ranked
}

function buildProfanityResult(similarityRows) {
  const items = similarityRows.filter(
    (item) => item.label === 'offensive' && item.similarityScore >= 45,
  )

  return {
    detected: items.length > 0,
    items,
  }
}

function calculateTranslationRiskBoost(translations) {
  let boost = 0
  const reasons = []

  for (const translation of translations) {
    const value = translation.meaning.toLowerCase()
    const matchedRule = TRANSLATION_RISK_RULES.find((rule) => value.includes(rule.keyword))

    if (matchedRule) {
      boost += matchedRule.riskBoost
      reasons.push({
        language: translation.language,
        reason: matchedRule.reason,
      })
    }
  }

  return {
    score: Math.min(26, boost),
    reasons,
  }
}

function calculateRiskScore(similarityRows, profanityResult, translations) {
  const topSimilarity = similarityRows[0]?.similarityScore ?? 0
  const profanityWeighted = profanityResult.items.reduce((accumulator, item) => {
    const weighted = Math.round((item.severity * item.similarityScore) / 100)
    return accumulator + weighted
  }, 0)
  const translationRisk = calculateTranslationRiskBoost(translations)

  const score = Math.max(
    0,
    Math.min(
      100,
      Math.round(
        8 +
          topSimilarity * 0.2 +
          Math.min(58, profanityWeighted) +
          translationRisk.score +
          profanityResult.items.length * 4,
      ),
    ),
  )

  return {
    score,
    translationRiskReasons: translationRisk.reasons,
  }
}

export async function checkNameRisk(nameInput) {
  const cleanedName = nameInput.trim()
  const normalizedName = normalizeWord(cleanedName)

  if (!cleanedName || normalizedName.length < 2) {
    throw new Error('Name must be at least 2 characters.')
  }

  await wait(SIMULATED_DELAY_MS)

  const translation = buildTranslationRows(normalizedName, cleanedName)
  const similarity = buildSimilarityRows(cleanedName)
  const profanity = buildProfanityResult(similarity)
  const riskResult = calculateRiskScore(similarity, profanity, translation)
  const riskScore = riskResult.score
  const status = computeRiskStatus(riskScore)

  return {
    summary: {
      name: cleanedName,
      riskScore,
      status,
      checkedAt: new Date().toISOString(),
    },
    similarity,
    translation,
    profanity,
    processing: {
      translate: true,
      profanityCheck: true,
      similarityCheck: true,
    },
    notes: riskResult.translationRiskReasons,
  }
}
