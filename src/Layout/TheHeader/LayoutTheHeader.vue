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
import { Button, Logo } from "@/components";
import { BtnStyle } from "@/components/style";
import { mapGetters } from "vuex";

import { iconfinder } from "@/assets";

import { LayoutTheHeader } from "@/Layout/style";
export default {
  components: { Logo, Button },
  props: {
    HeaderButton: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: true,
      default: "",
    },
  },
  name: "LayoutTheHeader",
  data() {
    return {
      icon: iconfinder,
      IsActiveButton: this.HeaderButton,
      LogoTitle: this.title,
    };
  },
  computed: {
    ...mapGetters({
      totalPrice: "getTotalPrice",
      itemsCount: "getItemsCount",
    }),
    BtnStyle() {
      return BtnStyle;
    },
    LayoutTheHeader() {
      return LayoutTheHeader;
    },
  },
};
</script>
