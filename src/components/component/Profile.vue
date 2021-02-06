<template>
    <div id="profile_wrap">
        <div id="my_head_and_info">
            <!-- 头像、昵称、其他信息 -->
            <div class="header_img" v-show="isLogin">
                <img src="../../../assets/img/header.png" alt="" class="header" />
            </div>
            <div class="other_info" v-show="isLogin">
                <p class="nickname">Dwyane Wade</p>
            </div>
            <div class="login_notice" v-show="!isLogin">
                <p>登录获取更好的体验</p>
                <button class="show_login_btn">登录</button>
            </div>
        </div>
        <div id="option_nav">
            <!-- 导航信息、路由 -->
            <div class="option" :class="{ option_active: currentOption == option.optionName }" v-for="(option, index) in options" :key="index" @click="goToOption(option.optionName)">
                <span class="option_icon">
                    <i :class="option.icon" class="navIcon"></i>
                </span>
                <span class="option_name">{{ option.showName }}</span>
            </div>
        </div>
        <div id="my_music">
            <!-- 关于我、路由 -->
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
    computed: mapState([
        'isLogin'
    ]),
    data() {
        return {
            currentOption: "home",
            options: [
                {
                    icon: "fa fa-home",
                    optionName: "Home",
                    showName: '首页'
                },
                {
                    icon: "fa fa-folder",
                    optionName: "Album",
                    showName: '专辑'
                },
                {
                    icon: "fa fa-compass",
                    optionName: "Browse",
                    showName: '浏览'
                },
                {
                    icon: "fa fa-user",
                    optionName: "Artists",
                    showName: '歌手'
                },
                {
                    icon: "fa fa-video-camera",
                    optionName: "Videos",
                    showName: '视频'
                },
                {
                    icon: "fa fa-user-circle",
                    optionName: "MyInfo",
                    showName: '关于'
                },
            ],
        };
    },
    mounted() {
        var self = this;
        self.currentOption = sessionStorage.getItem("optionName");
    },
    methods: {
        goToOption(optionName) {
            var self = this;
            sessionStorage.setItem("optionName", optionName);
            self.currentOption = optionName;
            self.$router.push('/' + optionName);
        },
    },
};
</script>
<style lang="scss" scoped>
@import "../scss/mixins.scss";
@import '../scss/theme.scss';
#profile_wrap{
    position: relative;
}
p {
    margin: 0;
    padding: 0;
}
#my_head_and_info {
    height: 25%;
    margin-top: 30px;
}
#option_nav {
    margin-top: 20px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.option {
    width: 60%;
    height: 30px;
    text-align: left;
    transition: all 0.3s ease;
    line-height: 30px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    color: $font-color-dark;
}
.option:hover {
    cursor: pointer;
    color: $font-highlight-color-dark;
}
.option_active {
    color: $font-highlight-color-dark;
}
.option_icon {
    width: 14px;
    height: 14px;
    text-align: center;
    line-height: 14px;
    display: inline-block;
}
.navIcon{
    float: left;
}
.option_name {
    display: inline-block;
    margin-left: 10px;
}
.header_img {
    @include display-center;
}
.header {
    width: 90px;
    border-radius: 50%;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
}
.other_info {
    text-align: center;
}
.nickname {
    margin-top: 10px;
    color: $font-highlight-color-dark;
}
.otherinfo {
    color: rgb(144, 150, 169);
}
#platform_info{
    width: 80%;
    height: 90px;
    background: #e8ecf7;
    border-radius: 20px;
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
}
.login_notice{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}
.login_notice p {
    margin-bottom: 10px;
    color: $font-highlight-color-dark;
}
.show_login_btn{
    width: 50%;
    height: 30px;
    border-radius: 16px;
    outline: none;
    box-shadow: none;
    border: none;
    background: #fd5833;
    color: #fff;
    transition: all ease .3s;
}
.show_login_btn:hover{
    cursor: pointer;
}
.show_login_btn:active{
    box-shadow: 0 0 10px #fd5833;
    border:none;
    outline: none;
    transform: scale(0.9);
}
</style>
