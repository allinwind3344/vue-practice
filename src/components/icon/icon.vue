<template>
  <span class="icon" :class="iconType"></span>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      size: Number,
      type: Number
    },
    computed: {
      iconType() {
        return this.classMap[this.type] + '_' + this.size;
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin'
  .icon
    display: inline-block
    vertical-align: top
    background-repeat: no-repeat
    &.decrease_1
      width: 12px
      height: 12px
      background-size: 12px 12px
      bg-image('decrease_1')
    &.discount_1
      width: 12px
      height: 12px
      background-size: 12px 12px
      bg-image('discount_1')
    &.guarantee_1
      width: 12px
      height: 12px
      background-size: 12px 12px
      bg-image('guarantee_1')
    &.invoice_1
      width: 12px
      height: 12px
      background-size: 12px 12px
      bg-image('invoice_1')
    &.special_1
      width: 12px
      height: 12px
      background-size: 12px 12px
      bg-image('special_1')
    &.decrease_2
      width: 16px
      height: 16px
      background-size: 16px 16px
      bg-image('decrease_2')
    &.discount_2
      width: 16px
      height: 16px
      background-size: 16px 16px
      bg-image('discount_2')
    &.guarantee_2
      width: 16px
      height: 16px
      background-size: 16px 16px
      bg-image('guarantee_2')
    &.invoice_2
      width: 16px
      height: 16px
      background-size: 16px 16px
      bg-image('invoice_2')
    &.special_2
      width: 16px
      height: 16px
      background-size: 16px 16px
      bg-image('special_2')
    &.decrease_3
      width: 12px
      height: 12px
      background-size: 12px 12px
      bg-image('decrease_3')
    &.discount_3
      width: 12px
      height: 12px
      background-size: 12px 12px
      bg-image('discount_3')
    &.guarantee_3
      width: 12px
      height: 12px
      background-size: 12px 12px
      bg-image('guarantee_3')
    &.invoice_3
      width: 12px
      height: 12px
      background-size: 12px 12px
      bg-image('invoice_3')
    &.special_3
      width: 12px
      height: 12px
      background-size: 12px 12px
      bg-image('special_3')
    &.decrease_4
      width: 16px
      height: 16px
      background-size: 16px 16px
      bg-image('decrease_4')
    &.discount_4
      width: 16px
      height: 16px
      background-size: 16px 16px
      bg-image('discount_4')
    &.guarantee_4
      width: 16px
      height: 16px
      background-size: 16px 16px
      bg-image('guarantee_4')
    &.invoice_4
      width: 16px
      height: 16px
      background-size: 16px 16px
      bg-image('invoice_4')
    &.special_4
      width: 16px
      height: 16px
      background-size: 16px 16px
      bg-image('special_4')
</style>
