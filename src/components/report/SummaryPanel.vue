<script setup>
import { CheckCircleIcon } from '@heroicons/vue/24/solid'

defineProps({
  summary: {
    type: Object,
    required: true,
  },
  processing: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <section class="grid gap-4 md:grid-cols-3">
    <article class="rounded-xl border border-slate-200 bg-white p-4">
      <p class="text-xs font-semibold uppercase tracking-wider text-slate-500">Name</p>
      <p class="mt-2 text-lg font-bold text-slate-900">{{ summary.name }}</p>
    </article>

    <article class="rounded-xl border border-slate-200 bg-white p-4">
      <p class="text-xs font-semibold uppercase tracking-wider text-slate-500">Risk Score</p>
      <p class="mt-2 text-lg font-bold text-slate-900">{{ summary.riskScore }}/100</p>
    </article>

    <article class="rounded-xl border border-slate-200 bg-white p-4">
      <p class="text-xs font-semibold uppercase tracking-wider text-slate-500">Status</p>
      <p class="mt-2 text-lg font-bold text-slate-900">{{ summary.status }}</p>
    </article>
  </section>

  <section class="mt-4 rounded-xl border border-slate-200 bg-white p-4">
    <h4 class="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-500">
      System Process
    </h4>
    <div class="grid gap-2 sm:grid-cols-3">
      <div class="inline-flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-700">
        <CheckCircleIcon class="h-4 w-4 text-emerald-500" />
        Translate: {{ processing.translate ? 'Done' : 'Pending' }}
      </div>
      <div class="inline-flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-700">
        <CheckCircleIcon class="h-4 w-4 text-emerald-500" />
        Profanity: {{ processing.profanityCheck ? 'Done' : 'Pending' }}
      </div>
      <div class="inline-flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-700">
        <CheckCircleIcon class="h-4 w-4 text-emerald-500" />
        Similarity: {{ processing.similarityCheck ? 'Done' : 'Pending' }}
      </div>
    </div>
  </section>
</template>
