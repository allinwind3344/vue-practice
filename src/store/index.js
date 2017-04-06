/**
 * Created by ncs on 4/5/17.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import seller from './modules/seller';
import goods from './modules/goods';
import ratings from './modules/ratings';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    seller, goods, ratings
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
});

