<template>
<div id="app" @scroll="handleScroll($event)" ref="app">
    <template v-if="$route.meta.noHead">
        <router-view></router-view>
    </template>
    <template v-else>
       <head-top></head-top>
        <router-view class="content container"></router-view>
        <Footer></Footer>
    </template>
    <go-top v-show="showGoTop" @click.native="goTop($event)"></go-top>
</div>
</template>
<style lang="scss">
@import './style/common.scss';
* {
    margin: 0;
    padding: 0;
    list-style: none;
}
html,
body {
    //background-color: #efefef;
    height: 100%;
}
#app {
    height: 100%;
    overflow: scroll;
    position: relative;
    width: 100%;
    /* background: url(/static/img/web/home.jpg) no-repeat;
    background-size: 100% auto;
    background-attachment: scroll; */
    background-color: #fafafb;
    .content {
        margin-top: 63px;
    }
}
.design-img {
    /* position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: url(/static/img/web/home.jpg) no-repeat;
    background-size: 100% auto; 
    background-attachment: scroll;*/
    width: 100%;
    z-index: -1;
    position: absolute;
    top: 0;
    img {
        opacity: 0.5;
        width: 100%;
    }
}
</style>
<script>
import headTop from './components/Header.vue';
import Footer from './components/Footer.vue';
import goTop from './components/goTop.vue';
export default {
    components: { headTop, Footer, goTop },
    data() {
        return {
            showGoTop: false,
            isShowHeader: false
        }
    },
    created() {
        //不需要提示，自行发送的请求
        //请求首页数据
        this.$store.dispatch('home_http');
    } ,
    methods: {
        handleScroll(e) {
            //console.log(e.srcElement.scrollHeight,e.srcElement.scrollTop,e.srcElement.offsetHeight);
            if (e.srcElement.scrollTop > 800) {
                this.showGoTop = true;
            } else {
                this.showGoTop = false;
            }
        },
        goTop(e) {
            //console.log(this.$refs.app.scrollTop)
            //e.srcElement.parentNode.parentNode.scrollTop = 0;
            this.$refs.app.scrollTop = 0;
        }
    }
}
</script>