<template>
    <div id="comment-manage">
        <el-table :data="comments" style="width: 100%" border stripe>
            <el-table-column label="发布者" width="200">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{
                        scope.row.user_id | isSelf(scope.row.user_id)
                    }}</span>
                </template>
            </el-table-column>
            <el-table-column label="帖子ID" width="400">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.post_id }}</span>
                </template>
            </el-table-column>
            <el-table-column label="评论内容" width="550">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.comment_body }}岁</span>
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
    </div>
</template>

<script>
export default {
    data() {
        return {
            comments: null,
        };
    },
    filters: {
        isSelf(user_id) {
            var user = JSON.parse(localStorage.getItem("currentUser"));
            return user_id == user.user_id ? user.username + "(自己)" : user_id;
        },
    },
    created() {
        var self = this;
        var user = JSON.parse(localStorage.getItem("currentUser"));
        if (user.role == "admin") {
            self.$axios.get("/allcomments").then(function (res) {
                self.comments = res.data.data;
            });
        } else {
            self.$axios
                .get("/getcommentwithuser", { params: { user_id: user.user_id } })
                .then(function (res) {
                    self.comments = res.data.data;
                });
        }
    },
    mounted() {},
    updated() {},
    methods: {
        handleEdit(index, row) {},
        handleDelete(index, row) {
            var self = this;
            var params = {
                comment_id: row.comment_id,
            };
            self.$confirm("此操作将永久删除该评论, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(function () {
                self.$axios.post("/deletecomment", params).then(function (res) {
                    self.$message({
                        type: "success",
                        message: "删除评论成功！",
                    });
                    self.comments.splice(index, 1);
                });
            });
        },
    },
};
</script>

<style></style>
