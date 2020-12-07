export default {
  state: {
    DropDownIsOpen: false,
    DropDownItems: [
      { id: 5, text: "популярности", type: "rating", order: "desc" },
      { id: 6, text: "по цене", type: "price", order: "desc" },
      { id: 7, text: "по алфавиту", type: "name", order: "asc" },
    ],
    DropDownItemIsActive: {
      text: "популярности",
      type: "rating",
      order: "desc",
    },
  },
  mutations: {
    DropDownOpened(state, label) {
      state.DropDownIsOpen = !state.DropDownIsOpen;
      state.DropDownLabel = label.target;
    },
    DropDownSelected(state, DropDownItem) {
      state.DropDownItemIsActive.text = DropDownItem.text;
      state.DropDownItemIsActive.type = DropDownItem.type;
      state.DropDownItemIsActive.order = DropDownItem.order;
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
    DropDownSelected({ commit }, DropDownItem) {
      commit("DropDownSelected", DropDownItem);
    },
  },
  getters: {
    getStateDropdown: ({
      DropDownIsOpen,
      DropDownItemIsActive,
      DropDownItems,
    }) => {
      return { DropDownIsOpen, DropDownItemIsActive, DropDownItems };
    },
  },
};
