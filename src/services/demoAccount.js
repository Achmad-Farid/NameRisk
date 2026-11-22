import { brandWords } from './nameRiskService.js'

export const STARTING_TOKENS = 3
export const TOKEN_PACKS = [
  { id: 'starter', name: 'Shortlist', tokens: 5, price: 5 },
  { id: 'studio', name: 'Studio', tokens: 20, price: 15 },
]

const databaseName = 'namerisk-demo'
let connection

function openDatabase() {
  if (!connection) {
    connection = new Promise((resolve, reject) => {
      const request = indexedDB.open(databaseName, 1)
      request.onupgradeneeded = () => request.result.createObjectStore('accounts')
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    }).catch(error => {
      connection = undefined
      throw error
    })
  }
  return connection
}

// Keep the balance and saved report in the same transaction, including across tabs.
async function accessAccount(update) {
  const db = await openDatabase()
  return new Promise((resolve, reject) => {
    const tx = db.transaction('accounts', update ? 'readwrite' : 'readonly')
    const accounts = tx.objectStore('accounts')
    const request = accounts.get('guest')
    let account, result, failure
    request.onsuccess = () => {
      account = request.result ?? { tokens: STARTING_TOKENS, reports: [] }
      if (!update) return
      try {
        result = update(account)
        accounts.put(account, 'guest')
      } catch (error) {
        failure = error
        tx.abort()
      }
    }
    tx.oncomplete = () => resolve({ account, result })
    tx.onabort = () => reject(failure ?? tx.error ?? new Error('The account update could not be saved.'))
  })
}

export function readAccount() {
  return accessAccount()
}

export function saveCheck(report) {
  return accessAccount(account => {
    const name = brandWords(report.name)
    const previous = account.reports.find(item => brandWords(item.report.name) === name)
    if (previous) {
      previous.report = report
      return { id: previous.id, reused: true }
    }
    if (account.tokens < 1) throw new Error('You need one token for a new report. Add demo tokens on the Pricing page.')
    const id = String(account.reports.length + 1)
    account.reports.unshift({ id, createdAt: new Date().toISOString(), report })
    account.tokens--
    return { id, reused: false }
  })
}

export function addTokenPack(id) {
  return accessAccount(account => {
    const pack = TOKEN_PACKS.find(item => item.id === id)
    if (!pack) throw new Error('Choose an available token pack.')
    account.tokens += pack.tokens
  })
}
