<template>
  <div id="play_wrap">
      <div class="track_box">
            <div class="cover" v-show="songIsPlaying.id">
              <img :src="songIsPlaying.coverImg" class="cover_img">
            </div>
            <div class="track_info" v-show="songIsPlaying.id">
                <p class="track_name">{{ songIsPlaying.name }}</p>
                <p class="track_artists">{{ songIsPlaying.artists }}</p>
            </div>
            <div class="track_time"></div>
            <div class="track_durtime"></div>
      </div>
      <div class="control_box">
          <div class="previous_track">
              <i class="fa fa-angle-double-left"></i>
          </div>
          <div class="pause_or_play">
              <i class="fa fa-play" v-show="songIsPlaying.state == 'pause'" @click="playOrPause('play')"></i>
              <i class="fa fa-pause" v-show="songIsPlaying.state == 'play'" @click="playOrPause('pause')"></i>
          </div>
          <div class="next_track">
              <i class="fa fa-angle-double-right"></i>
          </div>
      </div>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import bus from '@/components/bus'
export default {
    data () {
        return {
            musicEle: null
        }
    },
    computed: ({
        ...mapState([
            'songIsPlaying'
        ])
    }),
    mounted () {
        var self = this;
        self.musicEle = document.getElementById('musicAudio');
    },
    methods: {
        ...mapMutations(['updatePlayingTrack']),
        playOrPause(value){
            var self = this;
            if(self.songIsPlaying.id){
                if(value == 'pause'){
                    self.updatePlayingTrack({
                        state: 'pause'
                    })
                    bus.$emit('changePlayState', 'pause');
                }else{
                    self.updatePlayingTrack({
                        state: 'play'
                    })
                    bus.$emit('changePlayState', 'play');
                }
            }
        }
    }
}
</script>

<style lang='scss' scoped>
    @import '../scss/theme.scss';
    h2, p{
        margin: 0px;
        padding: 0px;
    }
    #play_wrap{
        width: 100%;
        height: 90%;
        background: $front-color-dark;
        box-sizing: border-box;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        position: relative;
        /* justify-content: center; */
        align-items: center;
    }
    .track_box{
        width: 65%;
        /* background: lightgreen; */
        height: 75%;
        margin: 0px auto;
        padding: 10px;
        box-sizing: border-box;
        background: $front-color-dark;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        position: relative;
        top: 20px;
        border-radius: 20px;
    }
    .cover{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px 0;
        margin-bottom: 10px;
    }
    .track_info{
        width: 100%;
        justify-content: center;
        /* display: flex; */
        text-align: center;
    }
    .track_name{
        color: $font-highlight-color-dark;
    }
    .track_artists{
        color:$font-color-dark;
        font-size: 12px;
    }
    .control_box{
        width: 80%;
        height: 15%;
        /* margin: 0 auto; */
        position: absolute;
        bottom: 0;
        display: flex;
    }
    h2{
        height: 5%;
        margin: 10px 0px;
    }
    .cover_img{
        width: 70%;
        height: 70%;
        border-radius: 50%;
        box-shadow: 0 20px 30px rgba(0,0,0,.3);
    }
    .previous_track, .pause_or_play, .next_track{
        width: calc(100% / 3);
        height: 100%;
        display: flex;
        align-items: center;
        color: #bebebe;
        font-size: 25px;
        transition: all ease .3s;
    }
    .pause_or_play{
        justify-content: center;
    }
    .previous_track{
        justify-content: flex-end;
    }
    .next_track{
        justify-content: flex-start;
    }
    .pause_or_play:hover, .previous_track:hover, .next_track:hover{
        cursor: pointer;
        color: $font-color-dark;
    }
</style>