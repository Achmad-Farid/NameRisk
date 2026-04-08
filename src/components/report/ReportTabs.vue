<script setup>
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/vue'
import SummaryPanel from './SummaryPanel.vue'
import SimilarityPanel from './SimilarityPanel.vue'
import TranslationPanel from './TranslationPanel.vue'
import ProfanityPanel from './ProfanityPanel.vue'

defineProps({
  report: {
    type: Object,
    required: true,
  },
})

const tabs = ['Summary', 'Similarity', 'Translation', 'Profanity']
</script>

<template>
  <TabGroup>
    <TabList class="mb-4 grid grid-cols-2 gap-2 rounded-xl bg-slate-100 p-2 sm:grid-cols-4">
      <Tab
        v-for="tab in tabs"
        :key="tab"
        v-slot="{ selected }"
        as="template"
      >
        <button
          type="button"
          class="rounded-lg px-3 py-2 text-sm font-semibold transition"
          :class="
            selected
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:bg-white/70 hover:text-slate-900'
          "
        >
          {{ tab }}
        </button>
      </Tab>
    </TabList>

    <TabPanels class="space-y-4">
      <TabPanel>
        <SummaryPanel :summary="report.summary" :processing="report.processing" />
      </TabPanel>

      <TabPanel>
        <SimilarityPanel :items="report.similarity" />
      </TabPanel>

      <TabPanel>
        <TranslationPanel :rows="report.translation" />
      </TabPanel>

      <TabPanel>
        <ProfanityPanel :profanity="report.profanity" />
      </TabPanel>
    </TabPanels>
  </TabGroup>
</template>
