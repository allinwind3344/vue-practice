/**
 * Created by ncs on 4/5/17.
 */

import * as types from '../mutation-types';
import Vue from 'vue';
import Rx from 'rxjs';

const _OK = 0;

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
    return Rx.Observable.fromPromise(Vue.http.get('/api/seller?id=' + id))
      .map(res => {
        res = res.body;
        if (res.errno === _OK) {
          commit(types.INIT_SELLER, {seller: res.data, id});
        }
        return;
      }).toPromise();
  }
};

export default {
  state, getters, mutations, actions
};
