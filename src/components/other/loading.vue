<template>
  <div class="loading-container">
    <div class="wrap">
      <img src="@/assets/load.gif" alt="">
      <p>加载中...</p>
    </div>
  </div>
</template>

<script>
export default {

}
</script>
<style lang="less" scoped>
.loading-container{
  position: absolute;
  left: 50vw;
  top: 50vh;
  transform: translate(-50%,-50%);
  .wrap{
    background-color: #fff;
    position: relative;

    p{
      margin: 0;
      font-size: 12px;
      color: #00AFFE;
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  img{
    width: 100px;
    height: 100px;
  }
}
</style>