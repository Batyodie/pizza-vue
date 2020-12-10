<script>
import { Card } from "@/components";
import { ContentLoader } from "vue-content-loader";
import { mapGetters, mapActions } from "vuex";

import { TheGridStyle } from "@/Layout/style";
export default {
  name: "LayoutTheGrid",
  components: { Card, ContentLoader },
  data() {
    return {};
  },

  computed: {
    TheGridStyle() {
      return TheGridStyle;
    },

    ...mapGetters({
      cards: "getCards",
      cart: "getCart",
      getCartItem: "getCartItem",
      isLoaded: "getPizzasLoadedFlag"
    }),
    getLastCardTags() {
      return id => (this.getCartItem(id) ? this.getCartItem(id).tags : null);
    }
  },

  methods: {
    ...mapActions({
      addPizza: "addPizzaToCart"
    }),

    onClickAddPizza(obj) {
      this.addPizza(obj);
    }
  }
};
</script>

<template>
  <main :class="TheGridStyle.TheGrid">
    <div style="margin-bottom: 35px;">
      <h1 :class="TheGridStyle.Title">Все пиццы</h1>
    </div>
    <div :class="TheGridStyle.Layout">
      <template v-if="!isLoaded">
        <content-loader
          style="min-width: 280px"
          :width="284"
          :height="523"
          :speed="2"
          v-for="(i, _i) in cards.length || 12"
          :key="_i"
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
          :card="card"
          :cardIndex="card.id"
          :tags="getLastCardTags(card.id)"
        >
        </Card>
      </template>
    </div>
  </main>
</template>
