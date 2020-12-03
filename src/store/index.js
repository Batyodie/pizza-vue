import Vue from "vue";
import Vuex from "vuex";

import getters from "./getters/getters";
import actions from "./actions/actions";
import mutations from "./mutations/mutations";
import modules from "./modules";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations,
  actions,
  getters,
  modules,

  strict: process.env.NODE_ENV !== "production",
});
