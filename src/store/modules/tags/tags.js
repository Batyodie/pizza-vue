export default {
  state: {
    tags: [
      { id: null, text: "Все", type: "all" },
      { id: 0, text: "Мясные", type: "meet" },
      { id: 1, text: "Вегетарианская", type: "vengry" },
      { id: 2, text: "Гриль", type: "grill" },
      { id: 3, text: "Острые", type: "sharp" },
      { id: 4, text: "Закрытые", type: "closed" },
    ],
    isActiveTag: null,
    TheBarTagIndex: undefined,
  },
  mutations: {
    changesActiveTag(ctx, TagIndex) {
      ctx.isActiveTag = TagIndex;
    },
  },
  actions: {
    TheBarSelectedTag({ commit }, TagIndex) {
      commit("changesActiveTag", TagIndex);
    },
  },
  getters: {
    getTags: (state) => {
      return state.tags;
    },
    getIsActiveTag: (state) => {
      return state.isActiveTag;
    },
  },
};
