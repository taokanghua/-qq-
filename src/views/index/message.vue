<template>
  <div class="message-container">
    <myheader>
      <template v-slot:left
        ><img
          :src="$store.state.userinfo.img"
          alt=""
          @click="
            $router.push({
              name: 'setInfo',
              params: { id: $store.state.userinfo.id },
            })
          "
      /></template>
      <template v-slot:title>消息</template>
      <template v-slot:right
        ><span class="iconfont icon-i-add"></span
      ></template>
    </myheader>

    <van-swipe-cell @click="deleteMsg" v-for="item in items" :key="item.id">
      <div class="message-item" @click="goChat(item.id)">
        <div class="left">
          <img :src="item.img" alt="">
          <div class="info">
            <h3>{{item.nickname}}</h3>
            <p>{{item.msg[item.msg.length-1]}}</p>
          </div>
        </div>
        <div class="right">
          <span>{{item.date| timeF}}</span>
          <div></div>
        </div>
      </div>
      <template #right>
        <van-button square type="danger" text="删除" />
      </template>
    </van-swipe-cell>

    <tabbar></tabbar>
  </div>
</template>

<script>
import myheader from "@/components/other/commonHeader.vue";
import tabbar from "@/components/login/tabBar.vue";
export default {
  data() {
    return {
      items: this.$store.state.session,
    };
  },
  methods:{
    deleteMsg(position, name,id){
      // this.$router.push({name:'chatpage', params:{id:item.id}})
    },
    goChat(id){
      // console.log(id)
      this.$router.push({name:'chatpage', params:{id}})
    }
  },
  components: {
    tabbar,
    myheader,
  },
  filters:{
    timeF(v){
      let date = new Date(v)
      let h = date.getHours()
      let m = date.getMinutes()
      return h+':'+m
    }
  }
};
</script>

<style lang="less" scoped>
  .message-item{
    padding: 2% 2%;
    text-align: left;
    display: flex;
    justify-content: space-between;
    .left{
      display: flex;
      align-items: center;
      img{
        width: 45px;
        height: 45px;
        border-radius: 50%;
     }
     .info{
       margin-left: 5px;
       h3{
         margin: 0;
         font-size: 13px;
       }
       p{
         margin: 0;
         font-size: 12px;
         margin-top: 5px;
       }
     }
    }
    .right{
      display: flex;
      flex-direction: column;
      span{
        font-size: 12px;
      }
      div{text-align: center;}
    }
  }
</style>
