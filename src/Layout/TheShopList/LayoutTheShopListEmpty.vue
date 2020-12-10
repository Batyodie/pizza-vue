<template>
  <div :class="TheShopListStyle.Content">
    <div :class="TheShopListStyle.Empty">
      <h2 :class="TheShopListStyle.EmptyTitle">
        Корзина пустая 😕
      </h2>
      <p :class="TheShopListStyle.EmptyCopy">
        Вероятней всего, вы не заказывали ещё пиццу. Для того, чтобы заказать
        пиццу, перейди на главную страницу.
      </p>
      <img
        :class="TheShopListStyle.EmptyLogo"
        :src="EmptyCart"
        alt="Empty image"
      />
      <router-link to="/">
        <Button :class="TheShopListStyle.EmptyBtn">
          <template slot="ButtonText">
            Вернуться назад
          </template>
        </Button>
      </router-link>
    </div>
  </div>
</template>

<script>
import { Button } from "@/components";

import { EmptyCart } from "@/assets";
import { TheShopListStyle } from "@/Layout/style";
export default {
  name: "LayoutTheShopListEmpty",
  components: {
    Button
  },
  data() {
    return {
      EmptyCart: EmptyCart
    };
  },
  computed: {
    TheShopListStyle() {
      return TheShopListStyle;
    }
  }
};
</script>
