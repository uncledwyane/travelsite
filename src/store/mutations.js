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
    }
}

export default mutations