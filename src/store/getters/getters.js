const getters = {
  // getters dropdown
  getStateDropdown: (state) => {
    return state;
  },
  // getters thebar
  getTags: (state) => {
    return state.tags;
  },
  getIsActiveTag: (state) => {
    return state.isActiveTag;
  },
  getCards: (state) => {
    return state.cards;
  },
  getCardsTags: (state) => {
    return state.cardsTypeTags;
  },
  getCardsSizesTags: (state) => {
    return state.cardsSizesTags;
  },
  getPizzasLoadedFlag: (state) => {
    return state.isLoaded;
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
};

export default getters;
