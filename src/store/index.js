import Vuex from "vuex";
import Vue from "vue";
import etherscan from "./modules/etherscan";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
      etherscan,
  }
});