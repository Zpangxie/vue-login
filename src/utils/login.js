import axios from "axios";

export function loginWithUsernameAndPass(data) {
  const formData = new FormData();
  formData.append("username", data.username);
  formData.append("password", data.password);
  return axios({
    url: "https://ouya.xmwluo.com/vue/login.php",
    method: "post",
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  });
}
