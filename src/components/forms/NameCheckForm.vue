<script setup>
import { ref } from 'vue'
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'
import { MAX_NAME_LENGTH, validateName } from '../../services/nameRiskService.js'
import { SAMPLES } from '../../data/nameLexicon.js'

const name = defineModel({ type: String, required: true })
const emit = defineEmits(['check'])
const error = ref('')
const input = ref(null)

function submit() {
  error.value = validateName(name.value)
  if (error.value) {
    input.value.focus()
    return
  }
  emit('check', name.value.trim())
}

function chooseSample(sample) {
  name.value = sample.name
  error.value = ''
  emit('check', sample.name)
}
</script>

<template>
  <form class="check-form" novalidate @submit.prevent="submit">
    <label class="field-title" for="candidate">Brand name</label>
    <div class="search-row">
      <div class="name-field">
        <MagnifyingGlassIcon aria-hidden="true" />
        <input id="candidate" ref="input" v-model="name" autocomplete="off" spellcheck="false"
          placeholder="Enter your brand name" :maxlength="MAX_NAME_LENGTH"
          :aria-invalid="Boolean(error)" :aria-describedby="error ? 'check-error' : undefined" @input="error = ''" />
      </div>
      <button class="btn primary" type="submit">Check name</button>
    </div>
    <p v-if="error" id="check-error" class="error" role="alert">{{ error }}</p>
    <div class="try-names">
      <span>Try an example</span>
      <button v-for="sample in SAMPLES" :key="sample.id" type="button" @click="chooseSample(sample)">{{ sample.name }}</button>
    </div>
  </form>
</template>
