
var state = {
    version: '1.0.0',
    theme_color: 'light',
    isLogin: false,
    highQualityPlaylist: null,
    trackList: null,
    songIsPlaying: {
        id: '',
        name: '',
        coverImg: '',
        state: 'pause',
        drtime: 0,
        playUrl: '',
        artists: '',
        playState: false
    }
}

export default state