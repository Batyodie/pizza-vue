<template>
  <div>
    <LayoutTheHeader :title="title" :HeaderButton="HeaderButton" />
    <LayoutTheShopList />
  </div>
</template>

<script>
import { LayoutTheShopList, LayoutTheHeader } from "@/Layout";

export default {
  components: { LayoutTheHeader, LayoutTheShopList },
  name: "Basket",
  data() {
    return {
      HeaderButton: false,
      title: "Самая реактивная пицца"
    };
  }
};
</script>
