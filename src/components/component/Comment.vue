<template>
    <div
        id="comment-list-wrap"
        style="width: 100%; box-sizing: border-box; padding: 10px"
    >
        <ul class="comments-list">
            <li
                class="comment-body"
                v-for="comment in comments"
                :key="comment.comment_id"
            >
                <div class="user-info">
                    <span class="username">{{ comment.user_id }} :</span>
                </div>
                <div class="comment">
                    <p class="comment-content">{{ comment.comment_body }}</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import bus from "@/components/bus";
export default {
    props: ["post_id"],
    data() {
        return {
            comments: [],
        };
    },
    filters: {},
    mounted() {
        var self = this;
        var params = {
            post_id: self.post_id,
        };
        console.log(params);
        self.$axios.get("/getcomment", { params: params }).then(function (res) {
            self.comments = res.data.data;
        });

        bus.$on("updatecomments", function (newcomments) {
            self.comments = newcomments;
        });
    },
};
</script>

<style lang="scss" scoped>
#comment-list-wrap {
    width: 95%;
    box-sizing: border-box;
    padding: 10px;
    border-radius: 10px;
    margin: 10px 0;
}
.comments-list {
    width: 100%;
}
.comment-body {
    width: 100%;
    list-style: none;
    height: 100px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 5px 10px;
    /* border-radius: 10px; */
    border-bottom: 2px dotted #ff5900;
    margin-bottom: 10px;
}
.user-info {
    width: 100%;
    height: 30%;
    display: flex;
    align-items: center;
    /* justify-content: center; */
    text-align: center;
    overflow: hidden;
    color: grey;
}
.comment {
    width: 100%;
    height: 70%;
    display: flex;
    /* align-items: center; */
    /* justify-content: flex-start; */
    /* padding-left: 20px; */
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
