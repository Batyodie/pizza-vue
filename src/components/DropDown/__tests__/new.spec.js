// import { shallowMount, createLocalVue } from "@vue/test-utils";
// import Vuex from "vuex";
// import DropDown from "@/components/DropDown/DropDown.vue";
// import DropDownState from "@/store/modules/dropdown/dropdown";

// const localVue = createLocalVue();

// localVue.use(Vuex);

// describe("DropDown.vue", () => {
//   let actions;
//   let state;
//   let store;

//   beforeEach(() => {
//     state = {
//       DropDownItemIsActive: {
//         text: "популярности",
//         type: "rating",
//         order: "desc",
//       },
//     };

//     actions = {
//       fetchProducts: jest.fn(),
//       DropDownOpened: jest.fn(),
//     };

//     store = new Vuex.Store({
//       modules: {
//         DropDownState: {
//           state,
//           actions,
//           getters: DropDownState.getters,
//         },
//       },
//     });
//   });
//   it("testing render dropdown component", () => {
//     const wrapper = shallowMount(DropDown, { store, localVue });
//     expect(wrapper.isVisible()).toBe(true);
//     expect(wrapper.classes("DropDown")).toBe(true);
//   });

//   it('вызывает действие "DropDownOpened" при нажатии кнопку', async () => {
//     const wrapper = shallowMount(DropDown, { store, localVue });
//     const btn = wrapper.find(".Btn");

//     await btn.trigger("click");
//     expect(actions.DropDownOpened).toHaveBeenCalled();
//   });
// });

// describe("DropDown.vue", () => {
//   let actions;
//   let state;
//   let store;

//   beforeEach(() => {
//     state = {
//       DropDownIsOpen: true,
//       DropDownItems: [
//         { id: 5, text: "популярности", type: "rating", order: "desc" },
//         { id: 6, text: "по цене", type: "price", order: "desc" },
//         { id: 7, text: "по алфавиту", type: "name", order: "asc" },
//       ],
//       DropDownItemIsActive: {
//         text: "популярности",
//         type: "rating",
//         order: "desc",
//       },
//     };

//     actions = {
//       fetchProducts: jest.fn(),
//       DropDownSelected: jest.fn(),
//     };

//     store = new Vuex.Store({
//       modules: {
//         DropDownState: {
//           state,
//           actions,
//           getters: DropDownState.getters,
//         },
//       },
//     });
//   });

//   it('вызывает действие "fetchProducts" при нажатии кнопку', async () => {
//     const wrapper = shallowMount(DropDown, {
//       store,
//       localVue,
//     });
//     // const PopUp = wrapper.find(".PopUp");
//     const popUpListItem = wrapper.findAll(".Item");
//     popUpListItem.wrappers.forEach((e) => {
//       // click dropdown item
//       e.trigger("click");
//       // label text in btn dropdown
//       // expect(state.DropDownItemIsActive.text).toContain(e.text());
//     });
//   });
// });
