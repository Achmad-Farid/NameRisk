<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { UserCircleIcon } from '@heroicons/vue/24/outline'

const brandIcon = '/favicon.svg'
</script>

<template>
  <a class="skip" href="#main">Skip to content</a>
  <header class="site-header">
    <div class="container header-inner">
      <RouterLink class="brand" to="/" aria-label="NameRisk home"><img :src="brandIcon" width="35" height="35" alt="" />NameRisk</RouterLink>
      <nav aria-label="Main navigation">
        <RouterLink to="/">Home</RouterLink><RouterLink to="/checker">Name checker</RouterLink>
        <RouterLink to="/pricing">Pricing</RouterLink><RouterLink to="/about">About</RouterLink>
      </nav>
      <RouterLink class="account-link" to="/account"><UserCircleIcon aria-hidden="true" /> Account</RouterLink>
    </div>
  </header>
  <main id="main" tabindex="-1"><RouterView /></main>
  <footer class="site-footer">
    <div class="container"><span>NameRisk</span><RouterLink to="/about">About NameRisk</RouterLink></div>
  </footer>
</template>
