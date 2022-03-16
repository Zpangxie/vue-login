<template>
  <div class="user-page">
    <h1>个人中心</h1>
    <van-cell-group>
      <van-cell title="姓名" :value="name" />
      <van-cell title="年龄" :value="age" />
      <van-cell title="手机号" :value="phone" />
    </van-cell-group>
    <van-button type="primary" size="large" class="big-but" @click="quit"
      >退出登录</van-button
    >
  </div>
</template>

<script>
import { Dialog } from "vant";
import { mapState } from "vuex";

export default {
  name: "UserPage",
  computed: {
    ...mapState({
      name: (state) => state.userinfo.name,
      age: (state) => state.userinfo.age,
      phone: (state) => state.userinfo.phone,
    }),
  },
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
