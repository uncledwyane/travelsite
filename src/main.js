import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import App from './components/page/App.vue'
import router from './router/router'
import Axios from 'axios'
import store from '@/store/index.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'



Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)

Axios.defaults.withCredentials = false
Vue.prototype.$axios = Axios

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

new Vue({
    render: r=>r(App),
    router,
    store
}).$mount('#app')