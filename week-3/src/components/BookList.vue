<script>
import BookCard from './BookCard.vue'

export default {
  components: { BookCard },
  props: {
    books: { type: Array, required: true },
  },
  emits: ['update-status', 'remove'],
}
</script>

<template>
  <div v-if="books.length" class="book-list">
    <BookCard
      v-for="book in books"
      :key="book.id"
      :book="book"
      @update-status="(id, status) => $emit('update-status', id, status)"
      @remove="(id) => $emit('remove', id)"
    />
  </div>
  <p v-else class="muted">
    <slot name="empty">No books here yet.</slot>
  </p>
</template>

<style scoped>
.book-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
}
</style>
