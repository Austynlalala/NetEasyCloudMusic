<template>
  <div>
    <top-nav></top-nav>
    <swiper-top></swiper-top>
    <list-item></list-item>
    <music-list></music-list>
  </div>
</template>

<script>
// @ is an alias to /src
import TopNav from '../components/home/TopNav.vue';
import SwiperTop from '../components/home/SwiperTop.vue';
import ListItem from '../components/home/ListItem.vue';
import MusicList from '../components/home/MusicList.vue';

export default {
  name: 'HomeView',
  components: {
    TopNav,
    SwiperTop,
    ListItem,
    MusicList,
  }
}
</script>

<style lang = 'less' scoped>

</style>
