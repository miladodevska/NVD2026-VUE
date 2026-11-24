<script setup>
import { computed, inject } from 'vue'
import { coverUrl } from '@/utils/cover'

const props = defineProps({
  id: { type: String, required: true },
})

const { books } = inject('shelf')
const book = computed(() => books.value.find((book) => book.id === props.id))
</script>

<template>
  <section v-if="book" class="detail">
    <img v-if="book.coverId" class="cover" :src="coverUrl(book.coverId, 'L')" alt="" />
    <div class="content">
      <h2>{{ book.title }}</h2>
      <nav class="tabs">
        <RouterLink :to="{ name: 'book', params: { id } }">Overview</RouterLink>
        <RouterLink :to="{ name: 'book-notes', params: { id } }">Notes</RouterLink>
      </nav>
      <!-- the child route (Overview or Notes) renders here and receives the book -->
      <RouterView :book="book" />
    </div>
  </section>

  <section v-else>
    <h2>Book not found</h2>
    <p class="muted">There's no book with the id “{{ id }}” on your shelf.</p>
    <RouterLink to="/">Back to my shelf</RouterLink>
  </section>
</template>

<style scoped>
.detail {
  display: flex;
  gap: 2rem;
  margin-top: 1.5rem;
}

.cover {
  width: 200px;
  align-self: flex-start;
}

.content {
  flex: 1;
}

.tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid var(--line);
}

.tabs a {
  padding: 0.5rem 0;
  color: var(--muted);
  text-decoration: none;
}

.tabs a.router-link-exact-active {
  color: var(--accent);
  border-bottom: 2px solid var(--accent);
}
</style>
