<template>
    <div id="homepage">
        <div class="hot_playlists">
            <div class="title">
                <h2>精品歌单推荐</h2>
                <div class="change_playlist">
                    <i class="fa fa-angle-left" @click="updatePlaylist('previous')"></i>
                    <i class="fa fa-angle-right" @click="updatePlaylist('next')"></i>
                </div>
            </div>
            <div class="playlist">
                <div
                    class="playlist_item"
                    v-for="playlist in playlistShow"
                    :key="playlist.id"
                >
                    <div class="playlist_cover">
                        <img
                            :src="playlist.coverImgUrl"
                            :alt="playlist.id"
                            class="cover_img"
                            @click="getTrackListById(playlist.id, playlist.name)"
                            :class="{playlist_playing: playlist.id === playingPlaylistId}"
                        />
                    </div>
                    <div class="playlist_info">
                        <p class="playlist_name">{{ playlist.name }}</p>
                        <p class="playlist_count">{{ playlist.trackCount }}首</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="play_info">
            <div class="music_in_playlist">
                <h2 class="songsintro">{{ playingPlaylistName }}</h2>
                <div class="track_songs">
                    <track-list></track-list>
                </div>
            </div>
            <div class="track_play">
                <h2 class="songsintro">正在播放</h2>
                <play></play>
            </div>
        </div>
    </div>
</template>

<script>
import API from "@/api/API";
import { mapMutations, mapState } from "vuex";
import TrackList from "@/components/component/TrackList";
import Play from '@/components/component/Play'
const myApi = new API();
export default {
    computed: mapState(["highQualityPlaylist"]),
    data() {
        return {
            playlistShow: null, // 要显示在界面上的歌单，防止全部歌单显示浪费资源
            minIndex: 0,
            maxIndex: 6,
            showNum: 7, // 要显示在界面上的最多歌单数
            playingPlaylistName: "",
            playingPlaylistId: ''
        };
    },
    mounted() {
        var self = this;
        if (!self.highQualityPlaylist) {
            myApi.getHighQualityPlaylist().then(function (res) {
                self.setHighQualityPlaylist(res.playlists);
                self.playlistFilter(self.minIndex, self.maxIndex);
                console.log(new Date(), " ::: 获取精品歌单成功： ", res);
                self.getTrackListById(res.playlists[0].id, res.playlists[0].name);
            });
        }
    },
    components: {
        TrackList,
        Play
    },
    methods: {
        ...mapMutations(["setHighQualityPlaylist", "setTrackList"]),

        playlistFilter(min, max) {
            var self = this;
            var tempArray = new Array();
            self.highQualityPlaylist.forEach(function (playlist, index) {
                if (index >= min && index <= max) {
                    tempArray.push(playlist);
                }
            });
            self.playlistShow = tempArray;
        },
        updatePlaylist(val) {
            var self = this;
            var playlistLength = self.highQualityPlaylist.length;
            if (val == "previous") {
                if (self.minIndex == 0 || self.minIndex - self.showNum < 0) {
                    self.minIndex = 0;
                    self.maxIndex = self.showNum - 1;
                    self.playlistFilter(self.minIndex, self.maxIndex);
                    console.log(
                        new Date(),
                        `:::不能往前翻页了, min: ${self.minIndex} max: ${self.maxIndex}`
                    );
                } else if (self.minIndex - self.showNum == 0) {
                    self.minIndex -= self.showNum;
                    self.maxIndex -= self.showNum;
                    self.playlistFilter(self.minIndex, self.maxIndex);
                    console.log(
                        new Date(),
                        `:::往前翻到头了,再翻就不行了, min: ${self.minIndex} max: ${self.maxIndex}`
                    );
                } else {
                    if (self.maxIndex == playlistLength) {
                        self.maxIndex = self.minIndex - 1;
                        self.minIndex -= self.showNum;
                    } else {
                        self.minIndex -= self.showNum;
                        self.maxIndex -= self.showNum;
                    }
                    self.playlistFilter(self.minIndex, self.maxIndex);
                    console.log(
                        new Date(),
                        `:::往前翻页, min: ${self.minIndex} max: ${self.maxIndex}`
                    );
                }
            } else {
                if (self.maxIndex > self.playlistLength) {
                    self.minIndex = self.minIndex;
                    self.maxIndex = self.maxIndex;
                    self.playlistFilter(self.minIndex, self.maxIndex);
                    console.log(
                        new Date(),
                        `:::不能往后翻页了, min: ${self.minIndex} max: ${self.maxIndex}`
                    );
                } else {
                    if (
                        self.maxIndex + self.showNum > playlistLength &&
                        playlistLength - self.maxIndex <= self.showNum
                    ) {
                        self.maxIndex = playlistLength;
                        if (self.minIndex + self.showNum > playlistLength) {
                            self.minIndex = self.minIndex;
                        } else if (self.minIndex + self.showNum < playlistLength) {
                            self.minIndex += self.showNum;
                        } else {
                        }
                        self.playlistFilter(self.minIndex, self.maxIndex);
                        console.log(
                            new Date(),
                            `:::不够了往后翻页, min: ${self.minIndex} max: ${self.maxIndex}`
                        );
                    } else {
                        self.maxIndex += self.showNum;
                        self.minIndex += self.showNum;
                        self.playlistFilter(self.minIndex, self.maxIndex);
                        console.log(
                            new Date(),
                            `:::往后翻页, min: ${self.minIndex} max: ${self.maxIndex}`
                        );
                    }
                }
            }
        },
        getTrackListById(id, name) {
            var self = this;
            self.playingPlaylistName = name;
            self.playingPlaylistId = id;
            myApi.getPlayListDetail(id).then(function (res) {
                self.setTrackList(res.playlist.tracks);
            });
        },
    },
};
</script>

