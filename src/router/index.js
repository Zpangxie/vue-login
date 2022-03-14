import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/login";
import User from "../views/user/index.vue";

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
  },
  {
    path: "/user",
    name: "User",
    component: User,
  },
];

const router = new VueRouter({
  routes,
});
export default router;
