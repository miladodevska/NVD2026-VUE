<script>
export default {
  data() {
    return {
      appName: 'BookNook',
      newTitle: '',
      newAuthor: '',
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
    addBook() {
      const title = this.newTitle.trim()
      if (!title) return

      this.books.push({
        id: crypto.randomUUID(),
        title,
        author: this.newAuthor.trim() || 'Unknown author',
        status: 'want',
      })
      this.newTitle = ''
      this.newAuthor = ''
    },
    toggleRead(book) {
      book.status = book.status === 'read' ? 'want' : 'read'
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

  <form class="add-form" @submit.prevent="addBook">
    <input v-model="newTitle" placeholder="Title" />
    <input v-model="newAuthor" placeholder="Author" />
    <button type="submit">Add book</button>
  </form>
  <p v-show="newTitle" class="muted">Press Enter to add “{{ newTitle }}”</p>

  <div class="filters">
    <input v-model="search" type="search" placeholder="Search title or author" />
    <select v-model="statusFilter">
      <option value="all">All books</option>
      <option value="want">Want to read</option>
      <option value="reading">Reading</option>
      <option value="read">Read</option>
    </select>
    <label><input v-model="allRead" type="checkbox" /> Mark all as read</label>
  </div>

  <p v-if="isLoading" class="muted">Loading your shelf…</p>
  <p v-else-if="error" class="error">Couldn't load books: {{ error }}</p>
  <p v-else-if="books.length === 0" class="muted">
    Your shelf is empty. Add your first book above.
  </p>
  <p v-else-if="visibleBooks.length === 0" class="muted">No books match your search.</p>
  <ul v-else class="book-list">
    <li v-for="book in visibleBooks" :key="book.id" :class="{ read: book.status === 'read' }">
      <div>
        <strong>{{ book.title }}</strong>
        <span class="muted"> by {{ book.author }}</span>
        <span v-if="book.year" class="muted"> ({{ book.year }})</span>
      </div>
      <div class="actions">
        <button @click="toggleRead(book)">
          {{ book.status === 'read' ? 'Mark unread' : 'Mark read' }}
        </button>
        <button @click="removeBook(book.id)">Remove</button>
      </div>
    </li>
  </ul>
</template>

<style scoped>
.add-form,
.filters {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
}

.add-form input,
.filters input[type='search'] {
  flex: 1;
}

.book-list {
  list-style: none;
  padding: 0;
}

.book-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--line);
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.read strong {
  text-decoration: line-through;
  color: var(--muted);
}
</style>
