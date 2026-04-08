<script setup>
import { ExclamationTriangleIcon, ShieldCheckIcon } from '@heroicons/vue/24/solid'

defineProps({
  profanity: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <section class="rounded-xl border border-slate-200 bg-white p-4">
    <h3 class="mb-3 text-base font-bold text-slate-900">D. Profanity</h3>

    <div
      v-if="profanity.detected"
      class="rounded-xl border border-rose-200 bg-rose-50 p-4 text-rose-800"
    >
      <div class="mb-2 inline-flex items-center gap-2 text-sm font-bold">
        <ExclamationTriangleIcon class="h-5 w-5" />
        Profanity detected
      </div>
      <ul class="space-y-2 text-sm">
        <li
          v-for="item in profanity.items"
          :key="`${item.word}-${item.language}`"
          class="rounded-lg bg-white/70 px-3 py-2"
        >
          <strong>{{ item.word }}</strong> ({{ item.language }}) - {{ item.meaning }} -
          similarity {{ item.similarityScore }}%
        </li>
      </ul>
    </div>

    <div v-else class="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-800">
      <div class="inline-flex items-center gap-2 text-sm font-bold">
        <ShieldCheckIcon class="h-5 w-5" />
        No strong profanity indicators found.
      </div>
    </div>
  </section>
</template>
