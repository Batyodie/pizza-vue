<!-- Layout the shop list component -->
<script>
import { Button, ShopCart } from "@/components";
import { mapGetters, mapActions } from "vuex";

import { CartIcon, TrashIcon, arrow, EmptyCart } from "@/assets";
import { TheShopListStyle } from "@/Layout/style";
import LayoutTheShopListEmpty from "../TheShopList/LayoutTheShopListEmpty.vue";
export default {
  name: "LayoutTheShopList",
  components: {
    Button,
    ShopCart,
    LayoutTheShopListEmpty
  },

  data() {
    return {
      CartIcon: CartIcon,
      TrashIcon: TrashIcon,
      arrow: arrow,
      EmptyCart: EmptyCart
    };
  },
  computed: {
    TheShopListStyle() {
      return TheShopListStyle;
    },

    ...mapGetters({
      cart: "getCart",
      totalPrice: "getTotalPrice",
      itemsCount: "getItemsCount",
      pizzaItem: "getPizzaItem",
      getBasketFlag: "getBasketFlag"
    })
  },

  methods: {
    ...mapActions({
      removeItems: "removePizzaItems"
    }),
    getClearPizzas() {
      this.$modal.show("dialog", {
        title: "Очистить корзину пицц",
        text: "Вы действительно хотите отчистить корзину",
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
              this.removeItems();
            }
          }
        ]
      });
    },

    handlerPayOut() {
      this.$modal.show("dialog", {
        title: "Спасибо за покупку!",
        text: `Вы приобрели ${this.itemsCount} пицц, по цене ${this.totalPrice} рублей.
        \n Спасибо за покупку, приходите еще!`,
        buttons: [
          {
            title: "Закрыть",
            handler: () => {
              this.$modal.hide("dialog");
              console.log(this.cart);
              this.removeItems();
            }
          }
        ]
      });
    }
  }
};
</script>

<template>
  <div :class="TheShopListStyle.TheShopList">
    <template v-if="getBasketFlag">
      <v-dialog />
      <header :class="TheShopListStyle.Header">
        <div :class="TheShopListStyle.Inner">
          <img
            :src="CartIcon"
            :class="TheShopListStyle.CartICON"
            alt="Trash icon"
          />
          <h2 :class="TheShopListStyle.Title">Корзина</h2>
        </div>
        <Button
          @click.native="getClearPizzas"
          :class="TheShopListStyle.HeaderBtn"
        >
          <template slot="Icon">
            <img style="order: 1;" :src="TrashIcon" alt="Trash icon" />
          </template>
          <template slot="ButtonText">
            Очистить корзину
          </template>
        </Button>
      </header>
      <div :class="TheShopListStyle.Content">
        <ShopCart
          v-for="(shopCart, index) in pizzaItem"
          :shopCart="shopCart.items"
          :key="shopCart.id"
          :index="index"
          :groupCartItems="pizzaItem[index].items"
          :groupCartItemsPrice="pizzaItem[index].totalPrice"
        />
      </div>
      <footer :class="TheShopListStyle.Footer">
        <div :class="TheShopListStyle.FooterStats">
          <div>
            <p :class="TheShopListStyle.FooterAllPizas">
              Всего пицц: <span>{{ itemsCount }}</span>
            </p>
          </div>
          <div>
            <p :class="TheShopListStyle.FooterAllSum">
              Сумма заказа: <span>{{ totalPrice }}</span>
            </p>
          </div>
        </div>
        <div :class="TheShopListStyle.FooterBtns">
          <router-link to="/" style="text-decoration: none">
            <Button :class="TheShopListStyle.FooterBtnBack">
              <template slot="ButtonText">
                Вернуться назад
              </template>
              <template slot="Icon">
                <img
                  :class="TheShopListStyle.FooterBtnBackIcon"
                  :src="arrow"
                  alt="arrow left icon"
                />
              </template> </Button
          ></router-link>
          <Button
            @click.native="handlerPayOut"
            :class="TheShopListStyle.FooterBtnPay"
          >
            <template slot="ButtonText">
              Оплатить сейчас
            </template>
          </Button>
        </div>
        <v-dialog name="example" />
      </footer>
    </template>
    <template v-else>
      <LayoutTheShopListEmpty />
    </template>
  </div>
</template>
