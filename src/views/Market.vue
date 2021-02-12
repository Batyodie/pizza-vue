<template>
  <!-- main wievs -->
  <div>
    <LayoutTheHeader :sloganText="sloganText" :HeaderButton="HeaderButton" />
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
      sloganText: "самая вкусная пицца во вселенной"
    };
  }
};
</script>
