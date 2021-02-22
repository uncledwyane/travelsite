<template>
  <div id="app">
      <div id="navigator">
          <div class="navs">
              <div class="nav-item" v-for="(nav, index) in navs" :key="index" :class="{'nav-active': nav.name === currentNav}" @click="goTo(nav.path)">
                  {{ nav.showName }}
              </div>
          </div>
      </div>
      <div id="content">
          <router-view></router-view>
      </div>
      <div id="bottom-info"></div>
      <login v-show="!isLogin"></login>
  </div>
</template>

<script>
import Login from '@/components/component/Login'
import {mapState} from 'vuex'
export default {
    data () {
        return {
            currentNav:'home',
            navs: [
                {
                    name: 'home',
                    showName: '首页',
                    path: '/home'
                },
                {
                    name: 'seize',
                    showName: '攻略',
                    path: '/seize'
                },
                {   
                    name: 'comm',
                    showName: '社区',
                    path: '/comm'
                },
                {
                    name: 'admin',
                    showName: '后台',
                    path: '/admin'
                }
            ]      
        }
    },
    computed: {
        ...mapState([
            'isLogin'
        ])
    },
    components: {
        Login
    },
    methods: {
        goTo(path){
            var self = this;
            var name = path.substr(1, path.length - 1);
            console.log(name);
            self.updateNav(name);
            self.$router.push(path);
        },
        updateNav(navName){
            var self = this;
            self.currentNav = navName;
        }
    }
}
</script>

<style lang='scss' scoped>
    #app{
        height: auto;
        display: flex;
        flex-direction: column;
    }
    #navigator{
        width: 100%;
        height: 80px;
        display: flex;
        background: #fff;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1;
        justify-content: center;
    }
    .navs{
        width: 50%;
        display: flex;
    }
    .nav-item{
        width: 25%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .nav-item:hover{
        background: rgb(255, 123, 0);
        cursor: pointer;
        color: #fff;
    }
    .nav-active{
        background: rgb(255, 123, 0);
        color: #fff;
    }
    #content{
        width: 100%;
        margin-top: 80px;
    }
    #bottom-info{
        width: 100%;
        height: 130px;
        background: rgb(56, 56, 56);
    }
</style>