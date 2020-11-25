<template>
  <div>
    <LayoutTheHeader :title="title" :HeaderButton="HeaderButton" />
    <LayoutTheShopList />
  </div>
</template>

<script>
import LayoutTheShopList from "@/Layout/TheShopList/LayoutTheShopList.vue";
import LayoutTheHeader from "@/Layout/TheHeader/LayoutTheHeader.vue";

export default {
  components: { LayoutTheHeader, LayoutTheShopList },
  name: "Basket",
  data() {
    return {
      HeaderButton: false,
      title: "Самая реактивная пицца",
    };
  },
};
</script>
