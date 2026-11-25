export const LANGUAGE_CATALOG = [
  { code: 'en', language: 'English' },
  { code: 'de', language: 'German' },
  { code: 'ja', language: 'Japanese' },
  { code: 'id', language: 'Indonesian' },
  { code: 'fr', language: 'French' },
  { code: 'es', language: 'Spanish' },
  { code: 'ar', language: 'Arabic' },
  { code: 'it', language: 'Italian' },
  { code: 'jv', language: 'Javanese' },
]

const dictionary = 'https://dictionary.cambridge.org/dictionary/'
const contoSource = 'https://www.treccani.it/vocabolario/conto_%28Sinonimi-e-Contrari%29/'

export const LEXICON = [
  {
    language: 'it', word: 'conto', meaning: 'an account or bill', tone: 'neutral',
    ipa: '/ˈkonto/', pronunciation: 'KON-to', source: contoSource, sourceName: 'Treccani',
  },
  {
    language: 'id', word: 'kontol', meaning: 'a vulgar term for the penis', tone: 'offensive',
    categories: ['Offensive', 'Sexual'], pronunciation: 'kon-tol',
    usage: 'Documented in Indonesian-language app reviews as a vulgar expression. Population-wide frequency was not measured.',
    impact: 'Listeners who hear this term in a brand name could turn the name into a sexual joke.',
    source: 'https://kamus.sabda.org/kamus/kontol', sourceName: 'Kamus SABDA · KBBI and SEASITE entries',
    usageSource: 'https://www.frontiersin.org/journals/language-sciences/articles/10.3389/flang.2026.1879834/full',
    usageSourceName: 'Soraya et al. · Indonesian swearing in app reviews',
    reading: { input: 'conto', pronunciation: 'KON-to', ipa: '/ˈkonto/', source: contoSource, sourceName: 'Treccani',
      explanation: 'With the Italian K-initial reading, “Conto” resembles the first part of “kontol”. The final L is absent. An Indonesian reading of initial C as “ch” weakens the resemblance.',
      contextSource: 'https://seasite.niu.edu/Indonesian/new_indonesian/Percakapan/indonesia7days/appendix_1.htm',
    },
  },
  {
    language: 'jv', word: 'jancok', aliases: ['jancuk'], meaning: 'a coarse regional swear word', tone: 'offensive',
    severity: 'Medium', categories: ['Profanity', 'Slang'], region: 'Surabaya, East Java, Indonesia',
    dialect: 'Surabayan Javanese', usage: 'Documented in Surabayan speech. Its force depends on the relationship and situation; nationwide frequency is unknown.',
    impact: 'A regional expletive in a name can sound confrontational, especially when used with strangers.',
    source: 'https://www.jlls.org/index.php/jlls/article/download/2841/1081', sourceName: 'Journal of Language and Linguistic Studies',
  },
  {
    language: 'en', word: 'gift', meaning: 'present', tone: 'neutral',
    source: dictionary + 'english-indonesian/gift',
  },
  {
    language: 'de', word: 'Gift', meaning: 'poison', tone: 'negative',
    ipa: '/ɡɪft/', pronunciation: 'Gift (one syllable)',
    impact: 'German speakers may read “Gift” as “poison”. On food or drink packaging, the name could sound like a warning.',
    source: dictionary + 'german-english/gift',
  },
  {
    language: 'ja', word: 'ばか', aliases: ['baka', '馬鹿', 'バカ'], meaning: 'fool or idiot', tone: 'offensive',
    pronunciation: 'ba-ka',
    impact: 'Calling someone “baka” can be an insult. If customers shorten the brand to this word, the nickname could sound mocking.',
    source: dictionary + 'japanese-english/馬鹿',
  },
  {
    language: 'en', word: 'pain', meaning: 'physical or emotional hurt', tone: 'negative',
    impact: 'The word can bring discomfort to mind. For a brand promising comfort, that gives people an easy joke to make.',
    source: dictionary + 'english-indonesian/pain',
  },
  {
    language: 'fr', word: 'pain', meaning: 'bread', tone: 'neutral',
    source: dictionary + 'english-french/bread',
  },
  {
    language: 'fr', word: 'sale', meaning: 'dirty', tone: 'negative',
    ipa: '/sal/',
    impact: 'On a label, the French adjective can suggest something is unclean. That association matters especially for beauty or food brands.',
    source: dictionary + 'french-english/sale',
  },
  {
    language: 'id', word: 'air', meaning: 'water', tone: 'neutral',
    source: dictionary + 'indonesian-english/air',
  },
  {
    language: 'en', word: 'air', meaning: 'the air we breathe', tone: 'neutral',
    source: dictionary + 'english-indonesian/air',
  },
  {
    language: 'id', word: 'sial', meaning: 'bad luck', tone: 'negative',
    impact: 'The word evokes misfortune. Customers could use it as an ironic nickname if something goes wrong with the product.',
    source: dictionary + 'indonesian-english/sial',
  },
  {
    language: 'es', word: 'mal', meaning: 'harm or evil', tone: 'negative',
    impact: 'As a standalone word, “mal” can suggest harm. Ask a local speaker how prominently that reading comes through in the full name.',
    source: dictionary + 'spanish-english/mal',
  },
  {
    language: 'ar', word: 'باب', meaning: 'door', tone: 'neutral',
    source: dictionary + 'english-arabic/door',
  },
  {
    language: 'ar', word: 'سَمّ', aliases: ['سم', 'سمّ'], meaning: 'poison', tone: 'negative',
    impact: 'One Arabic reading of this spelling means poison. The intended pronunciation and the words around it matter, especially on packaging.',
    source: dictionary + 'english-arabic/poison',
  },
  {
    language: 'en', word: 'nova', meaning: 'a star that suddenly brightens', tone: 'neutral',
    source: dictionary + 'english/nova',
  },
  {
    language: 'en', word: 'lumen', meaning: 'a unit of luminous flux', tone: 'neutral',
    source: dictionary + 'english/lumen',
  },
  {
    language: 'en', word: 'damn', meaning: 'an expletive', tone: 'offensive',
    ipa: '/dæm/', pronunciation: 'dam', severity: 'Medium', categories: ['Profanity'],
    impact: 'This expression of frustration can sound coarse when someone says the brand aloud, particularly in a formal setting.',
    source: dictionary + 'english/damn',
  },
  {
    language: 'es', word: 'puta', meaning: 'a vulgar insult', tone: 'offensive',
    impact: 'This can be a degrading term directed at women. Someone reading the brand aloud could appear to be insulting another person.',
    source: dictionary + 'english-spanish/ho',
  },
  {
    language: 'en', word: 'pen island', aliases: ['penisland'], flaggedWord: 'penis', meaning: 'the male sex organ', tone: 'wordplay',
    categories: ['Hidden words', 'Sexual'],
    impact: 'In a handle or domain, “penisland” can also be split as “penis land”. The second reading gives people an easy way to make fun of the brand.',
    source: dictionary + 'english/penis',
  },
]

export const SAMPLES = [
  { id: 'gift-soda', name: 'Gift Soda', type: 'Unwanted association' },
  { id: 'baka-studio', name: 'Baka Studio', type: 'Potential insult' },
  { id: 'pen-island', name: 'Pen Island', type: 'Unintended wordplay' },
]

export const CHECKER_EXAMPLES = [{ id: 'conto', name: 'Conto' }, { id: 'bako-studio', name: 'Bako Studio' }, ...SAMPLES]
