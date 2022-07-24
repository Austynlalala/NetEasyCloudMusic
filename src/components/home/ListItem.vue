<template>
  <div class="listitem">
    <div class="listicon">
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-tuijian"></use>
        </svg>
        <span>每日推荐</span>
    </div>
    <div class="listicon">
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-zhibo"></use>
        </svg>
        <span>直播</span>
    </div>
    <div class="listicon">
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-gedan"></use>
        </svg>
        <span>歌单</span>      
    </div>
    <div class="listicon">
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-paihangbang"></use>
        </svg>
        <span>排行榜</span>
    </div>
  </div>
</template>

<script>
export default {
    name:'ListItem',
}
</script>

<style lang='less' scoped>
.listitem{
    width: 100%;
    height: 2rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .listicon{
        width: 25%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        span{
            font-size: .36rem;
        }
        .icon{
            width: 1.2rem;
        }
    }
}
</style>