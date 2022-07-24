<template>
  <div class="music" >
    <div class="menu">
        <p class="playAll">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-bofanganniu"></use>
            </svg>
            <span>播放全部<i>({{songs.length}})</i></span>
        </p>
        <p class="subscrib">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-jiahao"></use>
            </svg>
            <span>收藏({{formatNum}})</span>
        </p>
    </div>
    <ul class="songList">
        <li v-for="item, index in songs" :key="item.al.id">
            <div class="songDetail" @click="currentMusic(index)">
                <p>{{index+1}}</p>
                <div>
                    <h6>{{item.name}}</h6>
                    <span>
                        <i v-for="singer, id in item.ar" :key="singer.id">{{id+1 != item.ar.length ? singer.name+'/': singer.name}}</i>
                    </span>
                </div>
            </div>
            <div class="operation">
                <svg class="icon" aria-hidden="true" v-if="item.mv!=0">
                    <use xlink:href="#icon-shipin"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-31liebiao"></use>
                </svg>
            </div>
        </li>
    </ul>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
    setup(props){
        console.log(props);
        return {props};
    },
    props:['songs','subscribedCount'],
    computed:{
        formatNum(){
            if(this.subscribedCount>10000){
                return (this.subscribedCount/10000).toFixed(0)+'万';
            }
        }
    },
    methods:{
        ...mapMutations(['updateCurrentmusic', 'updateMusicindex', 'updatecurrentTime']),
        currentMusic(musicIndex){
            this.updateCurrentmusic(this.songs)
            this.updateMusicindex(musicIndex);
        }
        // getScroll(event){
        //     // scrollBottom为滚动条距离底部的距离，event.target.scrollHeight是滚动条的高度，event.target.scrollTop是当前滚动条纵坐标的位置
        //     let scrollBottom = event.target.scrollHeight-event.target.scrollTop-event.target.clientHeight;
        //     console.log(scrollBottom);

        // }
    }
}
</script>

<style lang='less' scoped>
.music{
    width: 100%;
    background-color: white;
    padding-right: 0.2rem;
    padding-left: 0.2rem;
    // margin-bottom: 2rem;
    border-top-right-radius: .4rem;
    border-top-left-radius: .4rem;
    i{
        font-style: normal;
        font-weight: 400;
        color: rgb(128, 128, 128);
    }
    .menu{
        display: flex;
        width: 100%;
        justify-content: space-between;
        padding-top: .2rem;
        span{
            font-size: .24rem;
        }
        .playAll{
            span{
                font-weight: 600;
            }
            .icon{
                margin-right: .2rem;
                font-size: .6rem;
                vertical-align: -0.30em;
                fill: #E23F3F;
                // color: #E23F3F;
            }
        }
        .subscrib{
            // margin-right: -0.2rem;
            display: flex;
            align-items: center;
            color:aliceblue;
            padding: 0 .1rem;
            // border: .02rem solid red;
            background-color: #E23F3F;
            border-radius: .5rem;
            transform: scale(0.9);
            // span{
            //    transform: scale(0.9);
            // }
            .icon{
                height: 0.4rem;
                width: 0.4rem;
                fill: aliceblue;
            }
        }
    }
    .songList{
        width: 100%;
        font-size: .28rem;
        margin-top: .2rem;
        // padding-bottom: 2rem;
        // border: .02rem solid red;
        box-sizing: border-box;
        li{
            width: 100%;
            height: 1.4rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 .1rem;
            .icon{
                height: .52rem;
                width: 0.52rem;
                fill:#778899;
                +.icon{
                    margin-left: .3rem;
                }
            }
            .songDetail{
                width: 70%;
                display: flex;
                align-items: center;
                p{
                    color: #454545;
                }
                div{
                    // border: 1px solid red;
                    display: flex;
                    flex-direction: column;
                    margin-left: .3rem;
                    width: 90%;
                    h6{
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 1;
                        overflow: hidden;
                        font-size: .36rem;
                        font-weight: 500;
                    }
                    span{
                        display: block;
                        float: left;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 1;
                        overflow: hidden;
                        i{
                            color: #d3d3d3;
                        }
                    }
                }
            }
        }
    }

}
</style>