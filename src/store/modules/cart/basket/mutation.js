import {
  CLEAR_PIZZA_ITEMS,
  CLEAR_PIZZA_ITEMS_ERROR,
  CLEAR_PIZZA_ITEM,
  CLEAR_PIZZA_ITEM_ERROR,
  PLUS_CART_ITEM,
  PLUS_PIZZA_CART_ITEM_ERROR,
  MINUS_CART_ITEM,
  MINUS_PIZZA_CART_ITEM_ERROR
} from "../../../mutation-types";
export default {
  mutations: {
    [CLEAR_PIZZA_ITEMS](state, rootState) {
      state;
      const _s = rootState;
      _s.pizzaItems = {};
      _s.pizzaItemsCount = 0;
      _s.totalPrice = 0;
      _s.BasketItems = false;
    },
    [CLEAR_PIZZA_ITEMS_ERROR](state, error) {
      state.itemsError = error;
    },
    [CLEAR_PIZZA_ITEM](state, payLoad) {
      state;
      const _s = payLoad.rootState;
      const _update = payLoad.updateCart;

      _s.pizzaItems = _update.pizzaItems;
      _s.pizzaItemsCount -= _update.pizzaItemsCount;
      _s.totalPrice -= _update.totalPrice;
    },
    [CLEAR_PIZZA_ITEM_ERROR](state, error) {
      state.itemError = error;
    },
    [PLUS_CART_ITEM](state, payLoad) {
      state;
      const _s = payLoad.rootState;
      const _update = payLoad.addItem;
      const _updateStats = payLoad.cartStatsUpdate;

      _s.pizzaItems = _update;
      _s.pizzaItemsCount = _updateStats.pizzaItemsCount;
      _s.totalPrice = _updateStats.totalPrice;
    },
    [PLUS_PIZZA_CART_ITEM_ERROR](state, error) {
      state.plusItemError = error;
    },

    [MINUS_CART_ITEM](state, payLoad) {
      state;
      const _s = payLoad.rootState;
      const _update = payLoad.removeItem;
      const _updateStats = payLoad.cartStatsUpdate;

      _s.pizzaItems = _update;
      _s.pizzaItemsCount = _updateStats.pizzaItemsCount;
      _s.totalPrice = _updateStats.totalPrice;
    },
    [MINUS_PIZZA_CART_ITEM_ERROR](state, error) {
      state.plusItemError = error;
    }
  }
};
