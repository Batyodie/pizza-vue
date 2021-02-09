import { createLocalVue, mount, shallowMount } from "@vue/test-utils";
import Vuex from "vuex";
import VModal from "vue-js-modal";
import basket from "@/store/modules/cart/basket";

jest.mock("@/store/modules/cart/basket");

import { ShopCart } from "@/components";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(
  VModal,
  { dialog: true },
  { componentName: "v-dialog-pay", dialog: true }
);

describe("Unit tests for ShopCart component", () => {
  // fake props
  const shopCart = [
    {
      id: 7,
      name: "Маргарита",
      imageUrl:
        "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/d48003cd-902c-420d-9f28-92d9dc5f73b4.jpg",
      price: 450,
      size: 26,
      type: 0
    }
  ];

  const groupCartItems = [
    {
      id: 7,
      name: "Маргарита",
      imageUrl:
        "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/d48003cd-902c-420d-9f28-92d9dc5f73b4.jpg",
      price: 450,
      size: 26,
      type: 0
    }
  ];
  const groupCartItemsPrice = groupCartItems.reduce(
    (sum, obj) => obj.price + sum,
    0
  );
  const index = 0;

  let store;
  let actions;
  // let mutations;

  beforeEach(() => {
    actions = {
      plusCartItem: jest.fn(),
      minusCartItem: jest.fn(),
      removePizzaItem: jest.fn(),
      removePizzaItems: jest.fn()
    };
    store = new Vuex.Store({
      state: basket.state,
      getters: basket.getters,
      actions
      // mutations,
    });
  });

  // create wrapper factory
  const wrapperFactory = (mouning = shallowMount, { propsData } = {}) => {
    return mouning(ShopCart, {
      localVue,
      store,
      propsData: {
        shopCart,
        groupCartItems,
        groupCartItemsPrice,
        index,
        ...propsData
      }
    });
  };
  it("should initialize correctly shopcart component", () => {
    const wrapper = wrapperFactory();
    // correctly Vue instance
    expect(wrapper.exists()).toBeTruthy();
    // We expect the wrapper to be the shopcart component
    expect(wrapper.is(ShopCart)).toBeTruthy();
    //  We expect the wrapper props to equal the fake props
    expect(wrapper.vm.shopCart).toEqual(shopCart);
    expect(wrapper.vm.groupCartItems).toEqual(groupCartItems);
    expect(wrapper.vm.groupCartItemsPrice).toEqual(groupCartItemsPrice);
    expect(wrapper.vm.index).toEqual(index);
  });

  it("should correctly render shopcart component", () => {
    const wrapper = wrapperFactory(mount);
    const renderSubTitle = `тонкое тесто, ${shopCart[0].size} см.`;
    const renerTotalPrice = `${groupCartItemsPrice} ₽`;

    // expect the shopcart img pizza to have correctly render image url
    expect(wrapper.find("picture > img").attributes("src")).toEqual(
      shopCart[0].imageUrl
    );
    // expect the shopcart to have correctly render title text
    expect(wrapper.find(".Title").text()).toEqual(shopCart[0].name);
    // expect the shopcart to have correctly render sub-title text
    expect(wrapper.find(".SubTitle").text()).toEqual(renderSubTitle);
    // expect the shopcart to have correctly render count quantity to group pizzas
    expect(wrapper.find(".Counter > span").text()).toEqual(
      String(groupCartItems.length)
    );
    // expect the shopcart to have correctly render total price count
    expect(wrapper.find(".TotalPrice").text()).toEqual(renerTotalPrice);
  });

  it("should match the snapshot ShopCart component", () => {
    const wrapper = wrapperFactory();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should correctly call shopcart actions plusCart to use button in comp", async () => {
    const wrapper = wrapperFactory();
    // find plus button to add group pizza item
    const counterBtn = wrapper.findAll(".CounterBtn");
    // click plus button
    await counterBtn.at(1).trigger("click");
    // expect to actions plus cart items to be called
    expect(actions.plusCartItem).toHaveBeenCalled();
  });
  it("should coorectly call shopcart actions munusCart to use button in comp", async () => {
    const wrapper = wrapperFactory();
    // find minus button to add group pizza item
    const counterBtn = wrapper.findAll(".CounterBtn");
    // click plus button
    await counterBtn.at(0).trigger("click");
    // expect to actions minus cart items to be called
    expect(actions.minusCartItem).toHaveBeenCalled();
  });

  it("should coorectly call shopcart actions removePizzaItem to use button in comp", async () => {
    const wrapper = wrapperFactory(mount);
    // find reset group items button
    const counterBtn = wrapper.find(".ResetBtn");
    // click reset btn
    await counterBtn.trigger("click");
    // find modal window button to accept deleteted group pizza items
    const addToResetBtn = wrapper.findAll(".vue-dialog-button");
    // click to accept delete button
    await addToResetBtn.at(1).trigger("click");
    // expect to actions removePizzaItem to be called
    expect(actions.removePizzaItem).toHaveBeenCalled();
  });

  it("should coorectly call shopcart actions removePizzaItem to use button in comp", async () => {
    const wrapper = wrapperFactory(mount);
    // find reset group items button
    const counterBtn = wrapper.find(".ResetBtn");
    // click reset btn
    await counterBtn.trigger("click");
    // find modal window button to close deleteted group pizza items
    const addToResetBtn = wrapper.findAll(".vue-dialog-button");
    // click to close delete button
    await addToResetBtn.at(0).trigger("click");
    // expect to actions removePizzaItem to not have be called
    expect(actions.removePizzaItem).not.toHaveBeenCalled();
  });
});
