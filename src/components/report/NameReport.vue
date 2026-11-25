<script setup>
import { computed, ref, useId } from 'vue'
import { DocumentTextIcon } from '@heroicons/vue/24/outline'
import { assessReport } from '../../services/reportAssessment.js'
import ReportFindings from './ReportFindings.vue'

const props = defineProps({
  report: { type: Object, required: true },
  caption: { type: String, required: true },
  savedDate: String,
})
const tabs = ['Overview', 'Findings', 'Languages', 'Pronunciation', 'Sources & Methodology']
const selected = ref('Overview')
const tabBar = ref(null)
const uid = useId()
const data = computed(() => assessReport(props.report))
const top = computed(() => data.value.issues[0])
const stats = computed(() => [
  ['Potential issues', data.value.issues.length], ['Languages affected', data.value.affected],
  ['High-risk findings', data.value.high], ['Medium-risk findings', data.value.medium],
])
const readings = computed(() => [...data.value.issues, ...data.value.neutral].filter(item =>
  item.match !== 'exact' || !data.value.issues.some(other => other.match === 'phonetic' && other.matchedText === item.matchedText && other.reading?.source === item.source),
))
const dialects = computed(() => [...new Set(props.report.findings.map(item => item.dialect).filter(Boolean))])
const checkedDate = computed(() => {
  const value = props.report.checkedAt ?? props.savedDate
  const date = value && new Date(value)
  if (!date || Number.isNaN(date.getTime())) return 'Date not recorded'
  return new Intl.DateTimeFormat('en', { dateStyle: 'long' }).format(date)
})

function goToTab(index) {
  selected.value = tabs[index]
  tabBar.value?.querySelectorAll('[role=tab]')[index]?.focus({ preventScroll: true })
}
function keyTab(event, index) {
  const targets = { ArrowLeft: (index - 1 + tabs.length) % tabs.length, ArrowRight: (index + 1) % tabs.length, Home: 0, End: tabs.length - 1 }
  if (!(event.key in targets)) return
  event.preventDefault()
  goToTab(targets[event.key])
}
</script>

