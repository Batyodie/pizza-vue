import getPizzaCartData from "../../components/Card/getPizzaCartData";
import axios from "axios";
const actions = {
  // dropdown actions
  DropDownOpened(ctx, label) {
    ctx.commit("DropDownOpened", label);
  },
  DropDownGlobalClosed(ctx) {
    ctx.commit("DropDownGlobalClose");
  },
  DropDownSelected({ commit }, DropDownItem) {
    commit("DropDownSelected", DropDownItem);
  },
  // Thebar actions
  TheBarSelectedTag({ commit }, TagIndex) {
    commit("changesActiveTag", TagIndex);
  },
  async GetThePizzas({ commit, state }) {
    commit("setLoaded");

    await axios
      .get(
        `/pizzas?${
          state.isActiveTag !== null ? `category=${state.isActiveTag}` : ""
        }&_sort=${state.DropDownItemIsActive.type}&_order=${
          state.DropDownItemIsActive.order
        }`
      )
      .then(({ data }) => {
        commit("SetThePizzas", data);
        commit("SetContentLoaded", data);
      });
  },
  // getChangedActiveBtn({ commit }, payLoad) {
  //   commit("CHANGED_STYLE_ADD_BTN", payLoad);
  // },
  addPizzaToCart({ commit, state }, pizzaObj) {
    // import function get pizza cart data
    const payLoad = getPizzaCartData(state, pizzaObj);
    payLoad.contextObjID = pizzaObj.id;
    commit("ADD_PIZZA_CART", payLoad);
  },
  removePizzaItems({ commit }) {
    commit("CLEAR_PIZZA_ITEMS");
  },
  removePizzaItem({ commit }, groupPizzaID) {
    commit("CLEAR_PIZZA_ITEM", groupPizzaID);
  },
  addPizzaCartItem({ commit }, payLoad) {
    commit("PLUS_PIZZA_CART_ITEM", payLoad);
  },
  removePizzaCartItem({ commit }, payLoad) {
    commit("MINUS_PIZZA_CART_ITEM", payLoad);
  }
};

export default actions;
