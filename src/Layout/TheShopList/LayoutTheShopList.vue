<template>
  <div :class="TheShopListStyle.TheShopList">
    <template v-if="getBasketFlag">
      <v-dialog />
      <header :class="TheShopListStyle.Header">
        <div :class="TheShopListStyle.Inner">
          <img :src="CartIcon" alt="Trash icon" />
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
          v-for="(shopCart, index) in groupPizzaItem"
          :shopCart="shopCart"
          :key="shopCart.id"
          :index="index"
          :groupTotalPrice="groupTotalPrice[index]"
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
      <div :class="TheShopListStyle.Content">
        <div :class="TheShopListStyle.Empty">
          <h2 :class="TheShopListStyle.EmptyTitle">
            Корзина пустая 😕
          </h2>
          <p :class="TheShopListStyle.EmptyCopy">
            Вероятней всего, вы не заказывали ещё пиццу. Для того, чтобы
            заказать пиццу, перейди на главную страницу.
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
  </div>
</template>

<script>
import { Button, ShopCart } from "@/components";
import { mapGetters, mapActions } from "vuex";

import { CartIcon, TrashIcon, arrow, EmptyCart } from "@/assets";
import { TheShopListStyle } from "@/Layout/style";
export default {
  name: "LayoutTheShopList",
  components: { Button, ShopCart },
  data() {
    return {
      CartIcon: CartIcon,
      TrashIcon: TrashIcon,
      arrow: arrow,
      EmptyCart: EmptyCart,
    };
  },
  methods: {
    ...mapActions({
      removeItems: "removePizzaItems",
    }),
    getClearPizzas() {
      this.$modal.show("dialog", {
        title: "Очистить корзину пицц",
        text: "Вы действительно хотите отчистить корзиону",
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
              this.removeItems();
            },
          },
        ],
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
              console.log(this.items);
              this.removeItems();
            },
          },
        ],
      });
    },
  },
  computed: {
    TheShopListStyle() {
      return TheShopListStyle;
    },
    ...mapGetters({
      items: "getPizzaItemsCount",
      totalPrice: "getTotalPrice",
      itemsCount: "getItemsCount",
      groupPizzaItem: "getGroupPizzas",
      groupTotalPrice: "getGroupPizzasPrice",
      getBasketFlag: "getBasketFlag",
    }),
  },
};
</script>
