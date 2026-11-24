<script>
import BookForm from './components/BookForm.vue'
import BookFilters from './components/BookFilters.vue'
import BookList from './components/BookList.vue'

export default {
  components: { BookForm, BookFilters, BookList },
  data() {
    return {
      appName: import.meta.env.VITE_APP_TITLE,
      books: [],
      search: '',
      statusFilter: 'all',
      isLoading: false,
      error: null,
    }
  },
  computed: {
    stats() {
      const count = (status) => this.books.filter((book) => book.status === status).length
      return {
        total: this.books.length,
        want: count('want'),
        reading: count('reading'),
        read: count('read'),
      }
    },
    visibleBooks() {
      const query = this.search.trim().toLowerCase()
      return this.books
        .filter((book) => this.statusFilter === 'all' || book.status === this.statusFilter)
        .filter(
          (book) =>
            book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query),
        )
        .sort((a, b) => a.title.localeCompare(b.title))
    },
    allRead: {
      get() {
        return this.books.length > 0 && this.books.every((book) => book.status === 'read')
      },
      set(value) {
        this.books.forEach((book) => {
          book.status = value ? 'read' : 'want'
        })
      },
    },
  },
  watch: {
    books: {
      handler(books) {
        localStorage.setItem('booknook', JSON.stringify(books))
      },
      deep: true,
    },
  },
  created() {
    this.loadBooks()
  },
  methods: {
    async loadBooks() {
      const saved = localStorage.getItem('booknook')
      if (saved) {
        this.books = JSON.parse(saved)
        return
      }

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
    addBook(book) {
      this.books.push({ id: crypto.randomUUID(), status: 'want', ...book })
    },
    setStatus(id, status) {
      const book = this.books.find((book) => book.id === id)
      if (book) book.status = status
    },
    removeBook(id) {
      this.books = this.books.filter((book) => book.id !== id)
    },
  },
}
</script>

<template>
  <header>
    <h1>{{ appName }}</h1>
    <p class="muted">
      {{ stats.read }} of {{ stats.total }} read · {{ stats.reading }} reading now ·
      {{ stats.want }} to read
    </p>
  </header>

  <BookForm @add="addBook" />
  <BookFilters v-model:search="search" v-model:status="statusFilter" v-model:allRead="allRead" />

  <p v-if="isLoading" class="muted">Loading your shelf…</p>
  <p v-else-if="error" class="error">Couldn't load books: {{ error }}</p>
  <BookList v-else :books="visibleBooks" @update-status="setStatus" @remove="removeBook">
    <template #empty>
      {{ books.length ? 'No books match your search.' : 'Your shelf is empty. Add your first book above.' }}
    </template>
  </BookList>
</template>
