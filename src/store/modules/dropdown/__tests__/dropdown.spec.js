import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import dropdown from "@/store/modules/dropdown/dropdown";
import { cloneDeep } from "lodash";
let store;

beforeEach(() => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  store = new Vuex.Store(cloneDeep(dropdown));
});
describe("unit test for dropdown module store", () => {
  it("should correctly initialization DropDownItems", () => {
    const DropDownItems = [
      { id: 5, text: "популярности", type: "rating", order: "desc" },
      { id: 6, text: "по цене", type: "price", order: "desc" },
      { id: 7, text: "по алфавиту", type: "name", order: "asc" },
    ];
    expect(store.state.DropDownItems).toEqual(DropDownItems);
    expect(store.state.DropDownItemIsActive).toEqual(DropDownItems[0]);
  });
  it("should change the value DropDownIsOpen to call commit DropDownOpened", () => {
    expect(store.state.DropDownIsOpen).toBe(false);
    store.commit("DropDownOpened");
    expect(store.state.DropDownIsOpen).toBe(true);
  });

  it("should correctly DropDownItemIsActive change after calling commit DropDownSelected, to which the DropDownItem object is passed", () => {
    // fake data
    const newDropItem = {
      id: 7,
      text: "по алфавиту",
      type: "name",
      order: "asc",
    };
    const DropDownItemIsActive = {
      id: 5,
      text: "популярности",
      type: "rating",
      order: "desc",
    };
    // expected to DropDownItemIsActive to euaual fake data
    expect(store.state.DropDownItemIsActive).toEqual(DropDownItemIsActive);
    // call commit ещ transfer of an object dropitem
    store.commit("DropDownSelected", newDropItem);
    // expected dropdownIsActive to eual newDropItem
    expect(store.state.DropDownItemIsActive).toEqual(newDropItem);
  });
  it("should correctly close dropdown to use global action DropDownGlobalClose", () => {
    // check that dropdown is initially closed
    expect(store.state.DropDownIsOpen).toBe(false);
    // opened dropdown
    store.commit("DropDownOpened");
    // check that drodown is open
    expect(store.state.DropDownIsOpen).toBe(true);
    // call global action to close
    store.commit("DropDownGlobalClose");
    // expected to the DropDownIsOpen closed
    expect(store.state.DropDownIsOpen).toBe(false);
  });

  it("when DropDownOpened is called, the DropDownIsOpen flag is expected to change to true", () => {
    expect(store.state.DropDownIsOpen).toBe(false);

    store.dispatch("DropDownOpened");
    expect(store.state.DropDownIsOpen).toBe(true);
  });

  it("Waiting for the correct call of the action DropDownSelected when the item is passed to it", () => {
    const newDropItem = {
      id: 7,
      text: "по алфавиту",
      type: "name",
      order: "asc",
    };
    // call actions
    store.dispatch("DropDownSelected", newDropItem);
    // expected to eual fake item
    expect(store.state.DropDownItemIsActive).toEqual(newDropItem);
  });

  it("Waiting for a correct call to the action DropDownGlobalClosed, which will change the DropDownIsOpen flag to false", () => {
    // base flag value false
    expect(store.state.DropDownIsOpen).toBe(false);
    // open dropdown
    store.dispatch("DropDownOpened");
    expect(store.state.DropDownIsOpen).toBe(true);
    // call global close dropdown
    store.dispatch("DropDownGlobalClosed");
    expect(store.state.DropDownIsOpen).toBe(false);
  });
});
