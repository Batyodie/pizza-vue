<template>
  <div ref="DropDownBlock" :class="DropDownStyle.DropDown">
    <div style="display: flex; align-items: center;">
      <img width="10" height="6" :src="icon" alt="Arrow top" />

      <span :class="DropDownStyle.Label">
        <slot name="DropdownBtnLabel">Сортировка по:</slot>
      </span>
      <button @click="DropDownOpened" :class="DropDownStyle.Btn">
        <slot name="DropdownBtnText">
          {{ getState.DropDownItemIsActive.text }}
        </slot>
      </button>
    </div>
    <div v-show="getState.DropDownIsOpen" :class="DropDownStyle.PopUp">
      <ul :class="DropDownStyle.List">
        <li
          :class="[
            getState.DropDownItemIsActive.type === DropDownItem.type
              ? [DropDownStyle.ItemActive]
              : '',
            DropDownStyle.Item
          ]"
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
  methods: {
    ...mapActions({
      // proxies  `this.open()` into `this.$store.dispatch('DropDownOpened')`
      open: "DropDownOpened",
      closeGlobal: "DropDownGlobalClosed",
      selection: "DropDownSelected",
      sortPizzas: "fetchPizzas"
    }),
    DropDownOpened(label) {
      // open DropDown
      this.open(label);
    },
    DropDownGlobalWindowClosed(e) {
      if (!e.path.includes(this.$refs.DropDownBlock)) {
        this.closeGlobal();
      }
    },

    DropDownTurned(DropDownItem) {
      // select DropDown item
      this.selection(DropDownItem);
      this.sortPizzas();
    }
  },
  computed: {
    DropDownStyle() {
      return DropDownStyle;
    },
    ...mapGetters({
      getState: "getStateDropdown"
    })
  },
  mounted() {
    document.body.addEventListener("click", this.DropDownGlobalWindowClosed);
  },
  beforeDestroy() {
    document.body.removeEventListener("click", this.DropDownGlobalWindowClosed);
  }
};
</script>
