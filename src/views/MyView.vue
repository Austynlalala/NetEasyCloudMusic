<template>
  <div class="Myinfo">
    <img :src="persondetail.data.profile.avatarUrl" alt="" class="personimg">
    <p>{{persondetail.data.profile.nickname}}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import {getPersonDetail} from '@/request/api/login'
export default {
  data(){
    return {
      persondetail:{},
    }
  },
  computed:{
    ...mapState(['accountID'])
  },
 async created(){
    let acccountID = localStorage.getItem('acccountID')?JSON.parse(localStorage.getItem('acccountID')):this.accountID;
    let res = await getPersonDetail(acccountID);
    this.persondetail = res;
    console.log(this.persondetail);
  }
}
</script>

<style lang="less" scoped>
.Myinfo{
  padding-top: .4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  .personimg{
    width: 1rem;
    // height: 1em;
    border-radius: 50%;
  }
  p{
    font-size: .3rem;
  }
}

</style>