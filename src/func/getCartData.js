import produce from "immer";

class Data {
  #state;
  #pizzaObj;
  data = null;
  constructor(state, pizzaObj) {
    (this.#state = state), (this.#pizzaObj = pizzaObj);
  }

  getNewObj() {
    const id = this.#pizzaObj.id;
    const state = this.#state;
    const obj = this.#pizzaObj;
    return produce(state.pizzaItems, draft => {
      const currentItems = !draft[id] ? [obj] : [...draft[id].items, obj];
      const lastItem = currentItems.length - 1;

      draft[id] = {
        items: currentItems,
        totalPrice: this.getTotalPrice(currentItems, "price"),
        activeBtn: true,
        tags: {
          type: currentItems[lastItem].type,
          size: currentItems[lastItem].size
        }
      };
    });
  }

  getAllPizzas(obj) {
    return [].concat.apply([], Object.values(obj));
  }
  getTotalCout(obj) {
    const newObj = Object.keys(obj).map(key => {
      return obj[key].items;
    });
    return this.getAllPizzas(newObj);
  }
  getTotalPrice(arr, type) {
    return arr.reduce((sum, obj) => obj[type] + sum, 0);
  }

  get getAllPayLoad() {
    const obj = this.getNewObj();
    return (this.data = {
      newPizzaObj: obj,
      allPizzasCount: this.getTotalCout(obj),
      allPizzas: this.getAllPizzas(obj),
      totalPrice: this.getTotalPrice(this.getAllPizzas(obj), "totalPrice")
    });
  }
}

const getCartData = function(state, pizzaObj) {
  const payLoad = new Data(state, pizzaObj);
  return payLoad;
};

export default getCartData;
