<script setup>
import { useShelfStore } from '@/stores/shelf'

defineProps({
  book: { type: Object, required: true },
})

const shelf = useShelfStore()
</script>

<template>
  <label for="notes">Your notes on {{ book.title }}</label>
  <textarea
    id="notes"
    rows="8"
    placeholder="Favourite quotes, thoughts, who recommended it…"
    :value="book.notes"
    @input="shelf.updateNotes(book.id, $event.target.value)"
  ></textarea>
  <p class="muted">Notes are saved automatically.</p>
</template>

<style scoped>
label {
  display: block;
  margin-bottom: 0.5rem;
}

textarea {
  width: 100%;
  box-sizing: border-box;
}
</style>
