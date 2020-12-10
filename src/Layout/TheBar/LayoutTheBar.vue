<script>
import TagGroupMobile from "./TagGroupMobile/TagGroupMobile.vue";
import { Button, DropDown } from "@/components";
import { BtnTag, DropDownStyle } from "@/components/style";

import { mapGetters, mapActions } from "vuex";

import { TheBarStyle } from "@/Layout/style";
export default {
  name: "SortingSideBar",
  components: { DropDown, Button, TagGroupMobile },

  data() {
    return {
      DropDownTagsIsOpen: false
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

    ...mapGetters({
      getTags: "getTags",
      activeTag: "getIsActiveTag",
      getState: "getStateDropdown"
    }),

    getSelected() {
      return tagID => {
        return this.activeTag === tagID ? [TheBarStyle.IsSelected] : "";
      };
    }
  },
  methods: {
    ...mapActions({
      selectedTag: "TheBarSelectedTag",
      filterPizzas: "fetchProducts",
      closeGlobal: "DropDownGlobalClosed"
    }),

    getSelectTag(TagIndex) {
      this.selectedTag(TagIndex);
      this.filterPizzas();
    },

    DropDownTagsOpen() {
      this.DropDownTagsIsOpen = !this.DropDownTagsIsOpen;
    }
  }
};
</script>

<template>
  <div :class="TheBarStyle.SortingBar">
    <div v-if="$mq.resize && $mq.above('1300px')" :class="TheBarStyle.TagGroup">
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

    <div v-else :class="TheBarStyle.TagGroup">
      <TagGroupMobile :getTags="getTags" :activeTag="activeTag" />
    </div>
    <div>
      <DropDown />
    </div>
  </div>
</template>
