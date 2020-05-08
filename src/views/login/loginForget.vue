<template>
  <div class="forget-container">
    <back></back>
    <div class="header">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-zhaohuimima"></use>
      </svg>
      <h3>找回密码</h3>
    </div>
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
        @input="getquestion"
      />
      <van-field
        v-model="question"
        name="密保问题"
        label="密保问题"
        placeholder="密保问题"
        disabled
        v-show="isques"
      />
      <van-field
        v-model="answer"
        name="密保答案"
        label="密保答案"
        placeholder="密保答案"
        :rules="[{ required: true, message: '请填写密保答案' }]"
        v-show="isques"
        @blur="checkQues"
      />
      <van-field
        v-model="password"
        name="新密码"
        label="新密码"
        placeholder="新密码"
        :rules="[{ required: true, message: '请填写密码' }]"
        v-show="ispwd"
      />
      <div style="margin: 16px;">
        <van-button
          :loading="$store.state.isLoading"
          type="info"
          loading-text="请稍等..."
          block
          >确定修改</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import back from "@/components/login/loginBack.vue";
import { Dialog } from "vant";
export default {
  data() {
    return {
      username: "",
      question: "123",
      password: "",
      answer: "",
      ispwd: false,
      isques: false,
    };
  },
  methods: {
    async onSubmit(v) {
      let data = {
        account: this.username,
        password: this.password,
      };
      let { data: res } = await this.$axios.post(
        "/question/changepwd",
        this.$qs.stringify(data)
      );
      if (res.meta.status == 200) {
        Dialog({ message: "修改密码成功！快去登陆把" });
        this.$router.push({ name: "loginIn" });
      } else {
        Dialog.alert({
          title: "发生了一点意外",
          message: '网络不佳...',
        })
      }
    },
    async getquestion() {
      if (this.username.length < 5) return;
      let { data: res } = await this.$axios.get("/question/" + this.username);
      if (res.meta.status == 200) {
        this.isques = true;
        this.question = res.res.question;
      } else {
        Dialog({ message: "发生了一点意外,没有从服务器那获取到数据" });
      }
    },
    async checkQues() {
      if (this.answer.length <= 0) return;
      let data = {
        account: this.username,
        answer: this.answer,
      };
      let { data: res } = await this.$axios.post(
        "/question/answer",
        this.$qs.stringify(data)
      );
      if (res.meta.status == 200) {
        this.ispwd = true;
      } else {
        Dialog({ message: res.content });
      }
    },
  },
  components: {
    back,
    [Dialog.Component.name]: Dialog.Component,
  },
};
</script>

<style lang="less" scoped>
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  .icon {
    font-size: 35px;
    margin-right: 0.5rem;
  }
}
</style>
