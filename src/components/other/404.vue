<template>
  <div class="notfound-container">
    <img src="@/assets/404.jpg" alt="">
    <img src="@/assets/mm.png" alt="" class="back" @click="$router.push({name:'loginIn'})">
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
  .notfound-container{
    width: 100%;
    height: 100vh;
    background-color: #DCEEBC;
    position: relative;
  img{
    width: 100%;
    height: 100%;
  }
  .back{
    width: 40%;
    height: 25%;
    position: absolute;
    left: 6%;
    top: 6%;
  }
}
</style>

