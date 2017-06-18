/**
 * Created by ncs on 4/5/17.
 */

import * as types from '../mutation-types';
import Vue from 'vue';
import Rx from 'rxjs';

// const _OK = 0;
const url = 'http://localhost:3000';

const state = {
  seller: {}
};

const getters = {
  seller: state => state.seller
};

const mutations = {
  [types.INIT_SELLER](state, {seller, id}) {
    state.seller = seller;
    state.seller.id = id;
  }
};

const actions = {
  initSeller({commit}, id) {
    return Rx.Observable.fromPromise(Vue.http.get(url + '/api/seller/' + '59463a9ffb63b1062cb65652'))
      .map(res => {
        res = res.body;
        if (!res.error) {
          commit(types.INIT_SELLER, {seller: res, id});
        }
        return;
      }).toPromise();
  }
};

export default {
  state, getters, mutations, actions
};
