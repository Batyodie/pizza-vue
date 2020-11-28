import { getProducts } from "@/api/products.api";
export default {
  state: {
    loadedProducts: false,
    cards: [],
    cardsTypeTags: ["тонкое", "традиционное"],
    cardsSizesTags: [26, 30, 40],
    productError: null,
  },
  mutations: {
    SetThePizzas(state, products) {
      state.cards = products;
    },
    SetContentLoaded(state) {
      if (state.cards.length) {
        state.loadedProducts = true;
      } else {
        state.loadedProducts = false;
      }
    },
    setLoaded(state) {
      state.loadedProducts = false;
    },
    setProductError(state, error) {
      state.productError = error;
    },
  },
  actions: {
    async fetchPizzas({ commit, rootState }) {
      commit("setLoaded");
      try {
        const tagCategoryID = rootState.tags.isActiveTag;
        const dropDownActive = rootState.dropdown.DropDownItemIsActive;
        const products = await getProducts(tagCategoryID, dropDownActive);

        commit("SetThePizzas", products);
        commit("SetContentLoaded");
      } catch (err) {
        commit("setProductError", err);
      }
    },
  },
  getters: {
    getCards: ({ cards }) => cards,
    getCardsTags: ({ cardsTypeTags }) => cardsTypeTags,
    getCardsSizesTags: ({ cardsSizesTags }) => cardsSizesTags,
    getPizzasLoadedFlag: ({ loadedProducts }) => loadedProducts,
  },
};
