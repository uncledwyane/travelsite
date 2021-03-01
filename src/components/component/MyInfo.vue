<template>
    <div id="myinfo-manage">
        <el-form
            label-position="top"
            label-width="80px"
            :model="currentUser"
            class="my-info"
        >
            <el-form-item label="用户名">
                <el-input v-model="currentUser.username" readonly></el-input>
            </el-form-item>
            <el-form-item label="账号">
                <el-input v-model="currentUser.account" readonly></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="currentUser.password" readonly></el-input>
            </el-form-item>
            <el-form-item label="头像链接">
                <el-input v-model="currentUser.header_url" readonly></el-input>
            </el-form-item>
            <el-form-item label="角色" v-if="currentUser.role == 'admin'">
                <el-radio v-model="currentUser.role" label="user" disabled border>普通用户</el-radio>
                <el-radio v-model="currentUser.role" label="admin" disabled border>管理员</el-radio>
            </el-form-item>
            <el-form-item label="生日">
                <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    style="width: 100%"
                    v-model="currentUser.birthday"
                    disabled
                ></el-date-picker>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
    data() {
        return {
            currentUser: {
                username: "",
                account: "",
                password: "",
                header_url: "",
                role: "",
                birthday: "",
            },
        };
    },
    created() {
        var self = this;
        // 深拷贝
        self.currentUser = JSON.parse(
            JSON.stringify(JSON.parse(localStorage.getItem("currentUser")))
        );
    },
    methods: {
        ...mapMutations(["logout"]),
        // modify() {
        //     var self = this;
        //     var params = self.currentUser;
        //     self.$axios.post("/updateuser", params).then(function (res) {
        //         console.log(res);
        //         self.$message({
        //             type: "success",
        //             message: "更改成功！即将退出，请重新登录！",
        //         });
        //         setTimeout(() => {
        //             self.$router.push("/login");
        //             localStorage.removeItem("currentUser");
        //             localStorage.removeItem("isLogin");
        //             localStorage.removeItem("currentNav");
        //             location.reload();
        //         }, 1000);
        //     });
        // },
    },
};
</script>

<style lang="scss" scoped>
.my-info {
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
    border: 1px solid #dcdfe6;
}
</style>
