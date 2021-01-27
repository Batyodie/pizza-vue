import getter from "@/store/modules/cart/basket/";

describe("unit test from getter in index.js", () => {
  it("must return the object in which the number of objects in the pizza group and their total price are counted", () => {
    // fake pizzaItems
    const stateObj = {
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
    };
    //   result
    const result = { pizzaItemsCount: 1, totalPrice: 450 };
    //   getter func
    const cartStatsUpdate = getter.getters.getUpdateStatsCart();
    //   expect to result
    expect(cartStatsUpdate(stateObj)).toEqual(result);
  });
});
