// Immutable js library
import produce from "immer";

// The main class for working with data
class Data {
  #state;
  #pizzaObj;
  data = null;
  constructor(state, pizzaObj) {
    (this.#state = state), (this.#pizzaObj = pizzaObj);
  }
  // Getting a new pizza object
  getNewObj() {
    const id = this.#pizzaObj.id;
    const state = this.#state;
    const obj = this.#pizzaObj;
    // We take the current state of the store and draft it.
    return produce(state.pizzaItems, draft => {
      // We check if there is a draft object with the required id.
      // If yes, then just add it to the array,
      // if not, create such an id.items object and add a new item to the items array
      const currentItems = !draft[id] ? [obj] : [...draft[id].items, obj];
      const lastItem = currentItems.length - 1;

      // At the output, we get an object with keys where items is the updated array of pizzas,
      // totalPrice is the total price of the pizza group, and tags are the last active tags on the pizza card

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

  // returns an array of all pizza groups
  getAllPizzas(obj) {
    return [].concat.apply([], Object.values(obj));
  }
  // returns the total count of the array passed to it
  getTotalCout(obj) {
    const newObj = Object.keys(obj).map(key => {
      return obj[key].items;
    });
    return this.getAllPizzas(newObj);
  }
  // returns the total price in type of the array passed to it
  getTotalPrice(arr, type) {
    return arr.reduce((sum, obj) => obj[type] + sum, 0);
  }
  // combining all fields into a single entity to work with store
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
