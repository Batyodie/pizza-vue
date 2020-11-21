<template>
  <router-link to="/" style="text-decoration: none">
    <div :class="LogoStyle.Inner">
      <img
        :class="LogoStyle.Image"
        :src="logo"
        width="38"
        height="38"
        alt="Main logo"
      />
      <div :class="LogoStyle.Slogan">
        <h1 :class="LogoStyle.SloganTitle">VUE PIZZA</h1>
        <template v-if="title">
          <p :class="LogoStyle.SloganText">{{ title }}</p>
        </template>
        <template v-else>
          <p :class="LogoStyle.SloganText">
            самая вкусная пицца во вселенной
          </p>
        </template>
      </div>
    </div>
  </router-link>
</template>

<script>
import logo from "@/assets/img/pizza-logo.svg";
import LogoStyle from "./Logo.css";
export default {
  name: "Logo",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  data: function() {
    return {
      logo: logo,
    };
  },
  computed: {
    LogoStyle() {
      return LogoStyle;
    },
  },
};
</script>
