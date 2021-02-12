import { getProducts } from "@/api/products.api";
import {
  SET_DISCHARGE,
  SET_LOADED,
  SET_PRODUCTS,
  SET_PRODUCTS_ERROR
} from "../../mutation-types";
export default {
  state: {
    loadedProducts: false,
    products: [],
    productError: null
  },
  mutations: {
    [SET_PRODUCTS](state, products) {
      state.products = products;
    },
    [SET_LOADED](state) {
      state.loadedProducts = true;
    },
    [SET_DISCHARGE](state) {
      state.loadedProducts = false;
    },
    [SET_PRODUCTS_ERROR](state, error) {
      state.productError = error;
    }
  },
  actions: {
    async fetchProducts({ commit, state, rootState }) {
      commit("SET_DISCHARGE");
      try {
        // get request to the api using the exported function getProducts,
        // into which we pass the id of the active pizza category and the id of the active pizza filter
        const tagCategoryID = rootState.tags.isActiveTag;
        const dropDownActive = rootState.dropdown.DropDownItemIsActive;
        const products = await getProducts(tagCategoryID, dropDownActive);

        commit("SET_PRODUCTS", products);
        if (state.products.length) {
          commit("SET_LOADED");
        } else {
          commit("SET_DISCHARGE");
        }
      } catch (err) {
        commit("SET_PRODUCTS_ERROR", err);
      }
    }
  },
  getters: {
    getCards: ({ products }) => products,
    getPizzasLoadedFlag: ({ loadedProducts }) => loadedProducts
  }
};
