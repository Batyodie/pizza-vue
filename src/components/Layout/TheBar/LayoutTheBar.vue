<template>
  <div :class="TheBarStyle.SortingBar">
    <div v-if="$mq.resize && $mq.above('1300px')" :class="TheBarStyle.TagGroup">
      <Button
        v-for="tag in getTags"
        :key="tag.id"
        :class="[
          getIsActiveTag === tag.id ? [TheBarStyle.IsSelected] : '',
          TheBarStyle.TagMargin,
          TagStyle.Tag,
        ]"
        :index="tag.id"
        :TagStyleBody="TagStyle.TagBody"
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
          <!-- <img width="10" height="6" :src="icon" alt="Arrow top" /> -->

          <span :class="DropDownStyle.DropDownLabel">
            Сортировка по:
          </span>
          <button @click="DropDownTagsOpen" :class="DropDownStyle.DropDownBtn">
            Категориям
          </button>
        </div>
        <div
          v-show="DropDownTagsIsOpen"
          :class="DropDownStyle.DropDownPopUp"
          style="max-width: 160px"
        >
          <div
            :class="DropDownStyle.DropDownList"
            style="padding-left: 10px; padding-right: 10px;"
          >
            <Button
              v-for="tag in getTags"
              :key="tag.id"
              :class="[
                getIsActiveTag === tag.text ? [TheBarStyle.IsSelected] : '',
                TheBarStyle.TagMargin,
                TagStyle.Tag,
              ]"
              :TagStyleBody="TagStyle.TagBody"
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
import Button from "../../Module/Button/Button.vue";
import DropDown from "../../Module/DropDown/DropDown.vue";
import DropDownStyle from "../../Module/DropDown/DropDown.css";
import { mapGetters, mapActions } from "vuex";
import TagStyle from "../../Module/Tag/Tag.css";
import TheBarStyle from "./LayoutTheBar.css";
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
    TagStyle() {
      return TagStyle;
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
      sortPizzas: "GetThePizzas",
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
