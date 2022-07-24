<template>
  <div class="detailTop">
    <img :src="playList[playIndex].al.picUrl" alt="">
    <div class="detailTopLeft">
        <svg class="icon" aria-hidden="true" @click="GoMusicList()">
            <use xlink:href="#icon-zuojiantou"></use>
        </svg>
        <div class="musicText">
            <Vue3Marquee>
                <h6>{{playList[playIndex].name}}</h6>
            </Vue3Marquee>
            <p>
                <i>
                    <span v-for="author, index in playList[playIndex].ar">{{index+1==playList[playIndex].ar.length ? author.name : author.name+' / '}}</span>
                </i>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-youjiantou"></use>
                </svg>
            </p>
        </div>
    </div>
    <div class="detailTopRight">
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-fenxiang"></use>
        </svg>
    </div>
  </div>

  <div class="lyric" v-show="isLyricShow" @click="isLyricShow=!isLyricShow">
    <p v-for="item, index in lyriclist" class="lyricScroll"  :class="(index+1 != lyriclist.length && currentTime >= item.nowTime && currentTime<lyriclist[index+1].nowTime)? 'lyricScroll_activate': ''">
       {{item.lyric}}
    </p>
  </div>

  <div class="detailContent" v-show="!isLyricShow">
    <img src="@/assets/needle.png" alt="" class="imgNeedle" :class="ispaused ? '':'imgNeedle_activate'">
    <!-- <img src="@/assets/circle.png" alt="" class="imgCircle"> -->
    <div class="disk" @click="isLyricShow=!isLyricShow">
        <img :src="playList[playIndex].al.picUrl" alt="" class="imgBgi" :class="ispaused ? 'imgBgi_paused':'imgBgi_activate'">
    </div>
  </div>

  <div class="detailFooter">
    <div class="footerTop">
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-aixin"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xiazai-wenjianxiazai-07"></use>
        </svg>
        <svg class="icon, record" aria-hidden="true">
            <use xlink:href="#icon--"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-31xiaoxi"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-liebiao-"></use>
        </svg>
    </div>

    <div class="footerCenter">
        <input type="range" class="range" min="0" :max="duration" v-model="currentTime">
    </div>

    <div class="footerBottom">
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xunhuan"></use>
        </svg>
        <svg class="icon" aria-hidden="true" @click="changeMusic(-1)">
            <use xlink:href="#icon-shangyishoushangyige"></use>
        </svg>
        <svg class="icon" aria-hidden="true" v-if="ispaused" @click="play()">
            <use xlink:href="#icon-65zanting"></use>
        </svg>
        <svg class="icon" aria-hidden="true" v-else @click="play()">
            <use xlink:href="#icon-zanting"></use>
        </svg>
        <svg class="icon" aria-hidden="true" @click="changeMusic(1)">
            <use xlink:href="#icon-xiayigexiayishou"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-zu"></use>
        </svg>
    </div>
  </div>
</template>

<script>
import {Vue3Marquee} from 'vue3-marquee';
import 'vue3-marquee/dist/style.css';
import { mapMutations, mapState } from 'vuex';
export default {
    data(){
        return {
            isLyricShow:false,//显示的是磁盘
            // isLyricShow:ture,//显示的是歌曲部分
        }
    },
    mounted(){
        this.changeDuration();
    },
    props:['playList', 'playIndex', 'play', 'changeDuration'],
    components:{
        Vue3Marquee,
    },
   methods:{
    ...mapMutations(['updateIsDetailShow', 'updateIsPaused', 'updateMusicindex']),
    GoMusicList(){
        this.isLyricShow = false;
        this.updateIsDetailShow();
    },
    // 通过更新歌曲的id来切换上下首
    changeMusic(index){
        let musicIndex = this.playIndex + index;
        if(musicIndex < 0){
            musicIndex = this.playList.length-1;
        }
        else if(musicIndex > this.playList.length){
            musicIndex = 0;
        }
        else if(musicIndex==1 && this.playList.length==1){
            musicIndex = 0;
        }
        this.updateMusicindex(musicIndex)
    }
   },
   computed: {
    ...mapState(['ispaused', 'lyric', 'currentTime', 'duration']),
    // 歌词的处理
    lyriclist(){
        if(this.lyric.lyric){
            let arr = this.lyric.lyric.split(/[(\r\n)\r\n]+/).map((item, index)=>{
                let min = item.slice(1, 3);//
                let sec = item.slice(4, 6);
                let ms = item.slice(7, 10);
                let lyric = item.slice(11, item.length);
                if(isNaN(ms)){
                    ms = item.slice(7, 9);
                    lyric = item.slice(10, item.length);
                }
                let nowTime = parseInt(min)*60 + parseInt(sec) + parseInt(ms)/1000;
                return {min, sec, ms, lyric, nowTime};
            });
            arr[arr.length-1].nowTime = this.duration;
            console.log(arr);
            return arr;
        }
    }
   },
   watch:{
    currentTime(newval){
        // 获取当前高亮的歌词距离顶部的距离
        let p = document.querySelector("p.lyricScroll_activate");
        // console.log([p]);
        if(p && p.offsetTop > 300)
        {
            let scrollLyric = document.querySelector(".lyric");
            // console.log([scrollLyric]);
            scrollLyric.scrollTop = p.offsetTop-300;
            // scrollLyric.style.setProperty('margin-top', '2rem')
        }
        if(newval == this.duration){
            console.log('hhhh');
            this.changeMusic(1);
        }  
    }
    }
}
</script>

