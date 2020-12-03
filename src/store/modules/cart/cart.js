import { ADD_PIZZA_CART } from "../../mutation-types";
import basket from "./basket";
import getCartData from "@/func/getCartData";
export default {
  state: {
    pizzaItems: {},
    totalPrice: 0,
    pizzaItemsCount: 0,
    pizzaItemID: null,
    groupPizzasTotalPrice: null,
  },
  mutations: {
    [ADD_PIZZA_CART](state, payLoad) {
      state.pizzaItems = payLoad.newPizzaObj;
      state.pizzaItemsCount = payLoad.allPizzasCount.length;
      state.totalPrice = payLoad.totalPrice;
      state.BasketItems = true;
    },
  },
  actions: {
    addPizzaToCart({ commit, state }, pizzaObj) {
      const payLoad = getCartData(state, pizzaObj);

      payLoad.getAllPayLoad.contextObjID = pizzaObj.id;
      commit("ADD_PIZZA_CART", payLoad.getAllPayLoad);
    },
  },
  getters: {
    getCardsActiveBtn: (state) => {
      return state.pizzaItems;
    },
    getPizzaItemsCount: (state) => {
      return state.pizzaItems;
    },
    getGroupPizzas: (state) => {
      return Object.keys(state.pizzaItems).map((key) => {
        return state.pizzaItems[key];
      });
    },
    getGroupPizzasPrice: (state) => {
      return Object.keys(state.pizzaItems).map((key) => {
        return state.pizzaItems[key];
      });
    },
    getBasketFlag: (state) => {
      return state.totalPrice === 0 ? false : true;
    },
    getTotalPrice: (state) => {
      return state.totalPrice;
    },
    getItemsCount: (state) => {
      return state.pizzaItemsCount;
    },
  },
  modules: {
    basket,
  },
};
