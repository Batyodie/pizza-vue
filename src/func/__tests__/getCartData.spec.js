import getCartData from "@/func/getCartData";

describe("unit test from func getCartData", () => {
  it("should correctly new pizza obj payLoad in getAllPayLoad()", () => {
    const fakeState = {
      pizzaItems: {}
    };
    const fakePizzaObj = {
      id: 7,
      imageUrl:
        "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/d48003cd-902c-420d-9f28-92d9dc5f73b4.jpg",
      name: "Маргарита",
      price: 450,
      size: 26,
      type: 0
    };
    const result = {
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
              type: 0
            }
          ],
          totalPrice: 450,
          activeBtn: true,
          tags: {
            type: 0,
            size: 26
          }
        }
      },
      allPizzasCount: [
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
              type: 0
            }
          ],
          totalPrice: 450,
          activeBtn: true,
          tags: {
            type: 0,
            size: 26
          }
        }
      ],
      totalPrice: 450
    };
    const func = getCartData(fakeState, fakePizzaObj);

    expect(func.getAllPayLoad).toEqual(result);
  });

  it("should correctly new pizza obj in getNewObj()", () => {
    const fakeState = {
      pizzaItems: {}
    };
    const fakePizzaObj = {
      id: 8,
      imageUrl:
        "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/ec29465e-606b-4a04-a03e-da3940d37e0e.jpg",
      name: "Четыре сезона",
      price: 395,
      size: 26,
      type: 0
    };
    const result = {
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

    const func = getCartData(fakeState, fakePizzaObj);

    expect(func.getAllPayLoad.newPizzaObj).toEqual(result);
  });

  it("should correctly return value array to use getAllPizzas()", () => {
    const fakePizzaObj = {
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
    const result = [
      {
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
    ];
    const func = getCartData();
    // expect this func return [].concat.apply([], obj.values(obj arg))
    expect(func.getAllPizzas(fakePizzaObj)).toEqual(result);
  });

  it("should correctly return value array after mapping to obj keys to use getTotalCount()", () => {
    const fakePizzaObj = {
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
        tags: {
          type: 0,
          size: 26
        }
      }
    };
    const result = [
      {
        id: 8,
        name: "Четыре сезона",
        imageUrl:
          "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/ec29465e-606b-4a04-a03e-da3940d37e0e.jpg",
        price: 395,
        size: 26,
        type: 0
      }
    ];
    const func = getCartData();
    // expect to getTotalCount return newObj to format obj[key].items and finish return call getAllPizzas(newObj)
    expect(func.getTotalCout(fakePizzaObj)).toEqual(result);
  });

  it("We expect that the getTotalPrice() function will return the correct value of the price sum from the array passed in the function argument. The array and the field type are used as arguments, by which the sum will be calculated via reduce() ", () => {
    const fakeArray = [
      {
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
    ];
    const result = 395;

    const func = getCartData();
    expect(func.getTotalPrice(fakeArray, "totalPrice")).toEqual(result);
  });
});
