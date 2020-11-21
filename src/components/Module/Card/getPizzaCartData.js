class Data {
  #state;
  #pizzaObj;
  data = null;
  constructor(state, pizzaObj) {
    (this.#state = state), (this.#pizzaObj = pizzaObj);
  }

  getNewObj() {
    const newItem =
      //  Check if it is in state
      !this.#state.pizzaItems[this.#pizzaObj.id]
        ? [this.#pizzaObj]
        : // If not, copy state. And add a new element
          [...this.#state.pizzaItems[this.#pizzaObj.id].items, this.#pizzaObj];
    // return newObj
    return {
      ...this.#state.pizzaItems,
      [this.#pizzaObj.id]: {
        items: newItem,
        totalPrice: newItem.reduce((sum, obj) => obj.price + sum, 0),
      },
    };
  }
  getAllPizzas() {
    return [].concat.call([], Object.values(this.getNewObj()));
  }
  getTotalCout() {
    const obj = Object.keys(this.getNewObj()).map((key) => {
      return this.getNewObj()[key].items;
    });
    return [].concat.apply([], Object.values(obj));
  }
  getTotalPrice() {
    return this.getAllPizzas().reduce((sum, obj) => obj.totalPrice + sum, 0);
  }
  get getAllPayLoad() {
    return (this.data = {
      newPizzaObj: this.getNewObj(),
      allPizzasCount: this.getTotalCout(),
      allPizzas: this.getAllPizzas(),
      totalPrice: this.getTotalPrice(),
    });
  }
}

const getPizzaCartData = function(state, pizzaObj) {
  const payLoad = new Data(state, pizzaObj);
  return payLoad.getAllPayLoad;
};

export default getPizzaCartData;
