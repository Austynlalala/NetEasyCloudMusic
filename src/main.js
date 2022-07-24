import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/js/flexible';
import './assets/iconfont/iconfont';
import './assets/css/index.css';
import getplugin from './plugin/index';

const app = createApp(App);
getplugin(app);
app.use(store);
app.use(router);
app.mount('#app');
