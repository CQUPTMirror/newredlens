import { createApp } from 'vue'
import App from '@/App.vue'
import router from './router'
import 'vfonts/Lato.css'
import 'vfonts/FiraCode.css'
import axios from 'axios'
import naive from 'naive-ui'
import './assets/icon/iconfont.js'

const app = createApp(App)

app.config.globalProperties.$axios = axios

app.use(router)
  .use(naive)
  .mount('#app')
