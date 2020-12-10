import getCartData from "@/func/getCartData";
import actions from "./action";
import mutations from "./mutation";
const getCartMethod = getCartData();
export default {
  state: {
    itemsError: null,
    itemError: null,
    plusItemError: null,
    minusItemError: null
  },
  getters: {
    getUpdateStatsCart: () => {
      return stateObj => {
        const pizzaObjData = getCartMethod.getTotalCout(stateObj);
        return {
          pizzaItemsCount: pizzaObjData.length,
          totalPrice: getCartMethod.getTotalPrice(pizzaObjData, "price")
        };
      };
    }
  },
  modules: {
    mutations,
    actions
  }
};
