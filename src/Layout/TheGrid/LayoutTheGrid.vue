<template>
  <main :class="TheGridStyle.TheGrid">
    <div style="margin-bottom: 35px;">
      <h1 :class="TheGridStyle">Все пиццы</h1>
    </div>
    <div :class="TheGridStyle.TheGridLayout">
      <template v-if="!isLoaded">
        <content-loader
          style="min-width: 280px"
          :width="284"
          :height="523"
          :speed="2"
          primaryColor="#f3f3f3"
          secondaryColor="#ecebeb"
        >
          <circle cx="140" cy="140" r="140" />
          <rect x="6" y="299" rx="10" ry="10" width="270" height="40" />
          <rect x="6" y="354" rx="10" ry="10" width="270" height="104" />
          <rect x="6" y="491" rx="10" ry="10" width="96" height="27" />
          <rect x="126" y="476" rx="30" ry="30" width="153" height="44" />
        </content-loader>
      </template>
      <template v-else>
        <Card
          v-for="card in cards"
          :key="card.id"
          :onClickAddPizza="onClickAddPizza"
          :cardsTypeTags="cardsTypeTags"
          :cardsSizesTags="cardsSizesTags"
          :card="card"
          :pizzaCardCount="
            pizzaCardCount[card.id] && pizzaCardCount[card.id].items.length
          "
          :ActiveBtnFlag="pizzaItems[card.id] && pizzaItems[card.id].activeBtn"
        >
        </Card>
      </template>
    </div>
  </main>
</template>

<script>
import { ContentLoader } from "vue-content-loader";
import Card from "@/components/Card/Card.vue";
import { mapGetters, mapActions } from "vuex";
import TheGridStyle from "./LayoutTheGrid.css";
export default {
  components: { Card, ContentLoader },
  name: "LayoutBaseMarket",
  data() {
    return {
      pizzaCounter: null,
    };
  },
  computed: {
    TheGridStyle() {
      return TheGridStyle;
    },
    ...mapGetters({
      cards: "getCards",
      pizzaItems: "getCardsActiveBtn",
      cardsTypeTags: "getCardsTags",
      cardsSizesTags: "getCardsSizesTags",
      isLoaded: "getPizzasLoadedFlag",
      pizzaCardCount: "getPizzaItemsCount",
    }),
  },
  methods: {
    ...mapActions({
      addPizza: "addPizzaToCart",
    }),
    onClickAddPizza(obj) {
      this.addPizza(obj);
    },
  },
};
</script>
