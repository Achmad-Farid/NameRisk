import assert from 'node:assert/strict'
import test from 'node:test'
import { checkNameRisk } from '../src/services/nameRiskService.js'
import { assessReport } from '../src/services/reportAssessment.js'

test('Conto has a conditional sound association with separate severity and confidence', () => {
  const report = checkNameRisk('Conto')
  const data = assessReport(report)
  assert.deepEqual(data.issues.map(item => [item.word, item.match, item.severity, item.confidence]), [
    ['kontol', 'phonetic', 'High', 'Low'],
  ])
  assert.equal(data.affected, 1)
  assert.equal(data.medium, 0)
  assert.equal(data.recommendation.label, 'Use with caution')
  assert.ok(data.sources.some(([url]) => url.includes('treccani.it')))
  assert.ok(!Number.isNaN(Date.parse(report.checkedAt)))
})

test('counts group issues by language and derive severity from the matched words', () => {
  const data = assessReport(checkNameRisk('Kontol Sial Gift'))
  assert.equal(data.issues.length, 3)
  assert.equal(data.affected, 2)
  assert.equal(data.high, 1)
  assert.equal(data.medium, 2)
  assert.equal(data.languages.find(item => item.code === 'id').matches.length, 2)
  assert.equal(data.recommendation.label, 'Consider renaming')
  assert.ok(data.alternatives.length)
  for (const name of data.alternatives) assert.equal(checkNameRisk(name).flaggedCount, 0)
})

test('unknown names, ordinary meanings and regional terms get distinct assessments', () => {
  assert.equal(assessReport(checkNameRisk('Qzxoria')).overall, 'Undetermined')
  assert.equal(assessReport(checkNameRisk('Nova')).overall, 'No flagged issue')
  const { issues } = assessReport(checkNameRisk('Jancok'))
  assert.equal(issues[0].dialect, 'Surabayan Javanese')
  assert.equal(issues[0].confidence, 'High')
  assert.equal(issues[0].severity, 'Medium')
})
