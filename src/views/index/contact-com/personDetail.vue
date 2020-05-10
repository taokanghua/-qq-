<template>
  <div class="persondetail-container">
    <myheader>
      <template v-slot:left>
        <div class="chat-back" @click="$router.go(-1)">
          <van-icon name="arrow-left" size="24px" color="#fff"/>
          <!-- <Icon type="ios-arrow-back" size="24"></Icon> -->
        </div>
      </template>
      <template v-slot:title>
        个人详情
      </template>
    </myheader>
    <div class="per-main">
      <div class="per-back"></div>
      <div class="per-header">
        <img :src="info.img" alt="" />
        <div class="kkid">
          <span style="color:#00cc66;">kk账号:{{ info.id }}</span>
          <!-- <Tag color="blue" v-if="info.gender == '男'">男</Tag> -->
          <!-- <Tag color="pink" v-else>女</Tag> -->
          <div class="gender">{{info.gender}}</div>
        </div>
      </div>
    </div>

    <div class="per-meun">
      <div class="menu-left">
        <span class="iconfont icon-edit_small"></span>
        <span class="text" style="color:#5CADFF">{{ info.selfdesc }}</span>
      </div>
      <div class="menu-right">
        <!-- <Icon type="ios-arrow-forward" class="menu-icon" size="20"></Icon> -->
      </div>
    </div>

    <div class="per-meun">
      <div class="menu-left">
        <span class="iconfont icon-birthday"></span>
        <span class="text" style="color:#ff9900">{{ info.borndate }}</span>
      </div>
      <div class="menu-right">
        <!-- <Icon type="ios-arrow-forward" class="menu-icon" size="20"></Icon> -->
      </div>
    </div>

    <div class="per-meun" v-for="item in icondata" :key="item.icon">
      <div class="menu-left">
        <span :class="item.icon + ' iconfont'"></span>
        <span class="text">{{ item.text }}</span>
      </div>
      <div class="menu-right">
        <!-- <Icon type="ios-arrow-forward" class="menu-icon" size="20"></Icon> -->
        <!-- <van-icon name="arrow-down" class="menu-icon" color="#979FB4" size="20"/> -->
      </div>
    </div>
    <!-- <i-button type="success" long class="addfriend" v-show="checkbtn" >添加好友</i-button> -->
    <div class="addfriend" v-show="checkbtn">
      <van-button color="linear-gradient(to right, #4bb0ff, #6149f6)" block @click="addFriend">添加好友</van-button>
    </div>
    
  </div>
</template>

<script>
import myheader from "@/components/other/commonHeader.vue";
import { Toast } from 'vant'
export default {
  data() {
    return {
      checkbtn:true,
      info: "",
      id: this.$route.params.id,
      icondata: [
        { icon: "icon-dengji", text: "等级专栏(暂未开通)" },
        { icon: "icon-kongjian", text: "空间专栏(暂未开通)" }
      ]
    };
  },
  methods: {
    //获取用户信息
    async getinfo() {
      const { data: res } = await this.$axios.get("/checkuser/" + this.id);
      this.info = res.res;
      // if (res.meta.status != 200) this.$Message.error("获取用户信息失败！");
    },
    //检查是不是自己
    checkuser(){
        let curid = this.id
        let useid = this.$store.state.userinfo.id
        if(curid == useid){
            this.checkbtn = false
        }
        //检测已经是不是好友
        if(this.$store.state.userinfo.personlist.friends.includes(this.id)) this.checkbtn = false
    },
    checkFriend(){
      this.$store.userinfo.personlist.friends.some(item=>{
        if(item == this.id){
          this.checkbtn = false
          return true
        }
      })
    },
    addFriend(){
      let my = this.$store.state.userinfo.id
      let target = this.$route.params.id
      let data1 = {
        id: my,
        list:target
      }
      let data2 = {
        id:target,
        list:my
      }
      this.$axios.post('/updatefriend', this.$qs.stringify(data1))
      this.$axios.post('/updatefriend', this.$qs.stringify(data2))
      this.$socket.emit('addfriend', data1)
      Toast('添加好友成功！赶快去聊天把！')
      this.$router.push({name:'contact'})
      this.$store.state.userinfo.personlist.friends.push(target)
    }
  },
  components: {
    myheader
  },
  created() {
    this.getinfo();
    this.checkuser()

  }
};
</script>

<style lang="less" scoped>
.gender{
  text-align: left;
  color: black;
  font-size: 13px;
  font-weight: bold;
}
.persondetail-container {
  width: 100vw;
  height: 100vh;
  background-color: #f5f6fa;
  position: relative;
  overflow-x: hidden;
}
.per-main {
  .per-back {
    width: 100vw;
    margin-top: -10px;
    height: 200px;

    &::before {
      content: "";
      display: block;
      height: 100%;
      width: 500%;
      background-image: radial-gradient(
        220% 105% at top center,
        #1b2947 10%,
        #75517d 40%,
        #e96f92 65%,
        #f7f7b6
      );
      background-attachment: fixed;
      overflow: hidden;
      animation: hello 15s linear infinite;
    }
  }
  .per-header {
    padding: 0 3%;
    display: flex;
    justify-content: flex-start;
    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      transform: translateY(-50%);
    }
    .kkid {
      display: flex;
      flex-direction: column;
      margin-left: 12px;
      span {
        font-size: 16px;
      }
    }
  }
}
.per-meun {
  padding: 10px 2%;
  width: 100%;
  display: flex;
  align-items: center;
  background-color: #fff;
  .menu-left {
    width: 80%;
    display: flex;
    align-items: center;
    .iconfont {
      font-size: 20px;
      color: #979fb4;
      flex: 1;
    }
    .text {
      font-size: 12px;
      margin-left: 10px;
      font-weight: 600;
      flex: 8;
      text-align: left;
    }
  }
  .menu-right {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    color: #979fb4;
    flex: 1;
  }
}
.addfriend{
  width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    height: 45px;
}

@keyframes hello {
  0% {
    background-position: 0 0;
  }
  20% {
    background-position: -20em -20em;
  }
  40% {
    background-position: -40em -25em;
  }
  60% {
    background-position: -60em -10em;
  }
  80% {
    background-position: -80em -20em;
  }
  100% {
    background-position: -99em -10em;
  }
}
</style>
