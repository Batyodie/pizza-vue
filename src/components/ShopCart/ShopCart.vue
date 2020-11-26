<template>
  <div :class="ShopCartStyle.ShopCart">
    <picture>
      <source
        :srcset="shopCart.items[0].imageUrl"
        width="80"
        height="80"
        type="image/svg"
      />
      <img
        :src="shopCart.items[0].imageUrl"
        width="80"
        height="80"
        alt="ShopCart pizza image"
      />
    </picture>
    <div :class="ShopCartStyle.Typh">
      <h3 :class="ShopCartStyle.Title">{{ shopCart.items[0].name }}</h3>
      <p :class="ShopCartStyle.SubTitle">
        {{ shopCart.items[0].type === 0 ? " тонкое " : " традиционное " }}
        тесто, {{ shopCart.items[0].size }} см.
      </p>
    </div>
    <div :class="ShopCartStyle.Counter">
      <Button
        @click.native="handlerRemovePizzaCartItem(shopCart.items[0].id)"
        :class="ShopCartStyle.CounterBtn"
      >
        <template slot="ButtonText">
          -
        </template>
      </Button>
      <span style="margin: 0 12px 0 12px;">
        {{ groupTotalPrice.items.length }}
      </span>
      <Button
        @click.native="handlerAddPizzaCartItem(shopCart.items[0].id)"
        :class="ShopCartStyle.CounterBtn"
      >
        <template slot="ButtonText">
          +
        </template>
      </Button>
    </div>
    <div :class="ShopCartStyle.TotalContainer">
      <div :class="ShopCartStyle.TotalPrice">
        <span> {{ groupTotalPrice.totalPrice }} ₽ </span>
      </div>
    </div>
    <div :class="ShopCartStyle.Reset">
      <Button
        @click.native="removeGroupItem(shopCart.items[0].id)"
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

<script>
import { Button } from "@/components";
import { mapActions, mapGetters, mapState } from "vuex";

import { pizzaSmall } from "@/assets";
import { ShopCartStyle } from "@/components/style";
export default {
  name: "ShopCart",
  components: {
    Button
  },
  props: {
    shopCart: {
      type: Object
    },
    groupTotalPrice: {
      type: Object
    },
    index: {
      type: Number
    }
  },
  data() {
    return {
      //   pizzaSmallWebP: pizzaSmallWebP,
      pizzaSmall: pizzaSmall,
      price: null
    };
  },
  methods: {
    ...mapActions({
      removeItem: "removePizzaItem",
      plusCartItem: "addPizzaCartItem",
      minusCartItem: "removePizzaCartItem"
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
  },
  computed: {
    ...mapGetters({}),
    ...mapState({
      test: "groupPizzasTotalPrice"
    }),
    ShopCartStyle() {
      return ShopCartStyle;
    }
  }
};
</script>
