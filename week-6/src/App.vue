<script setup>
import { provide } from 'vue'
import { useBooks } from './composables/useBooks'

const appName = import.meta.env.VITE_APP_TITLE
const shelf = useBooks()
const { stats } = shelf

provide('shelf', shelf)
</script>

<template>
  <header class="app-header">
    <RouterLink to="/" class="logo">{{ appName }}</RouterLink>
    <nav>
      <RouterLink to="/">My shelf</RouterLink>
      <RouterLink :to="{ name: 'discover' }">Discover</RouterLink>
    </nav>
  </header>
  <p class="muted">
    {{ stats.read }} of {{ stats.total }} read · {{ stats.reading }} reading now ·
    {{ stats.want }} to read
  </p>

  <RouterView />
</template>

<style scoped>
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--ink);
  text-decoration: none;
}

nav {
  display: flex;
  gap: 1rem;
}

nav a {
  color: var(--muted);
  text-decoration: none;
}

nav a.router-link-exact-active {
  color: var(--accent);
  font-weight: 600;
}
</style>
