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
  },
  {
    path:'/message',
    name:'message',
    component: () => import('@/views/index/message.vue')
  },
  {
    path:'/discover',
    name:'discover',
    component: () => import('@/views/index/discover.vue')
  },{
    path:'/editdiscover',
    name:'editdiscover',
    component: () => import('@/views/index/discover-com/editDiscover.vue')
  },
  {
    path:'/addfriend',
    name:'addfriend',
    component: () => import('@/views/index/contact-com/addFriend.vue')
  },
  {
    path:'/allusers',
    name:'allusers',
    component: () => import('@/views/index/contact-com/allUsers.vue')
  },
  {
    path:'/persondetail/:id',
    name:'persondetail',
    component: () => import('@/views/index/contact-com/personDetail.vue')
  },
  {
    path:'*',
    name:'notfound',
    component: () => import('@/components/other/404.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
