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
