<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import NameCheckForm from '../components/forms/NameCheckForm.vue'
import NameReport from '../components/report/NameReport.vue'
import { SAMPLES } from '../data/nameLexicon.js'
import { checkNameRisk } from '../services/nameRiskService.js'
import { useNameRiskStore } from '../stores/nameRiskStore.js'

const route = useRoute()
const store = useNameRiskStore()
const name = ref('')
const checked = ref(null)
const sample = computed(() => SAMPLES.find(item => item.id === route.query.sample) ?? SAMPLES[0])
const saved = computed(() => store.account?.reports.find(item => item.id === route.query.report))
const displayed = computed(() => {
  if (checked.value) return checked.value
  if (route.query.report) return saved.value?.report
  return checkNameRisk(sample.value.name)
})
const caption = computed(() => checked.value ? 'Result' : route.query.report ? 'Saved result' : 'Example result')

watch(() => route.fullPath, () => {
  name.value = route.query.sample ? sample.value.name : ''
  checked.value = null
  if (route.query.report) store.refresh()
}, { immediate: true })

function check(value) {
  checked.value = checkNameRisk(value)
}
</script>

<template>
  <div class="checker-page">
    <div class="narrow checker-workspace">
      <header class="checker-intro">
        <h1>Brand name checker</h1>
        <p>See if your name could sound offensive or become a punchline abroad.</p>
      </header>
      <NameCheckForm v-model="name" @check="check" />
      <section class="result-area" aria-label="Name check result" aria-live="polite" aria-atomic="true">
        <NameReport v-if="displayed" :report="displayed" :caption="caption" />
        <p v-else-if="!store.account && !store.accountError">Loading saved result…</p>
        <p v-else>This saved result is unavailable. Enter a name above to check it.</p>
      </section>
    </div>
  </div>
</template>
