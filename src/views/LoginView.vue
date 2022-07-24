<template>
  <div class="login">
    <h6>欢迎登录</h6>
    <div class="info">
        <input type="text" placeholder="请输入手机号码" class="phone" v-model="phone">
        <input type="password" placeholder="请输入登录密码" class="password" v-model="password">
        <button class="Btn" @click="toLogin">登录</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import {getPersonDetail} from '@/request/api/login'
export default {
    data(){
        return {
            phone:'',
            password:'',
        }
    },
    computed:{
        ...mapState(['isLogin']),
    },
    methods:{
       async toLogin(){
        let res = await this.getPerson({'phone':this.phone, 'password':this.password});
        console.log("登录成功后的返回信息：%o", res);
        if(res.status == 200){
            this.updateIsLogin(true);
            // let person =await getPersonDetail(res.data.account.id);
            // console.log("根据accountID返回的个人信息:%o", person);
            this.updateAccountID(res.data.account.id)
            this.$router.push('/myview');
            // console.log('1234678');
        }
        else{
            alert('请输入正确的手机号码或密码！')
        }
        
        },
        ...mapActions(['getPerson']),
        ...mapMutations(['updateIsLogin', 'updateAccountID']),
    }
}
</script>

<style lang="less" scoped>

.login{
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    // justify-content: space-evenly;
    background-color: rgba(198, 8, 8, 0.847);
    backdrop-filter: blur(.4rem);
    font-size: .5rem;
    // border: 1px solid black;
    padding-top: 50%;
    h6{
        font-size: 1.2rem;
        font-weight: normal;
        color: white;
        margin-bottom: .6rem;
    }
    .info{
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: .36rem;
        input{
            width: 6rem;
            height: .8rem;
            border: none;
            margin: .2rem;
            
        }
        .Btn{
            width: 1.5rem; 
            height: .8rem;
            margin-top: .6rem;
        }
    }
}


</style>