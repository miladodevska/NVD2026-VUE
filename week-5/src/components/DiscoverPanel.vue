<script setup>
import { ref, inject } from 'vue'
import { useBookSearch } from '@/composables/useBookSearch'
import { coverUrl } from '@/utils/cover'

const query = ref('')
const { results, isSearching, error, search } = useBookSearch()
const { addBook, isOnShelf } = inject('shelf')
</script>

<template>
  <section class="discover">
    <h2>Discover</h2>

    <form class="search" @submit.prevent="search(query)">
      <input v-model="query" type="search" placeholder="Search Open Library…" />
      <BaseButton type="submit" :disabled="isSearching">
        {{ isSearching ? 'Searching…' : 'Search' }}
      </BaseButton>
    </form>

    <p v-if="error" class="error">Search failed: {{ error }}</p>

    <ul class="results">
      <li v-for="book in results" :key="book.id">
        <img v-if="book.coverId" :src="coverUrl(book.coverId, 'S')" alt="" />
        <div class="info">
          <strong>{{ book.title }}</strong>
          <span class="muted">{{ book.author }}<template v-if="book.year"> · {{ book.year }}</template></span>
        </div>
        <BaseButton :disabled="isOnShelf(book.id)" @click="addBook(book)">
          {{ isOnShelf(book.id) ? 'On your shelf' : 'Add to shelf' }}
        </BaseButton>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.search {
  display: flex;
  gap: 0.5rem;
}

.search input {
  flex: 1;
}

.results {
  list-style: none;
  padding: 0;
}

.results li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--line);
}

.results img {
  width: 40px;
}

.info {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
