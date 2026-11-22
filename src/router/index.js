import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import FeaturePage from '../pages/FeaturePage.vue'
import AboutPage from '../pages/AboutPage.vue'
import PricingPage from '../pages/PricingPage.vue'
import AccountPage from '../pages/AccountPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomePage, meta: { title: 'Brand name screening' } },
    { path: '/checker', name: 'feature', component: FeaturePage, meta: { title: 'Name checker' } },
    { path: '/pricing', name: 'pricing', component: PricingPage, meta: { title: 'Pricing' } },
    { path: '/account', name: 'account', component: AccountPage, meta: { title: 'Account' } },
    { path: '/about', name: 'about', component: AboutPage, meta: { title: 'About' } },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior(to, from, saved) {
    if (saved) return saved
    if (to.fullPath !== from.fullPath) return { top: 0 }
  },
})

router.afterEach(to => { document.title = to.meta.title + ' | NameRisk' })
export default router
