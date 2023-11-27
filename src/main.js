import Vue from 'vue';
import App from './App';
import router from './router/router';
import store from './store';
import VueSocketIO from 'vue-socket.io';
import SocketIO from 'socket.io-client';
import ElementUI from 'element-ui';
import './tools/rem';
import 'element-ui/lib/theme-chalk/index.css';
import 'swiper/dist/css/swiper.min.css'
import 'swiper/dist/js/swiper.min'

Vue.use(ElementUI);
Vue.use(new VueSocketIO({
    debug: true,
    connection: SocketIO.connect('http://localhost:3031',{
        transport: ['websocket']
    })
}))

//实例化
new Vue({
   /*  sockets: {
        connecting() { console.log('正在连接') },
        connect() { console.log('连接成功') },
        disconnect() { console.log('断开连接') },
        connect_failed() { console.log('连接失败') },
        error() { console.log('错误发生，并且无法被其他事件类型所处理') },
        reconnecting() { console.log('正在重连') },
        reconnect_failed() { console.log('重连失败') },
        reconnect() { console.log('重连成功') },
        welcome: data => {//全局监听订阅事件，需要与后端约定好
            console.log('welcome data', data)
        } 
    } , */
    //注册store
    store,
    //注册路由router
    router,
    //渲染
    render: h => h(App)
//上树
}).$mount('#app')