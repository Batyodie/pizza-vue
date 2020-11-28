<template>
  <div :class="TheBarStyle.SortingBar">
    <div v-if="$mq.resize && $mq.above('1300px')" :class="TheBarStyle.TagGroup">
      <Button
        v-for="tag in getTags"
        :key="tag.id"
        :class="[
          getIsActiveTag === tag.id ? [TheBarStyle.IsSelected] : '',
          TheBarStyle.TagMargin,
          BtnTag.Tag,
        ]"
        :index="tag.id"
        :TagStyleBody="BtnTag.Body"
        @TheBarTagindex="getSelectTagIndex"
        @select="getSelectTag"
      >
        <template slot="ButtonText">
          {{ tag.text }}
        </template>
      </Button>
    </div>

    <div v-else :class="TheBarStyle.TagGroup">
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
              :class="[
                getIsActiveTag === tag.id ? [TheBarStyle.IsSelected] : '',
                TheBarStyle.TagMargin,
                BtnTag.Tag,
              ]"
              :index="tag.id"
              :TagStyleBody="BtnTag.Body"
              @TheBarTagindex="getSelectTagIndex"
              @select="getSelectTag"
            >
              <template slot="ButtonText">
                {{ tag.text }}
              </template>
            </Button>
          </div>
        </div>
      </div>
    </div>
    <div>
      <DropDown />
    </div>
  </div>
</template>

<script>
import { Button, DropDown } from "@/components";
import { BtnTag, DropDownStyle } from "@/components/style";

import { mapGetters, mapActions } from "vuex";

import { TheBarStyle } from "@/Layout/style";
export default {
  components: { DropDown, Button },
  name: "SortingSideBar",
  data() {
    return {
      DropDownTagsIsOpen: false,
      TheBarTagIndex: null,
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
      getIsActiveTag: "getIsActiveTag",
      getState: "getStateDropdown",
    }),
  },
  methods: {
    ...mapActions({
      selectedTag: "TheBarSelectedTag",
      sortPizzas: "fetchPizzas",
    }),
    getSelectTag(TagIndex) {
      this.selectedTag(TagIndex);
      this.sortPizzas();
    },
    DropDownTagsOpen() {
      this.DropDownTagsIsOpen = !this.DropDownTagsIsOpen;
    },
    getSelectTagIndex(index) {
      this.TheBarTagIndex = index;
    },
  },
};
</script>
