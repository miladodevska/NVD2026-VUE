import BaseButton from '@/components/BaseButton.vue'
import BaseCard from '@/components/BaseCard.vue'

export default {
  install(app) {
    app.component('BaseButton', BaseButton)
    app.component('BaseCard', BaseCard)
  },
}
