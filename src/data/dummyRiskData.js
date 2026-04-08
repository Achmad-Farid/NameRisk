export const SAMPLE_NAMES = ['Nova', 'Lumen', 'Baka', 'Sialo', 'Kairo', 'Vanta']

export const LANGUAGE_CATALOG = [
  { code: 'en', language: 'English' },
  { code: 'id', language: 'Indonesian' },
  { code: 'es', language: 'Spanish' },
  { code: 'fr', language: 'French' },
  { code: 'ja', language: 'Japanese' },
  { code: 'ar', language: 'Arabic' },
]

export const TRANSLATION_DICTIONARY = {
  nova: {
    en: 'new star',
    id: 'new star',
    es: 'new star',
    fr: 'new star',
    ja: 'new star',
    ar: 'new star',
  },
  lumen: {
    en: 'light unit',
    id: 'light unit',
    es: 'light unit',
    fr: 'light unit',
    ja: 'light unit',
    ar: 'light unit',
  },
  baka: {
    en: 'fool (slang)',
    id: 'fool (slang)',
    es: 'fool (slang)',
    fr: 'fool (slang)',
    ja: 'idiot (slang)',
    ar: 'fool (slang)',
  },
  sialo: {
    en: 'close to "damn" expression',
    id: 'close to "damn" expression',
    es: 'close to rude expression',
    fr: 'close to rude expression',
    ja: 'close to rude expression',
    ar: 'close to rude expression',
  },
  vanta: {
    en: 'deep black tone',
    id: 'deep black tone',
    es: 'deep black tone',
    fr: 'deep black tone',
    ja: 'deep black tone',
    ar: 'deep black tone',
  },
}

export const SIMILARITY_LEXICON = [
  {
    term: 'nova',
    language: 'Latin',
    meaning: 'new / fresh',
    label: 'normal',
    severity: 0,
  },
  {
    term: 'no va',
    language: 'Spanish phrase',
    meaning: 'does not go / not working',
    label: 'normal',
    severity: 10,
  },
  {
    term: 'lumen',
    language: 'International unit',
    meaning: 'unit of light intensity',
    label: 'normal',
    severity: 0,
  },
  {
    term: 'lumo',
    language: 'Esperanto',
    meaning: 'light',
    label: 'normal',
    severity: 0,
  },
  {
    term: 'kairo',
    language: 'Japanese pronunciation',
    meaning: 'circulation / route',
    label: 'normal',
    severity: 0,
  },
  {
    term: 'sial',
    language: 'Indonesian',
    meaning: 'damn / unlucky expression',
    label: 'offensive',
    severity: 82,
  },
  {
    term: 'baka',
    language: 'Japanese slang',
    meaning: 'idiot / stupid',
    label: 'offensive',
    severity: 76,
  },
  {
    term: 'puta',
    language: 'Spanish',
    meaning: 'strong insult',
    label: 'offensive',
    severity: 90,
  },
  {
    term: 'faka',
    language: 'Phonetic slang',
    meaning: 'sounds close to explicit insult',
    label: 'offensive',
    severity: 88,
  },
  {
    term: 'damn',
    language: 'English',
    meaning: 'swear expression',
    label: 'offensive',
    severity: 65,
  },
  {
    term: 'vanta',
    language: 'Brand-like term',
    meaning: 'associated with dark color branding',
    label: 'normal',
    severity: 0,
  },
  {
    term: 'sora',
    language: 'Japanese',
    meaning: 'sky',
    label: 'normal',
    severity: 0,
  },
]

export const TRANSLATION_RISK_RULES = [
  {
    keyword: 'not working',
    riskBoost: 18,
    reason: 'Meaning can be associated with a product that fails in certain markets.',
  },
  {
    keyword: 'does not go',
    riskBoost: 18,
    reason: 'This can sound negative for mobility or service brands.',
  },
  {
    keyword: 'idiot',
    riskBoost: 24,
    reason: 'May be offensive in cross-cultural communication.',
  },
  {
    keyword: 'damn',
    riskBoost: 20,
    reason: 'Contains wording related to profanity in at least one language.',
  },
  {
    keyword: 'unlucky',
    riskBoost: 16,
    reason: 'Carries a negative emotional association.',
  },
]