<style lang="less" scoped>
@keyframes rotate{
    0%{
        transform: rotateZ(0deg);
    }
    100%{
        transform: rotateZ(360deg);
    }
}
.detailTop{
    width: 100%;
    display: flex;
    // padding: .04rem .2rem;
    justify-content: space-between;
    .icon{
            width: .8rem;
            height: .8rem;
            margin-right: .1rem;
            fill: white;
        }
    img{
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: -1;
        filter: blur(80px) brightness(50%);
    }
    .detailTopLeft{
        // border: .02rem solid red;
        width: 50%;
        display: flex;
        font-size: .3rem;
        color: white;
        padding-top: 0.2rem;
        .musicText{ 
            width: 80%;
            // border: .02rem solid pink;
             h6{
                font-weight: normal;
                font-size: .40rem;
            }
            p{
                // border: .02rem solid skyblue;
                width: 100%;
                font-size: .36rem;
                color: #E6E6E6;
                display: flex;
                i{
                    font-style: normal;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 1;
                    overflow: hidden;
                    height: .5rem;
                    line-height: .5rem;
                    // border: .02rem solid red;
                }
                .icon{
                    width: .5rem;
                    height: .5rem;
                    // vertical-align: -1rem;
                    fill: #E6E6E6;
                    // position: absolute;
                    // top: 2rem;
                    // left: 4rem;

                }
            }
        }
       
    }
    .detailTopRight{
        // width: 20%;
        padding-top: 0.2rem;
    }
}
.lyric{
    width: 100%;
    height: 10rem;
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    // justify-content: space-evenly;
    overflow: scroll;
    // border: .02rem solid red;
    text-align: center;
    .lyricScroll{
        
        font-size: .36rem;
        color: #C4C4C4;
        margin-top: .3rem;
    }
    .lyricScroll_activate{
        font-size: .4rem;
        color: white;
    }
}
.detailContent{
    width: 100%;
    display: flex;
    flex-direction: column;
    // justify-content: center;
    align-items: center;
    // border: .02rem solid red;
    .imgNeedle{
        position: absolute;
        top: 1.5rem;
        left: 45%;   
        height: 4.5rem;
        transform-origin: 0 0;
        transform: rotate(-20deg);
        transition: all 1.5s;
        // width: 3rem;
    }
    .imgNeedle_activate{
        transform: rotate(0deg);
        transition: all 1.5s;
        // width: 3rem;
    }
    .disk{
        // position: relative;
        width: 7rem;
        height: 7rem;
        background-image: url('@/assets/circle.png');
        background-repeat: no-repeat;
        background-size: contain;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top:3rem;
        .imgBgi{
            width: 4.5rem;
            height: 4.5rem;
            border-radius: 50%;  
            animation: rotate 10s infinite linear;
        }
        .imgBgi_activate{
            animation-play-state: running;
        }
        .imgBgi_paused{
            animation-play-state: paused;
        }
    }
}
.detailFooter{
    position: fixed;
    z-index: 1;
    bottom: 0;
    width: 100%;
    height: 4rem;
    // border: .04rem solid skyblue;
    padding-left: .4rem;
    padding-right: .4rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .icon{
        // width: .8rem;
        // height: .8rem;
        fill: #E6E6E6;
    }
    .footerTop{
        // height: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        // border: .02rem solid blueviolet;
        .record{
            fill: #E6E6E6;;
            width: .8rem;
            height: .8rem
        }
    }
    .footerCenter{
        // border: .02rem solid skyblue;
        .range{
            width: 100%;
            height: .03rem;
            -webkit-appearance: none;
            appearance: none;
            outline: 0;
            border: 0;
            background: #f3eded80;
        }
        .range::-webkit-slider-thumb{
            appearance: none;
            -webkit-appearance: none;
            height: .2rem;
            width: .2rem;
            border-radius: 50%;
            background-color: white;
        }
    }
    .footerBottom{
        // border: .02rem solid pink;
        display: flex;
        justify-content: space-between;
    }
}

</style>>
