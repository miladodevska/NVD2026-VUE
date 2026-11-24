import axios from 'axios'

export default {
  install(app, { baseURL }) {
    const api = axios.create({ baseURL, timeout: 8000 })

    app.provide('api', api) // for inject('api') in <script setup>
    app.config.globalProperties.$api = api // for this.$api in the Options API, as in Ex 6.02
  },
}
