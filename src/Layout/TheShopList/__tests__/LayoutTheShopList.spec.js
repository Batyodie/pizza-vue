import { createLocalVue, mount, shallowMount } from "@vue/test-utils";
import VueRouter from "vue-router";
import router from "@/router";
import Vuex from "vuex";
import VModal from "vue-js-modal";

import LayoutTheShopList from "@/Layout/TheShopList/LayoutTheShopList";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(
  VModal,
  { dialog: true },
  { componentName: "v-dialog-pay", dialog: true }
);
localVue.use(VueRouter);

describe("Unit test from LayoutTheShopList components", () => {
  // fake data
  const pizzaItems = [
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
      totalPrice: 900,
      activeBtn: true,
      tags: { type: 0, size: 26 },
    },
    {
      items: [
        {
          id: 8,
          name: "Четыре сезона",
          imageUrl:
            "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/ec29465e-606b-4a04-a03e-da3940d37e0e.jpg",
          price: 395,
          size: 26,
          type: 0,
        },
        {
          id: 8,
          name: "Четыре сезона",
          imageUrl:
            "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/ec29465e-606b-4a04-a03e-da3940d37e0e.jpg",
          price: 395,
          size: 26,
          type: 0,
        },
      ],
      totalPrice: 790,
      activeBtn: true,
      tags: { type: 0, size: 26 },
    },
  ];
  const totalPrice = 1690;
  const pizzaItemsCount = pizzaItems.length;

  let store;
  let actions;
  let getters;

  beforeEach(() => {
    actions = {
      removePizzaItems: jest.fn(),
      removePizzaItem: jest.fn(),
      plusCartItem: jest.fn(),
      minusCartItem: jest.fn(),
    };
    getters = {
      getCart: () => pizzaItems,
      getTotalPrice: () => totalPrice,
      getItemsCount: () => pizzaItemsCount,
      getPizzaItem: () => pizzaItems,
      getBasketFlag: () => (totalPrice === 0 ? false : true),
    };

    store = new Vuex.Store({
      actions,
      getters,
    });
  });

  // create wrapper factory
  const wrapperFactory = (mouning = shallowMount, { propsData } = {}) => {
    return mouning(LayoutTheShopList, {
      localVue,
      store,
      propsData: {
        ...propsData,
      },
      router,
    });
  };

  it("should initialize correctly layoutTheGrid component", () => {
    const wrapper = wrapperFactory(mount);

    // correctly Vue instance
    expect(wrapper.exists()).toBeTruthy();
    // We expect the wrapper to be layout the grid component
    expect(wrapper.is(LayoutTheShopList)).toBeTruthy();
  });

  it("should correctly first render  layoutTheGrid component", () => {
    const wrapper = wrapperFactory(mount);
    let index = 0;
    const shopCards = wrapper.findAll(".ShopCart");
    const renderTotalPrice = `Сумма заказа: ${totalPrice}`;
    const renderTotalCount = `Всего пицц: ${pizzaItemsCount}`;

    shopCards.wrappers.forEach((e, i) => {
      const dataURL = pizzaItems[index].items[index];
      const renderCardTitle = `${dataURL.name}`;
      const renderCardSubtitle = `${
        dataURL.type === 0 ? "тонкое" : "традиционное"
      } тесто, ${dataURL.size} см.`;

      const renderCardImg = dataURL.imageUrl;
      const renderCardPrice = `${pizzaItems[index].totalPrice} ₽`;

      if (index === i) {
        const elem = shopCards.at(index);

        expect(elem.find(".Title").text()).toEqual(renderCardTitle);
        expect(elem.find(".SubTitle").text()).toEqual(renderCardSubtitle);
        expect(
          elem.find(".ShopCart > picture > img").attributes("src")
        ).toEqual(renderCardImg);
        expect(elem.find(".TotalPrice").text()).toEqual(renderCardPrice);
        expect(elem.find(".Counter > span").text()).toBe(
          String(pizzaItems[index].items.length)
        );
      }
    });
    expect(wrapper.find(".FooterAllPizas").text()).toEqual(renderTotalCount);
    expect(wrapper.find(".FooterAllSum").text()).toEqual(renderTotalPrice);
  });

  it("should match the snapshot layoutTheGrid component", () => {
    const wrapper = wrapperFactory(mount);
    expect(wrapper.html()).toMatchSnapshot();
  });
  it("should correctly call action removePizzaItem in layoutTheGrid component", async () => {
    const wrapper = wrapperFactory(mount);
    const removeItemBtn = wrapper.findAll(".ResetBtn");
    await removeItemBtn.at(0).trigger("click");
    await wrapper
      .findAll(".vue-dialog-buttons > button")
      .at(1)
      .trigger("click");
    expect(actions.removePizzaItem).toHaveBeenCalled();
  });
  it("should correctly call action removePizzaItems in layoutTheGrid component", async () => {
    const wrapper = wrapperFactory(mount);
    const removeItemsBtn = wrapper.find(".HeaderBtn");
    await removeItemsBtn.trigger("click");
    await wrapper
      .findAll(".vue-dialog-buttons > button")
      .at(1)
      .trigger("click");
    expect(actions.removePizzaItems).toHaveBeenCalled();
  });
  it("should correctly call action plusCartItem in layoutTheGrid component", async () => {
    const wrapper = wrapperFactory(mount);
    const plusBtn = wrapper.findAll(".CounterBtn").at(1);
    await plusBtn.trigger("click");

    expect(actions.plusCartItem).toHaveBeenCalled();
  });
  it("should correctly call action minusCartItem in layoutTheGrid component", async () => {
    const wrapper = wrapperFactory(mount);
    const minusBtn = wrapper.findAll(".CounterBtn").at(0);
    await minusBtn.trigger("click");

    expect(actions.minusCartItem).toHaveBeenCalled();
  });
  it("should correctly call action pay pizzas in layoutTheGrid component", async () => {
    const wrapper = wrapperFactory(mount);
    const btnPay = wrapper.find(".FooterBtnPay");
    await btnPay.trigger("click");
    await wrapper
      .findAll(".vue-dialog-buttons > button")
      .at(0)
      .trigger("click");
    expect(actions.removePizzaItems).toHaveBeenCalled();
  });
});
