<template>
  <div class="contact-container">
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
      <template v-slot:title>联系人</template>
      <template v-slot:right
        ><span
          class="iconfont icon-tianjiayonghu"
          @click="$router.push({ name: 'addfriend' })"
        ></span
      ></template>
    </myheader>
    <van-notice-bar
      v-show="notify!=''"
      :text="notify"
      left-icon="volume-o"
    />
    <!-- <van-empty image="error" description="暂无好友"/> -->

    <contactitem
      v-for="item in friendData"
      :key="item.id"
      :item="item"
    ></contactitem>

    <tabbar></tabbar>
  </div>
</template>

<script>
import tabbar from "@/components/login/tabBar.vue";
import myheader from "@/components/other/commonHeader.vue";
import contactitem from "@/components/index/contactItem.vue";
export default {
  data() {
    return {
      friendData: [], //好友列表的信息
      notify:''
    };
  },
  methods: {
    async getBaseInfo() {
      //获取用户信息 比如昵称...
      let id = this.$store.state.userinfo.id;
      let { data: res } = await this.$axios.get("/checkuser/" + id);
      // console.log(res)
      this.$store.commit("getBaseInfo", res.res);
      //将用户信息发送到后台  socket
        let data = {
          id: this.$store.state.baseinfo.id,
          avatar: this.$store.state.baseinfo.img,
          nickname: this.$store.state.baseinfo.nickname,
        };
        this.$socket.emit("sendInfo", data);
        //获取话中的聊天记录
        let rooms = this.$store.state.session.map(item=>item.roomId)
        this.$socket.emit('getHistroy', rooms) //获取历史聊天记录
    },
    getFriendList() {
      //获取好友列表中的好友信息
      this.$store.state.userinfo.personlist.friends.forEach(async (item) => {
        let { data: res } = await this.$axios.get("/checkuser/" + item);
        if (res.meta.status == 200) {
          this.friendData.push(res.res);
        }
      });
      // console.log(this.friendData)
    },
    getOnline(){
      this.$axios.get('/goonline/'+this.$store.state.userinfo.id)
    },
    async getNotify(){
      let {data:res} = await this.$axios.get('/getsysnotify')
      if(res.meta.status == 200){
        this.notify = res.res.scrollnotify
      }
    }
  },
  components: {
    tabbar,
    myheader,
    contactitem,
  },
  created() {
    this.getBaseInfo();
    this.getFriendList();
    this.getOnline()
    this.getNotify()
    // console.log(this.$store.state.session)
  },
};
</script>

<style lang="less" scoped>
.contact-container {
  background-color: #f5f6fa;
  height: 100vh;
  padding-bottom: 50px;
}
</style>
