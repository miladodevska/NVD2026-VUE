<script setup>
import { useRouter } from 'vue-router'
import { useShelfStore } from '@/stores/shelf'

const props = defineProps({
  book: { type: Object, required: true },
})

const STATUSES = { want: 'Want to read', reading: 'Reading', read: 'Read' }
const shelf = useShelfStore()
const router = useRouter()

function remove() {
  shelf.remove(props.book.id)
  router.push({ name: 'shelf' })
}
</script>

<template>
  <dl>
    <dt>Author</dt>
    <dd>{{ book.author }}</dd>
    <template v-if="book.year">
      <dt>First published</dt>
      <dd>{{ book.year }}</dd>
    </template>
    <dt>Status</dt>
    <dd>
      <select :value="book.status" @change="shelf.setStatus(book.id, $event.target.value)">
        <option v-for="(label, value) in STATUSES" :key="value" :value="value">
          {{ label }}
        </option>
      </select>
    </dd>
  </dl>
  <BaseButton @click="remove">Remove from shelf</BaseButton>
</template>

<style scoped>
dt {
  font-weight: 600;
}

dd {
  margin: 0 0 0.75rem;
}
</style>
