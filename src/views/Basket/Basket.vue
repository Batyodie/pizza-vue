<template>
  <div>
    <LayoutTheHeader :title="title" :HeaderButton="HeaderButton" />
    <LayoutTheShopList />
  </div>
</template>

<script>
import LayoutTheShopList from "../../components/Layout/TheShopList/LayoutTheShopList.vue";
import LayoutTheHeader from "../../components/Layout/TheHeader/LayoutTheHeader.vue";

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
