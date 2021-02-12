<script>
import { Button, Logo } from "@/components";
import { BtnStyle } from "@/components/style";
import { mapGetters } from "vuex";

import { iconfinder } from "@/assets";

import { LayoutTheHeader } from "@/Layout/style";
export default {
  name: "LayoutTheHeader",
  components: { Logo, Button },
  // The flag for the button, which is responsible for the appearance of the button in the header layout
  props: {
    HeaderButton: {
      type: Boolean,
      required: true
    },
    // sub-title test for component
    sloganText: {
      type: String,
      required: true,
      default: ""
    }
  },

  data() {
    return {
      icon: iconfinder,
      IsActiveButton: this.HeaderButton,
      LogoTitle: this.sloganText
    };
  },

  computed: {
    ...mapGetters({
      totalPrice: "getTotalPrice",
      itemsCount: "getItemsCount"
    }),

    BtnStyle() {
      return BtnStyle;
    },

    LayoutTheHeader() {
      return LayoutTheHeader;
    }
  }
};
</script>

<template>
  <header :class="LayoutTheHeader.Wrapper">
    <div :class="LayoutTheHeader.BorderBottom"></div>
    <Logo :sloganText="sloganText" :class="LayoutTheHeader.LogoMargin" />
    <template v-if="IsActiveButton">
      <router-link name="basket" to="/basket" style="text-decoration: none">
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
