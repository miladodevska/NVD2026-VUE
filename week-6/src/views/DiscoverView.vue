<script setup>
import { useRouter } from 'vue-router'
import DiscoverPanel from '@/components/DiscoverPanel.vue'

const router = useRouter()

function openBook(book) {
  router.push({ name: 'book', params: { id: book.id } })
}
</script>

<template>
  <DiscoverPanel @added="openBook" />
</template>
