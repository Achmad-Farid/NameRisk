<script setup>
import { ChevronDownIcon } from '@heroicons/vue/24/outline'
import { RISK_CATEGORIES } from '../../services/reportAssessment.js'

defineProps({ data: { type: Object, required: true } })
</script>

<template>
  <section class="report-section">
    <h3>Detailed findings</h3>
    <p v-if="!data.issues.length" class="report-copy">No sensitive word matched. The Languages tab shows where a reference entry was found.</p>
    <template v-else>
      <div class="finding-columns finding-labels" aria-hidden="true"><span>Language</span><span>Matched word</span><span>Issue</span><span>Severity</span></div>
      <details v-for="item in data.issues" :key="item.language + item.word" class="finding-disclosure">
        <summary class="finding-columns">
          <span class="finding-language">{{ data.languages.find(lang => lang.code === item.language)?.language }}</span>
          <span class="finding-word"><strong><bdi :lang="item.language">{{ item.word }}</bdi></strong><small>{{ item.meaning }}</small></span>
          <span class="finding-issue">{{ item.match === 'phonetic' ? 'Phonetic similarity' : item.match === 'similar' ? 'Similar spelling' : item.categories[0] }}</span>
          <span><span class="risk-pill" :data-level="item.severity">{{ item.severity }}</span></span>
          <ChevronDownIcon aria-hidden="true" />
        </summary>
        <div class="finding-body">
          <h4>Why this could matter</h4><p>{{ item.impact }}</p>
          <dl class="report-facts">
            <dt>Match evidence</dt><dd><bdi>“{{ item.matchedText }}”</bdi> · {{ item.explanation }}</dd>
            <dt>Local pronunciation</dt><dd>{{ item.pronunciation || item.ipa || 'Reading unrecorded' }} <span v-if="item.pronunciation && item.ipa">{{ item.ipa }}</span></dd>
            <dt>Region &amp; variety</dt><dd>{{ item.region ?? data.languages.find(lang => lang.code === item.language)?.region }}<span v-if="item.dialect"> · {{ item.dialect }}</span></dd>
            <dt>Usage &amp; frequency</dt><dd>{{ item.usage ?? 'Population frequency is not recorded in this reference set.' }}</dd>
            <dt>Risk categories</dt><dd>{{ item.categories.join(' · ') }}</dd>
            <dt>Severity</dt><dd><strong>{{ item.severity }}</strong> · Potential impact if people hear or see this association.</dd>
            <dt>Detection confidence</dt><dd><strong>{{ item.confidence }}</strong> · {{ item.confidence === 'High' ? 'The written word or a recorded alias is present.' : item.confidence === 'Medium' ? 'The alternate split works in writing; audience pickup is uncertain.' : 'The association depends on how listeners read or interpret the name.' }}</dd>
            <dt>Word reference</dt><dd><a class="source-link" :href="item.source" target="_blank" rel="noopener noreferrer">{{ item.sourceName ?? 'Cambridge Dictionary' }}</a></dd>
          </dl>
        </div>
      </details>
    </template>
    <details class="category-guide">
      <summary>Risk category guide</summary>
      <dl class="report-facts"><template v-for="(description, label) in RISK_CATEGORIES" :key="label"><dt>{{ label }}</dt><dd>{{ description }}</dd></template></dl>
    </details>
  </section>
</template>
