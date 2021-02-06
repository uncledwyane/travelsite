import { setHighQualityPlaylist } from "./actions";

const mutations = {
    setTheme(state, theme){
        state.theme = theme;
    },
    setHighQualityPlaylist(state, playlist){
        state.highQualityPlaylist = playlist;  
    },
    setTrackList(state, list){
        state.trackList = list;
    },
    setPlayingTrack(state, track){
        state.songIsPlaying = track;
    },
    updatePlayingTrack(state, obj){
        for(var i in obj){
            state.songIsPlaying[i] = obj[i]; 
        }
    },
    setLoginState(state, value){
        state.isLogin = value;
    }
}

export default mutations