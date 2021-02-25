<template>
    <div id="posts-manage">
        <el-table :data="posts" style="width: 100%" border stripe>
            <el-table-column label="发布者id" width="100">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.user_id }}</span>
                </template>
            </el-table-column>
            <el-table-column label="帖子id" width="100">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.post_id }}</span>
                </template>
            </el-table-column>
            <el-table-column label="帖子标题" width="100">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.post_title }}</span>
                </template>
            </el-table-column>
            <el-table-column label="帖子内容" width="500">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.post_body }}岁</span>
                </template>
            </el-table-column>
            <el-table-column label="发布时间" width="150">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.post_time }}</span>
                </template>
            </el-table-column>
            <el-table-column label="帖子封面" width="220">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.post_coverimg }}</span>
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
import { mapState, mapMutations } from "vuex";
export default {
    data() {
        return {
            posts: null,
        };
    },
    computed: {
        ...mapState(["allPosts"]),
    },
    mounted() {
        var self = this;
        if (self.allPosts) {
            self.posts = JSON.parse(JSON.stringify(self.allPosts));
        }
    },
    methods: {
        ...mapMutations(["setAllposts"]),
        handleEdit(index, row) {},
        handleDelete(index, row) {
            var self = this;
            var postId = row.post_id;
            self.$confirm("此操作将永久删除该帖子, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    var params = {
                        post_id: postId,
                    };
                    self.posts.splice(index, 1);
                    self.$axios.post("/deletepost", params).then(function (res) {
                        self.$axios.get("/allposts", function (res) {
                            self.setAllposts(res.data);
                            console.log(self.posts);
                        });
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
        },
    },
};
</script>

<style scoped lang="scss"></style>
