import { createStore } from 'vuex'
import {getMusic} from '@/request/api/item'
import { getPersonInfo } from '@/request/api/login';
export default createStore({
  // state存储基本数据,可以使用vue的Computed获得vuex的state,当一个组件需要获得多个状态的时候，在这个组件中使用mapState辅助函数帮助我们生成计算属性
  state: {
    playList:[{
      al:{
        id: 36152328,
        name: "青柠",
        pic: 109951163020971470,
        picUrl: "https://p1.music.126.net/CFWxtFlJK3qs-Fx-TUfMnQ==/109951163020971473.jpg",
        pic_str: "109951163020971473",
      },
      ar:[{id: 1197168,name: "徐秉龙"},
          {id: 12386867, name: "桃十五"}],
      name:"青柠",//歌名
      id:504624714, //歌曲id
    }],
    playIndex:0,//歌单中，歌曲列表的id，代表的第几首歌
    ispaused:true,//没有播放，暂停状态
    isDetailShow:false,
    lyric:{},//歌词
    currentTime:0,//当前audio播放歌曲的时间戳
    duration:0,//歌曲总时长
    isLogin:false,//是否登录，默认为没有登录的状态
    isFooterShow:true,
    accountID:0,//账户id
    token:''//保存token,当用户登录之后无需再次登录
  },
// 从基本数据state派生的数据，相当于state的计算属性，具有返回值的方法
  getters: {
  },
  //提交更新数据的方法，必须是同步的 每个mutation都有一个字符串的 事件类型和一个回调函数 提交mutation是更改Vuex中的store中状态的唯一方法
  mutations: {
    // 控制播放/暂停
    updateIsPaused(state, value){
      state.ispaused = value;
    },
    // 更新当前播放列表
    updateCurrentmusic(state, value){
      state.playList = value;
    },
    // 更新当前正在播放的歌曲的id
    updateMusicindex(state, value){
      state.playIndex = value;
    },
    // 点击底部歌曲之后是否弹出歌曲详情
    updateIsDetailShow(state){
      state.isDetailShow = !state.isDetailShow;
    },
    updateLyricList(state, value){
      state.lyric = value;
    },
    updatecurrentTime(state, value){
      state.currentTime = value;
    },
    uptadeDuration(state, value){
      state.duration = value;
    },
    // 当点击了搜索列表中的歌曲之后，将歌曲push到播放列表的末尾
    updateSearchMusic(state, item){
      state.playList.push(item);
    },
    updateIsLogin(state, value){
      state.isLogin = value;
    },
    updateAccountID(state, value){
      state.accountID = value;
    },
    uptateToken(state, value){
      state.token = value;
    }
  },
  // 功能和mutation大致相同，不同之处在于：action提交的是mutation，而不是直接更新状态；action可以包含任意异步操作
  actions: {
    async getMusicLyric(context, value){
      let lyric = await getMusic(value)
      context.commit('updateLyricList', lyric.data.lrc)
      console.log('歌词');
      console.log(lyric);
      console.log('context是什么？');
      console.log(context);
    },
    async getPerson(context, value){
      let res = await getPersonInfo(value.phone, value.password);
      console.log(res);
      // console.log(res.data.account.id);
      context.commit('uptateToken', res.data.token);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('acccountID', JSON.stringify(res.data.account.id));
      return res;
    }
  },
  //模块化vuex，可以让模块拥有自己的state、mutation、action、getter，使得结构非常清晰，方便管理。
  modules: {
  }
})
