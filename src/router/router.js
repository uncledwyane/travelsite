import VueRouter from 'vue-router'
import Homepage from '@/components/page/Homepage'
import Album from '@/components/page/Album'
import Browse from '@/components/page/Browse'
import Artists from '@/components/page/Artists'
import Videos from '@/components/page/Videos'
import Myinfo from '@/components/page/Myinfo'

export default new VueRouter({
    // mode: 'history',
    routes: [
        {path: '/', name: '/'},
        {path: '/home', name: 'home', component: Homepage},
        {path: '/album', name: 'album', component: Album},
        {path: '/browse', name: 'browse', component: Browse},
        {path: '/artists', name: 'artists', component: Artists},
        {path: '/videos', name: 'videos', component: Videos},
        {path: '/myinfo', name: 'myinfo', component: Myinfo}
    ]
})