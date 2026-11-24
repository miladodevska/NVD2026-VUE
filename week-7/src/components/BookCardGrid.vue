<script setup>
import { useShelfStore } from '@/stores/shelf'
import { coverUrl } from '@/utils/cover'

defineProps({
  book: {
    type: Object,
    required: true,
    validator: (book) => ['want', 'reading', 'read'].includes(book.status),
  },
})

const STATUSES = { want: 'To read', reading: 'Reading', read: 'Read' }
const shelf = useShelfStore()
</script>

<template>
  <BaseCard :class="{ read: book.status === 'read' }">
    <template #header>
      <img v-if="book.coverId" class="cover" :src="coverUrl(book.coverId)" alt="" />
      <RouterLink class="title" :to="{ name: 'book', params: { id: book.id } }">
        {{ book.title }}
      </RouterLink>
      <span v-if="book.year" class="muted"> ({{ book.year }})</span>
    </template>

    <p class="muted">by {{ book.author }}</p>

    <template #actions>
      <select :value="book.status" @change="shelf.setStatus(book.id, $event.target.value)">
        <option v-for="(label, value) in STATUSES" :key="value" :value="value">
          {{ label }}
        </option>
      </select>
      <BaseButton @click="shelf.remove(book.id)">Remove</BaseButton>
    </template>
  </BaseCard>
</template>

<style scoped>
p {
  margin: 0;
}

select {
  flex: 1;
  min-width: 0;
}

.cover {
  display: block;
  width: 100%;
  height: 180px;
  object-fit: contain;
  margin-bottom: 0.5rem;
}

.title {
  font-weight: 600;
  color: var(--ink);
}

.read .title {
  text-decoration: line-through;
  color: var(--muted);
}
</style>
