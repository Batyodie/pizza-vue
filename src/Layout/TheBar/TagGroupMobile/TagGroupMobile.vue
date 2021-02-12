<script>
import { Button } from "@/components";

import { BtnTag, DropDownStyle } from "@/components/style";
import { TheBarStyle } from "@/Layout/style";

import { mapActions } from "vuex";
export default {
  name: "TagGroupMobile",
  components: {
    Button
  },

  props: {
    getTags: {
      type: Array
    },
    activeTag: {
      type: Number,
      default: null
    }
  },

  data() {
    return {
      DropDownTagsIsOpen: false,
      TheBarTagIndex: null
    };
  },
  computed: {
    TheBarStyle() {
      return TheBarStyle;
    },

    BtnTag() {
      return BtnTag;
    },

    DropDownStyle() {
      return DropDownStyle;
    },

    getSelected() {
      return tagID => {
        return this.activeTag === tagID ? [TheBarStyle.IsSelected] : "";
      };
    }
  },
  methods: {
    ...mapActions({
      selectedTag: "TheBarSelectedTag",
      filterPizzas: "fetchProducts"
    }),

    getSelectTag(TagIndex) {
      this.selectedTag(TagIndex);
      this.filterPizzas();
    },

    DropDownTagsOpen() {
      this.DropDownTagsIsOpen = !this.DropDownTagsIsOpen;
    },

    getSelectTagIndex(index) {
      this.TheBarTagIndex = index;
    }
  }
};
</script>

<template>
  <div :class="DropDownStyle.DropDown">
    <div style="display: flex; align-items: center;">
      <span :class="DropDownStyle.Label">
        Сортировка по:
      </span>
      <button @click="DropDownTagsOpen" :class="DropDownStyle.Btn">
        Категориям
      </button>
    </div>
    <div
      v-show="DropDownTagsIsOpen"
      :class="DropDownStyle.PopUp"
      style="max-width: 180px"
    >
      <div
        :class="DropDownStyle.List"
        style="padding-left: 10px; padding-right: 10px;"
      >
        <Button
          v-for="tag in getTags"
          :key="tag.id"
          :class="[getSelected(tag.id), TheBarStyle.TagMargin, BtnTag.Tag]"
          :tagIndex="tag.id"
          @selectTag="getSelectTag"
        >
          <template slot="ButtonText">
            {{ tag.text }}
          </template>
        </Button>
      </div>
    </div>
  </div>
</template>
