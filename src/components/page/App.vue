<template>
    <div id="app">
        <div id="navigator" v-if="loginState">
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
            <div class="user-info" v-if="loginState">
                <div class="user-name" v-show="header == '' || header == 'null'">
                    {{ currentUserName }}
                </div>
                <div class="user-header" v-show="header != 'null'">
                    <!-- <el-image
                        style="width: 50px; height: 50px; border-radius: 50%"
                        :src="header"
                        contain
                    ></el-image> -->
                    <el-avatar :src="header"></el-avatar>
                </div>
                <div class="leave" style="margin-left: 10px">
                    <el-button type="warning" round @click="logout">退出</el-button>
                </div>
            </div>
        </div>
        <div id="content">
            <transition name="page" mode="out-in">
                <router-view></router-view>
            </transition>
        </div>
        <div id="bottom-info" v-if="loginState">
            <p>转载内容版权归作者及来源网站所有，本站原创内容转载请注明来源</p>
        </div>
        <transition name="component">
            <add-user v-show="isShowAdd"></add-user>
        </transition>
        <transition name="component">
            <postview v-show="isShowPostview"></postview>
        </transition>
        <transition name="component">
            <edit-user v-if="isShowEdit"></edit-user>
        </transition>
        <transition name="component">
            <edit-post v-if="isShowPostEdit"></edit-post>
        </transition>
        <transition name="component">
            <edit-comment v-if="isShowCommentEdit"></edit-comment>
        </transition>
    </div>
</template>

<script>
import Postview from "@/components/component/Postview";
import EditUser from "@/components/component/EditUser";
import EditPost from "@/components/component/EditPost";
import AddUser from "@/components/component/AddUser";
import EditComment from "@/components/component/EditComment";
import { mapState, mapMutations } from "vuex";
import bus from "@/components/bus";
export default {
    data() {
        return {
            currentNav: "home",
            loginState: false,
            currentUserName: "",
            header: "",
            navs: [
                {
                    name: "home",
                    showName: "首页",
                    path: "/home",
                },
                {
                    name: "my",
                    showName: "我的",
                    path: "/my",
                },
                {
                    name: "admin",
                    showName: "后台",
                    path: "/admin",
                }
            ],
        };
    },
    computed: {
        ...mapState([
            "isLogin",
            "allPosts",
            "isShowPostview",
            "isShowEdit",
            "isShowAdd",
            "isShowPostEdit",
            "isShowCommentEdit",
            "allLatestPosts",
        ]),
    },
    created() {
        var self = this;
        self.loginState = self.isLogin || Boolean(localStorage.getItem("isLogin"));
    },
    mounted() {
        var self = this;
        if (localStorage.getItem("currentUser")) {
            var user = JSON.parse(localStorage.getItem("currentUser"));
            self.currentUserName = user.username;
            self.header = user.header_url;
        }
        bus.$on("loginStateChange", function (state) {
            self.loginState = state;
        });
        bus.$on("username", function (name) {
            self.currentUserName = name;
        });
        bus.$on("updateStarsAndCollects", function () {
            self.getStarsAndCollects();
        });

        bus.$on('updateallposts', function(){
            self.getAllPosts();
            self.getAllLatestPosts();
        })
        self.getAllPosts();

        self.getAllLatestPosts();

        self.getStarsAndCollects();
        if (localStorage.getItem("currentNav")) {
            self.goTo("/" + localStorage.getItem("currentNav"));
        }
    },
    components: {
        Postview,
        EditUser,
        AddUser,
        EditPost,
        EditComment,
    },
    methods: {
        ...mapMutations([
            "setAllposts",
            "setAllLatestPosts",
            "setCurrentUserStar",
            "setCurrentUserCollect",
        ]),
        getAllLatestPosts(){
            var self = this;
            self.$axios.get("/allpostslatest").then(function (res) {
                self.setAllLatestPosts(res.data.data);
                console.log("allLatestPosts: ", self.allLatestPosts);
            });
        },
        getAllPosts(){
            var self = this;
            self.$axios.get("/allposts").then(function (res) {
                self.setAllposts(res.data.data);
                console.log("allPosts: ", self.allPosts);
            });
        },
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
        getStarsAndCollects() {
            var self = this;
            self.$axios
                .get("/allstars", {
                    params: {
                        user_id: JSON.parse(localStorage.getItem("currentUser")).user_id,
                    },
                })
                .then(function (res) {
                    console.log("allstarts ", res.data.data);
                    self.setCurrentUserStar(res.data.data);
                });

            self.$axios
                .get("/allcollects", {
                    params: {
                        user_id: JSON.parse(localStorage.getItem("currentUser")).user_id,
                    },
                })
                .then(function (res) {
                    console.log("allcollects ", res.data.data);
                    self.setCurrentUserCollect(res.data.data);
                });
        },
        logout() {
            var self = this;
            self.$confirm("请确认是否退出?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(() => {
                self.$router.push("/login");
                localStorage.removeItem("currentUser");
                localStorage.removeItem("isLogin");
                localStorage.removeItem("currentNav");
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
    justify-content: center;
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
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgb(167, 167, 167);
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
.component-enter-active,
.component-leave-active {
    transition: all ease 0.3s;
}
.component-enter,
.component-leave-to {
    transform: scale(1);
    opacity: 0;
}
.component-enter-to {
    opacity: 1;
}
.image-slot {
    width: 100%;
    height: 100%;
    /* text-align: center; */
    /* line-height: 100%; */
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 40px;
    color: grey;
}
.page-enter-active,
.page-leave-active {
    transition: all ease 0.3s;
}
.page-enter,
.page-leave-to {
    // transform: translateX(100vw);
    opacity: 0;
}
.page-enter-to {
    opacity: 1;
}
.user-header {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
