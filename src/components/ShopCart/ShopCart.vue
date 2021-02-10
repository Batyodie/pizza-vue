<script>
import { Button } from "@/components";
import { mapActions } from "vuex";

import { ShopCartStyle } from "@/components/style";
export default {
  name: "ShopCart",
  components: {
    Button
  },

  props: {
    // an array of pizza groups from the general card added from LayoutTheShopList
    shopCart: {
      type: Array,
      required: true,
      default: () => []
    },
    // the total price of the pizza group which is taken from pizzaItem[index].totalPrice.
    //Where pizzaItem is a store getter that returns all the pizzaitems keys and maps them.
    // The index is an item in the v-for directive, it is located in the LayoutTheShopList
    groupCartItemsPrice: {
      type: Number,
      required: true,
      default: 0
    },
    // The index is an item in the v-for directive
    index: {
      type: Number,
      required: true
    }
  },

  computed: {
    ShopCartStyle() {
      return ShopCartStyle;
    },
    // Computed properties for getting the correct rendering of the subtitle text in ShopCart
    getShopCartType() {
      return () =>
        this.shopCart[this.getLastItem].type === 0
          ? " тонкое "
          : " традиционное ";
    },
    getLastItem() {
      return this.shopCart.length - 1;
    }
  },

  methods: {
    ...mapActions({
      removeItem: "removePizzaItem",
      plusCartItem: "plusCartItem",
      minusCartItem: "minusCartItem"
    }),

    removeGroupItem(id) {
      // Third party modal library
      this.$modal.show("dialog", {
        title: "Удаление группы пиц",
        text: "Вы действительно хотите удалить группу пиц",
        buttons: [
          {
            title: "Нет",
            handler: () => {
              this.$modal.hide("dialog");
            }
          },
          {
            title: "Да",
            handler: () => {
              this.removeItem(id);
              this.$modal.hide("dialog");
            }
          }
        ]
      });
    },
    // we send the id of the object that will be added or removed from the pizza group
    handlerAddPizzaCartItem(data) {
      const payLoad = {
        ID: data,
        index: this.index
      };
      this.plusCartItem(payLoad);
    },

    handlerRemovePizzaCartItem(data) {
      const payLoad = {
        ID: data,
        index: this.index
      };
      this.minusCartItem(payLoad);
    }
  }
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
        {{ getShopCartType() }}тесто, {{ shopCart[getLastItem].size }} см.
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
        {{ shopCart.length }}
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
