export default {
  state: {
    tags: [
      { id: 1, text: "Все", class: "active" },
      { id: 2, text: "Мясные", class: "" },
      { id: 3, text: "Вегетарианская", class: "" },
      { id: 4, text: "Гриль", class: "" },
      { id: 5, text: "Острые", class: "" },
      { id: 6, text: "Закрытые", class: "" }
    ],
    isActiveTag: "Все"
  },
  mutations: {
    changesActiveTag(ctx, tag) {
      ctx.isActiveTag = tag.innerText;
    }
  },

  actions: {
    TheBarSelectedTag(ctx, tagEvent) {
      ctx.commit("changesActiveTag", tagEvent.target);
    }
  },
  getters: {
    getTags: state => {
      return state.tags;
    },
    getIsActiveTag: state => {
      return state.isActiveTag;
    }
  }
};
