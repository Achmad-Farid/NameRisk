<script setup>
import { computed } from 'vue'
import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline'

const props = defineProps({ report: { type: Object, required: true }, caption: { type: String, required: true } })
const labels = { negative: 'Unwanted association', offensive: 'Potential insult', wordplay: 'Unintended wordplay', similar: 'Similar spelling' }
const languages = computed(() => Object.fromEntries(props.report.languages.map(item => [item.code, item.language])))
const risks = computed(() => props.report.findings.filter(item => item.signal !== 'neutral'))
</script>

<template>
  <div class="result-card">
    <header class="result-heading">
      <p>{{ caption }}</p>
      <h2><bdi>{{ report.name }}</bdi></h2>
    </header>
    <article v-for="item in risks" :key="item.language + item.word" class="finding">
      <ExclamationTriangleIcon class="finding-icon" aria-hidden="true" />
      <div>
        <h3>{{ languages[item.language] }} <span>· {{ labels[item.signal] }}</span></h3>
        <p v-if="item.signal === 'similar'">“{{ item.matchedText }}” is spelled like “{{ item.word }}” ({{ item.meaning }}). A local speaker can tell you whether the resemblance is noticeable.</p>
        <p v-else>{{ item.impact }}</p>
        <a class="source-link" :href="item.source" target="_blank" rel="noopener noreferrer">Cambridge Dictionary<span class="sr-only"> (opens in a new tab)</span></a>
      </div>
    </article>
    <div v-if="!risks.length" class="no-findings">
      <h3>{{ report.findings.length ? 'No flagged meaning found' : 'No matching entry found' }}</h3>
      <p>{{ report.findings.length ? 'The matching entries have ordinary meanings. Local slang may have other readings.' : 'There isn’t enough information here to assess this name.' }}</p>
    </div>
  </div>
</template>
