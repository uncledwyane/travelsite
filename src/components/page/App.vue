<template>
    <div id="app" :style="{ 'background-color': mainColor }">
        <profile id="profile"></profile>
        <toptool id="toptool"></toptool>
        <login id='login_wrap'></login>
        <transition name="routerview" mode="in-out">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </transition>

        <audio ref="musicAudio" id="musicAudio"></audio>
    </div>
</template>

<script>
import theme from "@/components/scss/theme.scss";
import themeCSS from "@/components/theme";
import Profile from "@/components/component/Profile";
import Toptool from "@/components/component/Toptool";
import Login from '@/components/component/Login';
export default {
    data() {
        return {
            mainColor: themeCSS.light_theme,
        };
    },
    mounted() {},
    components: {
        Profile,
        Toptool,
        Login
    },
};
</script>

<style lang="scss" scoped>
@import "../scss/mixins.scss";
@import "../scss/theme.scss";
#app {
    width: 1280px;
    height: 720px;
    z-index: 0;
    overflow: hidden;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    @include position-center;
    border-radius: 20px;
    padding: 60px 0 0 12%;
    #profile {
        width: 12%;
        height: 100%;
        padding: 10px;
        box-sizing: border-box;
        overflow: hidden;
        border-radius: 20px 0 0 20px;
        overflow: hidden;
        user-select: none;
        background: $front-color-dark;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1;
    }
    #toptool {
        position: absolute;
        top: 0;
        left: 12%;
        height: 60px;
        width: 88%;
        border-radius: 0 20px 0 0;
        display: flex;
        align-items: center;
        background: $front-color-dark;
        z-index: 1;
    }
}

p {
    margin: 0;
    padding: 0;
}

.routerview-enter-active,
.routerview-leave-active {
    transition: all 0.5s ease;
}
.routerview-enter,
.routerview-leave-to {
    transform: translateY(-100%);
    opacity: 0;
}
.routerview-enter-to {
    opacity: 1;
}
#login_wrap{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
}
</style>
