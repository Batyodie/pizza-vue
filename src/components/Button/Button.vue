<script>
import { Button } from "@/components/style";
export default {
  name: "Button",

  props: {
    tagIndex: {
      type: [Number, null],
      default: null
    }
  },

  computed: {
    // css modules syntax
    Button() {
      return Button;
    }
  },

  methods: {
    // A simple emit event that returns a numeric value. Wherever the slot button template is used
    selectTag() {
      this.$emit("selectTag", this.tagIndex);
    }
  }
};
// slot tempalte
</script>
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
