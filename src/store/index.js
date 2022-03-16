import Vue from "vue";
import Vuex from "vuex";
export const MUTATION_MAP = {
  setToken: "setToken",
  setUserinfo: "setUserinfo",
};

export const ACTION_MAP = {
  updateTokenAndUserinfo: "updateTokenAndUserinfo",
};

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    token: undefined,
    userinfo: undefined,
  },
  mutations: {
    [MUTATION_MAP.setToken](state, payload) {
      state.token = payload;
    },
    [MUTATION_MAP.setUserinfo](state, payload) {
      state.userinfo = payload;
    },
  },
  actions: {
    [ACTION_MAP.updateTokenAndUserinfo](context, payload) {
      context.commit(MUTATION_MAP.setToken, payload.token);
      context.commit(MUTATION_MAP.setUserinfo, payload.userinfo);
    },
  },
});
export default store;
