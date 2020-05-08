import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: false, //加载动画状态
    userinfo:{}, //用户信息
    baseinfo:{}, //用户基本信息 比喻昵称...
  },
  mutations: {
    changeIsLoading(state){ //改变加载动画状态
      state.isLoading = !state.isLoading
    },
    getUserInfo(state, data){
      state.userinfo = data
    },
    getBaseInfo(state,data){
      state.baseinfo = data
    }
  },
  actions: {
  },
  modules: {
  }
})
