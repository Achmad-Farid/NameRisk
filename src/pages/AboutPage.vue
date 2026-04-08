<script setup>
import { GlobeAltIcon, ShieldExclamationIcon, LanguageIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <section class="space-y-6">
    <article class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <h1 class="mb-3 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">About NameRisk</h1>
      <p class="max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
        NameRisk helps founders, brand teams, and marketers validate a name before using it across
        countries. The goal is to avoid naming issues caused by language meaning, slang, or
        similarity to offensive words.
      </p>
    </article>

    <section class="grid gap-4 md:grid-cols-3">
      <article class="rounded-2xl border border-slate-200 bg-white p-5">
        <div class="mb-3 inline-flex rounded-lg bg-cyan-100 p-2 text-cyan-700">
          <LanguageIcon class="h-5 w-5" />
        </div>
        <h2 class="mb-2 text-lg font-bold text-slate-900">Cross-Language Meaning</h2>
        <p class="text-sm leading-relaxed text-slate-600">
          The system reviews meaning across multiple languages to reduce negative perception in
          target markets.
        </p>
      </article>

      <article class="rounded-2xl border border-slate-200 bg-white p-5">
        <div class="mb-3 inline-flex rounded-lg bg-rose-100 p-2 text-rose-700">
          <ShieldExclamationIcon class="h-5 w-5" />
        </div>
        <h2 class="mb-2 text-lg font-bold text-slate-900">Profanity Detection</h2>
        <p class="text-sm leading-relaxed text-slate-600">
          The system checks similarity against profanity and slang to lower brand reputation risk.
        </p>
      </article>

      <article class="rounded-2xl border border-slate-200 bg-white p-5">
        <div class="mb-3 inline-flex rounded-lg bg-emerald-100 p-2 text-emerald-700">
          <GlobeAltIcon class="h-5 w-5" />
        </div>
        <h2 class="mb-2 text-lg font-bold text-slate-900">Global Risk Score</h2>
        <p class="text-sm leading-relaxed text-slate-600">
          The final output is a global risk score (Low / Medium / High) so non-technical teams can
          make fast decisions.
        </p>
      </article>
    </section>

    <article class="rounded-2xl border border-slate-200 bg-white p-6">
      <h2 class="mb-3 text-lg font-bold text-slate-900">How It Works (User Flow)</h2>
      <ol class="space-y-2 text-sm text-slate-700">
        <li>1. Enter a name or brand on the main feature page.</li>
        <li>2. Click the Check button.</li>
        <li>3. The system runs translation, profanity, and similarity checks.</li>
        <li>4. Results are shown in a simple, readable report.</li>
      </ol>
    </article>
  </section>
</template>
