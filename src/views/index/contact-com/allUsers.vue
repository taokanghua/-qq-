<template>
  <div class="allusers-container">
    <myheader>
      <template v-slot:title>所有用户</template>
    </myheader>
    
    <myloading v-show="$store.state.isLoading"></myloading>
    <div class="user">
      <peritem :item="item" v-for="item in userList" :key="item.id"></peritem>
      <!-- <p v-for="item in userList" :key="item.id">123</p> -->
    </div>
    
  </div>
</template>

<script>
import { Toast } from 'vant'
import myheader from '@/components/other/commonHeader.vue'
import peritem from '@/views/index/contact-com/findPerItem.vue'
import myloading from '@/components/other/loading.vue'
export default {
  data(){
    return{
      userList:[]
    }
  },
  methods:{
    async getAllUsers(){
      let {data:res} = await this.$axios.get('/allusers')
      if(res.meta.status == 200){
        this.userList = res.res
        // console.log(this.userList)
      }else{
        Toast('获取失败!')
      }
    }
  },
  components:{
    myheader,
    peritem,
    myloading
  },
  created(){
    this.getAllUsers()
  }
}
</script>

<style lang="less" scoped>
.allusers-container{
    // height: 100vh;
    background-color: #FAFAFA;
  }
.user{
  width: 100vw;
  overflow-x: hidden;
}
</style>