<template>
  <div class="loginUp-container">
    <back></back>
    <div class="header">
      <van-icon name="certificate" color="#4169E1" size="3rem" />
      <h3>用户注册</h3>
    </div>
    <!-- 表单 -->
    <van-form @submit="onSubmit">
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码:"
        placeholder="请输入密码"
        :rules="[
          { required: true, message: '请填写密码' },
          { pattern, message: '密码长度为5至16' },
        ]"
      />
      <van-field
        v-model="password2"
        type="password"
        name="密码"
        label="确认密码:"
        placeholder="请输入密码"
        :rules="[{ validator, message: '两次密码不一致' }]"
      />
      <!-- 选择器 -->
      <van-field
        readonly
        clickable
        :value="value"
        name="picker"
        label="密保问题:"
        placeholder="点击选择问题"
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
        v-model="answer"
        name="密保答案"
        label="密保答案:"
        placeholder="密保答案"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <div style="margin: 16px;">
         <van-button :loading="$store.state.isLoading" type="info" loading-text="请稍后..." block>立即注册</van-button>
      </div>
    </van-form>
    <p ref="p"></p>
  </div>
</template>

<script>
import back from "@/components/login/loginBack.vue";
import { Dialog } from "vant";
export default {
  data() {
    return {
      password: "",
      password2: "",
      value: "", //选择了密保框的值
      columns: [],
      answer: "",
      showPicker: false,
      pattern: /\d{5}|\d{16}/,
      ip: "",
      local: {}, //存放用户注册位置信息
    };
  },
  methods: {
    validator() {
      return this.password === this.password2;
    },
    async onSubmit(val) {
      let data = {
        password: this.password2,
        question: this.value,
        answer: this.answer,
        local: this.local,
      };
      let { data: res } = await this.$axios.post(
        "/loginup",
        this.$qs.stringify(data)
      );
      if (res.meta.status == 200) {
        Dialog.alert({
          title: "注册成功!",
          message: "恭喜你 注册成功！账号为" + res.id,
        }).then(() => {
          this.$router.push({ name: "setInfo", params: { id: res.id } });
        });
      }else{
        Dialog.alert({
          title:'发生了一个意外',
          message:'注册失败了......'
        })
      }
    },
    onConfirm(value) {
      //选择框选中的值
      this.value = value;
      this.showPicker = false;
    },
    async getQuestions() {
      let { data: res } = await this.$axios.get("/questions");
      this.columns = res.questionList;
      // 下面是获取用户信息的
      this.ip = returnCitySN["cip"];
      let d = {
        ip: this.ip,
      };
      let { data: res2 } = await this.$axios.post(
        "/getlocal",
        this.$qs.stringify(d)
      );
      this.local = res2;
      this.local.ip = this.ip;
      this.$refs.p.innerHTML = this.local.content.address;
    },
  },
  components: {
    back,
    [Dialog.Component.name]: Dialog.Component,
  },
  created() {
    this.getQuestions();
  },
};
</script>

<style lang="less" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: center;
  h3 {
    margin-left: 0.5rem;
  }
}
</style>
