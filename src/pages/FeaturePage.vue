<script setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { ClockIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/outline'
import NameCheckForm from '../components/forms/NameCheckForm.vue'
import NameReport from '../components/report/NameReport.vue'
import { CHECKER_EXAMPLES } from '../data/nameLexicon.js'
import { checkNameRisk } from '../services/nameRiskService.js'
import { useNameRiskStore } from '../stores/nameRiskStore.js'

const route = useRoute()
const store = useNameRiskStore()
const name = ref('')
const checked = ref(null)
const view = ref('checker')
const fromHistory = ref(false)
const resultArea = ref(null)
const sample = computed(() => CHECKER_EXAMPLES.find(item => item.id === route.query.sample) ?? CHECKER_EXAMPLES[0])
const saved = computed(() => store.account?.reports.find(item => item.id === route.query.report))
const displayed = computed(() => {
  if (checked.value) return checked.value
  if (route.query.report) return saved.value?.report
  return checkNameRisk(sample.value.name)
})
const caption = computed(() => {
  if (checked.value) return fromHistory.value ? 'Saved report' : 'Name risk report'
  return route.query.report ? 'Saved report' : 'Example report'
})
const dateFormat = new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' })
onMounted(() => store.refresh())

watch(() => route.fullPath, () => {
  name.value = route.query.sample ? sample.value.name : ''
  checked.value = null
  view.value = 'checker'
}, { immediate: true })

function check(value) {
  const report = checkNameRisk(value)
  checked.value = report
  fromHistory.value = false
  store.remember(report)
}

function showHistory() {
  view.value = 'history'
  store.refresh()
}

async function openReport(item) {
  name.value = item.report.name
  checked.value = { ...item.report, checkedAt: item.report.checkedAt ?? item.lastCheckedAt ?? item.createdAt }
  fromHistory.value = true
  view.value = 'checker'
  await nextTick()
  resultArea.value?.focus()
}
</script>

<template>
  <div class="checker-page">
    <div class="narrow checker-workspace">
      <header class="checker-intro">
        <h1>Brand name checker</h1>
        <p>See if your name could sound offensive or become a punchline abroad.</p>
      </header>
      <div class="checker-views" role="group" aria-label="Name checker views">
        <button type="button" :aria-pressed="view === 'checker'" @click="view = 'checker'"><MagnifyingGlassIcon aria-hidden="true" />Name check</button>
        <button type="button" :aria-pressed="view === 'history'" @click="showHistory"><ClockIcon aria-hidden="true" />History</button>
      </div>
      <template v-if="view === 'checker'">
        <NameCheckForm v-model="name" :balance="store.account?.tokens" @check="check" />
        <p v-if="store.accountError && checked" class="error" role="status">{{ store.accountError }}</p>
        <section ref="resultArea" class="result-area" aria-label="Name check report" tabindex="-1">
          <p class="sr-only" role="status">{{ displayed ? caption + ' for ' + displayed.name : '' }}</p>
          <NameReport v-if="displayed" :key="displayed.name" :report="displayed" :caption="caption" :saved-date="saved?.lastCheckedAt ?? saved?.createdAt" />
          <p v-else-if="!store.account && !store.accountError">Loading saved report…</p>
          <p v-else>This saved report is unavailable. Enter a name above to check it.</p>
        </section>
      </template>
      <section v-else class="check-history" aria-labelledby="history-heading">
        <h2 id="history-heading">Check history</h2>
        <p v-if="store.accountError" class="error" role="status">{{ store.accountError }}</p>
        <p v-else-if="!store.account" role="status">Loading history…</p>
        <ul v-if="store.account?.reports.length" class="history-list">
          <li v-for="item in store.account.reports" :key="item.id">
            <button class="history-item" type="button" @click="openReport(item)">
              <span><strong><bdi>{{ item.report.name }}</bdi></strong><small>{{ item.report.flaggedCount ? 'Potential concern found' : 'No flagged match' }}</small></span>
              <time :datetime="item.lastCheckedAt || item.createdAt">{{ dateFormat.format(new Date(item.lastCheckedAt || item.createdAt)) }}</time>
            </button>
          </li>
        </ul>
        <div v-else-if="store.account && !store.accountError" class="panel empty">
          <p>No checks yet. Names you check will appear here.</p>
          <button class="text-link" type="button" @click="view = 'checker'">Check a name</button>
        </div>
      </section>
    </div>
  </div>
</template>
