<script>
import { Button } from "@/components";
import { mapActions } from "vuex";

import { pizzaSmall } from "@/assets";
import { ShopCartStyle } from "@/components/style";
export default {
  name: "ShopCart",
  components: {
    Button,
  },

  props: {
    shopCart: {
      type: Array,
      required: true,
      default: () => [],
    },

    groupCartItems: {
      type: Array,
      required: true,
      default: () => [],
    },

    groupCartItemsPrice: {
      type: Number,
      required: true,
      default: 0,
    },

    index: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      pizzaSmall: pizzaSmall,
      price: null,
    };
  },

  computed: {
    ShopCartStyle() {
      return ShopCartStyle;
    },

    getShopCartType() {
      return () =>
        this.shopCart[0].type === 0 ? " тонкое " : " традиционное ";
    },
  },

  methods: {
    ...mapActions({
      removeItem: "removePizzaItem",
      plusCartItem: "plusCartItem",
      minusCartItem: "minusCartItem",
    }),

    removeGroupItem(id) {
      this.$modal.show("dialog", {
        title: "Удаление группы пиц",
        text: "Вы действительно хотите удалить группу пиц",
        buttons: [
          {
            title: "Нет",
            handler: () => {
              this.$modal.hide("dialog");
            },
          },
          {
            title: "Да",
            handler: () => {
              this.removeItem(id);
              this.$modal.hide("dialog");
            },
          },
        ],
      });
    },

    handlerAddPizzaCartItem(data) {
      const payLoad = {
        ID: data,
        index: this.index,
      };
      this.plusCartItem(payLoad);
    },

    handlerRemovePizzaCartItem(data) {
      const payLoad = {
        ID: data,
        index: this.index,
      };
      this.minusCartItem(payLoad);
    },
  },
};
</script>

<template>
  <div :class="ShopCartStyle.ShopCart">
    <picture>
      <source
        :srcset="shopCart[0].imageUrl"
        width="80"
        height="80"
        type="image/svg"
      />
      <img
        :src="shopCart[0].imageUrl"
        width="80"
        height="80"
        alt="ShopCart pizza image"
      />
    </picture>
    <div :class="ShopCartStyle.Typh">
      <h3 :class="ShopCartStyle.Title">{{ shopCart[0].name }}</h3>
      <p :class="ShopCartStyle.SubTitle">
        {{ getShopCartType() }}
        тесто, {{ shopCart[0].size }} см.
      </p>
    </div>
    <div :class="ShopCartStyle.Counter">
      <Button
        @click.native="handlerRemovePizzaCartItem(shopCart[0].id)"
        :class="ShopCartStyle.CounterBtn"
      >
        <template slot="ButtonText">
          -
        </template>
      </Button>
      <span style="margin: 0 12px 0 12px;">
        {{ groupCartItems.length }}
      </span>
      <Button
        @click.native="handlerAddPizzaCartItem(shopCart[0].id)"
        :class="ShopCartStyle.CounterBtn"
      >
        <template slot="ButtonText">
          +
        </template>
      </Button>
    </div>
    <div :class="ShopCartStyle.TotalContainer">
      <div :class="ShopCartStyle.TotalPrice">
        <span> {{ groupCartItemsPrice }} ₽ </span>
      </div>
    </div>
    <div :class="ShopCartStyle.Reset">
      <Button
        @click.native="removeGroupItem(shopCart[0].id)"
        :class="ShopCartStyle.ResetBtn"
      >
        <template slot="ButtonText">
          x
        </template>
      </Button>
      <v-dialog />
    </div>
  </div>
</template>
