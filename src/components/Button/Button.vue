<template>
  <button @click="selectTag" type="button" :class="[Button.Btn]">
    <span :class="[Button.Body]">
      <slot name="ButtonText">
        Кнопка
      </slot>
    </span>
    <slot name="IconBorder"></slot>
    <slot name="Icon"></slot>
  </button>
</template>

<script>
import { Button } from "@/components/style";
export default {
  name: "Button",
  props: {
    tagIndex: {
      type: Number,
      default: null,
    },
  },
  computed: {
    Button() {
      return Button;
    },
  },
  methods: {
    selectTag() {
      this.$emit("selectTag", this.tagIndex);
    },
  },
};
</script>
