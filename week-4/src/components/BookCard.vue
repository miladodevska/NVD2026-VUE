<script setup>
import BaseCard from './BaseCard.vue'

const STATUSES = { want: 'To read', reading: 'Reading', read: 'Read' }

defineProps({
  book: {
    type: Object,
    required: true,
    // defineProps is hoisted out of setup, so the validator can't use STATUSES
    validator: (book) => ['want', 'reading', 'read'].includes(book.status),
  },
})

const emit = defineEmits(['update-status', 'remove'])
</script>

<template>
  <BaseCard :class="{ read: book.status === 'read' }">
    <template #header>
      <strong class="title">{{ book.title }}</strong>
      <span v-if="book.year" class="muted"> ({{ book.year }})</span>
    </template>

    <p class="muted">by {{ book.author }}</p>

    <template #actions>
      <select :value="book.status" @change="emit('update-status', book.id, $event.target.value)">
        <option v-for="(label, value) in STATUSES" :key="value" :value="value">
          {{ label }}
        </option>
      </select>
      <button @click="emit('remove', book.id)">Remove</button>
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

.read .title {
  text-decoration: line-through;
  color: var(--muted);
}
</style>
