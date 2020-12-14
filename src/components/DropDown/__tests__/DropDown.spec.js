import { createLocalVue, shallowMount } from "@vue/test-utils";
import Vuex from "vuex";
// dropdwons componens files
import DropDown from "@/components/DropDown/DropDown.vue";
import DropDownState from "@/store/";

const localVue = createLocalVue();
localVue.use(Vuex);
const createStore = () => new Vuex.Store(DropDownState);

describe("General testing DropDown component", () => {
  let store = createStore();

  const wrapper = shallowMount(DropDown, {
    store,
    localVue
  });
  const btn = wrapper.find(".Btn");

  test("Testing render dropdown component", () => {
    expect(wrapper.isVisible()).toBe(true);
    expect(wrapper.classes("DropDown")).toBe(true);
  });

  test("Testing opened dropdown popUp", async () => {
    // Dropdown is closed default state
    expect(store.state.DropDownIsOpen).toBe(false);

    await btn.trigger("click");
    const PopUp = wrapper.find(".PopUp");
    const popUpListItem = wrapper.findAll(".Item");
    // console.log(PopUp);
    expect(store.state.DropDownIsOpen).toBe(true);
    expect(PopUp.isVisible()).toBe(true);
    expect(popUpListItem.isVisible()).toBe(true);
  });

  test("Testing selected dropdown popUp item", async () => {
    // Open DropDown popUp
    store.state.DropDownIsOpen = true;
    const PopUp = wrapper.find(".PopUp");
    const popUpListItem = wrapper.findAll(".Item");
    const DropDownItemIsActive = {
      text: "популярности",
      type: "rating",
      order: "desc"
    };

    expect(store.state.DropDownItemIsActive).toStrictEqual(
      DropDownItemIsActive
    );
    expect(PopUp.isVisible()).toBe(true);
    expect(popUpListItem.isVisible()).toBe(true);

    // select all dropdown items
    popUpListItem.wrappers.forEach(e => {
      // click dropdown item
      e.trigger("click");
      // label text in btn dropdown
      expect(store.state.DropDownItemIsActive.text).toContain(e.text());
      expect(store.state.DropDownIsOpen).toBe(false);
    });
  });
});
