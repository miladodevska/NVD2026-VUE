import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { router } from './router'
import api from './plugins/api'
import ui from './plugins/ui'
import { useShelfStore } from './stores/shelf'
import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(api, { baseURL: 'https://openlibrary.org' })
app.use(ui)

// Save the shelf to localStorage after every change to the store
useShelfStore().$subscribe((mutation, state) => {
  localStorage.setItem('booknook', JSON.stringify(state.books))
})

app.mount('#app')
