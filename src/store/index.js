import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import HttpManager from '../api/getData';

Vue.use(Vuex);

export default new Store({
    state: {
        userIfo: {userId: 1, username: 'laingrya.vue.cn',userImg: '', isAdmin: true},
        //userIfo: null,
        token: '',
        typeList: []
    },
    getters: {},
    mutations: {
        get_types(state,data) {
            state.typeList = data;
        },
        get_userInfo(state,data) {
            state.userIfo = data;
        }
    },
    actions: {
        home_http: (state) => {
            HttpManager.getHomeData().then(({ data }) => {
                //this.types = data.types;
                state.commit('get_types',data.types)
            })
        }
    },
    modules: {}
})