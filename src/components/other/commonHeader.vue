<template>
  <div class="com-header">
      <slot name="left">
          <van-icon name="arrow-left" color="#fff" @click="$router.go(-1)"/>
      </slot>
      <h3><slot name="title">测试标题</slot></h3>
      <div class="right-icon">
          <slot name="right">
            <span></span>
          </slot>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.com-header{
    background-color: #00AFFE;
    padding: .2rem .4rem;
    min-height: 45px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 0 3px 3px #ccc;
    img{
        width: 45px;
        height: 45px;
        border-radius: 50%;
    }
    h3{
        margin: 0;
        font-size: 14px;
        color: #fff;
        letter-spacing: .1rem;
    }
    .right-icon{
        color: #fff;
        span{
            font-size: 24px;
        }
    }
}
</style>