<template>
  <div class="user-page">
    <h1>个人中心</h1>
    <van-cell-group>
      <van-cell title="姓名" />
      <van-cell title="年龄" />
      <van-cell title="手机号" />
    </van-cell-group>
    <van-button type="primary" size="large" class="big-but" @click="quit"
      >退出登录</van-button
    >
  </div>
</template>

<script>
import { Dialog } from "vant";

export default {
  name: "UserPage",

  methods: {
    quit() {
      Dialog.confirm({
        title: "提示",
        message: "你确定退出吗？",
      })
        .then(() => {
          // on confirm
          this.$router.push({
            name: "Login",
          });
        })
        .catch(() => {
          // on cancel
        });
    },
  },
};
</script>

<style>
.person {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
}
.van-button--primary {
  background-color: #409eff;
  border: 1px solid #409eff;
}
</style>
