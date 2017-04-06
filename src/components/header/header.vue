<template>
  <header class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon">
            <icon :size="1" :type="seller.supports[0].type"></icon>
          </span>
          <!--<span class="icon" :class="classMap[seller.supports[0].type]"></span>-->
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <transition name="fade">
    <div v-show="detailShow" class="detail">
      <div class="detailWrapper clearfix">
        <div class="detail-main">
           <h1 class="name">{{seller.name}}</h1>
          <div class="star-wrapper">
            <star :size="48" :score="seller.score"></star>
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul class="supports" v-if="seller.supports">
            <li class="support-item" v-for="(item,index) in seller.supports">
              <span class="icon">
                <icon :size="2" :type="seller.supports[index].type"></icon>
              </span>
              <!--<span class="icon" :class="classMap[seller.supports[index].type]"></span>-->
              <span class="text">{{seller.supports[index].description}}</span>
            </li>
          </ul>
          <div class="title">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <div class="bulletin">
            <p class="content">{{seller.bulletin}}</p>
          </div>
        </div>
      </div>
      <div class="detail-close" @click="hideDetail">
        <i class="icon-close"></i>
      </div>
    </div>
    </transition>
  </header>

</template>

<script type="text/ecmascript-6">
  import star from 'components/star/star';
  import icon from 'components/icon/icon';

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
       return {
           detailShow: false
       };
    },
    methods: {
        showDetail() {
            this.detailShow = true;
        },
        hideDetail() {
            this.detailShow = false;
        }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    components: {
        star, icon
    }

  };

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin"

  .header
    position: relative
    color: #ffffff
    overflow: hidden
    background: rgba(7,17,27,0.5)
    .content-wrapper
      position: relative
      padding: 24px 16px 18px
      font-size: 0
      .avatar
        display: inline-block
        vertical-align: top
        img
          border-radius: 2px
      .content
        margin-left: 16px
        display: inline-block
        .title
          margin: 2px 0 8px 0
          .brand
            display: inline-block
            vertical-align: top
            width: 30px
            height: 18px
            bg-image('brand')
            background-size: 30px 18px
            background-repeat: no-repeat
          .name
            margin-left: 6px
            font-size: 16px
            font-weight: bold
            line-height: 18px
        .description
          margin-bottom: 10px
          font-size: 12px
          line-height: 12px
        .support
          .icon
            margin-right: 2px
          .text
            line-height: 12px
            font-size: 10px
      .support-count
        position: absolute
        right: 12px
        bottom: 14px
        padding: 0 8px
        height: 24px
        line-height: 24px
        border-radius: 14px
        background: rgba(0,0,0,0.2)
        text-align: center
        cursor: pointer
        .count
          vertical-align: top
          font-size: 10px
        .icon-keyboard_arrow_right
          margin-left: 2px
          line-height: 24px
          font-size: 10px


    .bulletin-wrapper
      position: relative
      height: 28px
      line-height: 28px
      padding: 0 22px 0 12px
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
      background: rgba(7,17,27,0.2)
      cursor: pointer
      .bulletin-title
        display: inline-block
        margin-top: 8px
        vertical-align: top
        width: 22px
        height: 12px
        bg-image('bulletin')
        background-size: 22px 12px
        background-repeat: no-repeat
      .bulletin-text
        margin: 0 4px
        vertical-align: top
        font-size: 10px
      .icon-keyboard_arrow_right
        position: absolute
        font-size: 10px
        right: 12px
        top: 10px


    .background
      position: absolute
      top: 0px
      left: 0px
      width: 100%
      height: 100%
      z-index: -1
      filter: blur(10px)
    .detail
      position: fixed
      top: 0px
      left: 0px
      z-index: 100
      width: 100%
      height: 100%
      overflow: auto
      opacity: 1
      background: rgba(7,17,27,0.8)
      backdrop-filter: blur(10px)
      &.fade-enter-active, &.fade-leave-active
        transition: all .5s
      &.fade-enter, &.fade-leave-active
        opacity: 0
        background: rgba(7,17,27,0)
      .detailWrapper
        min-height: 100%
        width: 100%
        .detail-main
          margin-top: 64px
          padding-bottom: 64px
          .name
            font-size: 16px
            line-height: 16px
            font-weight: 700
            text-align: center
          .star-wrapper
            margin-top: 16px
            padding: 2px 0
            text-align: center
          .title
            display: flex
            width: 80%
            margin: 28px auto 24px auto
            .line
              position: relative
              margin-top: -6px
              flex: 1
              height: 13px
              border-bottom: solid 1px rgba(255,255,255,0.2)
            .text
              padding: 0 12px
              font-size: 14px
              font-weight: 700
          .supports
            width: 80%
            margin: 0 auto
            .support-item
              padding: 0 12px
              margin-bottom: 12px
              font-size: 0
              &::last-child
                margin-bottom: 0
              .icon
                margin-right: 6px
              .text
                line-height: 16px
                font-size: 12px
          .bulletin
            width: 80%
            margin: 0 auto
            .content
              padding: 0 12px
              line-height: 24px
              font-size: 12px
      .detail-close
        position: relative
        width: 32px
        height: 32px
        margin: -64px auto 0 auto
        clear: both
        font-size: 32px
</style>
