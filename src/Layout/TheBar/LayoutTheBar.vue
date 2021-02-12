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
    //css modules syntax
    TheBarStyle() {
      return TheBarStyle;
    },

    BtnTag() {
      return BtnTag;
    },

    DropDownStyle() {
      return DropDownStyle;
    },
    // vuex
    ...mapGetters({
      getTags: "getTags",
      activeTag: "getIsActiveTag",
      getState: "getStateDropdown"
    }),
    // Computerized properties for adding a class of css by condition
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
    // Getting the selected tag
    getSelectTag(TagIndex) {
      // We pass the store index to the action, which will be used in the mutation
      this.selectedTag(TagIndex);
      // Asynchronous store action which transmits data to the json server which returns the group of pizzas that we need
      this.filterPizzas();
    },
    // DropDown tags flag
    DropDownTagsOpen() {
      this.DropDownTagsIsOpen = !this.DropDownTagsIsOpen;
    }
  }
};
</script>

<template>
  <div :class="TheBarStyle.SortingBar">
    <!-- Third party library for responsive design in vue  -->
    <!-- at 1300px the block changes  -->
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
      <!-- tag group mobile component -->
      <TagGroupMobile :getTags="getTags" :activeTag="activeTag" />
    </div>
    <div>
      <!-- Dropdown component -->
      <DropDown />
    </div>
  </div>
</template>
