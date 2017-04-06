/**
 * Created by ncs on 4/5/17.
 */
import * as types from '../mutation-types';
import Vue from 'vue';
import Rx from 'rxjs';

const _OK = 0;

const state = {
  ratings: []
};

const getters = {
  ratings: state => state.ratings
};

const mutations = {
  [types.INIT_RATINGS](state, ratings) {
    state.ratings = ratings;
  }
};

const actions = {
  initRatings({commit}) {
    return Rx.Observable.fromPromise(Vue.http.get('/api/ratings'))
      .map(res => {
        res = res.body;
        if (res.errno === _OK) {
          commit(types.INIT_RATINGS, res.data);
        }
        return;
      }).toPromise();
  }
};

export default {
  state, getters, mutations, actions
};
