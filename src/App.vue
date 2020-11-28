<template>
  <div id="app" :class="BaseApp.Container">
    <router-view :class="BaseView.Container" />
  </div>
</template>
<script>
import BaseApp from "@/style/Base/App/BaseApp.css";
import BaseView from "@/style/Base/Extend/BaseExtend.css";
export default {
  components: {},
  computed: {
    BaseApp() {
      return BaseApp;
    },
    BaseView() {
      return BaseView;
    },
  },
  async created() {
    await this.$store.dispatch("fetchPizzas");
  },
};
</script>
