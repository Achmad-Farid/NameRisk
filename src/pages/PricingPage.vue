<script setup>
import { TOKEN_PACKS } from '../services/demoAccount.js'
</script>

<template>
  <div class="container page pricing">
    <h1>Token pricing</h1>
    <p class="lead">One token for each new brand name you check.</p>
    <div class="pricing-grid">
      <article v-for="pack in TOKEN_PACKS" :key="pack.id" class="panel pack">
        <h2>{{ pack.name }}</h2>
        <p class="price">${{ pack.price }} <small>USD</small></p>
        <p>{{ pack.tokens }} tokens · {{ pack.tokens }} name checks</p>
      </article>
    </div>
    <RouterLink class="btn primary" to="/checker">Check a name</RouterLink>
  </div>
</template>
