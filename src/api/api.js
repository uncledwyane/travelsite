const when = require('when')
const axios = require('axios')
axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.withCredentials = true

module.exports = function RestAPI(){
    function fetchGet(api, params){
        var deferred = when.defer();
        axios.get(api, params).then(function (res){
            if(res.status === 200){
                deferred.resolve(res.data);
            }else{
                deferred.reject(res.data);
            }
        }).catch(function (err){
            deferred.reject(err)
        })
        return deferred.promise;
    }

    function fetchPost(api, params){
        var deferred = when.defer();
        axios.get(api, params,{headers: {'Content-Type': 'multipart/form-data'}}).then(function (res){
            if(res.status === 200){
                deferred.resolve(res.data);
            }else{
                deferred.reject(res.data);
            }
        }).catch(function (err){
            deferred.reject(err)
        })
        return deferred.promise;
    }

    /**
     * 通过手机号登录
     * @param {String} phoneNumber
     * @param {String} password
     */
    this.login = function (phoneNumber, password){
        console.log('+++restAPI, login, phoneNumber: ', phoneNumber, ' password: ', password);
        var formatPassword = encodeURIComponent(password);
        return fetchGet('/login/cellphone', {params: {phone: phoneNumber, password: formatPassword}});
    }

    /**
     * 通过uid获取用户详细信息
     * @param {String} userId 用户Id
     */
    this.getUserDetail = function (userId){
        return fetchGet('/user/detail', {params: {uid: userId}})
    }

    /**
     * 获取用户歌单
     * @param {String} uid
     */
    this.getUserPlayList = function (userId){
        return fetchGet('/user/playlist', {params: {uid: userId}})
    }

    /**
     * 获取用户关注列表
     * @param {String} userId
     */
    this.getUserFollows = function (userId){
        return fetchGet('/user/follows', {params: {uid: userId}})
    }

    /**
     * 获取用户粉丝列表
     * @param {String} userId
     */
    this.getUserFans = function (userId){
        return fetchGet('/user/followeds', {params: {uid: userId}})
    }

    /**
     * 获取推荐banner
     * @param { Number } type [0: PC, 1: Android, 2: iPhone, 3: iPad]
     */
    this.getRecommendBanner = function (sysType){
        if(sysType){
            return fetchGet('/banner', {params: {type: sysType}})
        }else{
            return fetchGet('/banner')
        }
    }

    /**
     * 获取每日推荐歌单
     */
    this.getRecommendSongs = function (){
        return fetchGet('/recommend/resource')
    }

    /**
     * 获取歌单详情
     * @param {String} id 歌单id
     */
    this.getPlayListDetail = function (id){
        return fetchGet('/playlist/detail', {params: {id: id}})
    }

    /**
     * 获取音乐的播放url
     * @param { String } id 音乐id
     */
    this.getSongUrl = function (id){
        return fetchGet('/song/url', {params: {id: id}})
    }

    /**
     * 检测音乐是否可用
     * @param {String } id
     */
    this.checkMusic = function (id){
        return fetchGet('/check/music', {params: {id: id}})        
    }

    /**
     * 获取精品歌单
     * @param { Number } limit 可选 取出歌单数量限制
     * @param { String } before 可选 分页参数 取上一页最后一个歌单的 updateTime 获取下一页数据
     */
    this.getHighQualityPlaylist = function (limit, before){
        if(limit && !before){
            return fetchGet('/top/playlist/highquality', {params: {limit: limit}} )
        }

        if(!limit && before){
            return fetchGet('/top/playlist/highquality', {params: {before: before}})
        }

        if(!limit && !before){
            return fetchGet('/top/playlist/highquality')
        }
    }

    /**
     * 获取相关歌单
     * @param {String} id 歌单id
     */
    this.getRelatedPlaylist = function (id){
        return fetchGet('/related/playlist', {params: {id: id}})
    }

    /**
     * 获取歌单详情动态 获取歌单详情动态部分，如评论数、是否收藏、播放数
     * @param {String} id 歌单id
     */
    this.getPlaylistDynamic = function (id){
        return fetchGet('/playlist/detail/dynamic', {params: {id: id}})
    }

    /**
     * 获取热搜列表（详细）
     */
    this.getHotSearch = function (){
        return fetchGet('/search/hot/detail')
    }

    /**
     * 搜索
     * @param {String} keywords 必选 关键词，传入搜索关键词可以搜索该音乐 / 专辑 / 歌手 / 歌单 / 用户 , 关键词可以多个 , 以空格隔开 
     * @param {Number} limit 可选 限制
     */
    this.search = function (keywords, limit){
        return fetchGet('/search', {params: {keywords: keywords, limit: limit}})
    }

    /**
     * 获取每日推荐等入口
     */
    this.getHomeDragonBall = function (){
        return fetchGet('/homepage/dragon/ball')
    }

    /**
     * 获取首页信息
     */
    this.getHomeInfo = function (){
        return fetchGet('/homepage/block/page')
    }

    /**
     * 获取歌曲评论
     * @param {String} id 歌曲id
     * @param {Number} limit 限制
     */
    this.getMusicComment = function (){
        return fetchGet('/comment/music', {params: {id: id, limit: limit}})
    }

    /**
     * 获取歌手歌曲
     * @param {String} id 歌手id
     */
    this.getMusicByArtistId = function (){
        return fetchGet('/artists', {params: {id: id}})
    }

    /**
     * 获取歌手专辑
     * @param {String} id 歌手id
     * @param {Number} limit 限制
     */
    this.getAlbumById = function (id, limit){
        return fetchGet('/artist/album', {params: {id: id, limit: limit}})
    }
}


