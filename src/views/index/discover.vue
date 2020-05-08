<template>
  <div class="discover-container">
    <div class="header" >
      <div class="title">
        <h4>动态</h4>
        <p>
          <span class="iconfont icon-Settings"></span>
          <router-link :to="{name:'editdiscover'}" class="iconfont icon-add" tag="span"></router-link>
        </p>
      </div>
      <div class="info">
        <img :src="$store.state.userinfo.img" alt="">
      </div>
    </div>
    <div class="dicover-con">
      <dynamicitem v-for="item in dynamic" :key="item._id" :item="item"></dynamicitem>
      <!-- //discover-item  end -->
    </div>

    <tabbar></tabbar>
  </div>
  
</template>

<script>
import tabbar from '@/components/login/tabBar.vue'
import dynamicitem from '@/views/index/discover-com/dynamicitem.vue'
export default {
  data(){
    return{
      dynamic: []
    }
  },
  methods:{
    async getdynamics(){
      let {data:res} = await this.$axios.get('getdynamic')
      // console.log(res)
      this.dynamic = res.dynamic.reverse()
    }
  },
  components:{
    tabbar,
    dynamicitem
  },
  created(){
    this.getdynamics()
  }
}
</script>

<style lang="less">
.discover-container{
  width: 100%;
  max-height: 100%;
  background-color: #F5F6FA;
  overflow: auto;
}
.header{
  // padding: 1em 5px;
  height: 30vh;
  // background-color: skyblue;
  background-image: url(http://taokanghua.cn/sources/1584695205266.jpeg);
  background-size: cover;
  position: relative;
  .title{
    display: flex;
    justify-content: flex-end;
    align-items: center;
    position: relative;
    h4{
      font-size: 14px;
      color: #fff;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
    p{
      color: #fff;
      span{
        font-size: 20px;
        margin-right: 10px;
      }
    }
  }
  .info{
    position: absolute;
    left: 1.4em;
    bottom: 2em;
    img{
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }
  }
}

</style>