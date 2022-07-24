<template>
    <div class="scroll">
        <item-musictop :playlist="state.playlist"></item-musictop>
        <item-musiclist :songs="state.songs" :subscribedCount="state.playlist.subscribedCount"></item-musiclist>
    </div>
</template>

<script>
import {useRoute} from 'vue-router';
import {onMounted, reactive} from 'vue';
import {getMusicItemList, getMusicList} from '../request/api/item'
import ItemMusictop from '../components/item/ItemMusictop.vue'
import ItemMusiclist from '../components/item/ItemMusiclist.vue'
export default {
    components: {ItemMusictop,ItemMusiclist },
    setup(){
        const state = reactive({
            playlist:{},
            songs:[],
        })
        onMounted(async()=>{
            let id = useRoute().query.id;
            let data = await getMusicItemList(id);
            //console.log(id);
            console.log(data.data.playlist);
            state.playlist = data.data.playlist;
            //console.log(state);
            // 防止页面刷新，数据丢失，将数据保存到sessionStorage中
            sessionStorage.setItem('itemDetail', JSON.stringify(state));
            let music = await getMusicList(id);
            console.log(music.data.songs);
            state.songs = music.data.songs;
        })
        return {state}
    }
}
</script>

<style lang="less" scoped>
.scroll{
    display: inline-block;
    position: fixed;
    top: 0;
    bottom: 0;
    overflow: scroll;
    right: 0;
    width: 100%;
    margin-bottom: 2rem;
    z-index: 1;
}
</style>>
