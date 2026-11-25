<script setup>
import { ref } from 'vue'
import { CircleStackIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/outline'
import { MAX_NAME_LENGTH, validateName } from '../../services/nameRiskService.js'
import { CHECKER_EXAMPLES } from '../../data/nameLexicon.js'

defineProps({ balance: { type: Number, default: null } })
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

const examples = CHECKER_EXAMPLES.map(sample => sample.name)

function chooseSample(example) {
  name.value = example
  error.value = ''
  emit('check', example)
}
</script>

<template>
  <form class="check-form" novalidate @submit.prevent="submit">
    <div class="form-label-row">
      <label class="field-title" for="candidate">Brand name</label>
      <RouterLink class="token-balance" to="/account"><CircleStackIcon aria-hidden="true" />{{ balance === null ? 'Balance unavailable' : balance + (balance === 1 ? ' token available' : ' tokens available') }}</RouterLink>
    </div>
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
    <p class="token-price">Current check: 0 tokens · Standard price: 1 token per new name</p>
    <div class="try-names">
      <span>Try an example</span>
      <button v-for="example in examples" :key="example" type="button" @click="chooseSample(example)">{{ example }}</button>
    </div>
  </form>
</template>
