<script setup>
import { inject } from 'vue'
import BookForm from '@/components/BookForm.vue'
import BookFilters from '@/components/BookFilters.vue'
import BookList from '@/components/BookList.vue'
import { useSearch } from '@/composables/useSearch'

const { books, isLoading, error, allRead, addBook } = inject('shelf')
const { search, statusFilter, results } = useSearch(books)
</script>

<template>
  <BookForm @add="addBook" />
  <BookFilters v-model:search="search" v-model:status="statusFilter" v-model:allRead="allRead" />

  <p v-if="isLoading" class="muted">Loading your shelf…</p>
  <p v-else-if="error" class="error">Couldn't load books: {{ error }}</p>
  <BookList v-else :books="results">
    <template #empty>
      {{ books.length ? 'No books match your search.' : 'Your shelf is empty. Add your first book above.' }}
    </template>
  </BookList>
</template>
