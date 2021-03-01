import { setHighQualityPlaylist } from "./actions";

const mutations = {
    setLoginState(state, value){
        state.isLogin = value;
    },
    setAllposts(state, value){
        state.allPosts = value;
    },
    updateCurrentPost(state, value){
        state.currentPost = value;
    },
    updateShowPostviewState(state, value){
        state.isShowPostview = value;
    },
    setCurrentEditUser(state, value){
        state.editUser = value;
    },
    setIsshowEdit(state, value){
        state.isShowEdit = value;
    },
    setIsShowPostEdit(state, value){
        state.isShowPostEdit = value;
    },
    setIsShowCommentEdit(state, value){
        state.isShowCommentEdit = value;
    },
    setIsshowAdd(state, value){
        state.isShowAdd = value;
    },
    setEditPost(state, post){
        state.editPost = post;
    },
    setEditComment(state, post){
        state.editComment = post;
    },
    logout(state){
        var self = this;
        state.isLogin = false;
        localStorage.removeItem("currentUser");
        localStorage.removeItem("isLogin");
        localStorage.removeItem("currentNav");
        location.reload();
    }
}

export default mutations