<template>
    <div id="users-manage">
        <div class="find-user">
            <el-input
                placeholder="请输入用户名"
                v-model="searchAccount"
                class="input-with-select"
                type="text"
            >
                <el-button
                    slot="append"
                    icon="el-icon-search"
                    style="color: #67c23a"
                    @click="searchByAccount"
                    :loading="searchLoading"
                    :disabled="searchAccount == ''"
                    >搜索</el-button
                >
                <el-button
                    slot="append"
                    icon="el-icon-close"
                    style="color: #f56c6c"
                    @click="clearSearch"
                    :loading="clearLoading"
                    :disabled="searchAccount == ''"
                    >清除</el-button
                >
            </el-input>
        </div>
        <el-table :data="users" style="width: 100%" border stripe>
            <el-table-column label="生日" width="120">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{
                        scope.row.birthday | filterDate(scope.row.birthday)
                    }}</span>
                </template>
            </el-table-column>
            <el-table-column label="姓名" width="150">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{
                        scope.row.username | isSelf(scope.row.username)
                    }}</span>
                </template>
            </el-table-column>
            <el-table-column label="账号" width="150">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.account }}</span>
                </template>
            </el-table-column>
            <el-table-column label="是否冻结" width="100">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{
                        scope.row.isforze | isForze(scope.row.isforze)
                    }}</span>
                </template>
            </el-table-column>
            <el-table-column label="密码" width="150">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.password }}</span>
                </template>
            </el-table-column>
            <el-table-column label="年龄" width="80">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.age }}岁</span>
                </template>
            </el-table-column>
            <el-table-column label="用户ID" width="250">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.user_id }}</span>
                </template>
            </el-table-column>
            <el-table-column label="用户角色" width="110">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{
                        scope.row.role | filterRole(scope.row.role)
                    }}</span>
                </template>
            </el-table-column>
            <el-table-column label="创建时间" width="240">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.createtime }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="220">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="primary"
                        @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button
                    >
                    <el-button
                        type="warning"
                        size="mini"
                        @click="handleForze(scope.$index, scope.row)"
                        v-show="scope.row.isforze == 'false'"
                        >冻结</el-button
                    >
                    <el-button
                        size="mini"
                        type="success"
                        @click="handleUnForze(scope.$index, scope.row)"
                        v-show="scope.row.isforze == 'true'"
                        >解冻</el-button
                    >
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
        <div class="add-user">
            <el-button type="success" @click="addUser">新增用户</el-button>
        </div>
    </div>
</template>

<script>
import { mapMutations } from "vuex";
import bus from "@/components/bus";

export default {
    mounted() {
        var self = this;
        self.$axios.get("/alluser").then(function (res) {
            self.users = res.data.data;
        });
        bus.$on("updateusers", function (users) {
            self.users = users;
        });
    },
    filters: {
        filterDate(date) {
            return date.split("T")[0];
        },
        filterRole(role) {
            return role == "admin" ? "管理员" : "普通用户";
        },
        isSelf(username) {
            return username == JSON.parse(localStorage.getItem("currentUser")).username
                ? username + "(自己)"
                : username;
        },
        isForze(state) {
            return state == "true" ? "是" : "否";
        },
    },
    data() {
        return {
            searchLoading: false,
            clearLoading: false,
            searchAccount: "",
            users: null,
        };
    },
    methods: {
        ...mapMutations(["setCurrentEditUser", "setIsshowAdd", "setIsshowEdit"]),
        handleForze(index, row) {
            var self = this;
            var params = {
                user_id: row.user_id,
                is_forze: "true",
            };
            self.$axios.post("/forzeuser", params).then(function (res) {
                self.$axios.get("/alluser").then(function (res) {
                    self.users = res.data.data;
                });
                bus.$on("updateusers", function (users) {
                    self.users = users;
                });
                self.$message({
                    type: "success",
                    message: "冻结成功！",
                });
            });
        },
        handleUnForze(index, row) {
            var self = this;
            var params = {
                user_id: row.user_id,
                is_forze: "false",
            };
            self.$axios.post("/forzeuser", params).then(function (res) {
                self.$axios.get("/alluser").then(function (res) {
                    self.users = res.data.data;
                });
                bus.$on("updateusers", function (users) {
                    self.users = users;
                });
                self.$message({
                    type: "success",
                    message: "解冻成功！",
                });
            });
        },
        handleEdit(index, row) {
            console.log(index, row);
            var self = this;
            self.setCurrentEditUser(row);
            self.setIsshowEdit(true);
        },
        handleDelete(index, row) {
            console.log(index, row);
            var self = this;
            if (row.user_id == JSON.parse(localStorage.getItem("currentUser")).user_id) {
                self.$message.error("不能删除当前登录用户！");
                return;
            } else {
                self.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                })
                    .then(() => {
                        var params = {
                            user_id: row.user_id,
                        };
                        self.$axios.post("/deleteuser", params).then(function (res) {
                            self.users.splice(index, 1);
                            self.$message({
                                type: "success",
                                message: "删除成功!",
                            });
                        });
                    })
                    .catch(() => {
                        self.$message({
                            type: "info",
                            message: "已取消删除",
                        });
                    });
            }
        },
        addUser() {
            var self = this;
            self.setIsshowAdd(true);
        },
        searchByAccount() {
            var self = this;
            self.searchLoading = true;
            self.$axios
                .get("/finduser", { params: { account: self.searchAccount } })
                .then(function (res) {
                    if (res.data.code == 2001) {
                        self.$message.error("没有找到该用户！请重新输入");
                    } else {
                        self.$message({
                            type: "success",
                            message: "搜索用户成功！",
                        });
                        self.users = res.data.data;
                    }

                    setTimeout(() => {
                        self.searchLoading = false;
                    }, 500);
                });
        },
        clearSearch() {
            var self = this;
            self.clearLoading = true;
            self.searchAccount = "";
            self.$axios.get("/alluser").then(function (res) {
                self.users = res.data.data;
            });
            setTimeout(() => {
                self.clearLoading = false;
            }, 500);
        },
    },
};
</script>

<style lang="scss" scoped>
#users-nanage {
    width: 100%;
    height: 100%;
    background: #000;
}
.add-user {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
}
.find-user {
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding: 0 30%;
    margin-bottom: 20px;
    border: 1px solid rgba(0, 0, 0, 0.1);
}
</style>
