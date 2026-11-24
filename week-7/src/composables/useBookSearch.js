import { ref, inject } from 'vue'

// Pass in a ref (e.g. from a store) to keep the results somewhere longer-lived
export function useBookSearch(results = ref([])) {
  const api = inject('api')

  const isSearching = ref(false)
  const error = ref(null)

  async function search(query) {
    if (!query.trim()) {
      results.value = []
      return
    }

    isSearching.value = true
    error.value = null
    try {
      const { data } = await api.get('/search.json', {
        params: {
          q: query,
          limit: 12,
          fields: 'key,title,author_name,first_publish_year,cover_i',
        },
      })
      results.value = data.docs.map((doc) => ({
        id: doc.key.replace('/works/', ''),
        title: doc.title,
        author: doc.author_name?.[0] ?? 'Unknown author',
        year: doc.first_publish_year ?? null,
        coverId: doc.cover_i ?? null,
      }))
    } catch (err) {
      error.value = err.message
    } finally {
      isSearching.value = false
    }
  }

  return { results, isSearching, error, search }
}
