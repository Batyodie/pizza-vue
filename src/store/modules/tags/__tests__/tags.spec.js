import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import tags from "@/store/modules/tags/tags";
import { cloneDeep } from "lodash";

let store;

beforeEach(() => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  store = new Vuex.Store(cloneDeep(tags));
});

describe("unit test for tags module store", () => {
  it("change the value isActiveTag after selecting another tag", () => {
    const tagID = 0;
    expect(store.state.isActiveTag).toBe(null);
    store.commit("changesActiveTag", tagID);
    expect(store.state.isActiveTag).toEqual(tagID);
  });
  it("should correctly call action TheBarSelectedTag", () => {
    const tagID = 1;
    expect(store.state.isActiveTag).toBe(null);
    store.dispatch("TheBarSelectedTag", tagID);
    expect(store.state.isActiveTag).toEqual(tagID);
  });
});
