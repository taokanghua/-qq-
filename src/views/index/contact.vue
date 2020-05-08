<template>
  <div class="contact-container">
    <myheader>
      <template v-slot:left><img :src="$store.state.userinfo.img" alt=""></template>
      <template v-slot:title>联系人</template>
      <template v-slot:right><span class="iconfont icon-tianjiayonghu"></span></template>
    </myheader>
    <van-notice-bar text="通知内容1111111111111111111111222222222222222222222333333333333333333333" left-icon="volume-o" />
    123
    <tabbar></tabbar>
  </div>
</template>

<script>
import tabbar from '@/components/login/tabBar.vue'
import myheader from '@/components/other/commonHeader.vue'
export default {
  data(){
    return{}
  },
  methods:{
    async getBaseInfo(){//获取用户信息 比如昵称...
      let id = this.$store.state.userinfo.id
      let {data:res} = await this.$axios.get('/checkuser/'+id)
        // console.log(res)
        this.$store.commit('getBaseInfo', res.res)
        // console.log(this.$store.state.baseinfo)
    }
  },
  components:{
    tabbar,
    myheader
  },
  created(){
    this.getBaseInfo()
  }
}
</script>

<style lang="less" scoped>
.contact-container{
  background-color: #F5F6FA;
  height: 100vh;
  padding-bottom: 50px;
}
</style>