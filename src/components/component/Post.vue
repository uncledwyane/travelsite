<template>
    <div id="post-wrap">
        <div
            id="post-item"
            v-for="post in allPosts"
            :key="post.post_id"
            @click="showPostview(post)"
        >
            <div class="post-img">
                <img
                    :src="
                        post.post_coverimg
                            ? post.post_coverimg
                            : 'https://s3.ax1x.com/2021/02/24/yLvUfJ.png'
                    "
                    class="post-image"
                />
            </div>
            <div class="post-info">
                <div class="post-title">
                    <h3>{{ post.post_title }}</h3>
                    <p class="post-body">{{ post.post_body }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
    data() {
        return {
            isSelect: false,
        };
    },
    computed: {
        ...mapState(["allPosts"]),
    },
    methods: {
        ...mapMutations(["updateCurrentPost", "updateShowPostviewState"]),
        showPostview(postObj) {
            var self = this;
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
}
.post-title {
    height: 150px;
}
.post-info {
    width: 60%;
    display: flex;
    flex-direction: column;
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
</style>
