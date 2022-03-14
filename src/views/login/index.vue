<template>
  <div class="login-page">
    <el-card class="card-header">
      <!-- 标题 -->
      <div slot="header" class="clearfix">
        <span>登录</span>
      </div>

      <!-- 表单 -->
      <div class="card-body">
        <el-form
          :model="formData"
          :rules="formRules"
          ref="loginFormRef"
          label-width="60px"
          class="demo-ruleForm"
        >
          <el-form-item label="账号" required prop="username">
            <el-input
              v-model="formData.username"
              clearable
              class="input-style"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" required prop="password">
            <el-input
              v-model="formData.password"
              show-password
              class="input-style"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>

      <!-- 登录按钮 -->
      <div>
        <el-button
          type="primary"
          @click="onLoginBtnClick"
          class="login-btn"
          :loading="loginBtnLoading"
          >登录</el-button
        >
        <el-button
          type="primary"
          class="login-btn"
          plain
          @click="registerDialogVisible = true"
          >注册</el-button
        >
      </div>

      <RegisterDialog :visible.sync="registerDialogVisible" />
    </el-card>
  </div>
</template>

<script>
import RegisterDialog from "./components/RegisterDialog.vue";
import loginWithUsernameAndPass from "../../utils/login";
export default {
  name: "LoginPage",
  components: {
    RegisterDialog,
  },
  data() {
    return {
      FormData: {
        username: "",
        password: "",
      },
      formRules: {
        username: [
          { required: true, message: "请输入账号" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符" },
        ],
        password: [{ required: true, message: "请输入密码" }],
      },
    };
  },
  methods: {
    onLoginBtnClick() {
      // 进行表单校验
      this.$refs.loginFormRef.validate((isValid) => {
        if (isValid) {
          this.loginBtnLoading = true;
          // 如果校验成功
          loginWithUsernameAndPass({
            username: this.formData.username,
            password: this.formData.password,
          })
            .then((res) => {
              const statusCode = res.data.code;
              // 状态码是 1 说明登录成功
              if (statusCode === 1) {
                this.$notify({
                  title: "登录成功",
                  message: "登录成功",
                  type: "success",
                });

                this.$router.push({ name: "User" });
              } else {
                this.$notify({
                  title: "登录失败",
                  message: res.data.message,
                  type: "error",
                });
              }
            })

            .catch(() => {
              this.$notify({
                title: "登录失败",
                message: "服务器或网络状态异常",
                type: "error",
              });
            })
            .finally(() => {
              this.loginBtnLoading = false;
            });
        }
        // 校验失败
        else {
          // do nothing
        }
      });
    },
  },
};
</script>

<style lang="less">
.login-page {
  width: 400px;
  margin: 15% auto 0px;
  .card-header {
    padding: 10px;
    .input-style {
      height: 30px;
      margin-bottom: 10px;
    }
  }
  .login-btn {
    width: 160px;
  }
}
</style>
