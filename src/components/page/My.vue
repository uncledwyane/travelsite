<template>
    <div class="my-container">
        <div class="navigation">
            <div class="nav mycollect" :class="nav == 'mycollect' ? 'active' : ''" @click="switchNav('mycollect')">
                <i class="fa fa-bars"></i>
                <p>我的收藏</p>
            </div>
            <div class="nav mystar" :class="nav == 'mystar' ? 'active' : ''" @click="switchNav('mystar')">
                <i class="fa fa-star-half-full"></i>
                <p>我的点赞</p>
            </div>
            <div class="nav myinfo" :class="nav == 'myinfo' ? 'active' : ''" @click="switchNav('myinfo')">
                <i class="fa fa-user-circle"></i>
                <p>我的信息</p>
            </div>
            <div class="nav mypost" :class="nav == 'mypost' ? 'active' : ''" @click="switchNav('mypost')">
                <i class="fa fa-comments-o"></i>
                <p>我的帖子</p>
            </div>
        </div>
        <div class="content collect" v-show="nav == 'mycollect'"></div>
        <div class="content star" v-show="nav == 'mystar'"></div>
        <div class="content info" v-show="nav == 'myinfo'"></div>
        <div class="content post" v-show="nav == 'mypost'"></div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            nav: 'mycollect',
            content: 'collect',
            myposts: null,
            mycollects: null,
            mystars: null,
            myinfo: null
        }
    },
    created(){
        
    },
    methods: {
        switchNav(nav){
            var self = this;
            self.nav = nav;
        },
        getMyCollect(){

        },
        getMyStar(){

        },
        getMyPost(){

        },
        getMyInfo(){

        },
        getData(api){
            var self = this;
            self.$axios.get(api).then(function(res){
                console.log('+++getData, api: ', api, '   data: ', res.data);
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .my-container{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .navigation{
        width: 50%;
        display: flex;
        margin: 30px 0;
        border-radius: 40px;
        overflow: hidden;
        box-shadow: 0 0 15px rgba(0,0,0,.1);
    }
    .nav{
        width: 25%;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all ease .3s;
    }
    .nav:hover{
        background: #ff7b00;
        color: #fff;
        cursor: pointer;
    }
    .active{
        background: #ff7b00;
        color: #fff;
        cursor: pointer;
    }
    .content{
        width: 60%;
        box-sizing: border-box;
        padding: 20px;
    }
</style>