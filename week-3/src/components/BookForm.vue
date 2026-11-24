<script>
export default {
  emits: ['add'],
  data() {
    return { title: '', author: '' }
  },
  methods: {
    submit() {
      const title = this.title.trim()
      if (!title) return

      this.$emit('add', { title, author: this.author.trim() || 'Unknown author' })
      this.title = ''
      this.author = ''
      this.$refs.titleInput.focus()
    },
  },
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
