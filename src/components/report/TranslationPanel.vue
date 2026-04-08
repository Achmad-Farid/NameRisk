<script setup>
defineProps({
  rows: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <section class="overflow-hidden rounded-xl border border-slate-200 bg-white">
    <header class="border-b border-slate-200 px-4 py-3">
      <h3 class="text-base font-bold text-slate-900">C. Translation</h3>
      <p class="text-sm text-slate-600">Name meaning in multiple languages (dummy data).</p>
    </header>

    <div class="overflow-x-auto">
      <table class="min-w-full text-left text-sm">
        <thead class="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
          <tr>
            <th class="px-4 py-3">Language</th>
            <th class="px-4 py-3">Meaning</th>
            <th class="px-4 py-3">Source</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-200 bg-white text-slate-700">
          <tr v-for="row in rows" :key="row.language">
            <td class="px-4 py-3 font-semibold text-slate-900">{{ row.language }}</td>
            <td class="px-4 py-3">{{ row.meaning }}</td>
            <td class="px-4 py-3">
              <span class="inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                {{ row.note }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
