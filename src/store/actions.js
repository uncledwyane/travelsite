import api from '@/api/api'
const myApi = new api()


// 登录
export const toLogin = function ({commit, state, dispatch}){
    
}

export const setHighQualityPlaylist = function ({commit, state, dispatch}){
    
}

export const getMusicPlayUrl = function ({commit}, songId){
    myApi.getSongUrl(songId).then(function (res){
        
    })
}
