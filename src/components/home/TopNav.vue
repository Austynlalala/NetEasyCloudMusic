<template>
    <div class="topnav">
        <div class="topleft">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-31liebiao"></use>
            </svg>
        </div>
        
        <div class="topcenter">
            <router-link to="/myview">
                <span class="My">我的</span>
            </router-link>
            <span class="active">发现</span>
            <span>云村</span>
            <span>视频</span>
        </div>
        <div class="topright">
            <svg class="icon" aria-hidden="true" @click="$router.push('/searchview')">
                <use xlink:href="#icon-sousuo"></use>
            </svg>
        </div>
    </div>

</template>

<script>
export default {

}
</script>

<style lang='less' scoped>
.icon{
  width: .6rem;
  height: .6rem;
}
.topnav{
    padding: .125rem;
    display: flex;
    justify-content: space-between;
    // align-items: center;
    font-size: .4rem;
    .topcenter{
        width: 5.2rem;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-content: center;
        .active{
            font-weight: 900;
        }
        .My{
            color: black;
        }
    }
}

</style>