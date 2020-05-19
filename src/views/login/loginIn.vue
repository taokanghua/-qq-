<template>
  <div class="loginIn-container">
    <div class="header">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-ghosts-pacman"></use>
      </svg>
      <h3>MYQQ</h3>
    </div>
    <!-- 表单 -->
    <van-form @submit="onSubmit" class="form">
      <van-field
        v-model="username"
        name="用户名"
        label="   "
        placeholder="用户名"
		@blur="getAvatar"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
			<img src="https://www.keaidian.com/uploads/allimg/190514/14161918_4.jpg" alt="" ref="img">
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="   "
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' },{pattern,message:'数值范围为5 - 16'}]"
      />
      <div class="login-btn">
        <van-button round block type="info" native-type="submit" :loading="$store.state.isLoading" loading-text="登陆中...">
          登陆
        </van-button>
      </div>
    </van-form>

		<div class="footer">
			<router-link :to="{name:'forget'}" tag="a" href="#">忘记密码</router-link>
			<span>|</span>
			<router-link  :to="{name:'loginUp'}" tag="a" href="#">用户注册</router-link>
		</div>
  </div>
</template>

<script>
import { Notify } from 'vant';
export default {
	data(){
		return{
			username:'',
			password:'',
			pattern:/\d{5}|\d{16}/
		}
	},
	methods:{
		async onSubmit(val){ //登陆
			// 会打印出表单内容
			let data = {
				account: this.username,
				password: this.password
			}
			const {data:res} = await this.$axios.post('/loginin', this.$qs.stringify(data))
			if(res.meta.status == 200){
				//设置token
				sessionStorage.setItem('kktoken', res.token)
				//保存数据到vuex中
				this.$store.commit('getUserInfo', res.userinfo)
				// this.$store.state.session = res.userinfo.personlist.chat
				this.$router.push({name:'contact'})
			}else{
				Notify({type:'warning', message:res.content})
				this.password = ''
			}
		},
		async getAvatar(){
			if(this.username.length < 5) return false
			let data = {
				account: this.username
			}
			const {data:res} = await this.$axios.post('/question/getavatar', this.$qs.stringify(data))
			if(res.meta.status == 200){
				this.$refs.img.src = res.res.img
			}
		}
	}
};
</script>

<style lang="less" scoped>
.loginIn-container {
  height: 100vh;
	background-color: #ffffff;
	position: relative;
}
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15%;
  .icon {
    font-size: 60px;
    margin-right: 0.5rem;
  }
}
.form{
	margin-top: 2.5rem;
	position: relative;
	img{
		position: absolute;
		left: 2.6rem;
		top: 0.5em;
		width: 36px;
		height: 36px;
		border-radius: 50%;
	}
	.login-btn{
		margin: 3rem 1rem;
	}
}
.footer{
	width: 50%;
	position: absolute;
	bottom: 24%;
	margin-left: 50%;
	transform: translateX(-50%);
	display: flex;
	justify-content: space-around;
	align-items: center;
	font-weight: bold;
	font-size: 13px;
	a{
		color: #2C3E50;
	}
}
</style>
