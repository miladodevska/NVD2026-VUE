import { createApp } from 'vue'
import App from './App.vue'
import api from './plugins/api'
import ui from './plugins/ui'
import './assets/main.css'

const app = createApp(App)

app.use(api, { baseURL: 'https://openlibrary.org' })
app.use(ui)

app.mount('#app')
