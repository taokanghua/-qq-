<template>
  <div class="setInfo-container">
    <myheader>
      <template v-slot:title>设置用户信息</template>
    </myheader>
    <van-form @submit="onSubmit">
			<img :src="baseInfo.img" alt="">
      <van-field
        v-model="username"
        name="用户名"
        label="账号:"
        placeholder="账号"
				disabled
      />
      <van-field
        v-model="nickname"
        name="密码"
        label="昵称:"
        placeholder="昵称"
        :rules="[{ required: true, message: '请填写昵称' }]"
      />
      <van-field
        readonly
        clickable
        name="picker"
        :value="value"
        label="性别:"
        placeholder="点击选择性别"
        @click="showPicker = true"
      />
      <van-popup v-model="showPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          @confirm="onConfirm"
          @cancel="showPicker = false"
        />
      </van-popup>
			<van-field
        v-model="borndate"
        name="出生日期"
        label="出生日期:"
        placeholder="出生日期: yyyy-mm-dd"
				:rules="[{ required: true, message: '请填写昵称' }, {pattern, message:'请按规定格式填写'}]"
      />
      <van-field
        type="textarea"
        v-model="self"
        name="个性说明"
        label="个性说明:"
        placeholder="个性说明"
      />
      <div style="margin: 16px;">
        <van-button :loading="$store.state.isLoading" type="info" loading-text="登陆中..." block>开始闲聊</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import myheader from "@/components/other/commonHeader.vue";
import { Dialog } from 'vant';
export default {
  data() {
    return {
			pattern: /\d{4}-\d{2}-\d{2}/,
      username: "",
      nickname: "",
      value: "", //性别值
      showPicker: false,
			columns: ["男", "女"],
			baseInfo:{}, //用户信息
			borndate:'',
			self:''
    };
  },
  methods: {
    async onSubmit(v) {
      let data = {
				account: this.baseInfo.id,
				nickname:this.nickname,
				gender: this.value,
				borndate: this.borndate,
				setmyself: this.self,
				img:this.baseInfo.img
			}
			let {data:res} = await this.$axios.post('/updatedata', this.$qs.stringify(data))
			if(res.meta.status == 200){
				// 成功
				Dialog({ title:'设置基本信息完成！', message: '你的id为:'+this.baseInfo.id+'\n点击确定进入登陆页面!' }).then(()=>{
					this.$router.push({name:'loginIn'})
				})
			}else{

			}
    },
    onConfirm(v) { //获取男女值
			this.showPicker = false
			this.value = v
		},
		async getinfo(){
			let data = {
				id: this.$route.params.id
			}
			let {data:res} = await this.$axios.post('/getbaseinfo', this.$qs.stringify(data))
			this.baseInfo = res
			this.username = this.baseInfo.id
			// console.log(res)
		}
  },
  components: {
		myheader,
		[Dialog.Component.name]: Dialog.Component
  },
  created() {

		this.getinfo()

		
  },
};
</script>

<style lang="less" scoped>
	.van-form{
		margin-top: 2rem;
		img{
			width: 60px;
			height: 60px;
			border-radius: 50%;
		}
	}
</style>
