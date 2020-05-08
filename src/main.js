import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//导入全局样式
import '@/styles/common.less'
// 导入vant
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)
import {Lazyload} from 'vant'
Vue.use(Lazyload, {
  lazyComponent:true,
  loading:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2701646041,3975227449&fm=26&gp=0.jpg',
  error:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588950936879&di=63f465a8b4584f872d4d0f11af5d9d67&imgtype=0&src=http%3A%2F%2Fpic.soutu123.cn%2Felement_origin_min_pic%2F01%2F37%2F85%2F80573c6529bb88f.jpg%2521%2Ffw%2F700%2Fquality%2F90%2Funsharp%2Ftrue%2Fcompress%2Ftrue'
})
// 导入axios
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3002'
Vue.prototype.$axios = axios
// 导入axios
import qs from 'qs'
Vue.prototype.$qs = qs


// 全局请求拦截器
axios.interceptors.request.use(config => {
  //发起请求的时候 就改变状态为true
  //忽略路径
  let ignore = ['/getbaseinfo']  //部分链接不能改变状态
  if(!ignore.includes(config.url)){
    vm.$store.commit('changeIsLoading')
  }
  //设置请求头
  config.headers.Authorization = sessionStorage.getItem('kktoken')
  return config
})
// 全局响应拦截器
axios.interceptors.response.use(config => {
  //接受到请求了 就改变状态为false
  vm.$store.state.isLoading = false //这里直接改了
  return config
})

// 导入自己的字体图标
//第一种按class导入
import '@/assets/font/iconfont.css'
//按symbol 导入
import '@/assets/font/iconfont.js'

Vue.config.productionTip = false

let vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
