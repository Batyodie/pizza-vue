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
    CardTagTypeIndex: {
      type: Number,
      required: false,
      default: null
    },
    index: {
      type: Number,
      required: false,
      default: null
    },
    CardTagSizeIndex: {
      type: Number,
      required: false,
      default: null
    }
  },
  computed: {
    Button() {
      return Button;
    }
  },
  methods: {
    selectTag() {
      this.$emit("select", this.index);
      this.$emit("TheBarTagindex", this.theBarTagIndex);
      this.$emit("selectCardTag", this.CardTagTypeIndex);
      this.$emit("selectCardSizeTag", this.CardTagSizeIndex);
    }
  }
};
</script>
