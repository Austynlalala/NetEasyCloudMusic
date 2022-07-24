<template>
    <div class="swiper">
        <van-swipe :autoplay="3000" lazy-render>
            <van-swipe-item v-for="image in state.images" :key="image">
                <img :src="image.pic" />
            </van-swipe-item>
        </van-swipe>
    </div>
</template>

<script>
import {getBanner} from '@/request/api/home.js';
import {reactive, onMounted} from 'vue';
export default {
    name:'SwiperTop',
    setup(){
        const state = reactive({
            images:[],
        });
        onMounted(async ()=>{
            const res = await getBanner();
            // console.log(res);
            state.images = res.data.banners;
            // console.log(state.images);
        });
        return {state};
    },
    
};
</script>

<style lang='less'>
.swiper{
    padding: .2rem;
    .van-swipe{
        border-radius: 25px;
        width: 100%;
        height: 5rem;
        .van-swipe-item{
            img{
            width: 100%;
            height: 100%;
            }
        }
        .van-swipe__indicator--active{
            background-color: #db8282;
        }
    }
}

</style>