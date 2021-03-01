<template>
    <div id="edit-wrap">
        <div class="edit-body">
            <el-form label-position="top" label-width="80px" :model="currentComment">
                <el-form-item label="评论内容">
                    <el-input
                        v-model="currentComment.comment_body"
                        type="textarea"
                        :autosize="{ minRows: 9 }"
                    ></el-input>
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
                @click="setIsShowCommentEdit(false)"
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
            currentComment: {
                comment_body: "",
            },
        };
    },
    computed: {
        ...mapState(["editComment"]),
    },
    created() {
        var self = this;
    },
    mounted() {
        var self = this;
        self.currentComment = JSON.parse(JSON.stringify(self.editComment));
    },
    methods: {
        ...mapMutations(["setIsShowPostEdit", "setIsShowCommentEdit"]),
        modify() {
            var self = this;
            var params = self.currentComment;
            self.$axios.post("/updatecomment", params).then(function (res) {
                self.$message({
                    type: "success",
                    message: "更改成功！",
                });
                self.setIsShowCommentEdit(false);
                bus.$emit("updateallcomments");
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
