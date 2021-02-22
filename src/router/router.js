import VueRouter from 'vue-router'
import Home from '@/components/page/Home'

export default new VueRouter({
    // mode: 'history',
    routes: [
        {path: '/', name: '/', redirect: '/home'},
        {path: '/home', name: 'name', component: Home},
        
        
    ]
})