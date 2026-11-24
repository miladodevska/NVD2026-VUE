import { defineStore } from 'pinia'

export const useShelfStore = defineStore('shelf', {
  state: () => ({
    books: JSON.parse(localStorage.getItem('booknook') ?? '[]'),
    isLoading: false,
    error: null,
  }),

  getters: {
    stats: (state) => {
      const count = (status) => state.books.filter((book) => book.status === status).length
      return {
        total: state.books.length,
        want: count('want'),
        reading: count('reading'),
        read: count('read'),
      }
    },
    allRead: (state) =>
      state.books.length > 0 && state.books.every((book) => book.status === 'read'),
    getById: (state) => (id) => state.books.find((book) => book.id === id),
    isOnShelf: (state) => (id) => state.books.some((book) => book.id === id),
  },

  actions: {
    add(book) {
      if (book.id && this.isOnShelf(book.id)) return
      this.books.push({ id: crypto.randomUUID(), status: 'want', ...book })
    },
    setStatus(id, status) {
      const book = this.getById(id)
      if (book) book.status = status
    },
    setAllRead(value) {
      this.books.forEach((book) => {
        book.status = value ? 'read' : 'want'
      })
    },
    updateNotes(id, notes) {
      const book = this.getById(id)
      if (book) book.notes = notes
    },
    remove(id) {
      this.books = this.books.filter((book) => book.id !== id)
    },
    async loadSeed() {
      if (this.books.length) return

      this.isLoading = true
      try {
        const response = await fetch('/books.json')
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        this.books = await response.json()
      } catch (err) {
        this.error = err.message
      } finally {
        this.isLoading = false
      }
    },
  },
})
