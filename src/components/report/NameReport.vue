<script setup>
import { computed } from 'vue'
import { similarSpelling } from '../../services/nameRiskService.js'

const props = defineProps({ report: { type: Object, required: true }, caption: { type: String, required: true } })
const categories = { negative: 'Negative association', offensive: 'Potential insult', wordplay: 'Unintended wordplay' }
const languages = computed(() => Object.fromEntries(props.report.languages.map(item => [item.code, item.language])))
const neutral = computed(() => props.report.findings.filter(item => item.signal === 'neutral'))
const groups = computed(() => [
  { title: 'Direct matches', items: props.report.findings.filter(item => item.signal !== 'neutral' && item.match !== 'similar') },
  { title: 'Similar words to review', items: props.report.findings.filter(item => item.match === 'similar') },
].filter(group => group.items.length))
const total = computed(() => groups.value.reduce((sum, group) => sum + group.items.length, 0))

function referenceWord(item) {
  if (item.match === 'similar') return item.comparedForm || similarSpelling(item, item.matchedText) || item.word
  return [item.word, ...(item.aliases ?? [])].find(form => form.toLowerCase() === item.matchedText) || item.word
}
</script>

<template>
  <div class="result-card">
    <header class="result-heading">
      <p>{{ caption }}</p>
      <h2><bdi>{{ report.name }}</bdi></h2>
      <p class="report-summary" v-if="total">{{ total }} {{ total === 1 ? 'finding' : 'findings' }} worth reviewing.</p>
      <p class="report-summary" v-else>{{ neutral.length ? 'No flagged meaning found in the matching entries.' : 'No matching entry found. There is not enough evidence to assess this name.' }}</p>
    </header>
    <section v-for="group in groups" :key="group.title" class="match-group">
      <h3>{{ group.title }}</h3>
      <article v-for="item in group.items" :key="item.language + item.word" class="match-detail">
        <div class="match-top">
          <h4><bdi :lang="item.language">{{ referenceWord(item) }}</bdi>
            <small v-if="item.word !== referenceWord(item)" :lang="item.language">({{ item.word }})</small>
          </h4>
          <span class="concern-type">{{ categories[item.tone] }}</span>
        </div>
        <p class="match-meaning"><strong>{{ languages[item.language] }}</strong> · {{ item.meaning }}</p>
        <p class="evidence"><strong>In your name</strong> <bdi>“{{ item.matchedText }}”</bdi> · {{ item.match === 'similar' ? 'One letter apart' : item.match === 'exact' ? 'Full name match' : 'Whole word or phrase' }}</p>
        <p class="match-impact">{{ item.impact }}</p>
        <a class="source-link" :href="item.source" target="_blank" rel="noopener noreferrer">Cambridge Dictionary<span class="sr-only"> — {{ item.word }} (opens in a new tab)</span></a>
      </article>
      <p v-if="group.items[0].match === 'similar'" class="spelling-note">These meanings belong to the reference words. Ask a local speaker whether the resemblance would bring them to mind.</p>
    </section>
    <details v-if="neutral.length" class="ordinary-entries">
      <summary>Ordinary meanings found ({{ neutral.length }})</summary>
      <ul><li v-for="item in neutral" :key="item.language + item.word"><bdi>{{ item.word }}</bdi> · {{ languages[item.language] }} · {{ item.meaning }}. <a class="source-link" :href="item.source" target="_blank" rel="noopener noreferrer">Source</a></li></ul>
    </details>
  </div>
</template>
