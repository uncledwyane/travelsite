<template>
    <div id="users-manage">
        <el-table :data="users" style="width: 100%" border stripe>
            <el-table-column label="生日" width="120">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{
                        scope.row.birthday | filterDate(scope.row.birthday)
                    }}</span>
                </template>
            </el-table-column>
            <el-table-column label="姓名" width="100">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.username }}</span>
                </template>
            </el-table-column>
            <el-table-column label="账号" width="100">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.account }}</span>
                </template>
            </el-table-column>
            <el-table-column label="密码" width="100">
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
            <el-table-column label="用户角色" width="100">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{
                        scope.row.role | filterRole(scope.row.role)
                    }}</span>
                </template>
            </el-table-column>
            <el-table-column label="创建时间" width="220">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.createtime }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="160">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button
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
    },
    data() {
        return {
            users: null,
        };
    },
    methods: {
        ...mapMutations(["setCurrentEditUser", "setIsshowAdd", "setIsshowEdit"]),
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
}
</style>
