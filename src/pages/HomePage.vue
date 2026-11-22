<script setup>
import { ChatBubbleLeftRightIcon, DocumentMagnifyingGlassIcon, ExclamationTriangleIcon, GlobeAltIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/outline'
import { SAMPLES } from '../data/nameLexicon.js'

const descriptions = [
  'A drink name that can read like a warning on a German label.',
  'A studio name that could turn into an insulting nickname in Japan.',
  'A stationery name that takes on a different reading in a web address.',
]
const icons = [GlobeAltIcon, ChatBubbleLeftRightIcon, DocumentMagnifyingGlassIcon]
</script>

<template>
  <section class="container hero">
    <div class="hero-copy">
      <h1>Will your name <em>travel well?</em></h1>
      <p>Find out where your brand name could invite jokes, sound offensive, or send the wrong message abroad.</p>
      <div class="actions">
        <RouterLink class="btn primary" to="/checker"><MagnifyingGlassIcon />Check a name</RouterLink>
        <RouterLink class="btn secondary" to="/checker?sample=gift-soda">View sample report</RouterLink>
      </div>
    </div>
    <figure class="hero-example">
      <img src="/gift-soda.webp" width="1200" height="900" fetchpriority="high" alt="Fictional Gift citrus soda can beside an orange wedge" />
      <figcaption>
        <span class="caption-icon"><ExclamationTriangleIcon aria-hidden="true" /></span>
        <div><span class="meta">Gift Soda in Germany</span><p>“Gift” can mean “poison” on a drink label.</p></div>
      </figcaption>
    </figure>
  </section>
  <section class="example-band">
    <div class="container">
      <h2>What can go wrong with a name?</h2>
      <div class="card-grid">
        <article v-for="(sample, index) in SAMPLES" :key="sample.id" class="case">
          <span class="icon-box" :class="['purple', 'peach', 'blue'][index]"><component :is="icons[index]" aria-hidden="true" /></span>
          <h3>{{ sample.type }}</h3><p>{{ descriptions[index] }}</p>
          <RouterLink class="text-link" :to="{ name: 'feature', query: { sample: sample.id } }">See {{ sample.name }} report</RouterLink>
        </article>
      </div>
    </div>
  </section>
</template>
