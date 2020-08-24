import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
// import index from '@/views/index/view/index.vue'

Vue.use(VueRouter)

  const routes: Array<RouteConfig> = [
    {
      path: '/',
      name: 'index',
      component: (resolve: any) =>
          require(['@/views/index/view/index.vue'], resolve)
    },
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
