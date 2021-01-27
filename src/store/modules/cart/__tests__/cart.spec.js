import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import cart from "@/store/modules/cart/cart";

import { cloneDeep } from "lodash";

let store;

beforeEach(() => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  store = new Vuex.Store(cloneDeep(cart));
});
describe("unit test for cart module store", () => {
  const fakePizzaObj = {
    id: 7,
    imageUrl:
      "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/d48003cd-902c-420d-9f28-92d9dc5f73b4.jpg",
    name: "Маргарита",
    price: 450,
    size: 26,
    type: 0,
  };

  const fakePayLoad = {
    newPizzaObj: {
      "7": {
        items: [
          {
            id: 7,
            name: "Маргарита",
            imageUrl:
              "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/d48003cd-902c-420d-9f28-92d9dc5f73b4.jpg",
            price: 450,
            size: 26,
            type: 0,
          },
        ],
        totalPrice: 450,
        activeBtn: true,
        tags: { type: 0, size: 26 },
      },
    },
    allPizzasCount: [
      {
        id: 7,
        name: "Маргарита",
        imageUrl:
          "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/d48003cd-902c-420d-9f28-92d9dc5f73b4.jpg",
        price: 450,
        size: 26,
        type: 0,
      },
    ],
    allPizzas: [
      {
        items: [
          {
            id: 7,
            name: "Маргарита",
            imageUrl:
              "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/d48003cd-902c-420d-9f28-92d9dc5f73b4.jpg",
            price: 450,
            size: 26,
            type: 0,
          },
        ],
        totalPrice: 450,
        activeBtn: true,
        tags: { type: 0, size: 26 },
      },
    ],
    totalPrice: 450,
  };
  it("Check add pizza action addPizzaToCart", async () => {
    const state = store.state;
    await store.dispatch("addPizzaToCart", fakePizzaObj);

    expect(state.pizzaItems).toEqual(fakePayLoad.newPizzaObj);
    expect(state.pizzaItemsCount).toEqual(fakePayLoad.allPizzasCount.length);
    expect(state.totalPrice).toEqual(fakePayLoad.totalPrice);
    expect(state.BasketItems).toBe(true);
    expect(state.addPizzaCartError).toEqual(null);
  });
  describe("unit test from getters in cart module", () => {
    it("should getCartItem return to pizzaitems[id] or return null null", async () => {
      const id = 7;
      const id2 = 8;
      await store.dispatch("addPizzaToCart", fakePizzaObj);
      expect(store.getters.getCartItem(id)).toEqual(
        fakePayLoad.newPizzaObj[id]
      );
      expect(store.getters.getCartItem(id2)).toEqual(null);
    });

    it("should getCartItemType return to pizzaItems[id][type] if  pizzaItems[id] is true  or return null", async () => {
      const id = 7;
      const type = "items";
      const id2 = 8;

      await store.dispatch("addPizzaToCart", fakePizzaObj);
      expect(store.getters.getCartItemType(id, type)).toEqual(
        fakePayLoad.newPizzaObj[id][type]
      );
      expect(store.getters.getCartItemType(id2, type)).toEqual(null);
    });

    it("should getPizzaItem return to pizzaItems[key] going through Object.keys and map", async () => {
      await store.dispatch("addPizzaToCart", fakePizzaObj);
      expect(store.getters.getPizzaItem).toEqual([fakePayLoad.newPizzaObj[7]]);
    });

    it("should getBasketFlag return to false if store.state.totalPrice === 0 or return true", async () => {
      await store.dispatch("addPizzaToCart", fakePizzaObj);
      const state = store.state;

      expect(store.getters.getBasketFlag).toBe(true);

      state.totalPrice = 0;
      expect(store.getters.getBasketFlag).toBe(false);
    });
  });
});
