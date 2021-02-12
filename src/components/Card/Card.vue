<script>
import { Button } from "@/components";

import { BtnTag, CardStyle } from "@/components/style";
import { mapGetters } from "vuex";
export default {
  name: "Card",
  components: { Button },

  props: {
    // pizza map data that is the result of the v-for directive.
    // We will transfer this data to the map template for rendering from LayoutTheGrid.
    card: {
      type: Object,
      required: true
    },
    // cardIndex is a unique card key and is also a v-for key
    cardIndex: {
      type: Number,
      required: true
    },
    // The function is responsible for adding a new pizza to the store.
    //  We pass the Computed properties of pizzaObj to it
    onClickAddPizza: {
      type: Function,
      required: true,
      default: () => Object
    },
    // We pass the object of the last tags that were used before going to the cart,
    //  by default it is null
    tags: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      activeType: this.tags === null ? this.card.types[0] : this.tags.type,
      activeSize: this.tags === null ? this.card.sizes[0] : this.tags.size,
      cardCount: null,
      activeBtnFlag: false,
      // the keys of this object are used to search for a field in the pizzaitems item [field]
      //for the subsequent replacement of old active tags with the last active ones
      cardTypeData: {
        cardItems: "items",
        activeBtn: "activeBtn"
      },

      cardsTypeTags: ["тонкое", "традиционное"],
      cardsSizesTags: [26, 30, 40]
    };
  },

  computed: {
    ...mapGetters({
      getCartItemType: "getCartItemType"
    }),
    // Сss modules syntax
    CardStyles() {
      return CardStyle;
    },

    BtnTag() {
      return BtnTag;
    },
    // the pizza object is passed to the onClickAddPizza function
    pizzaObj() {
      return {
        id: this.card.id,
        name: this.card.name,
        imageUrl: this.card.imageUrl,
        price: this.card.price,
        size: this.activeSize,
        type: this.activeType
      };
    },
    // computed properties responsible for styling buttons inside the card
    getTagItemActive() {
      return (btnType, options) =>
        btnType === options ? [this.CardStyles.TagsItemActive] : "";
    },

    getTagDisable() {
      return (cardType, options) =>
        !cardType.includes(options) ? [this.CardStyles.TagsDisable] : "";
    },

    getAddBtnSelected() {
      return () => (this.activeBtnFlag ? [this.CardStyles.AddBtnSelected] : "");
    }
  },
  // hook that causes the active tags that were last pressed to update
  mounted() {
    this.handlerCardItemCounter(this.cardIndex, this.cardTypeData);
  },

  methods: {
    // methods that get the unique id of the tag using the event of the button component and write the id to data
    setActiveTypeTag(CardTypeIndex) {
      this.activeType = CardTypeIndex;
    },

    setActiveSizeTag(CardSizeIndex) {
      this.activeSize = CardSizeIndex;
    },
    //getCartItemType is a getter that returns the pizzaitem item if there is one.
    // When a pizza is added to the cart using onClickAddPizza,
    //the keys of the last active tags on the card are created in the pizza object
    handlerCardItemCounter(cardIndex, objType) {
      const count = this.getCartItemType(cardIndex, objType.cardItems);

      const flag = this.getCartItemType(cardIndex, objType.activeBtn);

      this.cardCount = count !== null ? count.length : count;
      this.activeBtnFlag = flag !== null ? flag : false;
    }
  }
};
</script>

<template>
  <div :class="CardStyles.Card">
    <picture :class="CardStyles.Image">
      <source />
      <img :src="card.imageUrl" alt="Pizza" />
    </picture>
    <h3 :class="[CardStyles.Title]">
      {{ card.name }}
    </h3>

    <div :class="CardStyles.Tags">
      <Button
        v-for="(TagType, index) in cardsTypeTags"
        :key="index"
        :tagIndex="index"
        @selectTag="setActiveTypeTag"
        :class="[
          getTagItemActive(activeType, index),
          getTagDisable(card.types, index),
          CardStyles.TagsItem,
          BtnTag.Tag
        ]"
      >
        <template slot="ButtonText"> {{ TagType }} </template>
      </Button>
      <!-- getTagItemActive,getTagDisable define css styles depending on conditions   -->
      <Button
        v-for="tagSize in cardsSizesTags"
        :key="tagSize"
        :tagIndex="tagSize"
        @selectTag="setActiveSizeTag"
        :class="[
          getTagItemActive(activeSize, tagSize),
          getTagDisable(card.sizes, tagSize),
          CardStyles.TagsItem,
          BtnTag.Tag
        ]"
      >
        <template slot="ButtonText"> {{ tagSize }} см. </template>
      </Button>
    </div>
    <div :class="CardStyles.PizzaAdd">
      <h3 :class="CardStyles.PizzaPrice">от {{ card.price }} ₽</h3>
      <template>
        <!-- We receive all the card data and send them to the function for adding pizza to the basket  -->
        <Button
          @click.native="
            [
              onClickAddPizza(pizzaObj),
              handlerCardItemCounter(cardIndex, cardTypeData)
            ]
          "
          :class="[CardStyles.AddBtn, getAddBtnSelected()]"
        >
          <template slot="Icon">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              :class="CardStyles.AddBtnIcon"
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
            <template v-if="cardCount !== null">
              <i :class="CardStyles.AmountNumber">
                {{ cardCount }}
              </i>
            </template>
          </template>
        </Button>
      </template>
    </div>
  </div>
</template>
