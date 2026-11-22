<script setup>
import { computed, onMounted } from 'vue'
import { useNameRiskStore } from '../stores/nameRiskStore.js'
const store = useNameRiskStore()
const account = computed(() => store.account)
onMounted(() => store.refresh())
const date = new Intl.DateTimeFormat('en', { dateStyle: 'medium' })
</script>

<template>
  <div class="narrow page">
    <h1>Your account</h1>
    <p class="lead">Your token balance and saved name checks.</p>
    <p v-if="store.accountError" class="error" role="alert">{{ store.accountError }}</p>
    <p v-else-if="!account" role="status">Loading account…</p>
    <template v-else>
      <section class="panel wallet">
        <div><h2>Token balance</h2><p class="token-number">{{ account.tokens }} <small>{{ account.tokens === 1 ? 'token' : 'tokens' }}</small></p></div>
        <RouterLink class="btn secondary" to="/pricing">View pricing</RouterLink>
      </section>
      <section class="saved">
        <h2>Saved reports</h2>
        <div v-if="!account.reports.length" class="panel empty"><p>No saved reports yet.</p><RouterLink class="text-link" to="/checker">Check a name</RouterLink></div>
        <ul v-else class="report-list">
          <li v-for="item in account.reports" :key="item.id">
            <div><RouterLink class="text-link report-name" :to="{name: 'feature', query: {report: item.id}}"><bdi>{{ item.report.name }}</bdi></RouterLink>
            </div>
            <time :datetime="item.createdAt">{{ date.format(new Date(item.createdAt)) }}</time>
          </li>
        </ul>
      </section>
    </template>
  </div>
</template>
