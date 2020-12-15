import { createLocalVue, mount } from "@vue/test-utils";
// dropdwons componens files
import { Button } from "@/components";

import VueRouter from "vue-router";
import router from "@/router";

const localVue = createLocalVue();
localVue.use(VueRouter);

describe("Unit tests for Button component", () => {
  // fake props
  const tagIndex = null;
  const icon = "/img/iconfinder.svg";
  const img = `<img src="${icon}" width="15" height="15" alt="icon basket" style="margin: 1px 0px 0px 13px;">`;
  const buttonText = "some any slots text";
  const wrapper = mount(Button, {
    localVue,
    router,
    propsData: {
      tagIndex,
    },
    slots: {
      ButtonText: buttonText,
      Icon: img,
    },
  });

  it("should initialize correctly", () => {
    // correctly Vue instance
    expect(wrapper.exists()).toBeTruthy();
    // We expect the wrapper to be the Button component
    expect(wrapper.is(Button)).toBeTruthy();
    //  We expect the wrapper props to equal the fake props
    expect(wrapper.vm.tagIndex).toEqual(tagIndex);
    // add logo to data() component
  });

  it("should render correctly button component", () => {
    const btn = `<button type="button" class="Btn"><span class="Body">${buttonText}</span> ${img}</button>`;
    // Expect wrapper html to have btn
    expect(wrapper.html()).toEqual(btn);
    // Expect the wrapper to be the slots text render
    expect(wrapper.text(buttonText)).toBeTruthy();
    // Expect that render slot text in Body selector equal to buttonText
    expect(wrapper.find(".Body").text()).toEqual(buttonText);
    expect(wrapper.find("button > img").html()).toEqual(img);
  });
  // it("should render correctly logo title to be false", () => {
  //   const sloganText = "";
  //   const wrapper = mount(Logo, {
  //     localVue,
  //     router,
  //     propsData: {
  //       sloganText,
  //     },
  //   });
  //   const renderSloganShallow = "самая вкусная пицца во вселенной";
  //   // Expect the wrapper to be the slogan shallow  text render
  //   expect(wrapper.text(renderSloganShallow)).toBeTruthy();
  //   // Expect thatrender SloganText in Slogan selector equal to shallow slogan
  //   expect(wrapper.find(".Slogan > p").text()).toEqual(renderSloganShallow);
  // });

  // it("Should match the snapshot", () => {
  //   expect(wrapper.html()).toMatchSnapshot();
  // });
});
