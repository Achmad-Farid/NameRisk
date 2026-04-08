<script setup>
import { computed } from 'vue'

const props = defineProps({
  score: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
})

const statusStyle = computed(() => {
  if (props.status === 'High') {
    return {
      badge: 'bg-rose-100 text-rose-700 ring-rose-200',
      bar: 'bg-rose-500',
      helper: 'High risk. Further naming validation is recommended.',
    }
  }

  if (props.status === 'Medium') {
    return {
      badge: 'bg-amber-100 text-amber-700 ring-amber-200',
      bar: 'bg-amber-500',
      helper: 'Potential language or slang conflicts in some markets.',
    }
  }

  return {
    badge: 'bg-emerald-100 text-emerald-700 ring-emerald-200',
    bar: 'bg-emerald-500',
    helper: 'Relatively safe, but keep final legal validation in scope.',
  }
})
</script>

<template>
  <section class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
    <div class="mb-3 flex flex-wrap items-center justify-between gap-3">
      <h3 class="text-base font-bold text-slate-900">Global Risk Indicator</h3>
      <span
        class="inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ring-1"
        :class="statusStyle.badge"
      >
        {{ status }}
      </span>
    </div>

    <div class="mb-2 h-3 overflow-hidden rounded-full bg-slate-100">
      <div
        class="h-full rounded-full transition-all duration-500"
        :class="statusStyle.bar"
        :style="{ width: `${score}%` }"
      ></div>
    </div>

    <div class="flex items-center justify-between text-sm text-slate-600">
      <span>Risk score: <strong class="text-slate-900">{{ score }}/100</strong></span>
      <span>{{ statusStyle.helper }}</span>
    </div>
  </section>
</template>
