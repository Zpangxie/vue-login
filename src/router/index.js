import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/login";
import User from "../views/user/index.vue";
import store from "@/store";
import { Toast } from "vant";

Vue.use(Toast);

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      needLogin: false,
    },
  },
  {
    path: "/user",
    name: "User",
    component: User,
    meta: {
      needLogin: true,
    },
  },
];

const router = new VueRouter({
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.meta.needLogin) {
    if (store.state.token && store.state.userinfo) {
      next();
    } else {
      Toast("请登录");
      next({ name: "Login" });
    }
  } else {
    next();
  }
});

export default router;
