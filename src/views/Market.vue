<template>
  <div>
    <LayoutTheHeader :title="title" :HeaderButton="HeaderButton" />
    <LayoutTheBar />
    <LayoutTheGrid />
  </div>
</template>

<script>
import LayoutTheBar from "@/Layout/TheBar/LayoutTheBar.vue";
import LayoutTheGrid from "@/Layout/TheGrid/LayoutTheGrid.vue";
import LayoutTheHeader from "@/Layout/TheHeader/LayoutTheHeader.vue";
export default {
  components: { LayoutTheHeader, LayoutTheGrid, LayoutTheBar },
  name: "Market",
  data() {
    return {
      HeaderButton: true,
      title: "самая вкусная пицца во вселенной",
    };
  },
};
</script>
