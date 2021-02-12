import action from "@/store/modules/cart/basket/action";
// import getter from "@/store/modules/cart/basket/";

describe("unit test from actions basket module", () => {
  it("should remove all pizzas items to use remove pizzaIttems action, into which cart was passed", () => {
    const rootState = {
      cart: {
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
      }
    };

    const commit = jest.fn();
    action.actions.removePizzaItems({ commit, rootState });

    expect(commit).toHaveBeenCalledWith("CLEAR_PIZZA_ITEMS", rootState.cart);
  });

  it("handling the CLEAR_PIZZA_ITEMS_ERROR error", () => {
    const error = `An error occured while deleting all items in the cart: TypeError: Cannot read property 'cart' of undefined`;
    const commit = jest.fn();
    action.actions.removePizzaItems({ commit }, {});
    expect(commit).toHaveBeenCalledWith("CLEAR_PIZZA_ITEMS_ERROR", error);
  });

  it("should remove pizza item to use removePizzaItem action, into which deletItemID was passed", () => {
    const deleteItemID = 7;
    const rootState = {
      cart: {
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
      }
    };
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
      // the numbers are such, because in the mutation we subtract rootState from these numbers and get the final result
      totalPrice: 900,
      pizzaItemsCount: 2,
      addPizzaCartError: null,
      BasketItems: true
    };

    const commit = jest.fn();
    action.actions.removePizzaItem({ commit, rootState }, deleteItemID);
    expect(commit).toHaveBeenCalledWith("CLEAR_PIZZA_ITEM", {
      rootState: rootState.cart,
      updateCart
    });
  });

  it("handling the CLEAR_PIZZA_ITEM_ERROR error", () => {
    const error = `An error occurred while deleting an item in the cart: TypeError: Cannot read property 'cart' of undefined`;
    const commit = jest.fn();

    action.actions.removePizzaItem({ commit }, {});
    expect(commit).toHaveBeenCalledWith("CLEAR_PIZZA_ITEM_ERROR", error);
  });

  it("waiting for a new pizza item to be plus to the pizza group, the item takes from the end of this pizza group", () => {
    const rootState = {
      cart: {
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
      }
    };
    const payLoad = {
      ID: 8
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
          },
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
        totalPrice: 790,
        activeBtn: true,
        tags: { type: 0, size: 26 }
      }
    };

    const commit = jest.fn();
    const getters = {
      getUpdateStatsCart: jest.fn(() => {
        return {
          pizzaItemsCount: 4,
          totalPrice: 1690
        };
      })
    };
    const cartStatsUpdate = getters.getUpdateStatsCart();

    action.actions.plusCartItem({ commit, rootState, getters }, payLoad);
    expect(commit).toHaveBeenCalledWith("PLUS_CART_ITEM", {
      rootState: rootState.cart,
      addItem,
      cartStatsUpdate
    });
  });

  it("handling the PLUS_PIZZA_CART_ITEM_ERROR error", () => {
    const error = `an error occurred while plus pizza item: TypeError: Cannot read property 'items' of undefined`;
    const commit = jest.fn();
    const rootState = {
      cart: {
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
      }
    };
    const getters = {
      getUpdateStatsCart: jest.fn(() => {
        return {
          pizzaItemsCount: 4,
          totalPrice: 1690
        };
      })
    };

    action.actions.plusCartItem({ commit, rootState, getters }, {});
    expect(commit).toHaveBeenCalledWith("PLUS_PIZZA_CART_ITEM_ERROR", error);
  });

  it("waiting for a pizza item to be minus to the pizza group", () => {
    const rootState = {
      cart: {
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
      }
    };
    const commit = jest.fn();
    const getters = {
      getUpdateStatsCart: jest.fn(() => {
        return { pizzaItemsCount: 2, totalPrice: 845 };
      })
    };
    const cartStatsUpdate = getters.getUpdateStatsCart();
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
    const payLoad = {
      ID: 7
    };

    action.actions.minusCartItem({ commit, rootState, getters }, payLoad);

    expect(commit).toHaveBeenCalledWith("MINUS_CART_ITEM", {
      rootState: rootState.cart,
      removeItem,
      cartStatsUpdate
    });
  });

  it("handling the PLUS_PIZZA_CART_ITEM_ERROR error", () => {
    const error = `an error occurred while minus pizza item: TypeError: Cannot read property 'items' of undefined`;
    const commit = jest.fn();
    const rootState = {
      cart: {
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
      }
    };
    const getters = {
      getUpdateStatsCart: jest.fn(() => {
        return { pizzaItemsCount: 2, totalPrice: 845 };
      })
    };

    action.actions.minusCartItem({ commit, rootState, getters }, {});
    expect(commit).toHaveBeenCalledWith("MINUS_CART_ITEM_ERROR", error);
  });
});
