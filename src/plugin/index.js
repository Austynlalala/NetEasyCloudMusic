import { Swipe, SwipeItem, Popup} from 'vant';
let plugin = [Swipe, SwipeItem, Popup];
export default function getplugin(app){
    plugin.forEach(item=>{return app.use(item)});
}