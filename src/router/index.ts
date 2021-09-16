import { createWebHistory, createRouter } from 'vue-router'
// 当需要登录时启用
// import Cookies from 'js-cookie'

const history = createWebHistory()

const routes = [
  {
    path: '/:catchAll(.*)',
    redirect: '/'
  },
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HelloWorld.vue')
  }
]
const router = createRouter({
  history,
  routes
})

export default router
