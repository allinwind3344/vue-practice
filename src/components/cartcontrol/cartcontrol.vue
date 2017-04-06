<template>
  <div class="cartcontrol">
    <transition name="slide-fade-rotate">
      <div class="decrease icon-remove_circle_outline" @click.stop.prevent="decrease" v-show="food.count > 0"></div>
    </transition>
    <div class="count" v-show="food.count > 0">{{food.count}}</div>
    <div class="increase icon-add_circle" @click.stop.prevent="increase"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      food: Object
    },
    methods: {
      increase(event) {
        this.$emit('increase', {food: this.food, el: event.target});
      },
      decrease(event) {
        if (this.food.count) {
          this.$emit('decrease', this.food);
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .cartcontrol
    font-size: 0
    .decrease
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)
      opacity: 1
      &.slide-fade-rotate-enter-active, &.slide-fade-rotate-leave-active
        transition: all .3s linear
      &.slide-fade-rotate-enter, &.slide-fade-rotate-leave-to
        opacity: 0
        transform: translateX(24px) rotate(180deg)
    .count
      display: inline-block
      vertical-align: top
      width: 12px
      padding-top: 6px
      text-align: center
      line-height: 24px
      font-size: 10px
      color: rgb(147, 153, 159)
    .increase
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)

</style>
