<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li v-for="(item,index) in goods" class="menu-item" :class="{'current': currentIndex === index}"
              @click="selectMenu(index)">
          <span class="text border-1px">
            <span v-show="item.type > 0" class="icon"><icon :size="3" :type="item.type"></icon></span>{{item.name}}
          </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul>
          <li v-for="item in goods" class="food-list" ref="foodList">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li class="food-item border-1px" v-for="food in item.foods" @click="selectFood(food)">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span v-if="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <cartcontrol :food="food" @increase="foodIncrease" @decrease="foodDecrease"></cartcontrol>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <shopcart :selectFoods="selectFoods" :delivery-price="seller.deliveryPrice"
                :min-price="seller.minPrice"
                @increase="foodIncrease" @decrease="foodDecrease" @empty="empty"
                ref="shopcart"></shopcart>
    </div>
    <food :food="selectedFood" @increase="foodIncrease" @decrease="foodDecrease" ref="food"></food>
  </div>
</template>

<script type="text/ecmascript-6">
  import icon from 'components/icon/icon';
  import shopcart from 'components/shopcart/shopcart';
  import IScroll from 'iscroll/build/iscroll-probe';
  import cartcontrol from 'components/cartcontrol/cartcontrol';
  import food from 'components/food/food';
  import {mapGetters, mapActions, mapMutations} from 'vuex';

  export default {
    components: {
      icon, shopcart, cartcontrol, food
    },
    props: {
      seller: Object
    },
    data() {
      return {
        listHeight: [],
        scrollY: 0,
        selectedFood: {}
      };
    },
    computed: {
      ...mapGetters({
        goods: 'goods',
        selectFoods: 'selectFoods'
      }),
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
          }
        }
        return 0;
      }
    },
    created() {
      this.initGoods()
        .then(() => {
          this.$nextTick(() => {
            this._initScroll();
            this._caculateHeight();
          });
        });
    },
    methods: {
      ...mapMutations({
        increase: 'INCREASE_FOOD_COUNT',
        decrease: 'DECREASE_FOOD_COUNT',
        reset: 'RESET_COUNT'
      }),
      ...mapActions({
        initGoods: 'initGoods'
      }),
      selectMenu(index) {
        let foodList = this.$refs.foodList;
        let el = foodList[index];
        this.foodsScroll.scrollToElement(el, 300);
      },
      _initScroll() {
        this.menuScroll = new IScroll(this.$refs.menuWrapper, {
            click: true,
            mouseWheel: true
          }
        );

        this.foodsScroll = new IScroll(this.$refs.foodsWrapper, {
          probeType: 3, mouseWheel: true, click: true
        });

        let context = this;
        this.foodsScroll.on('scroll', function () {
          context.scrollY = Math.abs(Math.round(this.y));
        });
      },
      _caculateHeight() {
        let foodList = this.$refs.foodList;
        let height = 0;
        this.listHeight.push(height);
        foodList.forEach(food => {
          height += food.clientHeight;
          this.listHeight.push(height);
        });
      },
      foodIncrease(obj) {
        this._drop(obj.el);
        this.increase(obj.food);
      },
      foodDecrease(food) {
        this.decrease(food);
      },
      empty() {
        this.reset();
      },
      _drop(el) {
        this.$refs.shopcart.drop(el);
      },
      selectFood(food) {
        this.selectedFood = food;
        this.$refs.food.show();
      }
    }

  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl'

  .goods
    position: absolute
    top: 174px
    bottom: 46px
    width: 100%
    overflow: hidden
    display: flex
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      font-size: 0
      .menu-item
        display: table
        height: 54px
        width: 56px
        line-height: 14px
        padding: 0 12px
        &.current
          position: relative;
          margin-top: -1px
          z-index: 10
          font-weight: 700
          background: #ffffff
          .text
            border-1px-none()
        .icon
          margin-right: 2px
        .text
          display: table-cell
          vertical-align: middle
          font-size: 12px
          border-1px(rgba(7, 17, 27, 0.1))
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: solid 2px #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-1px-none()
          margin-bottom: 0px
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            margin-bottom: 8px
            line-height: 12px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
