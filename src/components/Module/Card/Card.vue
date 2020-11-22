<template>
  <div :class="CardStyles.Card">
    <picture :class="CardStyles.CardImage">
      <source />
      <img :src="card.imageUrl" alt="Pizza" />
    </picture>
    <div>
      <h3 :class="[CardStyles.CardTitle]">
        {{ card.name }}
      </h3>
    </div>

    <div :class="CardStyles.CardTags">
      <Button
        v-for="(TagType, index) in cardsTypeTags"
        :key="index"
        :CardTagTypeIndex="index"
        @selectCardTag="setActiveTypeTag"
        :class="[
          activeType === index ? [CardStyles.CardTagsItemActive] : '',
          !card.types.includes(index) ? [CardStyles.CardTagsDisable] : '',
          CardStyles.CardTagsItem,
          TagStyle.Tag,
        ]"
      >
        <template slot="ButtonText"> {{ TagType }} </template>
      </Button>
      <Button
        v-for="tagSize in cardsSizesTags"
        :key="tagSize"
        :CardTagSizeIndex="tagSize"
        @selectCardSizeTag="setActiveSizeTag"
        :class="[
          activeSize === tagSize ? [CardStyles.CardTagsItemActive] : '',
          !card.sizes.includes(tagSize) ? [CardStyles.CardTagsDisable] : '',
          CardStyles.CardTagsItem,
          TagStyle.Tag,
        ]"
      >
        <template slot="ButtonText"> {{ tagSize }} см. </template>
      </Button>
    </div>
    <div :class="CardStyles.CardPizzaAdd">
      <h3 :class="CardStyles.CardPizzaPrice">от {{ card.price }} ₽</h3>
      <template>
        <Button
          @click.native="[onClickAddPizza(pizzaObj)]"
          :class="[
            CardStyles.CardAddBtn,
            ActiveBtnFlag ? [CardStyles.CardAddBtnSelected] : '',
          ]"
        >
          <template slot="Icon">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              :class="CardStyles.CardAddBtnIcon"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              ></path>
            </svg>
          </template>
          <template slot="ButtonText">
            Добавить
          </template>
          <template slot="ButtonText">
            <template v-if="this.pizzaCardCount === undefined"> </template>
            <template v-else>
              <i :class="CardStyles.CardAmountNumber">
                {{ this.pizzaCardCount && this.pizzaCardCount }}
              </i>
            </template>
          </template>
        </Button>
      </template>
    </div>
  </div>
</template>

<script>
import Button from "../Button/Button.vue";
import TagStyle from "../Tag/Tag.css";

import CardStyle from "./Card.css";
export default {
  components: { Button },
  props: {
    card: {
      type: Object,
      required: true,
    },
    cardsTypeTags: {
      type: Array,
      required: true,
    },
    cardsSizesTags: {
      type: Array,
      required: true,
    },
    onClickAddPizza: {
      type: Function,
      rquired: false,
    },
    ActiveBtnFlag: {
      type: Boolean,
    },
    pizzaCardCount: {
      type: Number,
    },
  },
  name: "Card",
  data() {
    return {
      cardItem: true,
      activeType: this.card.types[0],
      activeSize: this.card.sizes[0],
    };
  },
  methods: {
    setActiveTypeTag(CardTypeIndex) {
      this.activeType = CardTypeIndex;
    },
    setActiveSizeTag(CardSizeIndex) {
      this.activeSize = CardSizeIndex;
    },
    // getChangeStyle() {
    //   const data = {
    //     CARD_ID: this.card.id,
    //     BtnActive: this.card.activeBtn,
    //   };
    //   this.getChangedStyle(data);
    // },
  },
  computed: {
    CardStyles() {
      return CardStyle;
    },
    TagStyle() {
      return TagStyle;
    },
    pizzaObj() {
      return {
        id: this.card.id,
        name: this.card.name,
        imageUrl: this.card.imageUrl,
        price: this.card.price,
        size: this.activeSize,
        type: this.activeType,
        activeBtn: this.card.activeBtn,
      };
    },
  },
};
</script>
