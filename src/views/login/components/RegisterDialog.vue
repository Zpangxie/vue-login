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
      <el-button type="primary" :loading="registerBtnLoading"
        >确认注册</el-button
      >
      <el-button type="danger" class="cancel-btn">取消</el-button>
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
          // 必填校验
          { required: true, message: "请再次输入密码" },
          // 自定义校验
          { validator: checkAgainPassword },
        ],
      },
      registerBtnLoading: false,
    };
  },
};
</script>

<style></style>
