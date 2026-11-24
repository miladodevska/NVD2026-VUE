<script>
export default {
  props: {
    search: { type: String, default: '' },
    status: { type: String, default: 'all' },
    allRead: { type: Boolean, default: false },
  },
  emits: ['update:search', 'update:status', 'update:allRead'],
}
</script>

<template>
  <div class="filters">
    <input
      type="search"
      placeholder="Search title or author"
      :value="search"
      @input="$emit('update:search', $event.target.value)"
    />
    <select :value="status" @change="$emit('update:status', $event.target.value)">
      <option value="all">All books</option>
      <option value="want">Want to read</option>
      <option value="reading">Reading</option>
      <option value="read">Read</option>
    </select>
    <label>
      <input
        type="checkbox"
        :checked="allRead"
        @change="$emit('update:allRead', $event.target.checked)"
      />
      Mark all as read
    </label>
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
