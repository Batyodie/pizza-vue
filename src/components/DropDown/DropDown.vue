<script>
import { mapGetters, mapActions } from "vuex";

import { arrowTop } from "@/assets";
import { DropDownStyle } from "@/components/style";

export default {
  name: "DropDown",

  data() {
    return {
      icon: arrowTop
    };
  },

  computed: {
    DropDownStyle() {
      return DropDownStyle;
    },

    ...mapGetters({
      getState: "getStateDropdown"
    }),

    getDropDownActive() {
      return type =>
        this.getState.DropDownItemIsActive.type === type
          ? DropDownStyle.ItemActive
          : "";
    }
  },

  mounted() {
    document.body.addEventListener("click", this.DropDownGlobalWindowClosed);
  },
  destroyed() {
    document.body.removeEventListener("click", this.DropDownGlobalWindowClosed);
  },

  methods: {
    ...mapActions({
      // proxies  `this.open()` into `this.$store.dispatch('DropDownOpened')`
      open: "DropDownOpened",
      closeGlobal: "DropDownGlobalClosed",
      selection: "DropDownSelected",
      sortPizzas: "fetchProducts"
    }),

    DropDownOpened() {
      // open DropDown
      this.open();
    },

    DropDownGlobalWindowClosed(e) {
      if (!e.path.includes(this.$refs.DropDownBlock)) {
        this.closeGlobal();
      } else {
        return null;
      }
    },

    DropDownTurned(DropDownItem) {
      // select DropDown item
      this.selection(DropDownItem);
      this.sortPizzas();
    }
  }
};
</script>

<template>
  <div ref="DropDownBlock" :class="DropDownStyle.DropDown">
    <div style="display: flex; align-items: center;">
      <img
        width="10"
        height="6"
        :src="icon"
        class="IconImage"
        alt="Arrow top"
      />

      <span :class="DropDownStyle.Label">
        <slot name="DropdownBtnLabel">Сортировка по:</slot>
      </span>
      <button @click="DropDownOpened()" :class="DropDownStyle.Btn">
        <slot name="DropdownBtnText">
          {{ getState.DropDownItemIsActive.text }}
        </slot>
      </button>
    </div>
    <div v-if="getState.DropDownIsOpen" :class="DropDownStyle.PopUp">
      <ul :class="DropDownStyle.List">
        <li
          :class="[getDropDownActive(DropDownItem.type), DropDownStyle.Item]"
          v-for="DropDownItem in getState.DropDownItems"
          :key="DropDownItem.id"
          @click="DropDownTurned(DropDownItem)"
        >
          <slot name="DropdownItemContent">
            {{ DropDownItem.text }}
          </slot>
        </li>
      </ul>
    </div>
  </div>
</template>
