import assert from 'node:assert/strict'
import test from 'node:test'
import { checkNameRisk } from '../src/services/nameRiskService.js'
import { LANGUAGE_CATALOG } from '../src/data/nameLexicon.js'

test('one check covers the whole catalog and distinguishes risks from ordinary meanings', () => {
  const report = checkNameRisk(' Gift ')
  assert.deepEqual(report.languages, LANGUAGE_CATALOG)
  assert.deepEqual(report.findings.map(item => [item.language, item.meaning]), [
    ['de', 'poison'], ['en', 'present'],
  ])
  assert.equal(report.flaggedCount, 1)
  assert.deepEqual(report.unknown, LANGUAGE_CATALOG.filter(item => !['de', 'en'].includes(item.code)))
})

test('names absent from the dictionary return no fabricated meanings', () => {
  const report = checkNameRisk('Qzxoria')
  assert.equal(report.findings.length, 0)
  assert.deepEqual(report.unknown, report.languages)
})

test('punctuation separates whole words and partial strings are not direct hits', () => {
  assert.equal(checkNameRisk('GIFT-studio').findings[0].match, 'token')
  assert.equal(checkNameRisk('social').findings.length, 0)
  assert.equal(checkNameRisk('ba').findings.length, 0)
})

test('a spelling suggestion has its own signal distinct from the original meaning', () => {
  const [item] = checkNameRisk('Sialo').findings
  assert.equal(item.match, 'similar')
  assert.equal(item.signal, 'similar')
  assert.equal(item.word, 'sial')
})

test('known Japanese spellings match only in their recorded language', () => {
  for (const name of ['Baka', '馬鹿', 'ばか', 'バカ']) {
    const report = checkNameRisk(name)
    assert.deepEqual(report.findings.map(item => [item.language, item.match]), [['ja', 'exact']])
  }
})

test('reports keep each similar negative word and the spelling that triggered it', () => {
  const { findings } = checkNameRisk('Bako Sialo Gift')
  assert.deepEqual(findings.filter(item => item.match === 'similar').map(item =>
    [item.matchedText, item.comparedForm, item.word, item.language],
  ), [
    ['bako', 'baka', 'ばか', 'ja'],
    ['sialo', 'sial', 'sial', 'id'],
  ])
  assert.ok(findings.some(item => item.match === 'token' && item.signal === 'negative'))
})

test('invalid names ask for a correction', () => {
  for (const name of ['', ' - ', 'a', 'a'.repeat(81)]) assert.throws(() => checkNameRisk(name))
})

test('a written brand, handle and wordmark can surface a reviewable risk', () => {
  assert.equal(checkNameRisk('GiftSoda').findings[0].match, 'token')
  for (const name of ['Pen Island', 'PenIsland', 'penisland', 'Pen Island Stationery']) {
    assert.equal(checkNameRisk(name).findings[0].signal, 'wordplay')
  }
})
