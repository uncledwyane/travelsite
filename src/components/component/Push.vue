<template>
    <div id="push-post-wrap">
        <h2>发表攻略</h2>
        <el-input
            v-model="post_title"
            placeholder="请输入攻略标题..."
            style="margin: 20px 0"
        ></el-input>
        <el-input
            v-model="post_cover"
            placeholder="请输入攻略封面图片路径(可不填，也可通过下方上传按钮上传图片获取地址)..."
            style="margin-bottom: 20px"
        ></el-input>
        <!-- <el-input
            type="textarea"
            :autosize="{ minRows: 9 }"
            placeholder="请输入攻略内容"
            show-word-limit
            v-model="post_body"
            style="margin-bottom: 20px"
        >
        </el-input> -->
        <div id="editor"></div>
        <el-button type="success" plain data-chevereto-pup-trigger="" style="margin-bottom: 20px;"  data-chevereto-pup-id="8c5970c8-bb94-4001-aa35-1a9d924a408d">上传图片</el-button>
        <div class="action-area">
            <el-button type="primary" @click="post"> 发表攻略 </el-button>
        </div>
    </div>
</template>

<script>
import { mapMutations } from "vuex";
import Editor from 'wangeditor';
import bus from '@/components/bus'
export default {
    data() {
        return {
            post_title: "",
            post_body: "",
            post_cover: "",
            editor: null
        };
    },
    mounted(){
        var self = this;
        self.editor = new Editor('#editor');
        self.editor.config.height = 500;
        self.editor.create();
    },
    methods: {
        ...mapMutations(["setAllposts"]),
        post() {
            var self = this;
            var post_content = self.editor.txt.html();
            if(post_content){
                var params = {
                    user_id: JSON.parse(localStorage.getItem("currentUser")).user_id,
                    post_title: self.post_title,
                    post_body: post_content,
                };
                if (self.post_cover) {
                    params.post_cover = self.post_cover;
                }
                self.$axios.post("/pushpost", params).then(function (res) {
                    self.$message({
                        type: "success",
                        message: "发表成功!",
                    });
                    self.post_title = "";
                    self.post_body = "";
                    self.post_cover = "";
                    self.$axios.get("/allposts").then(function (result) {
                        self.setAllposts(result.data.data);
                        bus.$emit('changeNav', 'hot');
                    });
                });
            }
        },
    },
};
</script>

<style lang="scss" scoped>
#push-post-wrap {
    width: 55%;
    margin: 0 auto;
    box-sizing: border-box;
    padding-bottom: 10px;
}
#editor{
    width: 100%;
    height: 620px;
}
</style>
