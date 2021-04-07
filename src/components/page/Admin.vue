<template>
    <div id="admin-wrap">
        <div class="admin-options">
            <el-col :span="12">
                <el-menu
                    default-active="comments"
                    class="el-menu-vertical-demo"
                    @select="show"
                    @open="handleOpen"
                    @close="handleClose"
                    text-color="#fff"
                    active-text-color="#ff7b00"
                    background-color="#545c64"
                >
                    <el-menu-item index="comments">
                        <i class="el-icon-s-comment"></i>
                        <span slot="title">评论管理</span>
                    </el-menu-item>
                    <el-menu-item
                        index="users"
                        :disabled="user == null || user.role != 'admin'"
                    >
                        <i class="el-icon-user-solid"></i>
                        <span slot="title">用户管理</span>
                    </el-menu-item>
                    <el-menu-item index="posts">
                        <i class="el-icon-document"></i>
                        <span slot="title">帖子管理</span>
                    </el-menu-item>
                    <el-menu-item index="myinfo">
                        <i class="el-icon-s-custom"></i>
                        <span slot="title">个人信息</span>
                    </el-menu-item>
                    <el-menu-item index="carousel" :disabled="user == null || user.role != 'admin'">
                        <i class="el-icon-picture"></i>
                        <span slot="title">轮播图片</span>
                    </el-menu-item>
                    <el-menu-item index="announces" :disabled="user == null || user.role != 'admin'">
                        <i class="el-icon-chat-dot-round"></i>
                        <span slot="title">网站公告</span>
                    </el-menu-item>
                </el-menu>
            </el-col>
        </div>
        <div class="option-content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        show(index, indexPath) {
            var self = this;
            console.log(index);
            self.$router.push("/admin/" + index);
        },
    },
    data() {
        return {
            user: {
                role: "",
            },
        };
    },
    created() {
        var self = this;
        self.user = JSON.parse(localStorage.getItem("currentUser"));
    },
};
</script>

<style lang="scss" scoped>
#admin-wrap {
    width: 85%;
    min-height: 900px;
    height: 100%;
    display: flex;
    box-sizing: border-box;
    margin: 20px auto;
    border: 1px solid #dcdfe6;
    border-radius: 10px;
    overflow: hidden;
}
.admin-options {
    width: 10%;
    // height: 100%;
    background: #545c64;
}
.option-content {
    width: 90%;
    height: 100%;
    box-sizing: border-box;
    padding: 10px;
}
.el-col {
    width: 100%;
}
.el-menu {
    border: none;
}
.el-menu-item {
    text-align: center;
}
</style>
