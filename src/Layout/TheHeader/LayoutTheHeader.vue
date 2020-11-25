<template>
  <header :class="LayoutTheHeader.Wrapper">
    <div :class="LayoutTheHeader.BorderBottom"></div>
    <Logo :title="title" :class="LayoutTheHeader.LogoMargin" />
    <template v-if="IsActiveButton">
      <router-link to="/basket" style="text-decoration: none">
        <Button :class="[BtnStyle.Basket, LayoutTheHeader.ButtonMargin]">
          <template slot="Icon">
            <img
              style="margin: 1px 0 0 13px;"
              :src="icon"
              width="15"
              height="15"
              alt="icon basket"
            />
            <span :class="BtnStyle.Body">{{ itemsCount }}</span>
          </template>
          <template slot="IconBorder">
            <span :class="BtnStyle.IconBorder"></span>
          </template>
          <template slot="ButtonText"> {{ totalPrice }}</template>
        </Button>
      </router-link>
    </template>
  </header>
</template>

<script>
import LayoutTheHeader from "./LayoutTheHeader.css";

// button
import Button from "@/components/Button/Button.vue";
import BtnStyle from "@/components/Button/Button.css";

import Logo from "@/components/Logo/Logo.vue";
import icon from "@/assets/img/iconfinder.svg";
import { mapState } from "vuex";

export default {
  components: { Logo, Button },
  props: {
    HeaderButton: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: false,
    },
  },
  name: "LayoutTheHeader",
  data() {
    return {
      icon: icon,
      IsActiveButton: this.HeaderButton,
      LogoTitle: this.title,
    };
  },
  computed: {
    BtnStyle() {
      return BtnStyle;
    },
    LayoutTheHeader() {
      return LayoutTheHeader;
    },
    ...mapState({
      totalPrice: "totalPrice",
      itemsCount: "pizzaItemsCount",
    }),
  },
};
</script>
