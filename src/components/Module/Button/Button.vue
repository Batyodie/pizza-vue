<template>
  <button @click="selectTag" type="button" :class="[Button.Btn]">
    <span :class="[Button.BtnBody, TagStyleBody]">
      <slot name="ButtonText">
        Кнопка
      </slot>
    </span>
    <slot name="IconBorder"></slot>
    <slot name="Icon"></slot>
  </button>
</template>

<script>
import Button from "./Button.css";
export default {
  name: "Button",
  props: {
    CardTagTypeIndex: {
      type: Number,
      required: false,
      default: null,
    },
    index: {
      type: Number,
      required: false,
      default: null,
    },
    CardTagSizeIndex: {
      type: Number,
      required: false,
      default: null,
    },

    TagStyleBody: {
      type: String,
      required: false,
    },
  },
  computed: {
    Button() {
      return Button;
    },
    Tag() {
      return this.TagStyle;
    },
  },
  methods: {
    selectTag() {
      this.$emit("select", this.index);
      this.$emit("TheBarTagindex", this.theBarTagIndex);
      this.$emit("selectCardTag", this.CardTagTypeIndex);
      this.$emit("selectCardSizeTag", this.CardTagSizeIndex);
    },
  },
};
</script>
