import { createLocalVue, mount } from "@vue/test-utils";
// dropdwons componens files
import TheHeader from "@/Layout/TheHeader/LayoutTheHeader";
import VueRouter from "vue-router";
import router from "@/router";

const localVue = createLocalVue();
localVue.use(VueRouter);

// fake props
const sloganText = "Some fake title";
const HeaderButton = true;

const itemsCount = 0;
const totalPrice = 0;

describe("Unit tests for LayoutTheHeader component", () => {
  const wrapper = mount(TheHeader, {
    localVue,
    router,
    propsData: {
      sloganText,
      HeaderButton,
    },
    computed: {
      totalPrice() {
        return totalPrice;
      },
      itemsCount() {
        return itemsCount;
      },
    },
  });

  it("should initialize correctly", () => {
    // correctly Vue instance
    expect(wrapper.exists()).toBeTruthy();
    // We expect the wrapper to be the TheHeader component
    expect(wrapper.is(TheHeader)).toBeTruthy();
    //  We expect the wrapper props to equal the fake props
    expect(wrapper.vm.sloganText).toEqual(sloganText);
    expect(wrapper.vm.HeaderButton).toEqual(HeaderButton);
  });

  it("should render correctly logo title", () => {
    const renderSlogan = `${sloganText}`;

    // Expect the wrapper to be the slogan text render
    expect(wrapper.text(renderSlogan)).toBeTruthy();
    // Expect thatrender SloganText in Slogan selector equal to renderSlogan
    expect(wrapper.find(".Slogan > p").text()).toEqual(renderSlogan);
  });

  it("should render correctly basket button", () => {
    const renderCount = `${"0"}   ${"0"}`;
    const btn = wrapper.find(".Basket");
    const bodyBtnAll = btn.findAll(".Body");
    // Expect the wrapper to be the button text render
    expect(btn.text(renderCount)).toBeTruthy();
    // Expect the wrapper to be the button text render to equal render count
    expect(btn.text()).toEqual(renderCount);
    expect(bodyBtnAll.at(0).text()).toEqual("0");
    expect(bodyBtnAll.at(1).text()).toEqual("0");
  });

  it("Should match the snapshot", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
