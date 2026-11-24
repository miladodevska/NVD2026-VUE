import { defineStore } from 'pinia'

// Lives outside any component, so the last search survives route changes
export const useDiscoverStore = defineStore('discover', {
  state: () => ({
    query: '',
    results: [],
  }),
})
