<template>
  <div class="toplist">
    <img :src="playlist.coverImgUrl" alt="" class="bgi">
    <div class="toptitle">
      <div class="leftlist">
        <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
          <use xlink:href="#icon-zuojiantou"></use>
        </svg>
        <span>歌单</span>
      </div>
      <div class="rightlist">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-sousuo"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-caidan"></use>
        </svg>
      </div>
    </div>
    <div class="mainbody">
      <img :src="playlist.coverImgUrl" alt="" class="cover">
      <div class="playcount">
          <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-24gl-play"></use>
          </svg>
          <span>{{numberFormat(playlist.playCount)}}</span>
      </div>
      <div class="detail">
        <h6>{{playlist.name}}</h6>
        <div class="author">
          <img :src="playlist.creator.avatarUrl" alt="" class="authoricon">
          <p>
            <span>{{playlist.creator.nickname}}</span>
            <svg class="icon, righticon" aria-hidden="true">
              <use xlink:href="#icon-youjiantou"></use>
            </svg>
          </p>
        </div>
        <p class="description">
          <span>{{playlist.description}}</span>
          <svg class="icon, righticon" aria-hidden="true">
              <use xlink:href="#icon-youjiantou"></use>
          </svg>
        </p>
      </div>
    </div>
    <ul class="menu">
      <li>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-31xiaoxi"></use>
        </svg>
        <p>{{playlist.commentCount}}</p>
      </li>
      <li>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fenxiang"></use>
        </svg>
        <p>{{playlist.shareCount}}</p>
      </li>
      <li>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiazai-wenjianxiazai-07"></use>
        </svg>
        <p>下载</p>
      </li>
      <li>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-show_duoxuan"></use>
        </svg>
        <p>多选</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
    setup(props){
        console.log(props);
        // console.log(JSON.parse(sessionStorage.getItem('itemDetail')).creator);
        if((props.playlist.creator="")){
          // console.log(JSON.parse(sessionStorage.getItem('itemDetail')));
          props.playlist.creator = JSON.parse(sessionStorage.getItem('itemDetail')).playlist.creator;
        }
    },
    props: ['playlist'],
    methods: {
      numberFormat(value){
            if(value >= 100000000) return (value/100000000).toFixed(0)+'亿';
            else if(value >= 10000) return (value/10000).toFixed(0)+'万';
        }
    }
}
</script>

<style lang="less" scoped>
.icon, .righticon{
  fill: aliceblue;
}
.righticon{
  width: .5rem;
  height: .5rem;
  vertical-align: -0.15rem;
}
.toplist{
  width: 100%;
  height: 7.2rem;
  color: aliceblue;
  //background-color: aquamarine;
  // border: .02rem solid black;
  .bgi{
    position: absolute;
    width: 100%;
    height: 7rem;
    z-index: -1;
    filter: blur(1.5rem);
    }
    .toptitle{
      display: flex;
      justify-content: space-between;
      .leftlist, .rightlist{
      //background-color: pink;
        width: 25%;
        text-align: center;
        margin: .2rem;
        display: flex;
        justify-content: space-between;
        font-size: .48rem;
        }
      .icon{
        width: .7rem;
        height: .7rem;
      }
    }
    .mainbody{
      padding: .4rem .4rem .4rem;
      position: relative;
      display: flex;
      justify-content: space-between;
      // border: .02rem solid skyblue;
      .playcount{
          background-color: rgba(41, 4, 23, 0.39);
          border-radius: .3rem;
          position: absolute;
          text-align: center;
          line-height: .5rem;
          font-size: .16rem;
          color: rgb(194, 200, 206);
          top: .5rem;
          left: 1.8rem;
          width: 1.6rem;
          height: .5rem;
          .icon{
              width: .3rem;
              height: .3rem;
              vertical-align: -0.15em;
          }
      }
      .cover{
        width: 3rem;
        height: 3rem;
        border-radius: .4rem;
      }
      .detail{
        display: flex;
        padding: .1rem 0;
        flex-direction: column;
        justify-content: space-between;
        // border: .02rem solid red;
        width: 60%;
        font-size: .24rem;
        .author{
          display: flex;
          align-items: center;
          // color: rgba(89, 74, 74, 0.979);
          .authoricon{
            transform: scale(0.8);
            margin-right: .04rem;
            margin-left: -0.08rem;
          }
        }
        h6{
          font-size: .36rem;
          font-weight:600;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
        img{
          width: 1rem;
          border-radius: 50%;
        }
        .description{
          position: relative;
          span{
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
          }
          .righticon{
            position: absolute;
            top: 0;
            right: -0.4rem;
          }
        }
      }
    }
    .menu{
      width: 100%;
      display: flex;
      justify-content: space-evenly;
      height: 1.2rem;
      // border: .02rem red solid;
      margin-top: .2rem;
      p{
        font-size: .24rem;
      }
    }
}
</style>