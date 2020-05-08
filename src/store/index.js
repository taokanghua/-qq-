import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: false, //加载动画状态
    userinfo:{}, //用户信息
  },
  mutations: {
    changeIsLoading(state){ //改变加载动画状态
      state.isLoading = !state.isLoading
    },
    getUserInfo(state, data){
      state.userinfo = data
    }
  },
  actions: {
  },
  modules: {
  }
})
