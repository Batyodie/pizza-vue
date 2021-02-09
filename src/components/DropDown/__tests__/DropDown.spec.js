import { createLocalVue, mount, shallowMount } from "@vue/test-utils";
import Vuex from "vuex";
import dropDown from "@/store/modules/dropdown/dropdown";
import product from "@/store/modules/product/products";
jest.mock("@/store/modules/product/products");
import { DropDown } from "@/components";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Unit tests for DropDown component", () => {
  // fake data
  // const DropDownIsOpen = false;
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

  beforeEach(() => {
    actions = {
      fetchProducts: product.actions.fetchProducts,
      DropDownOpened: dropDown.actions.DropDownOpened,
      DropDownGlobalClosed: dropDown.actions.DropDownGlobalClosed,
      DropDownSelected: dropDown.actions.DropDownSelected
    };
    store = new Vuex.Store({
      state: dropDown.state,
      actions,
      mutations: dropDown.mutations,
      getters: dropDown.getters
    });
  });

  // create wrapper factory
  const wrapperFactory = (mouning = shallowMount, { propsData } = {}) => {
    return mouning(DropDown, {
      localVue,
      store,
      propsData: {
        ...propsData
      }
    });
  };

  it("should initialize correctly dropdown component", () => {
    const wrapper = wrapperFactory();
    const icon = "/img/arrow-top.svg";

    wrapper.setData({ icon });
    // correctly Vue instance
    expect(wrapper.exists()).toBeTruthy();
    // We expect the wrapper to be the dropdown component
    expect(wrapper.is(DropDown)).toBeTruthy();
    expect(wrapper.vm.icon).toEqual(icon);
    // expect(wrapper.find(".IconImage").attributes("src")).toBe(icon);
  });

  it("should render correctly dropdown component", () => {
    const wrapper = wrapperFactory();
    const activeLable = DropDownItemIsActive.text;
    const renderLabel = `Сортировка по: 
        ${activeLable}`;

    const label = wrapper.find(".Btn");

    // expecting label wrapper to exist
    expect(label.exists()).toBeTruthy();
    // expect the label to have a activeLable
    expect(label.text(activeLable)).toBeTruthy();
    // expect the label selector to have activeLable
    expect(label.text()).toContain(activeLable);
    expect(wrapper.text()).toEqual(renderLabel);
  });

  it("should match the snapshot DropDown component", () => {
    const wrapper = wrapperFactory();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should correctly opened dropdown component", async () => {
    const wrapper = wrapperFactory(mount);
    const btn = wrapper.find(".Btn");
    // click label button
    await btn.trigger("click");

    const list = wrapper.find(".List");
    // expect the list is exists
    expect(list.exists()).toBe(true);
    // expect the list is visible
    expect(list.isVisible()).toBe(true);
  });

  it("should correctly render first opened dropdown to popup list items", () => {
    const wrapper = wrapperFactory(mount);
    const btn = wrapper.find(".Btn");
    // click label button
    btn.trigger("click");
    const items = wrapper.findAll(".Item");
    // expect the items at index to equal for DropDownItems
    expect(items.at(0).text()).toEqual(DropDownItems[0].text);
    // expect the first item to have active class
    expect(items.at(0).classes("ItemActive")).toBe(true);
    expect(items.at(1).text()).toEqual(DropDownItems[1].text);
    expect(items.at(2).text()).toEqual(DropDownItems[2].text);
  });

  it("should correctly selection dropdown item", async () => {
    const wrapper = wrapperFactory();
    const btn = wrapper.find(".Btn");
    const indexItem = 1;
    // click label button
    await btn.trigger("click");

    const items = wrapper.findAll(".Item");
    // expect the dropdown in open
    expect(store.state.DropDownIsOpen).toBe(true);
    // click to indexItem
    await items.at(indexItem).trigger("click");
    // expect the dropdown is close
    expect(store.state.DropDownIsOpen).toBe(false);
    // expect the label button text to eaual the dropdown items text
    expect(btn.text()).toEqual(DropDownItems[indexItem].text);
    // expect the actions to have be called
    expect(actions.fetchProducts).toHaveBeenCalled();
    // again click button
    await btn.trigger("click");
    // expect the indexItem to have active class
    expect(
      wrapper
        .findAll(".Item")
        .at(indexItem)
        .classes("ItemActive")
    ).toBe(true);
  });
});
