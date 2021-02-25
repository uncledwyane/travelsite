import VueRouter from 'vue-router'
import Home from '@/components/page/Home'
import Admin from '@/components/page/Admin'
import Comments from '@/components/component/Comments'
import Users from '@/components/component/Users'
import Posts from '@/components/component/Posts'
import MyInfo from '@/components/component/MyInfo'

export default new VueRouter({
    // mode: 'history',
    routes: [
        {path: '/', name: '/', redirect: '/admin'},
        {
            path: '/home', name: 'name', component: Home
        },
        {
            path: '/admin', name: 'admin', component: Admin,
            redirect: '/admin/comments',
            children: [
                {
                    path: 'comments', component: Comments
                },
                {
                    path: 'users', component: Users
                },
                {
                    path: 'posts', component: Posts
                },
                {
                    path: 'myinfo', component: MyInfo
                }
            ]
        }
    ]
})