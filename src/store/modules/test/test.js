import { getProducts, getProduct } from "@/api/products.api";
export default {
  state: {
    product: {},
    products: {},
    productError: null,
    isActiveTag: 0,
    DropDownItemIsActive: {
      order: 500,
    },
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
    setProduct(state, product) {
      state.product = product;
    },
    setProductError(state, error) {
      state.productError = error;
    },
  },
  actions: {
    async fetchProducts({ commit }) {
      try {
        const products = await getProducts();

        commit("setProducts", products);
      } catch (err) {
        commit("setProductError", err);
      }
    },
    async fetchProduct({ commit, state }, id) {
      try {
        const product = await getProduct(id, state.DropDownItemIsActive);
        console.log(product);
        console.log(state.isActiveTag);
        commit("setProduct", product);
      } catch (err) {
        commit("setProductError", err);
      }
    },
  },
  getters: {
    product: ({ product }) => product,
    products: ({ products }) => products,
    productError: ({ productError }) => productError,
  },
};
