import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production';
const store = new Vuex.Store({
    strict: debug,
    state: {
        'user_id': 0, 
        'token': '',
        'secret': ''
    },
    mutations: {
        set_token(state, token) {
            state.token = token;
        },
        set_user(state, data) {
            state.user_id = data.user_id
            state.secret = data.secret
        }, 
    },
    actions: {

    },
    modules: {
    }
});

export default store;
