import { createApp } from 'vue'
import App from '@/App.vue'
import router from './router'
import 'ant-design-vue/dist/antd.css'
import Antd from 'ant-design-vue'
import $bus from './utils/event'
import axios from 'axios'
import { VueClipboard } from '@soerenmartius/vue3-clipboard'
import './assets/icon/iconfont.js'

const app = createApp(App)

app.config.globalProperties.$bus = $bus
app.config.globalProperties.$axios = axios

app.use(router)
  .use(Antd)
  .use(VueClipboard)
  .mount('#app')
