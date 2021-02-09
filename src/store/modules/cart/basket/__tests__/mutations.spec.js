import mutation from "@/store/modules/cart/basket/mutation";
import {
  CLEAR_PIZZA_ITEMS,
  CLEAR_PIZZA_ITEM,
  PLUS_CART_ITEM,
  MINUS_CART_ITEM
} from "../../../../mutation-types";
describe("unit test from mutations basket module", () => {
  //  this is a mutation stub, it will inject to the local state in the module basket inside cart.js
  const stub = null;
  it("should all clear state to use mutation CLEAR_PIZZA_ITEMS", () => {
    const state = {
      pizzaItems: {
        "7": {
          items: [
            {
              id: 7,
              name: "Маргарита",
              imageUrl:
                "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/d48003cd-902c-420d-9f28-92d9dc5f73b4.jpg",
              price: 450,
              size: 26,
              type: 0
            }
          ],
          totalPrice: 450,
          activeBtn: true,
          tags: { type: 0, size: 26 }
        },
        "8": {
          items: [
            {
              id: 8,
              name: "Четыре сезона",
              imageUrl:
                "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/ec29465e-606b-4a04-a03e-da3940d37e0e.jpg",
              price: 395,
              size: 26,
              type: 0
            }
          ],
          totalPrice: 395,
          activeBtn: true,
          tags: { type: 0, size: 26 }
        }
      },
      totalPrice: 845,
      pizzaItemsCount: 2,
      addPizzaCartError: null
    };
    const result = {
      pizzaItems: {},
      pizzaItemsCount: 0,
      totalPrice: 0,
      BasketItems: false,
      addPizzaCartError: null
    };
    mutation.mutations[CLEAR_PIZZA_ITEMS](stub, state);
    expect(state).toEqual(result);
  });

  it("Receives the rootState of cart.js draft and update function as payload and should update pizzaItems, pizzaItemsCount and totalPrice", () => {
    const state = {
      pizzaItems: {
        "7": {
          items: [
            {
              id: 7,
              name: "Маргарита",
              imageUrl:
                "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/d48003cd-902c-420d-9f28-92d9dc5f73b4.jpg",
              price: 450,
              size: 26,
              type: 0
            }
          ],
          totalPrice: 450,
          activeBtn: true,
          tags: { type: 0, size: 26 }
        },
        "8": {
          items: [
            {
              id: 8,
              name: "Четыре сезона",
              imageUrl:
                "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/ec29465e-606b-4a04-a03e-da3940d37e0e.jpg",
              price: 395,
              size: 26,
              type: 0
            }
          ],
          totalPrice: 395,
          activeBtn: true,
          tags: { type: 0, size: 26 }
        }
      },
      totalPrice: 845,
      pizzaItemsCount: 2,
      addPizzaCartError: null,
      BasketItems: true
    };
    // delete pizzaItems item id 7
    const updateCart = {
      pizzaItems: {
        "8": {
          items: [
            {
              id: 8,
              name: "Четыре сезона",
              imageUrl:
                "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/ec29465e-606b-4a04-a03e-da3940d37e0e.jpg",
              price: 395,
              size: 26,
              type: 0
            }
          ],
          totalPrice: 395,
          activeBtn: true,
          tags: { type: 0, size: 26 }
        }
      },
      totalPrice: 450,
      pizzaItemsCount: 1,
      addPizzaCartError: null,
      BasketItems: true
    };
    const result = {
      pizzaItems: {
        "8": {
          items: [
            {
              id: 8,
              name: "Четыре сезона",
              imageUrl:
                "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/ec29465e-606b-4a04-a03e-da3940d37e0e.jpg",
              price: 395,
              size: 26,
              type: 0
            }
          ],
          totalPrice: 395,
          activeBtn: true,
          tags: { type: 0, size: 26 }
        }
      },
      totalPrice: 395,
      pizzaItemsCount: 1,
      addPizzaCartError: null,
      BasketItems: true
    };
    //  call mutation
    mutation.mutations[CLEAR_PIZZA_ITEM](stub, {
      rootState: state,
      updateCart
    });
    expect(state).toEqual(result);
  });

  it("Receives the rootState of the draft and plus basket item objects of cart.js as the payload and should update plus pizzaItems, pizzaItemsCount and totalPrice.", () => {
    const state = {
      pizzaItems: {
        "7": {
          items: [
            {
              id: 7,
              name: "Маргарита",
              imageUrl:
                "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/d48003cd-902c-420d-9f28-92d9dc5f73b4.jpg",
              price: 450,
              size: 26,
              type: 0
            }
          ],
          totalPrice: 450,
          activeBtn: true,
          tags: { type: 0, size: 26 }
        },
        "8": {
          items: [
            {
              id: 8,
              name: "Четыре сезона",
              imageUrl:
                "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/ec29465e-606b-4a04-a03e-da3940d37e0e.jpg",
              price: 395,
              size: 26,
              type: 0
            }
          ],
          totalPrice: 395,
          activeBtn: true,
          tags: { type: 0, size: 26 }
        }
      },
      totalPrice: 845,
      pizzaItemsCount: 2,
      addPizzaCartError: null,
      BasketItems: true
    };
    const addItem = {
      "7": {
        items: [
          {
            id: 7,
            name: "Маргарита",
            imageUrl:
              "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/d48003cd-902c-420d-9f28-92d9dc5f73b4.jpg",
            price: 450,
            size: 26,
            type: 0
          },
          {
            id: 7,
            name: "Маргарита",
            imageUrl:
              "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/d48003cd-902c-420d-9f28-92d9dc5f73b4.jpg",
            price: 450,
            size: 26,
            type: 0
          }
        ],
        totalPrice: 900,
        activeBtn: true,
        tags: { type: 0, size: 26 }
      },
      "8": {
        items: [
          {
            id: 8,
            name: "Четыре сезона",
            imageUrl:
              "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/ec29465e-606b-4a04-a03e-da3940d37e0e.jpg",
            price: 395,
            size: 26,
            type: 0
          }
        ],
        totalPrice: 395,
        activeBtn: true,
        tags: { type: 0, size: 26 }
      }
    };
    const cartStatsUpdate = { pizzaItemsCount: 3, totalPrice: 1295 };
    const result = {
      pizzaItems: {
        "7": {
          items: [
            {
              id: 7,
              name: "Маргарита",
              imageUrl:
                "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/d48003cd-902c-420d-9f28-92d9dc5f73b4.jpg",
              price: 450,
              size: 26,
              type: 0
            },
            {
              id: 7,
              name: "Маргарита",
              imageUrl:
                "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/d48003cd-902c-420d-9f28-92d9dc5f73b4.jpg",
              price: 450,
              size: 26,
              type: 0
            }
          ],
          totalPrice: 900,
          activeBtn: true,
          tags: { type: 0, size: 26 }
        },
        "8": {
          items: [
            {
              id: 8,
              name: "Четыре сезона",
              imageUrl:
                "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/ec29465e-606b-4a04-a03e-da3940d37e0e.jpg",
              price: 395,
              size: 26,
              type: 0
            }
          ],
          totalPrice: 395,
          activeBtn: true,
          tags: { type: 0, size: 26 }
        }
      },
      totalPrice: 1295,
      pizzaItemsCount: 3,
      addPizzaCartError: null,
      BasketItems: true
    };

    mutation.mutations[PLUS_CART_ITEM](stub, {
      rootState: state,
      addItem,
      cartStatsUpdate
    });
    expect(state).toEqual(result);
  });

  it("Receives the rootState of the draft and minus basket item objects of cart.js as the payload and should update minus pizzaItems, pizzaItemsCount and totalPrice.", () => {
    const state = {
      pizzaItems: {
        "7": {
          items: [
            {
              id: 7,
              name: "Маргарита",
              imageUrl:
                "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/d48003cd-902c-420d-9f28-92d9dc5f73b4.jpg",
              price: 450,
              size: 26,
              type: 0
            },
            {
              id: 7,
              name: "Маргарита",
              imageUrl:
                "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/d48003cd-902c-420d-9f28-92d9dc5f73b4.jpg",
              price: 450,
              size: 26,
              type: 0
            }
          ],
          totalPrice: 900,
          activeBtn: true,
          tags: { type: 0, size: 26 }
        },
        "8": {
          items: [
            {
              id: 8,
              name: "Четыре сезона",
              imageUrl:
                "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/ec29465e-606b-4a04-a03e-da3940d37e0e.jpg",
              price: 395,
              size: 26,
              type: 0
            }
          ],
          totalPrice: 395,
          activeBtn: true,
          tags: { type: 0, size: 26 }
        }
      },
      totalPrice: 1295,
      pizzaItemsCount: 3,
      addPizzaCartError: null,
      BasketItems: true
    };
    const removeItem = {
      "7": {
        items: [
          {
            id: 7,
            name: "Маргарита",
            imageUrl:
              "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/d48003cd-902c-420d-9f28-92d9dc5f73b4.jpg",
            price: 450,
            size: 26,
            type: 0
          }
        ],
        totalPrice: 450,
        activeBtn: true,
        tags: { type: 0, size: 26 }
      },
      "8": {
        items: [
          {
            id: 8,
            name: "Четыре сезона",
            imageUrl:
              "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/ec29465e-606b-4a04-a03e-da3940d37e0e.jpg",
            price: 395,
            size: 26,
            type: 0
          }
        ],
        totalPrice: 395,
        activeBtn: true,
        tags: { type: 0, size: 26 }
      }
    };
    const result = {
      pizzaItems: {
        "7": {
          items: [
            {
              id: 7,
              name: "Маргарита",
              imageUrl:
                "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/d48003cd-902c-420d-9f28-92d9dc5f73b4.jpg",
              price: 450,
              size: 26,
              type: 0
            }
          ],
          totalPrice: 450,
          activeBtn: true,
          tags: { type: 0, size: 26 }
        },
        "8": {
          items: [
            {
              id: 8,
              name: "Четыре сезона",
              imageUrl:
                "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/ec29465e-606b-4a04-a03e-da3940d37e0e.jpg",
              price: 395,
              size: 26,
              type: 0
            }
          ],
          totalPrice: 395,
          activeBtn: true,
          tags: { type: 0, size: 26 }
        }
      },
      totalPrice: 845,
      pizzaItemsCount: 2,
      addPizzaCartError: null,
      BasketItems: true
    };
    const cartStatsUpdate = { pizzaItemsCount: 2, totalPrice: 845 };
    mutation.mutations[MINUS_CART_ITEM](stub, {
      rootState: state,
      removeItem,
      cartStatsUpdate
    });
    expect(state).toEqual(result);
  });
});
