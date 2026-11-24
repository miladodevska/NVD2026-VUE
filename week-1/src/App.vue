<script>
export default {
  data() {
    return {
      appName: 'BookNook',
      newTitle: '',
      newAuthor: '',
      books: [
        { id: 'OL893414W', title: 'Dune', author: 'Frank Herbert', status: 'read' },
        { id: 'OL27482W', title: 'The Hobbit', author: 'J.R.R. Tolkien', status: 'reading' },
        { id: 'OL1168083W', title: 'Nineteen Eighty-Four', author: 'George Orwell', status: 'want' },
      ],
    }
  },
  methods: {
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
    <p class="muted">You have {{ books.length }} books on your shelf.</p>
  </header>

  <form class="add-form" @submit.prevent="addBook">
    <input v-model="newTitle" placeholder="Title" />
    <input v-model="newAuthor" placeholder="Author" />
    <button type="submit">Add book</button>
  </form>
  <p v-show="newTitle" class="muted">Press Enter to add “{{ newTitle }}”</p>

  <p v-if="books.length === 0" class="muted">Your shelf is empty. Add your first book above.</p>
  <ul v-else class="book-list">
    <li v-for="book in books" :key="book.id" :class="{ read: book.status === 'read' }">
      <div>
        <strong>{{ book.title }}</strong>
        <span class="muted"> by {{ book.author }}</span>
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
.add-form {
  display: flex;
  gap: 0.5rem;
  margin-top: 1.5rem;
}

.add-form input {
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
