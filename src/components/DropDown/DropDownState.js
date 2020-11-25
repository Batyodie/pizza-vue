export default {
  state: {
    DropDownIsOpen: false,
    DropDownItemIsActive: "популярности",
    DropDownLabel: null,
    DropDownItems: [
      { id: 1, text: "популярности" },
      { id: 2, text: "по цене" },
      { id: 3, text: "по алфавиту" },
    ],
  },
  mutations: {
    DropDownOpened(state, label) {
      state.DropDownIsOpen = !state.DropDownIsOpen;
      state.DropDownLabel = label.target;
    },
    DropDownSelected(state, DropDownItem) {
      state.DropDownItemIsActive = DropDownItem.text;
      state.DropDownLabel.innerText = DropDownItem.text;
      state.DropDownIsOpen = false;
    },
    DropDownGlobalClose(state) {
      state.DropDownIsOpen = false;
    },
  },
  actions: {
    DropDownOpened(ctx, label) {
      ctx.commit("DropDownOpened", label);
    },
    DropDownGlobalClosed(ctx) {
      ctx.commit("DropDownGlobalClose");
    },
    DropDownSelected(ctx, DropDownItem) {
      ctx.commit("DropDownSelected", DropDownItem);
    },
  },
  getters: {
    getStateDropdown: (state) => {
      return state;
    },
  },
};
