import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { NConfigProvider } from 'naive-ui'
import App from './App.vue'
import 'uno.css'
import './styles/main.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.component('NConfigProvider', NConfigProvider)
app.mount('#app')
