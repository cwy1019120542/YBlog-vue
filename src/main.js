import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import mixins from './mixins';
import 'api/axios';
import	ElementUI from 'element-ui'
Vue.use(ElementUI)
Vue.mixin(mixins);
Vue.config.productionTip = false;
//注册element-ui组件
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
