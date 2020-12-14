<template>
  <div>
    <LayoutTheHeader :sloganText="sloganText" :HeaderButton="HeaderButton" />
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
      sloganText: "Самая реактивная пицца"
    };
  }
};
</script>
