import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import products from "@/store/modules/product/products";
// jest.mock("@/api/products.api");
import { getProducts } from "@/api/products.api";
import mockProducts from "public/db.json";

jest.mock("@/api/products.api", () => ({
  getProducts: jest.fn(() => Promise.resolve({ data: mockProducts.pizzas })),
}));

import { cloneDeep } from "lodash";

let store;

beforeEach(() => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  store = new Vuex.Store(cloneDeep(products));
});

describe("unit test for products module store", () => {
  it("loads products and updates them in state", async () => {
    const products = await getProducts();
    expect(store.state.products).toEqual([]);
    expect(store.state.loadedProducts).toBe(false);
    store.commit("SET_PRODUCTS", products);
    expect(store.state.products).toEqual(products);
    store.commit("SET_LOADED");
    expect(store.state.loadedProducts).toBe(true);
  });
});
