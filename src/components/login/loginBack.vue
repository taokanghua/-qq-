<template>
  <div class="back" @click="$router.go(-1)">
        <van-icon name="arrow-left" color="#000" size="1.5rem"/>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.back{
    text-align: left;
    padding: 1rem;
}
</style>