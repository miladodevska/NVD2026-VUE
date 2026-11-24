<script setup>
const search = defineModel('search', { type: String, default: '' })
const status = defineModel('status', { type: String, default: 'all' })
const allRead = defineModel('allRead', { type: Boolean, default: false })
</script>

<template>
  <div class="filters">
    <input v-model="search" type="search" placeholder="Search title or author" />
    <select v-model="status">
      <option value="all">All books</option>
      <option value="want">Want to read</option>
      <option value="reading">Reading</option>
      <option value="read">Read</option>
    </select>
    <label><input v-model="allRead" type="checkbox" /> Mark all as read</label>
  </div>
</template>

<style scoped>
.filters {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
}

.filters input[type='search'] {
  flex: 1;
}
</style>
