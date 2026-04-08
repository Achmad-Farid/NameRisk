<script setup>
import { Form, Field, ErrorMessage } from 'vee-validate'
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'

defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['submit'])

function validateName(value) {
  if (!value || !value.trim()) {
    return 'Brand name is required.'
  }

  if (value.trim().length < 2) {
    return 'Use at least 2 characters.'
  }

  return true
}

function onSubmit(values) {
  emit('submit', values.name.trim())
}
</script>

<template>
  <Form class="space-y-3" @submit="onSubmit">
    <label for="name" class="block text-sm font-semibold text-slate-700">
      Name / Brand
    </label>

    <div class="flex flex-col gap-3 sm:flex-row">
      <Field
        id="name"
        name="name"
        type="text"
        :rules="validateName"
        :disabled="loading"
        placeholder="Example: Nova"
        class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-100 disabled:cursor-not-allowed disabled:bg-slate-100"
      />

      <button
        type="submit"
        :disabled="loading"
        class="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-5 py-3 font-semibold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:bg-slate-400"
      >
        <MagnifyingGlassIcon class="h-5 w-5" />
        <span>{{ loading ? 'Checking...' : 'Check' }}</span>
      </button>
    </div>

    <ErrorMessage name="name" class="block text-sm font-medium text-rose-600" />
  </Form>
</template>
