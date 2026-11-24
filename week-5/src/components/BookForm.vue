<script setup>
import { ref } from 'vue'

const emit = defineEmits(['add'])

const title = ref('')
const author = ref('')
const titleInput = ref(null)

function submit() {
  const cleanTitle = title.value.trim()
  if (!cleanTitle) return

  emit('add', { title: cleanTitle, author: author.value.trim() || 'Unknown author' })
  title.value = ''
  author.value = ''
  titleInput.value.focus()
}
</script>

<template>
  <form class="book-form" @submit.prevent="submit">
    <input ref="titleInput" v-model="title" placeholder="Title" />
    <input v-model="author" placeholder="Author" />
    <button type="submit">Add book</button>
  </form>
  <p v-show="title" class="muted">Press Enter to add “{{ title }}”</p>
</template>

<style scoped>
.book-form {
  display: flex;
  gap: 0.5rem;
  margin-top: 1.5rem;
}

.book-form input {
  flex: 1;
}
</style>
