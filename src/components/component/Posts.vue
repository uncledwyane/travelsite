<template>
    <div id="posts-manage">
        <el-table :data="posts" style="width: 100%" border stripe>
            <el-table-column label="发布者" width="150">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.username }}</span>
                </template>
            </el-table-column>
            <el-table-column label="帖子标题" width="600">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.post_title }}</span>
                </template>
            </el-table-column>
            <el-table-column label="发布时间" width="200">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.post_time }}</span>
                </template>
            </el-table-column>
            <el-table-column label="帖子封面" width="300">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.post_coverimg | hasCover}}</span>
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
import bus from "@/components/bus";
export default {
    data() {
        return {
            posts: null,
        };
    },
    computed: {
        ...mapState(["allPosts"]),
    },
    filters: {
        hasCover(coverlink){
            return coverlink != undefined ? coverlink : '没有封面' ;
        }
    },
    mounted() {
        var self = this;
        bus.$on("updateallposts", function () {
            self.getPosts();
        });
    },
    created() {
        var self = this;
        self.getPosts();
    },
    methods: {
        ...mapMutations(["setAllposts", "setIsShowPostEdit", "setEditPost"]),
        handleEdit(index, row) {
            var self = this;
            console.log("handleEdit click:", row);
            self.setEditPost(row);
            self.setIsShowPostEdit(true);
        },
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
        getUserName(user_id) {
            var self = this;
            self.$axios
                .get("/getuser", { params: { user_id: user_id } })
                .then(function (res) {
                    return res.data[0].username;
                });
        },
        getPosts() {
            var self = this;
            var user = JSON.parse(localStorage.getItem("currentUser"));
            if (user.role == "admin") {
                self.$axios.get("/allposts").then(function (res) {
                    self.posts = res.data.data;
                });
            } else {
                self.$axios
                    .get("/postswithuser", { params: { user_id: user.user_id } })
                    .then(function (res) {
                        self.posts = res.data.data;
                    });
            }
        },
    },
};
</script>

<style scoped lang="scss">
.post_body{
    text-overflow: ellipsis;
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 4;
}
</style>
