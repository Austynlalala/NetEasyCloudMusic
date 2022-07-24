<template>
  <router-view/>
  <item-musicfooter v-show="this.$store.state.isFooterShow"></item-musicfooter>
</template>

<script>
import ItemMusicfooter from './components/item/ItemMusicfooter.vue';
import {mapState} from 'vuex';
export default {
  components:{
    ItemMusicfooter,
  },
  // mounted(){
  //   this.listerenFunction();
  // },
  methods:{
    // listerenFunction(){
    //   document.addEventListener('scroll', this.handleScroll);
    // },
    // handleScroll(){
    //   // scrollBottom为滚动条距离底部的距离，event.target.scrollHeight是滚动条的高度，event.target.scrollTop是当前滚动条纵坐标的位置
    //   let scrollHeight = document.documentElement.scrollHeight;
    //   let clientHeight = document.documentElement.clientHeight;
    //   let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.srollTop;
    //   let scrollBottom = scrollHeight - scrollTop - clientHeight;
    //   // console.log(scrollBottom);
    //   if(scrollBottom<100){
    //     // document.documentElement.clientHeight -=100;
    //   }
    // }
  },
  // beforeDestroy () {
  //   document.removeEventListener('scroll', this.handleScroll);
  // },

}
</script>

<style lang='less' scoped>

</style>