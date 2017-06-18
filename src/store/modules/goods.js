/**
 * Created by ncs on 4/5/17.
 */

import * as types from '../mutation-types';
import Vue from 'vue';
import Rx from 'rxjs';

// const _OK = 0;
const url = 'http://localhost:3000';

const state = {
  goods: []
};

const getters = {
  goods: state => state.goods,
  selectFoods: state => {
    let foods = [];
    state.goods.forEach(good => {
      good.foods.forEach(food => {
        if (food.count) {
          foods.push(food);
        }
      });
    });
    return foods;
  }
};

const mutations = {
  [types.INIT_GOODS](state, goods) {
    console.log(goods);
    state.goods = goods;
  },
  [types.INCREASE_FOOD_COUNT](state, food) {
    if (!food.count) {
      Vue.set(food, 'count', 1);
    } else {
      food.count++;
    }
  },
  [types.DECREASE_FOOD_COUNT](state, food) {
    food.count--;
  },
  [types.RESET_COUNT](state) {
    state.goods.forEach(good => {
      good.foods.forEach(food => {
        if (food.count) {
          food.count = 0;
        }
      });
    });
  }
};

const actions = {
  initGoods({commit}) {
    return Rx.Observable.fromPromise(Vue.http.get(url + '/api/goods'))
      .map(res => {
        res = res.body;
        if (!res.error) {
          commit(types.INIT_GOODS, res);
        }
        return;
      }).toPromise();
  }
};

export default {
  state, getters, mutations, actions
};
