<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import BookForm from '@/components/BookForm.vue'
import BookFilters from '@/components/BookFilters.vue'
import BookList from '@/components/BookList.vue'
import { useSearch } from '@/composables/useSearch'
import { useShelfStore } from '@/stores/shelf'

const shelf = useShelfStore()
const { books, isLoading, error } = storeToRefs(shelf)
const { search, statusFilter, results } = useSearch(books)

// A getter is read-only, so pair it with an action for v-model
const allRead = computed({
  get: () => shelf.allRead,
  set: (value) => shelf.setAllRead(value),
})
</script>

<template>
  <BookForm @add="shelf.add" />
  <BookFilters v-model:search="search" v-model:status="statusFilter" v-model:allRead="allRead" />

  <p v-if="isLoading" class="muted">Loading your shelf…</p>
  <p v-else-if="error" class="error">Couldn't load books: {{ error }}</p>
  <BookList v-else :books="results">
    <template #empty>
      {{ books.length ? 'No books match your search.' : 'Your shelf is empty. Add your first book above.' }}
    </template>
  </BookList>
</template>
