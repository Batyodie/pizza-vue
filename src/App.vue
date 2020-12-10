<template>
  <div id="app" :class="BaseApp.Container">
    <router-view :class="BaseView.Container" />
  </div>
</template>
<script>
import BaseApp from "@/style/Base/App/BaseApp.css";
import BaseView from "@/style/Base/Extend/BaseExtend.css";
import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions({
      fetchProducts: "fetchProducts"
    })
  },
  computed: {
    BaseApp() {
      return BaseApp;
    },
    BaseView() {
      return BaseView;
    }
  },
  created() {
    this.fetchProducts();
  }
};
</script>
