<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { HomeIcon, InformationCircleIcon } from '@heroicons/vue/24/outline'

const navItems = [
  {
    name: 'Main Feature',
    to: '/',
    icon: HomeIcon,
  },
  {
    name: 'About',
    to: '/about',
    icon: InformationCircleIcon,
  },
]
</script>

<template>
  <div class="relative min-h-screen overflow-hidden">
    <div
      class="pointer-events-none absolute inset-x-0 top-[-220px] h-[420px] bg-[radial-gradient(circle_at_top,_rgba(20,184,166,0.22),_transparent_60%)]"
    ></div>
    <div
      class="pointer-events-none absolute inset-y-0 right-[-240px] w-[420px] bg-[radial-gradient(circle_at_center,_rgba(6,182,212,0.14),_transparent_70%)]"
    ></div>

    <header class="sticky top-0 z-20 border-b border-slate-200/70 bg-white/80 backdrop-blur">
      <div class="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <RouterLink
          to="/"
          class="inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-1.5 text-sm font-bold tracking-wide text-white"
        >
          NameRisk
        </RouterLink>

        <nav class="flex items-center gap-2">
          <RouterLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            v-slot="{ isActive }"
          >
            <span
              class="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold transition"
              :class="
                isActive
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              "
            >
              <component :is="item.icon" class="h-4 w-4" />
              {{ item.name }}
            </span>
          </RouterLink>
        </nav>
      </div>
    </header>

    <main class="relative z-10 mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
      <RouterView />
    </main>
  </div>
</template>
