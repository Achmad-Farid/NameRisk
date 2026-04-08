export const SAMPLE_NAMES = ['Nova', 'Lumen', 'Baka', 'Sialo', 'Kairo', 'Vanta']

export const LANGUAGE_CATALOG = [
  { code: 'en', language: 'English' },
  { code: 'id', language: 'Bahasa Indonesia' },
  { code: 'es', language: 'Spanish' },
  { code: 'fr', language: 'French' },
  { code: 'ja', language: 'Japanese' },
  { code: 'ar', language: 'Arabic' },
]

export const TRANSLATION_DICTIONARY = {
  nova: {
    en: 'new star',
    id: 'bintang baru',
    es: 'estrella nueva',
    fr: 'nouvelle etoile',
    ja: '新しい星',
    ar: 'نجم جديد',
  },
  lumen: {
    en: 'light unit',
    id: 'satuan cahaya',
    es: 'unidad de luz',
    fr: 'unite de lumiere',
    ja: '光の単位',
    ar: 'وحدة ضوء',
  },
  baka: {
    en: 'fool (slang)',
    id: 'bodoh (slang)',
    es: 'tonto (jerga)',
    fr: 'stupide (argot)',
    ja: '馬鹿',
    ar: 'غبي (عامية)',
  },
  sialo: {
    en: 'close to "damn" expression',
    id: 'mirip umpatan "sial"',
    es: 'cercano a expresion vulgar',
    fr: 'proche dune expression grossiere',
    ja: '俗語に近い響き',
    ar: 'صوت قريب من شتيمة',
  },
  vanta: {
    en: 'deep black tone',
    id: 'nuansa hitam pekat',
    es: 'tono negro profundo',
    fr: 'ton noir profond',
    ja: '深い黒色',
    ar: 'درجة اسود داكن',
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
    language: 'Bahasa Indonesia',
    meaning: 'damn / unlucky expression',
    label: 'kasar',
    severity: 82,
  },
  {
    term: 'baka',
    language: 'Japanese slang',
    meaning: 'idiot / stupid',
    label: 'kasar',
    severity: 76,
  },
  {
    term: 'puta',
    language: 'Spanish',
    meaning: 'strong insult',
    label: 'kasar',
    severity: 90,
  },
  {
    term: 'faka',
    language: 'Phonetic slang',
    meaning: 'sounds close to explicit insult',
    label: 'kasar',
    severity: 88,
  },
  {
    term: 'damn',
    language: 'English',
    meaning: 'swear expression',
    label: 'kasar',
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
    reason: 'Makna bisa diasosiasikan dengan produk gagal di pasar tertentu.',
  },
  {
    keyword: 'does not go',
    riskBoost: 18,
    reason: 'Terdengar negatif untuk brand kendaraan atau layanan.',
  },
  {
    keyword: 'idiot',
    riskBoost: 24,
    reason: 'Berpotensi menyinggung dalam komunikasi lintas budaya.',
  },
  {
    keyword: 'bodoh',
    riskBoost: 24,
    reason: 'Memiliki nuansa merendahkan dalam Bahasa Indonesia.',
  },
  {
    keyword: 'umpatan',
    riskBoost: 20,
    reason: 'Terkait ekspresi kasar pada hasil terjemahan.',
  },
]
