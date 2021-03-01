<template>
    <div id="edit-wrap">
        <div class="edit-body">
            <el-form label-position="top" label-width="80px" :model="currentPost">
                <el-form-item label="标题">
                    <el-input v-model="currentPost.post_title"></el-input>
                </el-form-item>
                <el-form-item label="内容">
                    <el-input
                        v-model="currentPost.post_body"
                        type="textarea"
                        :autosize="{ minRows: 9 }"
                    ></el-input>
                </el-form-item>
                <el-form-item label="封面链接">
                    <el-input v-model="currentPost.post_coverimg"></el-input>
                </el-form-item>
                <el-form-item style="margin-top: 20px">
                    <el-button type="success" @click="modify">提交修改</el-button>
                </el-form-item>
            </el-form>
            <el-button
                type="danger"
                icon="el-icon-close"
                circle
                class="close-btn"
                @click="setIsShowPostEdit(false)"
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
            currentPost: {
                post_title: "",
                post_body: "",
                post_coverimg: "",
            },
        };
    },
    computed: {
        ...mapState(["isShowPostEdit", "editPost"]),
    },
    created() {
        var self = this;
    },
    mounted() {
        var self = this;
        self.currentPost = JSON.parse(JSON.stringify(self.editPost));
    },
    methods: {
        ...mapMutations(["setIsShowPostEdit"]),
        modify() {
            var self = this;
            var params = self.currentPost;
            self.$axios.post("/updatepost", params).then(function (res) {
                self.$message({
                    type: "success",
                    message: "更改成功！",
                });
                self.setIsShowPostEdit(false);
                bus.$emit("updateallposts");
            });
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
    overflow: auto;
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