<template>
  <article class="result-card analysis-report">
    <header class="analysis-cover">
      <div class="report-byline"><DocumentTextIcon aria-hidden="true" />Name Analysis Report<span v-if="caption !== 'Name risk report'">· {{ caption === 'Example report' ? 'Example' : 'Saved' }}</span></div>
      <div class="report-name-line">
        <h2><bdi>{{ report.name }}</bdi></h2>
        <span class="risk-pill" :data-level="data.overall">{{ top ? data.overall + ' potential risk' : data.overall }}</span>
      </div>
    </header>
    <div ref="tabBar" class="report-tabs" role="tablist" aria-label="Report sections">
      <button v-for="(tab, i) in tabs" :id="uid + '-tab-' + i" :key="tab" type="button" role="tab"
        :aria-selected="selected === tab" :aria-controls="uid + '-panel-' + i" :tabindex="selected === tab ? 0 : -1"
        @click="selected = tab" @keydown="keyTab($event,i)">{{ tab }}</button>
    </div>

    <div v-for="(tab, i) in tabs" :id="uid + '-panel-' + i" :key="tab" :hidden="selected !== tab"
      role="tabpanel" :aria-labelledby="uid + '-tab-' + i" tabindex="0">
      <template v-if="tab === 'Overview'">
        <section class="report-section">
          <h3>Executive summary</h3>
          <template v-if="top">
            <p class="report-key"><bdi>“{{ top.word }}”</bdi> <span>means</span> “{{ top.meaning }}” <span>in {{ data.languages.find(lang => lang.code === top.language)?.language }}.</span></p>
            <p class="report-copy">{{ top.match === 'phonetic' || top.match === 'similar' ? top.explanation : top.impact }}</p>
            <p class="report-meta match-confidence">Detection confidence: <strong>{{ top.confidence }}</strong></p>
            <button class="text-link report-action" type="button" @click="goToTab(1)">Explore {{ data.issues.length === 1 ? 'the finding' : 'all findings' }}</button>
          </template>
          <p v-else class="report-copy">{{ data.neutral.length ? 'Only ordinary meanings appeared in the matched entries.' : 'The checked entries provide too little evidence to assess this name.' }}</p>
          <dl class="report-stats"><div v-for="[label, value] in stats" :key="label"><dt>{{ label }}</dt><dd>{{ value }}</dd></div></dl>
          <p class="report-meta">{{ report.languages.length }} languages checked · {{ checkedDate }}</p>
        </section>
        <section class="report-section">
          <h3>Recommendation</h3>
          <h4>{{ data.recommendation.label }}</h4><p class="report-copy">{{ data.recommendation.reason }}</p>
          <div v-if="data.alternatives.length" class="alternatives"><strong>Names to shortlist</strong> {{ data.alternatives.join(' or ') }}<p>These candidates returned fewer flagged terms in the current reference set. Test their local reception before choosing.</p></div>
        </section>
      </template>

      <ReportFindings v-else-if="tab === 'Findings'" :data="data" />

      <section v-else-if="tab === 'Languages'" class="report-section">
        <h3>Country &amp; language breakdown</h3>
        <p class="report-copy">Regions give context for the language. Each finding is counted once under the language of the reference word.</p>
        <ul class="language-breakdown">
          <li v-for="lang in data.languages" :key="lang.code">
            <div><strong>{{ lang.language }}</strong><small>{{ lang.region || 'Region not recorded' }}</small></div>
            <div><b>{{ lang.matches.length ? lang.matches.length + (lang.matches.length === 1 ? ' potential issue' : ' potential issues') : 'No detected issue' }}</b>
              <small>{{ lang.matches.length ? lang.matches.map(m => m.word).join(' · ') : lang.ordinary.length ? 'Only ordinary meanings matched.' : 'No matching entry in the checked dataset.' }}</small></div>
            <span v-if="lang.severity" class="risk-pill" :data-level="lang.severity">{{ lang.severity }}</span>
          </li>
        </ul>
      </section>

      <section v-else-if="tab === 'Pronunciation'" class="report-section">
        <h3>Pronunciation analysis</h3>
        <p class="report-copy">Readings are shown for the matched part of the name. Brand owners and local speakers may pronounce it differently.</p>
        <p v-if="!readings.length" class="report-empty">No pronunciation reference matched this name.</p>
        <article v-for="item in readings" :key="item.language + item.word" class="reading-card">
          <h4><bdi>{{ item.matchedText }}</bdi> <small>· {{ data.languages.find(lang => lang.code === item.language)?.language }} reference</small></h4>
          <dl class="report-facts">
            <template v-if="item.match === 'phonetic'">
              <dt>Possible name reading</dt><dd>{{ item.reading.pronunciation }} {{ item.reading.ipa }} · Italian reading</dd>
            </template>
            <dt>Reference reading</dt><dd><bdi>{{ item.word }}</bdi> · {{ item.pronunciation || item.ipa || 'Local reading unrecorded' }} <span v-if="item.pronunciation && item.ipa">{{ item.ipa }}</span></dd>
            <dt>Interpretation</dt><dd>{{ item.match === 'phonetic' ? item.reading.explanation : item.match === 'similar' ? 'The written forms differ by one letter. A sound match has not been established.' : item.tone === 'wordplay' ? 'Pen Island and “penis land” are alternate written splits of the same handle. Compare them visually.' : 'The written form matches. This reading applies to the dictionary term.' }}</dd>
          </dl>
          <a class="source-link" :href="item.match === 'phonetic' ? item.reading.source : item.source" target="_blank" rel="noopener noreferrer">{{ item.match === 'phonetic' ? item.reading.sourceName + ' · name pronunciation' : (item.sourceName ?? 'Cambridge Dictionary') }}</a>
        </article>
      </section>

      <section v-else class="report-section">
        <h3>Sources &amp; methodology</h3>
        <dl class="report-facts method-facts">
          <dt>Checked on</dt><dd>{{ checkedDate }}</dd>
          <dt>Reference set</dt><dd>NameRisk’s curated word list, with dictionary meanings, usage research, and selected pronunciation comparisons.</dd>
          <dt>Languages checked</dt><dd>{{ report.languages.map(lang => lang.language).join(', ') }}</dd>
          <dt>Dialect evidence</dt><dd>{{ dialects.length ? dialects.join(', ') : 'No dialect-specific evidence was recorded for this name.' }}</dd>
          <dt>Matching method</dt><dd>Full names, whole words, recorded aliases, one-letter spelling differences, curated word boundaries, and known pronunciation pairs.</dd>
          <dt>Severity</dt><dd>Potential impact if an association is noticed. Strong insults and vulgar anatomical terms receive high severity; negative meanings typically receive medium severity.</dd>
          <dt>Confidence</dt><dd>Evidence for the match. Exact written matches have stronger support. Spelling leads and conditional readings need local review. These labels are qualitative.</dd>
          <dt>Coverage limits</dt><dd>The reference set samples a fraction of local usage. Dialect coverage, frequency, and audience reactions are incomplete. IPA appears only where a transcription is available.</dd>
        </dl>
        <h4>References for this report</h4>
        <ul v-if="data.sources.length" class="reference-list"><li v-for="[url, label] in data.sources" :key="url"><a class="source-link" :href="url" target="_blank" rel="noopener noreferrer">{{ label }}</a></li></ul>
        <p v-else class="report-copy">No matching entry to cite.</p>
      </section>
    </div>
  </article>
</template>
