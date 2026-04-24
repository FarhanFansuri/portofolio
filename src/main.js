import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)

import './icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome' // configuring fontawesome icons
app.component('font-awesome-icon', FontAwesomeIcon) // creating fontawesome component

app.mount('#app')
