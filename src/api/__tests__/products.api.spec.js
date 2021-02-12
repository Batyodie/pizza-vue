import { getProducts } from "@/api/products.api";

describe("unit test from products.api.js", () => {
  it("should corretly return response data which will have pizzas filtered and sorted by values ​​that we pass to the getProducts function", async () => {
    const fakeTagCategoryID = 1;
    const fakeDropDownActive = {
      id: 6,
      text: "по цене",
      type: "price",
      order: "desc"
    };
    const result = [
      {
        id: 6,
        imageUrl:
          "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/d2e337e9-e07a-4199-9cc1-501cc44cb8f8.jpg",
        name: "Пепперони",
        types: [0, 1],
        sizes: [26, 30, 40],
        price: 675,
        category: 1,
        rating: 9
      },
      {
        id: 2,
        imageUrl:
          "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/6652fec1-04df-49d8-8744-232f1032c44b.jpg",
        name: "Цыпленок барбекю",
        types: [0],
        sizes: [26, 40],
        price: 295,
        category: 1,
        rating: 4
      },
      {
        id: 1,
        imageUrl:
          "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/2ffc31bb-132c-4c99-b894-53f7107a1441.jpg",
        name: "Сырная",
        types: [0],
        sizes: [26, 40],
        price: 245,
        category: 1,
        rating: 6
      }
    ];
    const fakeRequest = await getProducts(
      fakeTagCategoryID,
      fakeDropDownActive
    );
    expect(fakeRequest).toEqual(result);
  });
});
