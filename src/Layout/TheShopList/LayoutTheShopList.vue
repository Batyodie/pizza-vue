<template>
  <div :class="TheShopListStyle.TheShopList">
    <template v-if="getBasketFlag">
      <v-dialog />
      <header :class="TheShopListStyle.TheShopListHeader">
        <div :class="TheShopListStyle.TheShopListInner">
          <img :src="CartIcon" alt="Trash icon" />
          <h2 :class="TheShopListStyle.TheShopListTitle">Корзина</h2>
        </div>
        <Button
          @click.native="getClearPizzas"
          :class="TheShopListStyle.TheShopListHeaderBtn"
        >
          <template slot="Icon">
            <img style="order: 1;" :src="TrashIcon" alt="Trash icon" />
          </template>
          <template slot="ButtonText">
            Очистить корзину
          </template>
        </Button>
      </header>
      <div :class="TheShopListStyle.TheShopListContent">
        <ShopCart
          v-for="(shopCart, index) in groupPizzaItem"
          :shopCart="shopCart"
          :key="shopCart.id"
          :index="index"
          :groupTotalPrice="groupTotalPrice[index]"
        />
      </div>
      <footer :class="TheShopListStyle.TheShopListFooter">
        <div :class="TheShopListStyle.TheShopListFooterStats">
          <div>
            <p :class="TheShopListStyle.TheShopListFooterAllPizas">
              Всего пицц: <span>{{ itemsCount }}</span>
            </p>
          </div>
          <div>
            <p :class="TheShopListStyle.TheShopListFooterAllSum">
              Сумма заказа: <span>{{ totalPrice }}</span>
            </p>
          </div>
        </div>
        <div :class="TheShopListStyle.TheShopListFooterBtns">
          <router-link to="/" style="text-decoration: none">
            <Button :class="TheShopListStyle.TheShopListFooterBtnBack">
              <template slot="ButtonText">
                Вернуться назад
              </template>
              <template slot="Icon">
                <img
                  :class="TheShopListStyle.TheShopListFooterBtnBackIcon"
                  :src="arrow"
                  alt="arrow left icon"
                />
              </template> </Button
          ></router-link>
          <Button
            @click.native="handlerPayOut"
            :class="TheShopListStyle.TheShopListFooterBtnPay"
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
      <div :class="TheShopListStyle.TheShopListContent">
        <div :class="TheShopListStyle.TheShopListEmpty">
          <h2 :class="TheShopListStyle.TheShopListEmptyTitle">
            Корзина пустая 😕
          </h2>
          <p :class="TheShopListStyle.TheShopListEmptyCopy">
            Вероятней всего, вы не заказывали ещё пиццу. Для того, чтобы
            заказать пиццу, перейди на главную страницу.
          </p>
          <img
            :class="TheShopListStyle.TheShopListEmptyLogo"
            :src="EmptyCart"
            alt="Empty image"
          />
          <router-link to="/">
            <Button :class="TheShopListStyle.TheShopListEmptyBtn">
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
import ShopCart from "@/components/ShopCart/ShopCart.vue";
import Button from "@/components/Button/Button.vue";

// images
import CartIcon from "@/assets/img/shopping-cart.svg";
import TrashIcon from "@/assets/img/trash.svg";
import arrow from "@/assets/img/grey-arrow-left.svg";
import EmptyCart from "@/assets/img/empty-cart.png";

import TheShopListStyle from "./LayoutTheShopList.css";
import { mapState, mapGetters, mapActions } from "vuex";
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
    ...mapState({
      totalPrice: "totalPrice",
      itemsCount: "pizzaItemsCount",
      items: "pizzaItems",
    }),
    ...mapGetters({
      groupPizzaItem: "getGroupPizzas",
      groupTotalPrice: "getGroupPizzasPrice",
      getBasketFlag: "getBasketFlag",
    }),
  },
};
</script>
