import { createWebHistory, createRouter } from 'vue-router'
// 当需要登录时启用
// import Cookies from 'js-cookie'

const history = createWebHistory()

const routes = [
  {
    path: '/:catchAll(.*)',
    redirect: '/'
  },
//   {
//     path: '/isoinfo',
//     name: 'isoinfo',
//     component: () => import('@/views/IsoInfo.vue')
//   },
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

// router.beforeEach((to, from, next) => {
//   if (to.name === 'login') {
//     next()
//     return
//   }
//   // 登录验证
//   if (!Cookies.get('accessToken')) {
//     next({
//       path: '/login'
//     })
//     return
//   }
//   next()
// })

export default router
