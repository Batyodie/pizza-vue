<template>
  <button type="button" @click="selectTag" :class="[TagStyle.Tag]">
    <span :class="TagStyle.TagBody">
      <slot name="ButtonText">
        Кнопка
      </slot>
    </span>
  </button>
</template>

<script>
import TagStyle from "./Tag.css";
export default {
  name: "Tag",
  props: {
    active: {
      type: Boolean,
    },
  },
  data() {
    return {
      
    };
  },
  computed: {
    TagStyle() {
      return TagStyle;
    },
  },
  methods: {
    selectTag(e) {
      this.$emit("select", e);
    },
  },
};
</script>
