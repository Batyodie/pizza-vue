export default {
  state: {
    DropDownIsOpen: false,
    DropDownItems: [
      { id: 5, text: "популярности", type: "rating", order: "desc" },
      { id: 6, text: "по цене", type: "price", order: "desc" },
      { id: 7, text: "по алфавиту", type: "name", order: "asc" }
    ],
    DropDownItemIsActive: {
      id: 5,
      text: "популярности",
      type: "rating",
      order: "desc"
    }
  },
  mutations: {
    DropDownOpened(state) {
      state.DropDownIsOpen = !state.DropDownIsOpen;
    },
    DropDownSelected(state, DropDownItem) {
      state.DropDownItemIsActive = DropDownItem;
      state.DropDownIsOpen = false;
    },
    DropDownGlobalClose(state) {
      state.DropDownIsOpen = false;
    }
  },
  actions: {
    DropDownOpened({ commit }) {
      commit("DropDownOpened");
    },
    DropDownGlobalClosed({ commit }) {
      commit("DropDownGlobalClose");
    },
    DropDownSelected({ commit }, DropDownItem) {
      commit("DropDownSelected", DropDownItem);
    }
  },
  getters: {
    getStateDropdown: ({
      DropDownIsOpen,
      DropDownItemIsActive,
      DropDownItems
    }) => {
      return { DropDownIsOpen, DropDownItemIsActive, DropDownItems };
    }
  }
};
