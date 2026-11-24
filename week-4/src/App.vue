<script setup>
import BookForm from './components/BookForm.vue'
import BookFilters from './components/BookFilters.vue'
import BookList from './components/BookList.vue'
import { useBooks } from './composables/useBooks'
import { useSearch } from './composables/useSearch'

const appName = import.meta.env.VITE_APP_TITLE
const { books, isLoading, error, stats, allRead, addBook, setStatus, removeBook } = useBooks()
const { search, statusFilter, results } = useSearch(books)
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
  <BookList v-else :books="results" @update-status="setStatus" @remove="removeBook">
    <template #empty>
      {{ books.length ? 'No books match your search.' : 'Your shelf is empty. Add your first book above.' }}
    </template>
  </BookList>
</template>
