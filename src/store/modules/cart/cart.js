import getPizzaCartData from "@/components/Card/getPizzaCartData";
export default {
  state: {
    pizzaItems: {},
    totalPrice: 0,
    pizzaItemsCount: 0,
    pizzaItemID: null,
    groupPizzasTotalPrice: null,
  },
  mutations: {
    ADD_PIZZA_CART(state, payLoad) {
      state.pizzaItems = payLoad.newPizzaObj;
      state.pizzaItemsCount = payLoad.allPizzasCount.length;
      state.totalPrice = payLoad.totalPrice;
      state.BasketItems = true;
      state.pizzaItems[payLoad.contextObjID].activeBtn = true;
    },
    CLEAR_PIZZA_ITEMS(state) {
      state.pizzaItems = {};
      state.pizzaItemsCount = 0;
      state.totalPrice = 0;
      state.BasketItems = false;
    },
    CLEAR_PIZZA_ITEM(state, groupPizzaID) {
      const newItem = { ...state.pizzaItems };
      const groupItemTotalCount = newItem[groupPizzaID].items.length;
      const groupItemTotalPrice = newItem[groupPizzaID].items.reduce(
        (sum, obj) => obj.price + sum,
        0
      );
      delete newItem[groupPizzaID];
      state.pizzaItems = newItem;
      state.pizzaItemsCount -= groupItemTotalCount;
      state.totalPrice -= groupItemTotalPrice;
    },
    PLUS_PIZZA_CART_ITEM(state, payLoad) {
      const newItem = { ...state.pizzaItems };
      const lastGroupItem = state.pizzaItems[payLoad.ID].items.length - 1;
      const groupItemTotalPrice = (arr) =>
        arr.reduce((sum, obj) => obj.price + sum, 0);
      const concated = (arr) => [].concat.apply([], Object.values(arr));
      newItem[payLoad.ID].items = [
        ...state.pizzaItems[payLoad.ID].items,
        state.pizzaItems[payLoad.ID].items[lastGroupItem],
      ];
      newItem[payLoad.ID].totalPrice = groupItemTotalPrice(
        newItem[payLoad.ID].items
      );
      state.pizzaItems = newItem;

      const obj = Object.keys(state.pizzaItems).map((key) => {
        return state.pizzaItems[key].items;
      });
      const count = concated(obj);
      const Array = concated(count);

      state.pizzaItemsCount = count.length;
      state.totalPrice = groupItemTotalPrice(Array);
    },
    MINUS_PIZZA_CART_ITEM(state, payLoad) {
      const newItem = { ...state.pizzaItems };
      const groupItemTotalPrice = (arr) =>
        arr.reduce((sum, obj) => obj.price + sum, 0);
      const concated = (arr) => [].concat.apply([], Object.values(arr));

      if (state.pizzaItems[payLoad.ID].items.length > 1) {
        newItem[payLoad.ID].items = [
          ...state.pizzaItems[payLoad.ID].items.slice(1),
        ];
        newItem[payLoad.ID].totalPrice = groupItemTotalPrice(
          newItem[payLoad.ID].items
        );
        const obj = Object.keys(state.pizzaItems).map((key) => {
          return state.pizzaItems[key].items;
        });
        const count = concated(obj);
        const Array = concated(count);

        state.pizzaItemsCount = count.length;
        state.totalPrice = groupItemTotalPrice(Array);
      } else {
        return {
          ...state.pizzaItems[payLoad.ID].items,
        };
      }
    },
  },
  actions: {
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
};
