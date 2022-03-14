/* eslint-disable no-undef */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import { Button, Cell, CellGroup } from "vant";
import store from "./store";

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(Button);
Vue.use(Cell);
Vue.use(CellGroup);

new Vue({
  router,
  render: (h) => h(App),
  store: store,
}).$mount("#app");
