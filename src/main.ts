import { createApp } from 'vue'
import App from '@/App.vue'
import router from './router'
import 'ant-design-vue/dist/reset.css'
import Antd from 'ant-design-vue'
import axios from 'axios'
import './assets/icon/iconfont.js'
import '@unocss/reset/tailwind.css'
import 'uno.css'

const app = createApp(App)

app.config.globalProperties.$axios = axios

app.use(router)
  .use(Antd)
  .mount('#app')
