<script setup>
import { useShelfStore } from '@/stores/shelf'

defineProps({
  book: { type: Object, required: true },
})

const shelf = useShelfStore()
</script>

<template>
  <div class="row" :class="{ read: book.status === 'read' }">
    <RouterLink class="title" :to="{ name: 'book', params: { id: book.id } }">
      {{ book.title }}
    </RouterLink>
    <span class="muted">{{ book.author }}</span>
    <BaseButton @click="shelf.setStatus(book.id, book.status === 'read' ? 'want' : 'read')">
      {{ book.status === 'read' ? 'Mark unread' : 'Mark read' }}
    </BaseButton>
    <BaseButton @click="shelf.remove(book.id)">Remove</BaseButton>
  </div>
</template>

<style scoped>
.row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--line);
}

.title {
  flex: 1;
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
