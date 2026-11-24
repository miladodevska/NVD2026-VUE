<script setup>
import { inject } from 'vue'

defineProps({
  book: { type: Object, required: true },
})

const { updateNotes } = inject('shelf')
</script>

<template>
  <label for="notes">Your notes on {{ book.title }}</label>
  <textarea
    id="notes"
    rows="8"
    placeholder="Favourite quotes, thoughts, who recommended it…"
    :value="book.notes"
    @input="updateNotes(book.id, $event.target.value)"
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
