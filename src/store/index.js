import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production';
const store = new Vuex.Store({
    strict: debug,
    state: {
    },
    mutations: {
    },
    actions: {

    },
    modules: {
    }
});

export default store;
