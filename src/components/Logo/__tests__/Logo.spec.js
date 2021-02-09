import { createLocalVue, mount } from "@vue/test-utils";
// dropdwons componens files
import { Logo } from "@/components";

import VueRouter from "vue-router";
import router from "@/router";

const localVue = createLocalVue();
localVue.use(VueRouter);

describe("Unit tests for Logo component", () => {
  // fake props
  const sloganText = "Some fake title";
  const LOGO = "/img/pizza-logo.svg";
  const wrapper = mount(Logo, {
    localVue,
    router,
    propsData: {
      sloganText
    }
  });
  wrapper.setData({ logo: LOGO });

  it("should initialize correctly", () => {
    // correctly Vue instance
    expect(wrapper.exists()).toBeTruthy();
    // We expect the wrapper to be the Logo component
    expect(wrapper.is(Logo)).toBeTruthy();
    //  We expect the wrapper props to equal the fake props
    expect(wrapper.vm.sloganText).toEqual(sloganText);
    // add logo to data() component
    expect(wrapper.vm.logo).toEqual(LOGO);
    expect(wrapper.find(".Image").attributes("src")).toBe(LOGO);
  });

  it("should render correctly logo title", () => {
    const renderSlogan = `${sloganText}`;

    // Expect the wrapper to be the slogan text render
    expect(wrapper.text(renderSlogan)).toBeTruthy();
    // Expect thatrender SloganText in Slogan selector equal to renderSlogan
    expect(wrapper.find(".Slogan > p").text()).toEqual(renderSlogan);
  });
  it("should render correctly logo title to be false", () => {
    const sloganText = "";
    const wrapper = mount(Logo, {
      localVue,
      router,
      propsData: {
        sloganText
      }
    });
    const renderSloganShallow = "самая вкусная пицца во вселенной";
    // Expect the wrapper to be the slogan shallow  text render
    expect(wrapper.text(renderSloganShallow)).toBeTruthy();
    // Expect thatrender SloganText in Slogan selector equal to shallow slogan
    expect(wrapper.find(".Slogan > p").text()).toEqual(renderSloganShallow);
  });

  it("Should match the snapshot", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
