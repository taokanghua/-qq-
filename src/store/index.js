import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: false, //加载动画状态
    userinfo:{}, //用户信息
    baseinfo:{}, //用户基本信息 比喻昵称...
    session:[], //存放所有会话信息
    history:{}, //会话中所有的历史记录 {房间号:[{},{}...]} 
    num: 0
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
    },
    calNum(stata){
      state.session.forEach(item=>{
        state.num += item.msg.length
      })
    }
  },
  actions: {
  },
  modules: {
  }
})
