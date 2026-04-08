<script setup>
defineProps({
  items: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <section class="overflow-hidden rounded-xl border border-slate-200 bg-white">
    <header class="border-b border-slate-200 px-4 py-3">
      <h3 class="text-base font-bold text-slate-900">B. Similarity (Core)</h3>
      <p class="text-sm text-slate-600">
        Shows similar words that may create global brand risk.
      </p>
    </header>

    <div class="overflow-x-auto">
      <table class="min-w-full text-left text-sm">
        <thead class="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
          <tr>
            <th class="px-4 py-3">Similar Word</th>
            <th class="px-4 py-3">Language</th>
            <th class="px-4 py-3">Meaning</th>
            <th class="px-4 py-3">Label</th>
            <th class="px-4 py-3">Similarity</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-200 bg-white text-slate-700">
          <tr v-for="item in items" :key="`${item.word}-${item.language}`">
            <td class="px-4 py-3 font-semibold text-slate-900">{{ item.word }}</td>
            <td class="px-4 py-3">{{ item.language }}</td>
            <td class="px-4 py-3">{{ item.meaning }}</td>
            <td class="px-4 py-3">
              <span
                class="inline-flex rounded-full px-2.5 py-1 text-xs font-semibold"
                :class="
                  item.label === 'offensive'
                    ? 'bg-rose-100 text-rose-700'
                    : 'bg-emerald-100 text-emerald-700'
                "
              >
                {{ item.label }}
              </span>
            </td>
            <td class="px-4 py-3 font-medium">{{ item.similarityScore }}%</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
