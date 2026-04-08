import { defineStore } from 'pinia'
import NProgress from 'nprogress'
import { SAMPLE_NAMES } from '../data/dummyRiskData'
import { checkNameRisk } from '../services/nameRiskService'

NProgress.configure({
  showSpinner: false,
  trickleSpeed: 120,
})

export const useNameRiskStore = defineStore('name-risk', {
  state: () => ({
    report: null,
    loading: false,
    errorMessage: '',
    sampleNames: SAMPLE_NAMES,
    recentChecks: [],
  }),
  actions: {
    async runCheck(name) {
      this.loading = true
      this.errorMessage = ''

      NProgress.start()

      try {
        const report = await checkNameRisk(name)
        this.report = report
        this.recentChecks = [
          report.summary.name,
          ...this.recentChecks.filter((item) => item !== report.summary.name),
        ].slice(0, 5)
      } catch (error) {
        this.report = null
        this.errorMessage = error?.message ?? 'Failed to process dummy data.'
      } finally {
        this.loading = false
        NProgress.done()
      }
    },
  },
})
