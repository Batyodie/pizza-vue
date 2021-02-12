import getCartData from "@/func/getCartData";
import produce from "immer";
const getCartMethod = getCartData();

export default {
  actions: {
    // global removal of all pizzas from the basket
    removePizzaItems({ commit, rootState }) {
      try {
        // we pass the baskets for its mutation
        commit("CLEAR_PIZZA_ITEMS", rootState.cart);
      } catch (err) {
        const error = `An error occured while deleting all items in the cart: ${err}`;
        commit("CLEAR_PIZZA_ITEMS_ERROR", error);
      }
    },
    // Removing a group of pizzas in a basket
    removePizzaItem({ commit, rootState }, deleteItemID) {
      try {
        // Drafting with immer js.
        const updateCart = produce(rootState.cart, draft => {
          // Find the required pizza group to delete
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
        // send existing repository and modified
        commit("CLEAR_PIZZA_ITEM", {
          rootState: rootState.cart,
          updateCart
        });
      } catch (err) {
        const error = `An error occurred while deleting an item in the cart: ${err}`;
        commit("CLEAR_PIZZA_ITEM_ERROR", error);
      }
    },
    // action add pizza to the pizza group in the basket
    plusCartItem({ commit, rootState, getters }, payLoad) {
      try {
        // inner draft
        const addItem = produce(rootState.cart.pizzaItems, draft => {
          // current additional group piiza
          const cartItem = draft[payLoad.ID];
          // last pizza in group
          const lastGroupItem = cartItem.items.length - 1;
          // plus pizza
          const addObj = [...cartItem.items, cartItem.items[lastGroupItem]];
          // reforge group pizza total price
          // an exported function that takes an array and a key through which the Reduce method passes
          cartItem.totalPrice = getCartMethod.getTotalPrice(addObj, "price");
          cartItem.items = addObj;
        });
        // getter that receives an updated pizza cart and returns an item with the updated total pizza quantity and prices
        const cartStatsUpdate = getters.getUpdateStatsCart(addItem);

        commit("PLUS_CART_ITEM", {
          // old state
          rootState: rootState.cart,
          // update state
          addItem,
          // update state stats global total price and total count
          cartStatsUpdate
        });
      } catch (err) {
        const error = `an error occurred while plus pizza item: ${err}`;
        commit("PLUS_PIZZA_CART_ITEM_ERROR", error);
      }
    },
    minusCartItem({ commit, rootState, getters }, payLoad) {
      try {
        const removeItem = produce(rootState.cart.pizzaItems, draft => {
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
          cartStatsUpdate
        });
      } catch (err) {
        const error = `an error occurred while minus pizza item: ${err}`;
        commit("MINUS_CART_ITEM_ERROR", error);
      }
    }
  }
};
