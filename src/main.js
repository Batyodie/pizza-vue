// main js file
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./style/main.css";

import * as vMediaQuery from "v-media-query";
import VModal from "vue-js-modal";

Vue.use(
  VModal,
  { dialog: true },
  { componentName: "v-dialog-pay", dialog: true }
);
Vue.use(vMediaQuery.default);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
