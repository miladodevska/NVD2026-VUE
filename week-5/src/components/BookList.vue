<script setup>
import { ref } from 'vue'
import BookCardGrid from './BookCardGrid.vue'
import BookCardRow from './BookCardRow.vue'

defineProps({
  books: { type: Array, required: true },
})

const layouts = { grid: BookCardGrid, row: BookCardRow }
const layout = ref('grid')
</script>

<template>
  <div class="layout-toggle">
    <BaseButton :disabled="layout === 'grid'" @click="layout = 'grid'">Grid</BaseButton>
    <BaseButton :disabled="layout === 'row'" @click="layout = 'row'">List</BaseButton>
  </div>

  <div v-if="books.length" :class="['book-list', layout]">
    <component :is="layouts[layout]" v-for="book in books" :key="book.id" :book="book" />
  </div>
  <p v-else class="muted">
    <slot name="empty">No books here yet.</slot>
  </p>
</template>

<style scoped>
.layout-toggle {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 1rem;
}

.book-list {
  margin-top: 1rem;
}

.book-list.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
}
</style>
