import Vue from "vue";
import Vuex from "vuex";

import getters from "./getters/getters";
import actions from "./actions/actions";
import mutations from "./mutations/mutations";
import modules from "./modules/modules";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    DropDownIsOpen: false,
    isLoaded: false,
    DropDownItems: [
      { id: 5, text: "популярности", type: "rating", order: "desc" },
      { id: 6, text: "по цене", type: "price", order: "desc" },
      { id: 7, text: "по алфавиту", type: "name", order: "asc" }
    ],
    tags: [
      { id: null, text: "Все", type: "all" },
      { id: 0, text: "Мясные", type: "meet" },
      { id: 1, text: "Вегетарианская", type: "vengry" },
      { id: 2, text: "Гриль", type: "grill" },
      { id: 3, text: "Острые", type: "sharp" },
      { id: 4, text: "Закрытые", type: "closed" }
    ],
    DropDownItemIsActive: {
      text: "популярности",
      type: "rating",
      order: "desc"
    },
    isActiveTag: null,
    TheBarTagIndex: undefined,
    cards: [],
    cardsTypeTags: ["тонкое", "традиционное"],
    cardsSizesTags: [26, 30, 40],
    pizzaItems: {},
    totalPrice: 0,
    pizzaItemsCount: 0,
    pizzaItemID: null,
    groupPizzasTotalPrice: null
  },
  mutations,
  actions,
  getters,
  modules
});
