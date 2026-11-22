import { defineStore } from 'pinia'
import { checkNameRisk } from '../services/nameRiskService.js'
import { readAccount, saveCheck, addTokenPack } from '../services/demoAccount.js'

export const useNameRiskStore = defineStore('name-risk', {
  state: () => ({
    name: '',
    account: null, busy: false, accountError: '',
  }),
  actions: {
    async refresh() {
      try {
        this.account = (await readAccount()).account
        this.accountError = ''
      } catch {
        this.accountError = 'Your saved account details are unavailable in this browser.'
      }
    },
    async runCheck() {
      return this.commit(() => saveCheck(checkNameRisk(this.name)))
    },
    async addPack(id) {
      return this.commit(() => addTokenPack(id))
    },
    async commit(operation) {
      if (this.busy) return
      this.busy = true
      try {
        const { account, result } = await operation()
        this.account = account
        return result
      } finally {
        this.busy = false
      }
    },
  },
})
