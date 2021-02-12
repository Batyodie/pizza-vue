import { createLocalVue, mount, shallowMount } from "@vue/test-utils";
// dropdwons componens files
import { Card } from "@/components";

import Vuex from "vuex";
import CardState from "@/store/modules/cart/cart";

const localVue = createLocalVue();

localVue.use(Vuex);
const createStore = () => new Vuex.Store(CardState);

describe("Unit tests for Card component", () => {
  let store = createStore();
  // fake props
  const cardTypeData = {
    cardItems: "items",
    activeBtn: "activeBtn"
  };
  const cardsTypeTags = ["тонкое", "традиционное"];
  const cardsSizesTags = [26, 30, 40];
  const card = {
    id: 7,
    imageUrl:
      "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/d48003cd-902c-420d-9f28-92d9dc5f73b4.jpg",
    name: "Маргарита",
    types: [0, 1],
    sizes: [26, 30, 40],
    price: 450,
    category: 4,
    rating: 10
  };
  const cardIndex = card.id;
  const tags = null;
  const activeType = tags === null ? card.types[0] : tags.type;
  const activeSize = tags === null ? card.sizes[0] : tags.size;

  const pizzaObj = {
    id: card.id,
    name: card.name,
    imageUrl: card.imageUrl,
    price: card.price,
    size: activeSize,
    type: activeType
  };
  const onClickAddPizza = jest.fn();
  onClickAddPizza.mockReturnValue(pizzaObj);

  // create wrapper factory
  const wrapperFactory = (mouning = shallowMount, { propsData } = {}) => {
    return mouning(Card, {
      localVue,
      store,
      propsData: {
        card,
        cardIndex,
        tags,
        onClickAddPizza,
        ...propsData
      }
    });
  };

  it("should initialize correctly card component", () => {
    const wrapper = wrapperFactory();
    // correctly Vue instance
    expect(wrapper.exists()).toBeTruthy();
    // We expect the wrapper to be the Card component
    expect(wrapper.is(Card)).toBeTruthy();
    //  We expect the wrapper props to equal the fake props
    expect(wrapper.vm.card).toEqual(card);
    expect(wrapper.vm.tags).toEqual(tags);
    expect(wrapper.vm.cardIndex).toEqual(cardIndex);
    expect(wrapper.vm.onClickAddPizza()).toEqual(pizzaObj);
    //  We expect the wrapper data() to equal the basis values
    expect(wrapper.vm.cardTypeData).toEqual(cardTypeData);
    expect(wrapper.vm.cardCount).toEqual(null);
    expect(wrapper.vm.activeBtnFlag).toEqual(false);
    expect(wrapper.vm.cardsTypeTags).toEqual(cardsTypeTags);
    expect(wrapper.vm.cardsSizesTags).toEqual(cardsSizesTags);
    expect(wrapper.vm.activeType).toEqual(card.types[0]);
    expect(wrapper.vm.activeSize).toEqual(card.sizes[0]);
    // add logo to data() component
  });
  describe("unit test render correctly Card component", () => {
    const wrapper = wrapperFactory();

    it("should render correctly Card title", () => {
      const renderTitle = `${card.name}`;
      const title = wrapper.find(".Card > .Title");
      // expecting title wrapper to exist
      expect(title.exists()).toBeTruthy();
      // expect the title to have a render title
      expect(title.text(renderTitle)).toBeTruthy();
      // expect the title selector to have text render title
      expect(title.text()).toContain(renderTitle);
    });

    it("should render correctly Card image", () => {
      const renderImage = `${card.imageUrl}`;
      const img = wrapper.find(".Image > img");

      // expecting img wrapper to exist
      expect(img.exists()).toBeTruthy();
      // expect the img wrapper to have atr src
      expect(img.attributes("src")).toBeTruthy();
      // expect the img wrapper to have render image in atr src
      expect(img.attributes("src")).toContain(renderImage);
    });
    it("should render correctly Card tags buttons", () => {
      const tags = wrapper.findAll(".Tags > .Tag");
      const tagsSize = i => `${cardsSizesTags[i]} см.`;
      const getTextTag = i => tags.at(i).text();

      // expect tags wapper to exist
      expect(tags.exists()).toBeTruthy();
      // expect tags wrapper to have 5 tags buttons
      expect(tags.length).toBe(5);
      // expect tag button to have specific text value
      expect(getTextTag(0)).toEqual(cardsTypeTags[0]);
      expect(getTextTag(1)).toEqual(cardsTypeTags[1]);
      expect(getTextTag(2)).toEqual(tagsSize(0));
      expect(getTextTag(3)).toEqual(tagsSize(1));
      expect(getTextTag(4)).toEqual(tagsSize(2));
    });

    it("the classes should change during the first render depending on the card data", () => {
      const newcard = {
        ...card,
        types: [1],
        sizes: [26, 40]
      };
      const wrapper = wrapperFactory(mount, {
        propsData: {
          card: newcard
        }
      });
      const tags = wrapper.findAll(".Tags > .Tag");
      const isTagClasses = (i, cssClass) => tags.at(i).classes(cssClass);
      // The active tag that is the first in the array is selected,
      // card.types[0] and card.sizes[0] .
      // If there is a TagsDisable class, then the tag cannot be active.

      // expect the 1 tag is disable
      expect(isTagClasses(0, "TagsItemActive")).toBe(false);
      expect(isTagClasses(0, "TagsDisable")).toBe(true);
      // expect the 2 tag is active
      expect(isTagClasses(1, "TagsItemActive")).toBe(true);
      expect(isTagClasses(1, "TagsDisable")).toBe(false);
      // expect the 3 tag is active because,
      // he is the first in the array card.sizes .
      expect(isTagClasses(2, "TagsItemActive")).toBe(true);
      expect(isTagClasses(2, "TagsDisable")).toBe(false);
      // expect 3 tag is disable
      expect(isTagClasses(3, "TagsItemActive")).toBe(false);
      expect(isTagClasses(3, "TagsDisable")).toBe(true);
      // expect 4 tag is not active but he is not disable
      expect(isTagClasses(4, "TagsItemActive")).toBe(false);
      expect(isTagClasses(4, "TagsDisable")).toBe(false);
    });

    it("should render correctly Card price", () => {
      const cardPrice = `от ${card.price} ₽`;
      const price = wrapper.find(".PizzaAdd > .PizzaPrice");

      // expect price wapper to exist
      expect(price.exists()).toBeTruthy();
      // expect the price wrapper to have a render cardPrice
      expect(price.text(cardPrice)).toBeTruthy();
      // expect the price wrapper to have the cardPrice text value
      expect(price.text()).toContain(cardPrice);
    });

    it("should render correctly Card add button", () => {
      const addBtn = wrapper.find(".PizzaAdd > .AddBtn");
      const addBtnBody = `${"Добавить"}`;

      // expect addBtn wapper to exist
      expect(addBtn.exists()).toBeTruthy();
      // expect the addBtn wrapper to have a render addBtnBody
      expect(addBtn.text(addBtnBody)).toBeTruthy();
      // expect the addBtn wrapper to have the addBtnBody text value
      expect(addBtn.text()).toContain(addBtnBody);
    });

    it("should match the snapshot Card component", () => {
      const wrapper = wrapperFactory(mount);
      expect(wrapper.html()).toMatchSnapshot();
    });
  });
  describe("unit test the func correctly Card component", () => {
    it("should handler click the tags buttons to have add active class", async () => {
      const newcard = {
        ...card,
        types: [1],
        sizes: [26, 40]
      };
      const wrapper = wrapperFactory(mount, {
        propsData: {
          card: newcard
        }
      });
      const tags = wrapper.findAll(".Tags > .Tag");
      const activeClass = "TagsItemActive";
      const isActiveTag = i => {
        const classes = tags.at(i).classes();
        return classes.includes("TagsDisable")
          ? undefined
          : tags.at(i).classes();
      };
      const getClickTag = async i => await tags.at(i).trigger("click");
      let tagPosition = 1; // type tag position [0, 1]
      let result = 1; // type tag  results [0, 1]

      // click to button tag
      await getClickTag(tagPosition);
      // expect that the button that was clicked has an active class
      expect(isActiveTag(tagPosition)).toContain(activeClass);
      expect(wrapper.vm.activeType).toEqual(result);

      tagPosition = 4; // size tag position [2, 3, 4]
      result = 40; // size tag results [26, 30, 40]
      await getClickTag(tagPosition);

      expect(isActiveTag(tagPosition)).toContain(activeClass);
      expect(wrapper.vm.activeSize).toEqual(result);
    });

    it("should correctly count pizza in card for add button to click", async () => {
      const wrapper = wrapperFactory(mount);
      const btn = wrapper.findAll(".AddBtn > .Body");
      const count = 1;
      await wrapper.setData({ cardCount: count });

      expect(wrapper.vm.cardCount).toEqual(count);
      expect(btn.at(0).html()).toContain("AmountNumber");
      expect(btn.at(0).html()).toEqual(`<span class="Body">
          Добавить
        <i class="AmountNumber">
              ${count}
            </i></span>`);
    });
  });
});
