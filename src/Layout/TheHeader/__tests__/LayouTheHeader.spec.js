import { createLocalVue, mount } from "@vue/test-utils";
// dropdwons componens files
import TheHeader from "@/Layout/TheHeader/LayoutTheHeader";
import VueRouter from "vue-router";
import Vuex from "vuex";
// import { mapGetters } from "vuex";
import getters from "@/store/modules/cart/cart";
import router from "@/router";

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(Vuex);

const createStore = () => new Vuex.Store(getters);

describe("Unit tests for LayoutTheHeader component", () => {
  // fake props
  const sloganText = "Some fake title";
  const HeaderButton = true;

  const itemsCount = 0;
  const totalPrice = 0;

  const wrapper = mount(TheHeader, {
    localVue,
    router,
    propsData: {
      sloganText,
      HeaderButton
    },
    computed: {
      totalPrice() {
        return totalPrice;
      },
      itemsCount() {
        return itemsCount;
      }
    }
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

  it("should render correctly basket button to be false", () => {
    const HeaderButton = false;
    const wrapper = mount(TheHeader, {
      localVue,
      router,
      propsData: {
        sloganText,
        HeaderButton
      },
      computed: {
        totalPrice() {
          return totalPrice;
        },
        itemsCount() {
          return itemsCount;
        }
      }
    });
    expect(wrapper.find(".Basket").exists()).toBe(false);
  });

  // it("should route push correctly to be click basket button", async () => {
  //   await router.push("/basket");
  //   console.log(wrapper.html());
  // });

  it("Should match the snapshot", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});

describe("testing vues getters from header button basket", () => {
  let store = createStore();
  // console.log(getters);

  // fake props
  const sloganText = "Some fake title";
  const HeaderButton = true;

  const wrapper = mount(TheHeader, {
    localVue,
    store,
    router,
    propsData: {
      HeaderButton,
      sloganText
    }
  });
  it("should correctly render data in button basket header", async () => {
    const basketBody = wrapper.findAll(".Basket > .Body");
    const renderPrice = "500";
    const renderCount = "10";
    const renderCounts = `${renderPrice}   ${renderCount}`;

    store.state.totalPrice = renderPrice;
    store.state.pizzaItemsCount = renderCount;
    await wrapper.vm.$nextTick();

    expect(wrapper.find(".Basket").text()).toEqual(renderCounts);
    expect(basketBody.at(0).text()).toEqual(renderPrice);
    expect(basketBody.at(1).text()).toEqual(renderCount);
  });
});
