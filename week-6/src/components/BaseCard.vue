<template>
  <article class="base-card">
    <header v-if="$slots.header" class="card-header">
      <slot name="header" />
    </header>
    <div class="card-body">
      <slot />
    </div>
    <footer v-if="$slots.actions" class="card-actions">
      <slot name="actions" />
    </footer>
  </article>
</template>

<style scoped>
.base-card {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  background: white;
  border: 1px solid var(--line);
  border-radius: 10px;
}

.card-body {
  flex: 1;
}

.card-actions {
  display: flex;
  gap: 0.5rem;
}
</style>
