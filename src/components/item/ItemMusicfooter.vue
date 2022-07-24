<template>
  <div class="footer">
    <div class="footerLeft" @click="musicDetail">
      <img :src="playList[playIndex].al.picUrl" alt="">
      <div class="defaultName">
        <h6>{{playList[playIndex].name}}</h6>
        <p>横滑切换上下首哦</p>
      </div>
    </div>
    <div class="footerRight">
      <svg class="icon" aria-hidden="true"  @click="play" v-if="ispaused">
        <use xlink:href="#icon-bofang"></use>
      </svg>
      <svg class="icon" aria-hidden="true"  @click="play" v-else>
        <use xlink:href="#icon-weibiaoti--"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-zu"></use>
      </svg>
    </div>
    <audio ref="audio" :src="`https://music.163.com/song/media/outer/url?id=${playList[playIndex].id}`"></audio>
    <van-popup v-model:show="isDetailShow" position="right" :style="{ height: '100%',  width: '100%'}">
      <item-musicplaypage :playList='playList' :playIndex='playIndex' :play='play' :changeDuration='changeDuration'></item-musicplaypage>
    </van-popup>
  </div>
</template>

<script>
import {mapActions, mapMutations, mapState} from 'vuex';
import ItemMusicplaypage from './ItemMusicplaypage.vue';
export default {
  data(){
    return {
      timer:null,
    }
  },
  components:{
    ItemMusicplaypage,
  },
    computed:{
    ...mapState(['playList', 'playIndex', 'ispaused', 'isDetailShow', 'currentTime']),
  },
  mounted(){
    console.log(this.$refs);
    this.getMusicLyric(this.playList[this.playIndex].id);
  },
  updated(){
    this.getMusicLyric(this.playList[this.playIndex].id);
    // console.log(this.$refs.audio.duration);
    // this.timeStamp();
    this.changeDuration();
  },
  methods:{
     ...mapMutations(['updateIsPaused', 'updateIsDetailShow', 'updatecurrentTime', 'uptadeDuration']),
    ...mapActions(['getMusicLyric']),
    play(){
      if(this.$refs.audio.paused){
        this.$refs.audio.play();
        this.timeStamp();
        this.updateIsPaused(false)
      }
      else{
        this.$refs.audio.pause();
        clearInterval(this.timer);
        this.updateIsPaused(true);
      }
    },
    musicDetail(){
      this.updateIsDetailShow();
    },
    // 歌曲时间戳
    timeStamp(){
      this.timer = setInterval(()=>{
        this.updatecurrentTime(this.$refs.audio.currentTime);
        // console.log(this.$refs.audio.currentTime);
      }, 50)
    },
    // 更新当前歌曲总时长
    changeDuration(){
      this.uptadeDuration(this.$refs.audio.duration);
    }
  },
  watch:{
    // 监听到当前播放的歌曲id发生了变化
    playIndex(){
      this.$refs.audio.autoplay = true;
      this.timeStamp();
      if(this.$refs.audio.paused){
        this.updateIsPaused(false);
      }
    },
    //监听到当前播放的歌曲列表发生了变化
    playList(){
      this.timeStamp();
      if(this.ispaused){
        console.log('点击了歌词列表');
        this.$refs.audio.autoplay=true
        this.updateIsPaused(false);
      }
    },
  }
}
</script>

<style lang="less" scoped>
.footer{
    width: 100%;
    height: 2rem;
    background-color: white;
    border-top: .02rem solid #999;
    position: fixed;
    bottom: 0;
    z-index: 2;
    display: flex;
    justify-content: space-around;
    align-items: center;
    // padding:.2rem;
    .footerLeft{
      width: 80%;
      font-size: .26rem;
      display: flex;
      padding-left: .4rem;
      // border: .02rem solid skyblue;
      // justify-content: space-around;
      img{
        width: 1.3rem;
        height: 1.3rem;
        border-radius: 50%;
        margin-right: .4rem;
      }
      .defaultName{
        width: 60%;
        // border: 1px solid red;
        display: flex;
        flex-direction: column;
        justify-content: center;
        h6{
            font-size: .35rem;
             display: -webkit-box;
             -webkit-box-orient: vertical;
             -webkit-line-clamp: 1;
             overflow: hidden;
        }
      }
    }
    .footerRight{
      width: 20%;
      display: flex;
      justify-content: space-evenly;
      .icon{
        width: .6rem;
        height: .6rem;
      }
    }
}
</style>>