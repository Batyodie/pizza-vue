import { createLocalVue, mount, shallowMount } from "@vue/test-utils";
import Vuex from "vuex";
import * as vMediaQuery from "v-media-query";
import LayoutTheBar from "@/Layout/TheBar/LayoutTheBar";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(vMediaQuery.default);

describe("Unit test from LayoutTheBar components", () => {
  window.matchMedia =
    window.matchMedia ||
    function() {
      return {
        matches: true,
        addListener: function() {},
        removeListener: function() {}
      };
    };
  // store data
  const tags = [
    { id: null, text: "Все", type: "all" },
    { id: 0, text: "Мясные", type: "meet" },
    { id: 1, text: "Вегетарианская", type: "vengry" },
    { id: 2, text: "Гриль", type: "grill" },
    { id: 3, text: "Острые", type: "sharp" },
    { id: 4, text: "Закрытые", type: "closed" }
  ];
  const activeTag = null;

  const DropDownIsOpen = false;
  const DropDownItems = [
    { id: 5, text: "популярности", type: "rating", order: "desc" },
    { id: 6, text: "по цене", type: "price", order: "desc" },
    { id: 7, text: "по алфавиту", type: "name", order: "asc" }
  ];
  const DropDownItemIsActive = {
    text: "популярности",
    type: "rating",
    order: "desc"
  };
  let store;
  let actions;
  let getters;
  beforeEach(() => {
    actions = {
      TheBarSelectedTag: jest.fn(),
      fetchProducts: jest.fn(),
      DropDownGlobalClosed: jest.fn(),
      DropDownOpened: jest.fn(),
      DropDownSelected: jest.fn()
    };
    getters = {
      getTags: () => tags,
      getIsActiveTag: () => activeTag,
      getStateDropdown: () => {
        return {
          DropDownIsOpen,
          DropDownItems,
          DropDownItemIsActive
        };
      }
    };

    store = new Vuex.Store({
      actions,
      getters
    });
  });
  // create wrapper factory
  const wrapperFactory = (mouning = shallowMount, { propsData } = {}) => {
    return mouning(LayoutTheBar, {
      localVue,
      store,
      propsData: {
        ...propsData
      }
    });
  };
  it("should initialize correctly layout the bar component", () => {
    const wrapper = wrapperFactory(mount);

    // correctly Vue instance
    expect(wrapper.exists()).toBeTruthy();
    // We expect the wrapper to be layout the bar component
    expect(wrapper.is(LayoutTheBar)).toBeTruthy();
    expect(wrapper.vm.DropDownTagsIsOpen).toBe(false);
  });

  it("should correctly render tags in layout the bar component", () => {
    const wrapper = wrapperFactory(mount);
    let index = 0;
    const listTags = wrapper.findAll(".Tag");

    listTags.wrappers.forEach((e, i) => {
      const renderTag = `${tags[index].text}`;
      if (index === i) {
        expect(listTags.at(index).text()).toEqual(renderTag);
        index++;
      }
    });
    expect(listTags.at(0).classes("IsSelected")).toBe(true);
  });

  it("should correctly render dropdown  in layout the bar", () => {
    const wrapper = wrapperFactory(mount);
    const DropDown = wrapper.find(".DropDown");
    let index = 0;
    const renderLabel = `Сортировка по: 
        ${DropDownItems[index].text}`;

    expect(DropDown.text()).toEqual(renderLabel);
  });

  it("should match the snapshot layout the bar component", () => {
    const wrapper = wrapperFactory(mount);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should correctly selection tag in layout the bar component", async () => {
    const wrapper = wrapperFactory(mount);
    let index = 1;
    const listTags = wrapper.findAll(".Tag").at(index);

    await listTags.trigger("click");
    expect(actions.TheBarSelectedTag).toHaveBeenCalled();
    expect(actions.fetchProducts).toHaveBeenCalled();
  });

  it("should correctly open dropdown in layout the bar", async () => {
    const wrapper = wrapperFactory(mount);

    const DropDown = wrapper.find(".DropDown");
    const DropDownBtn = DropDown.find(".Btn");

    await DropDownBtn.trigger("click");

    expect(actions.DropDownOpened).toHaveBeenCalled();
  });
});
