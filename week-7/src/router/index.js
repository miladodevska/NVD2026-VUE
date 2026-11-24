import { createRouter, createWebHistory } from 'vue-router'
import ShelfView from '@/views/ShelfView.vue'
import { useShelfStore } from '@/stores/shelf'

const routes = [
  { path: '/', name: 'shelf', component: ShelfView, meta: { title: 'My shelf' } },
  {
    path: '/discover',
    name: 'discover',
    component: () => import('@/views/DiscoverView.vue'),
    meta: { title: 'Discover' },
  },
  {
    path: '/books/:id',
    component: () => import('@/views/BookDetailView.vue'),
    props: true,
    // Guards run outside components: inject() can't work here, a store can
    beforeEnter: (to) => (useShelfStore().getById(to.params.id) ? true : '/not-found'),
    children: [
      { path: '', name: 'book', component: () => import('@/views/BookOverview.vue') },
      { path: 'notes', name: 'book-notes', component: () => import('@/views/BookNotes.vue') },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
    meta: { title: 'Not found' },
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.afterEach((to) => {
  document.title = `${to.meta.title ?? 'Book'} · BookNook`
})
