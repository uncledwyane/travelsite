import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import App from './components/page/App.vue'
import router from './router/router'
import Axios from 'axios'
import store from '@/store/index.js'
import CustomTheme from '@/components/theme'


Vue.use(VueRouter)
Vue.use(Vuex)

Axios.defaults.withCredentials = true
Vue.prototype.$axios = Axios



new Vue({
    render: r=>r(App, 'mu-button', {}, 'Hello World'),
    router,
    store
}).$mount('#app')