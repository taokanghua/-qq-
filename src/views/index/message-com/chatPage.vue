<template>
  <div class="chat-container">
    <myheader>
      <template v-slot:title>{{ otherinfo.nickname }}</template>
      <template v-slot:right
        ><van-icon name="ellipsis" color="#fff" size="20"
      /></template>
    </myheader>
    <!-- 聊天盒子 -->
    <div class="content">
      <!-- 别人的样式 -->
      <!-- <div class="chat-item">
        <img src="http://taokanghua.cn/sources/avatar/20.jpg" alt="" />
        <div class="text">
          <span>123</span>
          <div class="message-box">123</div>
        </div>
      </div> -->
      <!-- 我的 -->
      <!-- <div class="chat-item my">
        <div class="text">
          <span>123</span>
          <div class="message-box">121231231231231231231231231231233</div>
        </div>
        <img src="http://taokanghua.cn/sources/avatar/20.jpg" alt="" />
      </div> -->
      <!-- 底部scroll盒子 -->
      <div class="bottom-view" ref="bview"></div>
    </div>
    <div class="tools">
      <div class="message">
        <input type="text" v-model="input"/>
        <div class="send" @click="sendMsg">发送</div>
      </div>
      <!-- 底部表情操作栏 -->
      <div class="tools-icon">
        <span class="iconfont icon-voice"></span>
        <span class="iconfont icon-picture"></span>
        <span class="iconfont icon-zhaoxiangji"></span>
        <span class="iconfont icon-hongbao"></span>
        <span class="iconfont icon-biaoqing"></span>
        <span class="iconfont icon-add"></span>
      </div>
    </div>
  </div>
</template>

<script>
import myheader from "@/components/other/commonHeader.vue";
export default {
  data() {
    return {
      otherinfo: {},
      input:'',
      roomId:'',
    };
  },
  sockets:{
    receiveMsg(data){
      this.$nextTick(()=>{
        this.renderMsg(data)
      })
    },
    history(data){
      this.$store.state.history = data
      console.log(data)
      this.renderHistory()
    }
  },
  methods: {
    async getNickName() {
      let id = this.$route.params.id;
      let { data: res } = await this.$axios.get("/checkuser/" + id);
      if (res.meta.status == 200) {
        this.otherinfo = res.res;
      }
    },
    async inviteRoom(){
      //算出房间号
      let other = this.$route.params.id
      let my = this.$store.state.userinfo.id
      let roomId = Math.min(other,my) +''+ Math.max(other, my)
      this.roomId = roomId
      //发送事件
      this.$socket.emit('inviteRoom', roomId)
      // 在session中插入对方
      /*
      let flag = false //默认没有
      this.$store.state.session.some(item=>{
        if(item.id == other){
          flag = true
        }
      })
      if(!flag){
        let {data:res} = await this.$axios.get('/checkuser/'+other)
      if(res.meta.status == 200){
        res.msg = []
        res.roomId = roomId
        this.$store.state.session.push(res.res)
      }
      }*/
    },
    sendMsg(){
      // 发送消息
      if(this.input.length == 0) return
      let data = this.$store.state.baseinfo
      data.msg = [this.input]
      data.roomId = this.roomId
      data.date = new Date()
      this.$socket.emit('sendMsg', data)
      //渲染
      // this.$nextTick(()=>{this.renderMsg(data, true)})
      // this.input = ''
    },
    renderHistory(){
        let history = this.$store.state.history[this.roomId]
        // console.log(history)
        if(history != undefined){
          history.forEach(item=>{
            this.renderMsg(item, false)
          })
        }
    },
    renderMsg(data, animate=true){
      if(data.id == this.$store.state.userinfo.id){
        let text = `<div class="chat-item my">
                      <div class="text">
                        <span>123</span>
                        <div class="message-box">${data.msg[0]}</div>
                      </div>
                      <img src="${data.img}" alt="" />
                    </div>`
        this.$refs.bview.insertAdjacentHTML('beforebegin', text)
      }else{
        let text = `<div class="chat-item">
                      <img src="${data.img}" alt="" />
                      <div class="text">
                        <span>123</span>
                        <div class="message-box">${data.msg[0]}</div>
                      </div>
                    </div>`
        this.$refs.bview.insertAdjacentHTML('beforebegin', text)
      }
      if(animate){
        this.$refs.bview.scrollIntoView({block:'end', behavior:'smooth'})
      }else{
        this.$refs.bview.scrollIntoView({block:'end'})
      }
    }
  },
  components: {
    myheader,
  },
  created() {
    this.getNickName();
    this.inviteRoom()
    let data = []
    data.push(this.roomId)
    this.$socket.emit('getHistroy', data)
  },
  mounted(){
    this.renderHistory()
  },
  watch:{
    
  }
};
</script>

<style lang="less">
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  background-color: #f5f6fa;
}
.content {
  flex: 1;
  overflow: auto;
  .chat-item {
    display: flex;
    padding: 3% 2%;
    img {
      width: 45px;
      height: 45px;
      border-radius: 50%;
    }
    .text {
      margin-left: 8px;
      max-width: 60%;
      position: relative;
      &::before {
        content: "";
        width: 0;
        height: 0;
        border-top: 6px solid transparent;
        border-right: 6px solid #fff;
        border-bottom: 6px solid transparent;
        border-left: 0px solid blue;
        position: absolute;
        left: 0;
        top:50%;
        transform: translateX(-80%);
      }

      span {
        font-size: 13px;
        visibility: hidden;
      }
      .message-box {
        text-align: left;
        padding: 4px 8px;
        font-size: 14px;
        border-radius: 8px;
        background-color: #fff;
        word-wrap: break-word;
        color: black;
      }
    }
  }
  .my{
    display: flex;
    justify-content: flex-end;
    .text{
      margin-right: 8px;
      &::before{
        display: none;
      }
      &::after{
        content: "";
        width: 0;
        height: 0;
        border-top: 6px solid transparent;
        border-right:  solid transparent;
        border-bottom: 6px solid transparent;
        border-left: 6px solid #fff;
        position: absolute;
        right: 0;
        top:50%;
        transform: translateX(85%);
      }
    }
  }
}
.tools {
  float: left;
  margin-bottom: 0;
  // background-color: #ccc;
  .message {
    display: flex;
    align-items: center;
    input {
      flex: 1;
      outline: none;
      border: none;
      height: 30px;
      font-size: 13px;
      padding-left: 5px;
    }
    .send {
      background-color: #7232dd;
      font-size: 12px;
      text-align: center;
      padding: 7px 10px;
      display: flex;
      align-items: center;
      color: #fff;
    }
  }
  .tools-icon {
    display: flex;
    justify-content: space-between;
    span {
      font-size: 27px;
      color: #979eb3;
    }
  }
}
</style>
