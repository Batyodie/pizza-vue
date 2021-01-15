import { createLocalVue, mount, shallowMount } from "@vue/test-utils";
import Vuex from "vuex";

import LayoutTheGrid from "@/Layout/TheGrid/LayoutTheGrid";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Unit test from LayoutTheGrid components", () => {
  // fake data
  const products = [
    {
      id: 7,
      imageUrl:
        "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/d48003cd-902c-420d-9f28-92d9dc5f73b4.jpg",
      name: "Маргарита",
      types: [0, 1],
      sizes: [26, 30],
      price: 450,
      category: 4,
      rating: 10,
    },
    {
      id: 8,
      imageUrl:
        "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/ec29465e-606b-4a04-a03e-da3940d37e0e.jpg",
      name: "Четыре сезона",
      types: [0],
      sizes: [26, 40],
      price: 395,
      category: 5,
      rating: 10,
    },
    {
      id: 6,
      imageUrl:
        "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/d2e337e9-e07a-4199-9cc1-501cc44cb8f8.jpg",
      name: "Пепперони",
      types: [1],
      sizes: [30, 40],
      price: 675,
      category: 1,
      rating: 9,
    },
  ];
  const loadedProducts = true;

  let store;
  let actions;
  let getters;
  beforeEach(() => {
    actions = {
      addPizzaToCart: jest.fn(),
    };
    getters = {
      getCards: () => products,
      getPizzasLoadedFlag: () => loadedProducts,
      getCartItem: () => () => null,
      getCartItemType: () => () => null,
    };

    store = new Vuex.Store({
      actions,
      getters,
    });
  });
  // create wrapper factory
  const wrapperFactory = (mouning = shallowMount, { propsData } = {}) => {
    return mouning(LayoutTheGrid, {
      localVue,
      store,
      propsData: {
        ...propsData,
      },
    });
  };
  it("should initialize correctly layoutTheGrid component", () => {
    const wrapper = wrapperFactory(mount);
    const cards = wrapper.findAll(".Card");

    // correctly Vue instance
    expect(wrapper.exists()).toBeTruthy();
    // We expect the wrapper to be layout the grid component
    expect(wrapper.is(LayoutTheGrid)).toBeTruthy();
    expect(cards.length).toBe(3);
  });
  it("should correctly render cards in  layoutTheGrid component", () => {
    const wrapper = wrapperFactory(mount);
    let index = 0;
    const cards = wrapper.findAll(".Card");

    cards.wrappers.forEach((e, i) => {
      const renderCardTitle = `${products[index].name}`;
      const renderCardImg = products[index].imageUrl;
      const renderCardPrice = `от ${products[index].price} ₽`;

      if (index === i) {
        const element = cards.at(index);
        expect(element.find(".Title").text()).toEqual(renderCardTitle);
        expect(element.find(".Image > img").attributes("src")).toEqual(
          renderCardImg
        );
        expect(element.find(".PizzaPrice").text()).toEqual(renderCardPrice);
        expect(
          element
            .findAll(".TagsItem")
            .at(products[index].types[0])
            .classes("TagsItemActive")
        ).toEqual(true);
        index++;
      }
    });
    const cardSize = (cardIndex, tagIndex) =>
      cards
        .at(cardIndex)
        .findAll(".TagsItem")
        .at(tagIndex);

    expect(cardSize(0, 2).classes("TagsItemActive")).toBe(true);
    expect(cardSize(1, 2).classes("TagsItemActive")).toBe(true);
    expect(cardSize(2, 2).classes("TagsItemActive")).toBe(false);
  });

  it("should match the snapshot layoutTheGrid component", () => {
    const wrapper = wrapperFactory(mount);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should correctly add pizza item to card", async () => {
    const wrapper = wrapperFactory(mount);
    const card = wrapper.findAll(".Card");
    const addBtn = card.at(0).find(".AddBtn");

    await addBtn.trigger("click");
    expect(actions.addPizzaToCart).toHaveBeenCalled();
  });
});
