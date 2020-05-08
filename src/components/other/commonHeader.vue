<template>
  <div class="com-header">
      <slot name="left">
          <van-icon name="arrow-left" color="#fff" @click="$router.go(-1)"/>
      </slot>
      <h3><slot name="title">测试标题</slot></h3>
      <slot name="right">
          <span></span>
      </slot>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.com-header{
    background-color: #00AFFE;
    padding: .8rem .2rem;
    display: flex;
    justify-content: space-between;
    box-shadow: 0 0 3px 3px #ccc;
    h3{
        margin: 0;
        font-size: 14px;
        color: #fff;
        letter-spacing: .1rem;
    }
}
</style>