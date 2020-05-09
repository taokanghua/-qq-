<template>
  <div class="contactitem-container" @click="$router.push({name:'chatpage', params:{id:item.id}})">
    <div class="contact-item">
      <img :src="item.img" alt="" />
      <div class="info">
        <h3>{{item.nickname}}</h3>
        <div>
          <span class="online" v-if="status">[在线]</span>
          <span class="offline" v-else>[离线]</span>
         {{item.selfdesc}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      status:false
    };
  },
  props:['item'],
  methods:{
    async getStatus(){
      let {data:res} = await this.$axios.get('/getstatus/'+this.item.id)
      if(res.meta.status == 200){
        this.status = res.online
      }
    }
  },
  created(){
    this.getStatus()
  }
};
</script>

<style lang="less" scoped>
.contactitem-container {
  .contact-item {
    display: flex;
    align-items: center;
    line-height: 1.2rem;
    padding: 5px 5px;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 5px;
    }
    .info {
      h3 {
        margin: 0;
        font-size: 13px;
        text-align: left;
      }
      div {
        font-size: 12px;
        color: #35495e;
        width: 75vw;
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
.online {
  color: #00affe;
}
.offline {
  color: red;
}
</style>
