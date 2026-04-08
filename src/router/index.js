import { createRouter, createWebHistory } from 'vue-router'
import FeaturePage from '../pages/FeaturePage.vue'
import AboutPage from '../pages/AboutPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'feature',
      component: FeaturePage,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutPage,
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
