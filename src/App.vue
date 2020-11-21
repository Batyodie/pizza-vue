<template>
  <div id="app" :class="BaseApp.Container">
    <router-view :class="BaseView.Container" />
  </div>
</template>
<script>
import BaseApp from "@/components/Base/Styles/BaseApp.css";
import BaseView from "@/components/Base/Styles/BaseExtend.css";
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
    await this.$store.dispatch("GetThePizzas");
  },
};
</script>