<style lang="scss" scoped>
@import "../scss/mixins.scss";
@import '../scss/theme.scss';
h2,
p {
    margin: 0;
    padding: 0;
    font-weight: 200;
}
h2{
    color: $font-highlight-color-dark;
}

#homepage {
    display: flex;
    width: 88%;
    height: calc(100% - 60px);
    position: absolute;
    flex-direction: column;
    background: $background-color-dark;
    z-index: 0;
    left: 12%;
}
.hot_playlists {
    width: 100%;
    height: 30%;
    padding: 0 20px;
    display: flex;
    flex-direction: column;
}
.playlist {
    display: flex;
}
.playlist_item {
    width: 130px;
    height: 190px;
    margin-right: 50px;
}
.playlist_cover {
    width: 130px;
    height: 130px;
    @include display-center;
}
.playlist_count {
    color:$font-color-dark;
    font-size: 12px;
}
.playlist_cover:hover {
    cursor: pointer;
}
.playlist_info {
    position: relative;
    height: 60px;
    padding-top: 5px;
}
.playlist_name {
    font-size: 12px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    margin-bottom: 5px;
    color: #fff;
}
.cover_img {
    width: 130px;
    height: 130px;
    border-radius: 10px;
}
.cover_img:hover {
    cursor: pointer;
}
.title {
    display: flex;
    align-items: center;
    position: relative;
    margin-bottom: 10px;
    color: #01103e;
}
.change_playlist {
    position: absolute;
    right: 50px;
}
.fa {
    font-size: 25px;
    color: #a1aac7;
    transition: all ease 0.3s;
}
.fa:hover {
    color: #254cda;
    cursor: pointer;
}
.fa-angle-left {
    margin-right: 20px;
}
.play_info {
    width: 100%;
    height: 70%;
    box-sizing: border-box;
    padding: 10px 0 0 20px;
    display: flex;
}
.music_in_playlist {
    width: 60%;
    display: flex;
    flex-direction: column;
    height: 100%;
}
.songsintro {
    height: 5%;
    margin: 10px 0px;
}
.track_songs {
    width: 100%;
    margin-top: 10px;
    box-sizing: border-box;
    padding-bottom: 15px;
    height: 90%;
    overflow: hidden;
}
::-webkit-scrollbar {
    width: 5px;
}
::-webkit-scrollbar-track {
    width: 10px;
    background: none;
    display: none;
}
::-webkit-scrollbar-thumb {
    background: $front-color-dark;
    border-radius: 5px;
}
::-webkit-scrollbar-button {
    display: none;
}
.track_play{
    width: 40%;
    /* background: lightblue; */
    padding: 0 20px 10px 20px;
}
.playlist_playing{
    box-shadow: 0 20px 20px rgba(255, 115, 0, 0.5);
}
</style>
