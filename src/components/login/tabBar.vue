<template>
  <van-tabbar route class="tabbar">
    <van-tabbar-item replace to="/message" icon="chat-o">
    消息
  </van-tabbar-item>
  <van-tabbar-item replace to="/contact" icon="manager-o">
    联系人
  </van-tabbar-item>
  <van-tabbar-item replace to="/discover" icon="fire-o">
    发现
  </van-tabbar-item>
</van-tabbar>
</template>

<script>
export default {
data() {
    return {
    }
  },
}
</script>

<style lang="less" scoped>
.tabbar{
  background-color: #F9F9F9;
}
</style>