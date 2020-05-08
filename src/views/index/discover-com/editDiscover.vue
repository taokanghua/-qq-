<template>
  <div class="editdis-container">
    <div class="edit-header">
      <span @click="$router.go(-1)">取消</span>
      <h3>说说</h3>
      <div @click="publishDynamic">发表</div>
    </div>
    <div class="edit-content">
      <div class="edit-con-info">
        <img :src="$store.state.userinfo.img" alt="" />
        <span>{{$store.state.baseinfo.nickname}}</span>
        <input type="text" placeholder="个性标题..." maxlength="8" v-model="dynamic.personal">
      </div>
      <textarea name="" id="" placeholder="分享新鲜事..." v-model="dynamic.content"></textarea>
      <div class="edit-local"><span class="iconfont icon-iconmorendizhi"></span> {{ dynamic.local}}</div>
      <van-uploader :after-read="afterRead" v-model="fileList"/>
    </div>
  </div>
</template>

<script>
import {Uploader, Toast} from 'vant'
export default {
  data(){
    return{
      fileList:[],
      dynamic:{
        uniq: this.$store.state.userinfo.id+Date.now(),
        id: this.$store.state.userinfo.id,
        name: this.$store.state.baseinfo.nickname,
        avatar:this.$store.state.userinfo.img,
        time: new Date(),
        content:'',
        personal:'',
        imgs:[], // 选择的图片列表
        local:'',  //地名
        ip:'',
      }
    }
  },
  methods:{
    async publishDynamic(){
      let {data:res} = await this.$axios.post('/postdynamic', this.$qs.stringify(this.dynamic))
      // console.log(res)
      if(res.meta.status == 200){
        Toast('发表动态成功!')
        // this.$Message.success('发表动态成功!')
        this.$router.push({name:'discover'})
      }else{
        Toast('发表失败了!')
        // this.$Message.error('发表失败了!')
      }
    },
    async getlocal(){
      let ip = {ip:returnCitySN["cip"]}
      this.dynamic.ip = {ip:returnCitySN["cip"]}.ip
      // alert(this.dynamic.ip)
      let {data:res} = await this.$axios.post('/getlocal/', this.$qs.stringify(ip))
      // console.log(res)
      if(!res.content.address_detail.city){
        this.dynamic.local = '定位获取失败!'
      }else{
        this.dynamic.local = res.content.address_detail.city
      }
      
    },
    async afterRead(file){
      let formdata = new FormData()
      formdata.append('img', file.file)
      let {data:res} = await this.$axios.post('/upload', formdata)
      this.dynamic.imgs.push(res.path)
      console.log(res.path)
    }
  },
  created(){
    this.getlocal()
  }
};
</script>

<style lang="less" scoped>
.edit-local{
  font-size: 12px;
  margin-bottom: 8px;
  color: #ccc;
  span{
    font-size: 14px;
    color: red;
    vertical-align: top;
  }
}
.editdis-container {
  width: 100vw;
  height: 100vh;
  background-color: #f2f3f7;
}
.edit-header {
  height: 50px;
  padding: 0 1em;
  color: #fff;
  background-color: #6532d7;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
  h3{
    font-size: 16px;
  }
  div {
    font-weight: bold;
    padding: 5px 8px;
    border-radius: 10px;
    background-color: #b299ec;
  }
}
.edit-content {
  min-height: 50vh;
  background-color: #fff;
  padding:5px 8px;
  margin-top: 10px;
  text-align: left;
  .edit-con-info {
    display: flex;
    align-items: center;
    img {
      width: 45px;
      height: 45px;
      border-radius: 50%;
    }
    span {
      font-size: 15px;
      font-weight: bold;
      margin-left: 10px;
    }
    input{
      outline: none;
      border: none;
      margin-left: 24px;
      font-size: 12px;
      color: chocolate;
      
    }
  }
  textarea {
    width: 100%;
    min-height: 24vh;
    border: none;
    font-size: 15px;
    font-weight: 500;
    padding-left: 4px;
    outline: none;
  }

}
</style>
