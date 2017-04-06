<template>
  <div>
    <v-header :seller="seller"></v-header>
    <nav class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </nav>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from 'components/header/header';
  import {urlParse} from 'common/js/util';
  import {mapGetters, mapActions} from 'vuex';

  export default {
    name: 'app',
    components: {
      'v-header': header
    },
    computed: {
      ...mapGetters({seller: 'seller'})
    },
    methods: {
      ...mapActions({initSeller: 'initSeller'})
    },
    data() {
      return {
        id: (() => {
          let queryParam = urlParse();
          return queryParam.id;
        })()
      };
    },
    created() {
       this.initSeller(this.id);
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "common/stylus/mixin.styl"

  .tab
    display: flex
    width: 100%
    height: 40px
    line-height: 40px
    border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      flex: 1
      text-align: center
      & > a
        display: block
        font-size: 14px
        color: rgb(77, 85, 93)
        &.active
          color: rgb(240, 20, 20)

</style>
