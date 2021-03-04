<template>
    <div id="post-wrap">
        <div
            id="post-item"
            v-for="post in allPosts"
            :key="post.post_id"
            @click="showPostview(post)"
        >
            <div class="post-img">
                <!-- <img
                    :src="
                        post.post_coverimg
                            ? post.post_coverimg
                            : 'https://s3.ax1x.com/2021/02/24/yLvUfJ.png'
                    "
                    class="post-image"
                /> -->
                <el-image :src="post.post_coverimg" class="post-image" lazy>
                    <div
                        slot="error"
                        class="image-slot myslot"
                        style="
                            width: 100%;
                            height: 100%;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            font-size: 40px;
                            color: grey;
                            background: rgb(230, 230, 230);
                        "
                    >
                        <i class="el-icon-picture-outline"></i>
                    </div>
                </el-image>
            </div>
            <div class="post-info">
                <div class="post-title">
                    <h3 style="font-size: 15px">{{ post.post_title }}</h3>
                    <p class="post-body" style="color: grey; font-size: 12px">
                        {{ post.post_body }}
                    </p>
                </div>
                <div class="post-detail-info">
                    <p class="post-time" style="color: lightgrey; font-size: 12px">
                        {{ post.post_time }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import bus from "@/components/bus";
export default {
    data() {
        return {
            isSelect: false,
        };
    },
    computed: {
        ...mapState(["allPosts", "currentUserStar", "currentUserCollect"]),
    },
    methods: {
        ...mapMutations(["updateCurrentPost", "updateShowPostviewState"]),
        showPostview(postObj) {
            var self = this;
            if (self.currentUserStar && self.currentUserStar.length > 0) {
                if (self.currentUserStar.indexOf(postObj.post_id) > -1) {
                    bus.$emit("setIsStar", true);
                } else {
                    bus.$emit("setIsStar", false);
                }
            }

            if (self.currentUserCollect && self.currentUserCollect.length > 0) {
                if (self.currentUserCollect.indexOf(postObj.post_id) > -1) {
                    bus.$emit("setIsCollect", true);
                } else {
                    bus.$emit("setIsCollect", false);
                }
            }
            self.updateCurrentPost(postObj);
            self.updateShowPostviewState(true);
        },
    },
};
</script>

<style lang="scss" scoped>
#post-wrap {
    width: 50%;
    margin: 0 auto;
    box-sizing: border-box;
    padding: 0 0 20px 0;
}
#post-item {
    display: flex;
    width: 100%;
    height: 200px;
    box-sizing: border-box;
    padding: 10px;
    border-radius: 10px;
    border: 1px dotted rgb(255, 123, 0);
    margin-bottom: 20px;
    transition: all ease 0.3s;
}
#post-item:hover {
    cursor: pointer;
    transform: translateY(-10px);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
.post-img {
    width: 40%;
    height: 100%;
    overflow: hidden;
    box-sizing: border-box;
    padding: 0 10px 0 5px;
    // background: url('../../../assets/img/404.png');
}
.post-body {
    overflow: hidden;
}
.post-image {
    width: 100%;
    height: 100%;
}
.post-title {
    height: 150px;
}
.post-info {
    width: 60%;
    display: flex;
    flex-direction: column;
    position: relative;
}
.post-by {
    height: 50px;
    display: flex;
}
.location {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 20%;
}
.username {
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.collect {
    width: 30%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
}
.post-body {
    overflow: hidden;
    height: 100px;
    text-overflow: ellipsis;
}
.image-slot {
    width: 100%;
    height: 100%;
    /* text-align: center; */
    /* line-height: 100%; */
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 40px;
    color: rgb(230, 230, 230);
}
.post-detail-info {
    position: absolute;
    bottom: 0;
    right: 0px;
}
</style>
