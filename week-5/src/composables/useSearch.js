import { ref, computed } from 'vue'

export function useSearch(books) {
  const search = ref('')
  const statusFilter = ref('all')

  const results = computed(() => {
    const query = search.value.trim().toLowerCase()
    return books.value
      .filter((book) => statusFilter.value === 'all' || book.status === statusFilter.value)
      .filter(
        (book) =>
          book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query),
      )
      .sort((a, b) => a.title.localeCompare(b.title))
  })

  return { search, statusFilter, results }
}
