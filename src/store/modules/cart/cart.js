import { ADD_PIZZA_CART, ADD_PIZZA_CART_ERROR } from "../../mutation-types";
import basket from "./basket";
import getCartData from "@/func/getCartData";
export default {
  state: {
    pizzaItems: {},
    totalPrice: 0,
    pizzaItemsCount: 0,
    addPizzaCartError: null
  },
  mutations: {
    [ADD_PIZZA_CART](state, payLoad) {
      state.pizzaItems = payLoad.newPizzaObj;
      state.pizzaItemsCount = payLoad.allPizzasCount.length;
      state.totalPrice = payLoad.totalPrice;
      state.BasketItems = true;
    },
    [ADD_PIZZA_CART_ERROR](state, error) {
      state.addPizzaCartError = error;
    }
  },

  actions: {
    addPizzaToCart({ commit, state }, pizzaObj) {
      try {
        const payLoad = getCartData(state, pizzaObj);
        payLoad.getAllPayLoad.contextObjID = pizzaObj.id;
        commit("ADD_PIZZA_CART", payLoad.getAllPayLoad);
      } catch (err) {
        commit("ADD_PIZZA_CART_ERROR", err);
      }
    }
  },
  getters: {
    getCart: ({ pizzaItems }) => pizzaItems,
    getCartItem: ({ pizzaItems }) => id => {
      return pizzaItems[id] ? pizzaItems[id] : null;
    },
    getCartItemType: ({ pizzaItems }, { getCartItem }) => (id, type) => {
      // console.log(pizzaItems[id][type]);
      return getCartItem(id) ? pizzaItems[id][type] : null;
    },
    getPizzaItem: ({ pizzaItems }) =>
      Object.keys(pizzaItems).map(key => {
        return pizzaItems[key];
      }),
    getBasketFlag: ({ totalPrice }) => (totalPrice === 0 ? false : true),
    getTotalPrice: ({ totalPrice }) => totalPrice,
    getItemsCount: ({ pizzaItemsCount }) => pizzaItemsCount
  },
  modules: {
    basket
  }
};
