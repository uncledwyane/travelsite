<template>
    <div id="app">
        <div id="navigator">
            <div class="navs">
                <div
                    class="nav-item"
                    v-for="(nav, index) in navs"
                    :key="index"
                    :class="{ 'nav-active': nav.name === currentNav }"
                    @click="goTo(nav.path)"
                >
                    {{ nav.showName }}
                </div>
            </div>
            <div class="user-info" v-show="loginState">
                <div class="user-name">
                    {{ currentUserName }}
                </div>
                <div class="leave" style="margin-left: 10px">
                    <el-button type="warning" round @click="logout">退出</el-button>
                </div>
            </div>
        </div>
        <div id="content">
            <router-view></router-view>
        </div>
        <div id="bottom-info"></div>
        <login v-show="!loginState"></login>
        <postview v-show="isShowPostview"></postview>
        <edit-user v-if="isShowEdit"></edit-user>
    </div>
</template>

<script>
import Login from "@/components/component/Login";
import Postview from "@/components/component/Postview";
import EditUser from "@/components/component/EditUser";
import { mapState, mapMutations } from "vuex";
import bus from "@/components/bus";
export default {
    data() {
        return {
            currentNav: "home",
            loginState: false,
            currentUserName: "",
            navs: [
                {
                    name: "home",
                    showName: "首页",
                    path: "/home",
                },
                {
                    name: "seize",
                    showName: "攻略",
                    path: "/seize",
                },
                {
                    name: "comm",
                    showName: "社区",
                    path: "/comm",
                },
                {
                    name: "admin",
                    showName: "后台",
                    path: "/admin",
                },
            ],
        };
    },
    computed: {
        ...mapState(["isLogin", "allPosts", "isShowPostview", "isShowEdit"]),
    },
    created() {
        var self = this;
        self.loginState = self.isLogin || Boolean(localStorage.getItem("isLogin"));
    },
    mounted() {
        var self = this;
        if (localStorage.getItem("currentUser")) {
            self.currentUserName = JSON.parse(
                localStorage.getItem("currentUser")
            ).username;
        }
        bus.$on("loginStateChange", function (state) {
            self.loginState = state;
        });
        bus.$on("username", function (name) {
            self.currentUserName = name;
        });
        self.$axios.get("/allposts").then(function (res) {
            self.setAllposts(res.data.data);
            console.log("allPosts: ", self.allPosts);
        });
        if (localStorage.getItem("currentNav")) {
            self.goTo("/" + localStorage.getItem("currentNav"));
        }
    },
    components: {
        Login,
        Postview,
        EditUser,
    },
    methods: {
        ...mapMutations(["setAllposts"]),
        goTo(path) {
            var self = this;
            var name = path.substr(1, path.length - 1);
            self.updateNav(name);
            self.$router.push(path);
        },
        updateNav(navName) {
            var self = this;
            self.currentNav = navName;
            localStorage.setItem("currentNav", navName);
        },
        logout() {
            this.$confirm("请确认是否退出?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(() => {
                localStorage.removeItem("currentUser");
                localStorage.removeItem("isLogin");
                location.reload();
            });
        },
    },
};
</script>

<style lang="scss" scoped>
#app {
    height: auto;
    display: flex;
    flex-direction: column;
}
#navigator {
    width: 100%;
    height: 80px;
    display: flex;
    background: #fff;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    justify-content: center;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
}
.navs {
    width: 50%;
    display: flex;
}
.nav-item {
    width: 25%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.nav-item:hover {
    background: rgb(255, 123, 0);
    cursor: pointer;
    color: #fff;
}
.nav-active {
    background: rgb(255, 123, 0);
    color: #fff;
}
#content {
    width: 100%;
    margin-top: 80px;
    position: relative;
    z-index: 0;
}
#bottom-info {
    width: 100%;
    height: 130px;
    background: rgb(56, 56, 56);
}
.user-info {
    display: flex;
    position: absolute;
    right: 10px;
    top: 0;
    height: 100%;
}
.user-name,
.leave {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
