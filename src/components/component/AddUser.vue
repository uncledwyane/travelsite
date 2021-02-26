<template>
    <div id="edit-wrap">
        <div class="edit-body">
            <el-form label-position="top" label-width="80px" :model="currentUser">
                <el-form-item label="用户名">
                    <el-input v-model="currentUser.username"></el-input>
                </el-form-item>
                <el-form-item label="账号">
                    <el-input v-model="currentUser.account"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="currentUser.password"></el-input>
                </el-form-item>
                <el-form-item label="头像链接">
                    <el-input v-model="currentUser.header_url"></el-input>
                </el-form-item>
                <el-form-item label="角色">
                    <el-radio v-model="currentUser.role" label="user">普通用户</el-radio>
                    <el-radio v-model="currentUser.role" label="admin">管理员</el-radio>
                </el-form-item>
                <el-form-item label="生日">
                    <el-date-picker
                        type="date"
                        placeholder="选择日期"
                        style="width: 100%"
                        v-model="currentUser.birthday"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item style="margin-top: 20px">
                    <el-button type="success" @click="addUser">添加用户</el-button>
                </el-form-item>
            </el-form>
            <el-button
                type="danger"
                icon="el-icon-close"
                circle
                class="close-btn"
                @click="close"
            ></el-button>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import bus from "@/components/bus";
export default {
    data() {
        return {
            currentUser: {
                account: "",
                age: 0,
                birthday: "",
                createtime: "",
                header_url: null,
                role: "",
                password: "",
                username: "",
                user_id: "",
            },
            state: "modify",
        };
    },
    computed: {
        ...mapState(["editUser"]),
    },
    created() {
        var self = this;
        bus.$on("setState", function (state) {
            console.log("setState recived", state);
            self.state = state;
        });
    },
    mounted() {
        var self = this;
    },
    methods: {
        ...mapMutations(["setIsshowAdd", "logout"]),
        modify() {
            var self = this;
            var params = self.currentUser;
            self.$axios.post("/updateuser", params).then(function (res) {
                console.log(res);
                self.$axios.get("/alluser").then(function (res) {
                    bus.$emit("updateusers", res.data.data);
                    self.$message({
                        type: "success",
                        message: "更改成功！",
                    });
                    self.setIsshowAdd(false);
                });
                if (
                    self.currentUser.user_id ==
                    JSON.parse(localStorage.getItem("currentUser")).user_id
                ) {
                    self.$router.push("/login");
                    localStorage.removeItem("currentUser");
                    localStorage.removeItem("isLogin");
                    localStorage.removeItem("currentNav");
                    location.reload();
                }
            });
        },
        addUser() {
            var self = this;
            var params = self.currentUser;
            console.log(params);
            self.$axios.post("/adduser", params).then(function (res) {
                if (res.data.code == 3001) {
                    self.$message.error("账号已存在，请重新输入！");
                } else if (res.data.code == 3000) {
                    self.$message({
                        type: "success",
                        message: "添加成功！",
                    });
                    self.clearCurrentUser();
                    self.setIsshowAdd(false);
                    self.$axios.get("/alluser").then(function (res) {
                        bus.$emit("updateusers", res.data.data);
                    });
                }
            });
        },
        clearCurrentUser() {
            var self = this;
            for (var i in self.currentUser) {
                self.currentUser[i] = "";
            }
        },
        close() {
            var self = this;
            self.setIsshowAdd(false);
            self.clearCurrentUser();
        },
    },
};
</script>

<style lang="scss" scoped>
#edit-wrap {
    width: 100vw;
    position: fixed;
    top: 0px;
    left: 0px;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 3;
    background: rgba(0, 0, 0, 0.4);
}
.edit-body {
    width: 60%;
    height: 70vh;
    background: #fff;
    box-sizing: border-box;
    padding: 20px;
    border-radius: 10px;
    position: relative;
}
.el-form-item {
    margin-bottom: 0px !important;
}
.close-btn {
    position: absolute;
    right: 5px;
    top: 5px;
}
</style>
