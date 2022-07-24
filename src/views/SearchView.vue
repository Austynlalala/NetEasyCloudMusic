<template>
  <div class="searchTop">
    <svg class="icon" id="backicon" aria-hidden="true" @click="$router.go(-1)">
        <use xlink:href="#icon-zuojiantou"></use>
    </svg>
    <svg class="icon" id="search" aria-hidden="true" @click="$router.go(-1)">
        <use xlink:href="#icon-sousuo"></use>
    </svg>
    <input type="text" placeholder="陈奕迅" @keydown.enter="search" v-model="inputcontent">
    <p class="searchbtn" @click="search">搜索</p>
  </div>

  <div class="history">
    <p>
        <h6>历史</h6>
        <svg class="icon" id="delete" aria-hidden="true" @click="delHistory">
            <use xlink:href="#icon-shanchu"></use>
        </svg>
    </p>
    <span v-for="item in searchHistory" @click="getSearchContent(item)">{{item}}</span>
  </div>

  <ul class="songList" v-if="searchItemShow">
        <li v-for="item, index in searchItem" :key="item.al.id">
            <div class="songDetail" @click="currentMusic(item)">
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
</template>

<script>
import {getSearchItem} from '@/request/api/search';
export default {
    data(){
        return {
            searchHistory:[],//搜索历史
            inputcontent:'',//当前输入框输入的内容
            searchItem: [],//根据搜索的内容返回的歌曲
            searchItemShow:false,
        }
    },
    mounted(){
        if(localStorage.getItem('searchHistory')){
            this.searchHistory = JSON.parse(localStorage.getItem('searchHistory'));
        }
    },
    methods:{
        search(){
            if(this.inputcontent.trim()){
                this.searchHistory.unshift(this.inputcontent);
                this.getSearchContent(this.inputcontent);
            }
                
            this.searchHistory = [...new Set(this.searchHistory)];
            this.searchItemShow = true;
            this.inputcontent='';
            localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory))
        },
        delHistory(){
            localStorage.removeItem('searchHistory');
            this.searchHistory=[];
            this.searchItemShow = false;
        },
       async getSearchContent(item){
        let searchItem = await getSearchItem(item);
        this.searchItem = searchItem.data.result.songs;
        console.log(this.searchItem);
        this.searchItemShow = true;
        // console.log(searchItem);
        },
        currentMusic(item){
            this.$store.commit('updateSearchMusic', item);
            this.$store.commit('updateMusicindex', this.$store.state.playList.length-1);
        }
    }

}
</script>

<style lang="less" scoped>

.searchTop{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    // padding: .2rem .1rem 0;
    padding-top: .2rem;
    input{
        width: 70%;
        height: .8rem;
        background: #F7F7F7;
        border: none;
        border-radius: .4rem;
        padding-left: .9rem;
        line-height: .8rem;
        font-size: .32rem;
        // margin-left: .2rem;
        vertical-align: middle;
    }
    input::-webkit-input-placeholder{
        color:#CCCCCC;
        font-size: .36rem;
    }
    #search{
        width: .4rem;
        height: .4rem;
        position: absolute;
        left: 1.8rem;
        top: .4rem;
        fill: #CCCCCC;
    }
    #backicon{
        width: .8rem;
        height: .8rem;
        fill: #3C3C3C;
    }
    .searchbtn{
        font-size: .38rem;
    }
}
.history{
    padding: .3rem;
    width: 100%;
    p{
        // border: 1px solid red;
        height: 1rem;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        h6{
            font-weight: normal;
            font-size: .4rem;
            // margin-bottom: .2rem;
        }
        #delete{
            fill: #3C3C3C;
            width: .6rem;
            height: .6rem;
        }
    }
    span{
        // white-space: nowrap;
        display:inline-block;
        margin: .04rem;
        padding: .2rem;
        background-color: #F7F7F7;
        font-size: .24rem;
        border-radius: .4rem;
        color: hsl(0, 2%, 63%)
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
                            font-style: normal;;
                        }
                    }
                }
            }
        }
    }
</style>