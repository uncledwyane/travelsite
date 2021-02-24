<template>
  <div id="postview-wrap">
      <div class="postview-body">
          <h2 class="post-title">{{ post.post_title }}</h2>
          <div class="post-info">
              <div class="post-by">{{ username }}</div>
              <div class="post-time">{{ post.post_time }}</div>
          </div>
          <div class="post-body">
                <div class="post-img">
                    <img :src="post.post_coverimg" alt="" v-if="post.post_coverimg != null" class="post-image">
                </div>
                <p class="post-content">
                    {{ post.post_body }}
                </p>
          </div>
          <el-button type="danger" icon="el-icon-close" circle class="close-btn" @click="updateShowPostviewState(false)"></el-button>
      </div>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
export default {
    watch: {
        currentPost: function (val, oldVal){
            if(val){
                var self = this;
                var postObj = val;
                var userId = postObj.user_id;
                var params = {
                    user_id: userId
                }
                self.post = val;
                self.$axios.get('/getuser', {params: params}).then(function (res){
                    self.username = res.data.data[0].username;
                })
            }
        }
    },
    data () {
        return {
            post: {
                post_body: '',
                post_coverimg: '',
                post_id: '',
                post_time: '',
                user_id: ''
            },
            username: ''
        }
    },
    computed: {
        ...mapState([
            'isShowPostview',
            'currentPost'
        ])
    },
    mounted(){
        var self = this;
    },
    methods: {
        ...mapMutations([
            'updateShowPostviewState'
        ]),
        getUser(){
            self.$axios.get('/getuser', params).then(function (res){
                console.log('res: ', res);
            })
        }
    }
}
</script>

<style lang='scss' scoped>
    #postview-wrap{
        position: fixed;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0,0,0,.4);
        z-index: 3;
    }
    .postview-body{
        width: 55%;
        height: 90%;
        background: #fff;
        box-sizing: border-box;
        padding: 30px 20px 20px 20px;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        position: relative;
    }
    .post-info{
        width: 100%;
        display: flex;
        height: 60px;
    }
    .post-by, .post-time{
        display: flex;
        align-items: center;
        color: grey;
    }
    .post-by{
        justify-content: flex-start;
        width: 50%;
    }
    .post-time{
        justify-content: flex-end;
        width: 50%;
    }
    .post-img{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .post-image{
        width: 100%;
    }
    .post-body{
        display: flex;
        width: 100%;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        overflow: scroll;
        // height: 70%;
    }
    .post-content{
        line-height: 30px;
    }
    .close-btn{
        width: 30px;
        height: 30px;
        padding: 5px !important;
        position: absolute;
        top: 5px;
        right: 5px;
    }
</style>