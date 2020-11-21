<template>
  <div :class="CardStyles.CardTags">
    <Tag></Tag>
  </div>
</template>

<script>
import Tag from "../Tag/Tag.vue";
export default {
  name: "CardTags",
  components: {
    Tag,
  },
  props: {
    CardStyles: {
      type: Object,
    },
    card: {
      type: Object,
    },
    cardsTags: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style></style>
