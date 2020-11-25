import { createLocalVue, shallowMount } from "@vue/test-utils";
import Vuex from "vuex";
// dropdwons componens files
import DropDown from "@/components/Module/DropDown/DropDown.vue";
import DropDownState from "@/components/Module/DropDown/DropDownState.js";

const localVue = createLocalVue();
localVue.use(Vuex);
const createStore = () => new Vuex.Store(DropDownState);

describe("General testing DropDown component", () => {
  let store = createStore();
  const wrapper = shallowMount(DropDown, {
    store,
    localVue,
  });
  const btn = wrapper.find(".DropDownBtn");
  const PopUp = wrapper.find(".DropDownPopUp");
  const popUpListItem = wrapper.findAll(".DropDownItem");

  test("Testing render dropdown component", () => {
    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.html()).toBe(`<div class="DropDown">
  <div style="display: flex; align-items: center;"><img width="10" height="6" src="" alt="Arrow top"> <span class="DropDownLabel">Сортировка по:</span> <button class="DropDownBtn">
      популярности
    </button></div>
  <div class="DropDownPopUp" style="display: none;">
    <ul class="DropDownList">
      <li class="DropDownItemActive DropDownItem">
        популярности
      </li>
      <li class="DropDownItem">
        по цене
      </li>
      <li class="DropDownItem">
        по алфавиту
      </li>
    </ul>
  </div>
</div>`);
    expect(wrapper.isVisible()).toBe(true);
    expect(wrapper.classes("DropDown")).toBe(true);
  });

  test("Testing opened dropdown popUp", async () => {
    // Dropdown is closed default
    expect(store.state.DropDownIsOpen).toBe(false);

    await btn.trigger("click");
    expect(wrapper.element).toMatchSnapshot();
    expect(store.state.DropDownIsOpen).toBe(true);
    expect(PopUp.isVisible()).toBe(true);
  });

  test("Testing selected dropdown popUp item", async () => {
    // Open DropDown popUp
    store.state.DropDownIsOpen = true;
    expect(PopUp.isVisible()).toBe(true);
    expect(popUpListItem.isVisible()).toBe(true);

    // select all dropdown items
    popUpListItem.wrappers.forEach((e) => {
      // click dropdown item
      e.trigger("click");
      // label text in btn dropdown
      expect(wrapper.vm.getState.DropDownItemIsActive).toMatchSnapshot();
      // tests
      expect(store.state.DropDownItemIsActive).toContain(e.text());
      expect(store.state.DropDownLabel.innerText).toContain(e.text());
      expect(store.state.DropDownIsOpen).toBe(false);
    });
  });
});
