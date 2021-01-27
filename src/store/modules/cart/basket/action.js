import getCartData from "@/func/getCartData";
import produce from "immer";
const getCartMethod = getCartData();

export default {
  actions: {
    removePizzaItems({ commit, rootState }) {
      try {
        commit("CLEAR_PIZZA_ITEMS", rootState.cart);
      } catch (err) {
        const error = `An error occured while deleting all items in the cart: ${err}`;
        commit("CLEAR_PIZZA_ITEMS_ERROR", error);
      }
    },
    removePizzaItem({ commit, rootState }, deleteItemID) {
      try {
        const updateCart = produce(rootState.cart, (draft) => {
          const cartItem = draft.pizzaItems[deleteItemID];

          delete draft.pizzaItems[deleteItemID];
          // We will subtract this data from the data in the rootstate during mutation.
          // totalPrice and pizzaItemsCount
          draft.totalPrice = getCartData().getTotalPrice(
            cartItem.items,
            "price"
          );
          draft.pizzaItemsCount = cartItem.items.length;
        });
        commit("CLEAR_PIZZA_ITEM", { rootState: rootState.cart, updateCart });
      } catch (err) {
        const error = `An error occurred while deleting an item in the cart: ${err}`;
        commit("CLEAR_PIZZA_ITEM_ERROR", error);
      }
    },
    plusCartItem({ commit, rootState, getters }, payLoad) {
      try {
        const addItem = produce(rootState.cart.pizzaItems, (draft) => {
          const cartItem = draft[payLoad.ID];
          const lastGroupItem = cartItem.items.length - 1;
          const addObj = [...cartItem.items, cartItem.items[lastGroupItem]];

          cartItem.totalPrice = getCartMethod.getTotalPrice(addObj, "price");
          cartItem.items = addObj;
        });
        const cartStatsUpdate = getters.getUpdateStatsCart(addItem);

        commit("PLUS_CART_ITEM", {
          rootState: rootState.cart,
          addItem,
          cartStatsUpdate,
        });
      } catch (err) {
        const error = `an error occurred while plus pizza item: ${err}`;
        commit("PLUS_PIZZA_CART_ITEM_ERROR", error);
      }
    },
    minusCartItem({ commit, rootState, getters }, payLoad) {
      try {
        const removeItem = produce(rootState.cart.pizzaItems, (draft) => {
          const cartItem = draft[payLoad.ID];
          if (cartItem.items.length > 1) {
            cartItem.items.pop();
            cartItem.totalPrice = getCartMethod.getTotalPrice(
              cartItem.items,
              "price"
            );
          } else {
            [...cartItem.items];
          }
        });
        const cartStatsUpdate = getters.getUpdateStatsCart(removeItem);
        commit("MINUS_CART_ITEM", {
          rootState: rootState.cart,
          removeItem,
          cartStatsUpdate,
        });
      } catch (err) {
        const error = `an error occurred while minus pizza item: ${err}`;
        commit("MINUS_CART_ITEM_ERROR", error);
      }
    },
  },
};
