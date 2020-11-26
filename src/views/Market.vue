<template>
  <div>
    <LayoutTheHeader :title="title" :HeaderButton="HeaderButton" />
    <LayoutTheBar />
    <LayoutTheGrid />
  </div>
</template>

<script>
import { LayoutTheBar, LayoutTheGrid, LayoutTheHeader } from "@/Layout";
export default {
  components: { LayoutTheHeader, LayoutTheGrid, LayoutTheBar },
  name: "Market",
  data() {
    return {
      HeaderButton: true,
      title: "самая вкусная пицца во вселенной"
    };
  }
};
</script>
