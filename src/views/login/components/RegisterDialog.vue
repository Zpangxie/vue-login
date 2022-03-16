<template>
  <el-dialog title="注册账号" :visible="visible" @close="onDialogClose">
    <el-form
      :model="formData"
      :rules="formRules"
      ref="registerDialogFormRef"
      label-width="130px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名 " required prop="username">
        <el-input
          v-model="formData.username"
          clearable
          class="input_style"
          placeholder="用户名"
        ></el-input>
      </el-form-item>
      <el-form-item label="请输入密码" required prop="password">
        <el-input
          v-model="formData.password"
          show-password
          placeholder="密码"
          class="input_style"
        ></el-input>
      </el-form-item>
      <el-form-item label="请再次输入密码" required prop="againPassword">
        <el-input
          v-model="formData.againPassword"
          show-password
          placeholder="请再次输入密码"
          class="input_style"
        ></el-input>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button
        type="primary"
        @click="submitRegisterForm"
        :loading="registerBtnLoading"
        >确认注册</el-button
      >
      <el-button type="danger" @click="requestCloseDialog" class="cancel-btn"
        >取消</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "RegisterDialog",
  props: {
    visible: Boolean,
  },
  data() {
    const checkAgainPassword = (rule, value, callback) => {
      // 检验两次密码是否一致
      if (value !== this.formData.password) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };
    return {
      formData: {
        username: "",
        password: "",
        againPassword: "",
      },
      formRules: {
        username: [{ required: true, message: "请输入账号" }],
        password: [{ required: true, message: "请输入密码" }],
        againPassword: [
          { required: true, message: "请再次输入密码" },
          // 自定义校验
          { validator: checkAgainPassword },
        ],
      },
      registerBtnLoading: false,
    };
  },
  methods: {
    onDialogClose() {
      // 将传入的 visible 改为 false
      this.requestCloseDialog();
    },
    requestCloseDialog() {
      this.$emit("update:visible", false);
    },

    // 点击确认注册按钮时触发
    submitRegisterForm() {
      // 调用表单校验方法
      this.$refs.registerDialogFormRef.validate((valid) => {
        // 校验通过
        if (valid) {
          // 在调用注册方法前，先将按钮设置为loading状态
          this.registerBtnLoading = true;
          // 模拟请求服务器进行注册
          registerWithUsernameAndPass({
            username: this.formData.username,
            password: this.formData.password,
          })
            .then((res) => {
              // 判断注册方法返回的值是否是 “success”
              if (res === "success") {
                //1.注册成功关闭对话框
                this.requestCloseDialog();
                // 2，触发register-success方法
                this.$emit("register-success", {
                  username: this.formData.username,
                  password: this.formData.password,
                });
                //3.注册成功提示
                this.$notify({
                  title: "注册成功",
                  message: "注册成功",
                  type: "success",
                });
              } else {
                // TODO: 异常处理
                console.error("返回的结果不为 success");
              }
            })
            .catch(() => {
              // TODO: 异常处理
              console.error("注册方法内部发生了异常");
            })
            .finally(() => {
              // 最终不管请求过程会出现异常，都要把按钮的 loading 态取消掉
              this.registerBtnLoading = false;
            });
        }
      });
    },
  },
};
export function registerWithUsernameAndPass(data) {
  return new Promise((resolve) => {
    console.log("所申请的账号是：", data.username);
    console.log("所申请的账号的密码是：", data.password);
    setTimeout(() => {
      resolve("success");
    }, 2000);
  });
}
</script>

<style></style>
