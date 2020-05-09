<template>
  <div class="findperitem-container" @click="$router.push({name:'persondetail', params:{id:item.id}})">
    <div class="frind-wrap">
      <img :src="item.img" alt="">
    <div class="info">
      <div class="top">
        <h3>{{item.nickname}}</h3>
        <span class="iconfont icon-female pink" v-if="item.gender=='女'"></span>
        <span class="iconfont icon-male blue" v-else></span>
      </div>
      <div class="bottom">{{item.selfdesc}}</div>
    </div>
  </div>
    </div>
</template>

<script>
export default {
  data(){
    return{}
  },
  props:['item']
}
</script>

<style lang="less" scoped>
.findperitem-container{
  // height: 100vh;
  background-color: #F5F6FA;
  margin-bottom: 5px;
  // padding: 5px 2%;
  
  .frind-wrap{
  display: flex;
  align-items: center;
  background-color: #fff;
  }
  img{
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  .info{
    margin-left: .5rem;
      .top{
        display: flex;
        h3{
          margin: 0;
          font-size: 14px;
          margin-right: 3px;
        }
      }
      .bottom{
        width: 80%;
        margin-top: 1px;
        font-size: 12px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
}
.pink{
  color: pink;
}
.blue{
  color: #00AFFE;
}
</style>