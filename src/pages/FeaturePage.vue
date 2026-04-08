<script setup>
import { storeToRefs } from 'pinia'
import { SparklesIcon, ClockIcon } from '@heroicons/vue/24/outline'
import NameCheckForm from '../components/forms/NameCheckForm.vue'
import RiskIndicator from '../components/report/RiskIndicator.vue'
import ReportTabs from '../components/report/ReportTabs.vue'
import { useNameRiskStore } from '../stores/nameRiskStore'

const store = useNameRiskStore()
const { report, loading, errorMessage, sampleNames, recentChecks } = storeToRefs(store)

function submitName(name) {
  store.runCheck(name)
}
</script>

<template>
  <section class="space-y-6">
    <article
      class="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
    >
      <div
        class="pointer-events-none absolute -right-24 -top-24 h-52 w-52 rounded-full bg-teal-200/30 blur-3xl"
      ></div>
      <div
        class="pointer-events-none absolute -left-24 -bottom-24 h-52 w-52 rounded-full bg-cyan-200/30 blur-3xl"
      ></div>

      <p class="mb-3 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold tracking-wide text-slate-600">
        <SparklesIcon class="h-4 w-4" />
        GLOBAL NAME RISK CHECKER
      </p>

      <h1 class="mb-2 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
        Check your brand name before launching globally.
      </h1>
      <p class="mb-5 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
        Enter one name and the dummy engine will evaluate translations, profanity similarity, and
        generate a global risk score.
      </p>

      <NameCheckForm :loading="loading" @submit="submitName" />

      <div class="mt-4 flex flex-wrap items-center gap-2">
        <span class="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Quick dummy samples:
        </span>
        <button
          v-for="name in sampleNames"
          :key="name"
          type="button"
          :disabled="loading"
          class="rounded-full border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:border-teal-500 hover:text-teal-700 disabled:cursor-not-allowed disabled:opacity-50"
          @click="submitName(name)"
        >
          {{ name }}
        </button>
      </div>
    </article>

    <p
      v-if="errorMessage"
      class="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700"
    >
      {{ errorMessage }}
    </p>

    <article
      v-if="loading"
      class="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600"
    >
      The system is processing translation, profanity, and similarity checks...
    </article>

    <section v-if="report" class="space-y-4">
      <RiskIndicator :score="report.summary.riskScore" :status="report.summary.status" />
      <ReportTabs :report="report" />

      <article
        v-if="report.notes.length"
        class="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800"
      >
        <h3 class="mb-2 font-bold">Additional notes from translation analysis</h3>
        <ul class="space-y-2">
          <li
            v-for="(note, index) in report.notes"
            :key="`${note.language}-${index}`"
            class="rounded-lg bg-white/80 px-3 py-2"
          >
            <strong>{{ note.language }}:</strong> {{ note.reason }}
          </li>
        </ul>
      </article>
    </section>

    <article
      v-if="recentChecks.length"
      class="rounded-2xl border border-slate-200 bg-white p-4"
    >
      <h2 class="mb-3 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-600">
        <ClockIcon class="h-4 w-4" />
        Recent checks
      </h2>

      <div class="flex flex-wrap gap-2">
        <button
          v-for="item in recentChecks"
          :key="item"
          type="button"
          :disabled="loading"
          class="rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50"
          @click="submitName(item)"
        >
          {{ item }}
        </button>
      </div>
    </article>
  </section>
</template>
