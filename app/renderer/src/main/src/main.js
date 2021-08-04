import { createApp } from 'vue'
import App from './pages/main/App.vue'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'

createApp(App).use(Quasar, quasarUserOptions).mount('#app')
