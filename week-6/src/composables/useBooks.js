import { ref, computed, watch, onMounted } from 'vue'

export function useBooks() {
  const books = ref([])
  const isLoading = ref(false)
  const error = ref(null)

  const stats = computed(() => {
    const count = (status) => books.value.filter((book) => book.status === status).length
    return {
      total: books.value.length,
      want: count('want'),
      reading: count('reading'),
      read: count('read'),
    }
  })

  const allRead = computed({
    get: () => books.value.length > 0 && books.value.every((book) => book.status === 'read'),
    set: (value) => {
      books.value.forEach((book) => {
        book.status = value ? 'read' : 'want'
      })
    },
  })

  function isOnShelf(id) {
    return books.value.some((book) => book.id === id)
  }

  function addBook(book) {
    if (book.id && isOnShelf(book.id)) return
    books.value.push({ id: crypto.randomUUID(), status: 'want', ...book })
  }

  function setStatus(id, status) {
    const book = books.value.find((book) => book.id === id)
    if (book) book.status = status
  }

  function updateNotes(id, notes) {
    const book = books.value.find((book) => book.id === id)
    if (book) book.notes = notes
  }

  function removeBook(id) {
    books.value = books.value.filter((book) => book.id !== id)
  }

  async function load() {
    const saved = localStorage.getItem('booknook')
    if (saved) {
      books.value = JSON.parse(saved)
      return
    }

    isLoading.value = true
    try {
      const response = await fetch('/books.json')
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      books.value = await response.json()
    } catch (err) {
      error.value = err.message
    } finally {
      isLoading.value = false
    }
  }

  watch(books, (value) => localStorage.setItem('booknook', JSON.stringify(value)), { deep: true })
  onMounted(load)

  return {
    books,
    isLoading,
    error,
    stats,
    allRead,
    isOnShelf,
    addBook,
    setStatus,
    updateNotes,
    removeBook,
  }
}
