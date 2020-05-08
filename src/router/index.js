import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    redirect: '/loginIn'
  },
  {
    path:'/loginIn',
    name:'loginIn',
    component: () => import('@/views/login/loginIn.vue')
  },
  {
    path:'/forget',
    name: 'forget',
    component: () => import('@/views/login/loginForget.vue')
  },
  {
    path:'/loginUp',
    name:'loginUp',
    component: () => import('@/views/login/loginUp.vue')
  },
  {
    path:'/setInfo/:id',
    name:'setInfo',
    component: () => import('@/views/login/setInfo.vue')
  },
  {
    path:'/contact',
    name:'contact',
    component: () => import('@/views/index/contact.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
