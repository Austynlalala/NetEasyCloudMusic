<template>
  <div class="musiclist">
    <div class="toptitle">
        <h4>推荐歌单</h4>
        <p>查看更多</p>
    </div>
    <div class="bottommusic">
        <van-swipe :loop="false" :width="130" class="musicitem" :show-indicators="false">
            <van-swipe-item v-for="item in mucislist" key="item.id" class="musiccontent">
                <router-link :to="{path:'/itemMusic', query: {id:item.id}}">
                    <img :src="item.picUrl" alt="">
                    <div class="playcount">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-24gl-play"></use>
                        </svg>
                        <span>{{numberFormat(item.playCount)}}</span>
                    </div>
                    <p>
                        {{item.name}}
                    </p>
                </router-link>
            </van-swipe-item>
        </van-swipe>

    </div>
  </div>
</template>

<script>
import {getMusic} from '@/request/api/home.js'
export default {
    name:'MusicList',
    data(){
        return {
            mucislist:[],
        }
    },
    mounted(){
        this.getMusicList();
    },
    methods:{
       async getMusicList(){
            const res = await getMusic();
            console.log(res);
            this.mucislist = res.data.result;
        },
        numberFormat(value){
            if(value >= 100000000) return (value/100000000).toFixed(0)+'亿';
            else if(value >= 10000) return (value/10000).toFixed(0)+'万';
        }
    }
}
</script>

<style lang='less' scoped>
.musiclist{
    //border: .02rem solid black;
    width: 100%;
    .toptitle{
        display: flex;
        padding: .16rem;
        justify-content: space-between;
        h4{
            font-size: .4rem;
            font-weight: 900;
        }
        p{
            width: 1.8rem;
            height: .6rem;
            text-align: center;
            line-height: .6rem;
            border: .02rem solid silver;
            border-radius: .4rem;
            font-size: .32rem;
            color: #464547;
        }
    }
    .bottommusic{
        // background-color: pink;
        height:4rem;
        .musicitem{
            // border: .02rem solid red;
            margin-left: .16rem;
            height: 100%;
            .musiccontent{
                display: flex;
                flex-direction: column;
                align-items: center;
                height: 100%;
                // margin-left: -0.18rem;
                + .musiccontent{
                    margin-left: -0.18rem;
                }
                font-size: .32rem;
                color: rgb(207, 213, 219);
                position: relative;
                img{
                    width: 90%;
                    border-radius: .3rem;
                }
                p{
                    color: black;
                    // margin-top: .1rem;
                    width: 90%;
                    //height: 100%;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                    // border: .02rem solid red;
                }
                .playcount{
                    background-color: rgba(41, 4, 23, 0.39);
                    border-radius: .3rem;
                    position: absolute;
                    text-align: center;
                    line-height: .5rem;
                    top: .02rem;
                    right: .36rem;
                    width: 1.6rem;
                    height: .5rem;
                    .icon{
                        width: .3rem;
                        height: .3rem;
                        vertical-align: -0.15em;
                    }
                }
            }
        }
    }
}
</style>