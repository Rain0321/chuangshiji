<template>
<div class="header-top">
    <div class="header-container container">
        <div class="header-content">
            <router-link tag="div" to="/" class="logo">
                <img src="/static/img/web/header/logo.png" alt="">
            </router-link>
            <div class="search">
                <select name="" id="" v-model="type">
                    <option v-for="item in types" :key="item.id" :value="item.value">{{ item.text }}</option>
                </select>
                <input type="text" placeholder="请输入关键字搜索" v-model="msg" @keyup.enter="showSearch">
                <span @click="showSearch"><img src="/static/img/web/header/search.png" alt=""></span>
                <ul>

                </ul>
            </div>
            <div class="guide" @mouseover="showGuide = !showGuide" @mouseout="showGuide = !showGuide">
                <div>
                    <img src="/static/img/web/header/guide.png" alt="">
                    <span>用户指南</span>
                </div>
                <div v-show="showGuide">
                    <p>用户指南巴啦啦啦啦啦，</p>
                </div>
            </div>
            <div class="user">
                <img src="/static/img/web/header/user.png" alt="" @click="showUser = !showUser">
                <router-link v-if="!$store.state.userIfo.userId" tag="span" to="/signin">登陆</router-link>
                <div v-else @mouseover="showUser = !showUser" @mouseout="showUser = !showUser">
                    <span>{{ $store.state.userIfo.username }}</span>
                    <ul v-show="showUser">
                        <router-link tag="li" to="/personal">个人中心</router-link>
                        <router-link tag="li" to="/chart">消息</router-link>
                        <router-link tag="li" to="/" @click.native="logOutHandle">退出登录</router-link>
                    </ul>
                </div>
            </div>
            <div class="admin" v-if="$store.state.userIfo && $store.state.userIfo.isAdmin"  @mouseover="showAdmin = !showAdmin" @mouseout="showAdmin = !showAdmin">
                <span>管理</span>
                <ul v-show="showAdmin">
                    <router-link tag="li" to="/admin/article">文章</router-link>
                    <router-link tag="li" to="/admin/course">课程</router-link>
                    <router-link tag="li" to="/admin/banner">轮播图</router-link>
                </ul>
            </div>
        </div>
    </div>
</div>
</template>
<style lang="scss" scoped>
@import '../style/mixin.scss';
.header-top {
    background-color: #fff;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    @include wh(100%, 62px);
    line-height: 62px;
    border-bottom: 1px solid #ccc;
    .header-container {
        .header-content {
            display: flex;
            justify-content: space-between;
            height: 64px;
            line-height: 68px;
            .logo {
                margin-right: 50px;
                cursor: pointer;
                img {
                    @include wh(13.1rem, 3.1rem);
                }
            }
            .search {
                position: relative;
                border: 1px solid #c69c47;
                flex: 1;
                width: 287px;
                height: 32px;
                margin: 15px 70px 0 12px;
                @include borderRadius(2px);
                select {
                    @include wh(82px, 32px);
                    @include posAbslute;
                    border: none;
                    outline: none;
                }
                input {
                    @include posAbslute(0,82px);
                    @include wh(195px,29px);
                    padding-top: 2px;
                    padding-left: 9px;
                    border: none;
                    outline: none;
                }
                span {
                    position: absolute;
                    top: 0;
                    right: 4px;
                    line-height: 35px;
                    img {
                        @include wh(31px,31px);
                    }
                }
            }
            .guide {
                font-size: 14px;
                //flex: 1;
                position: relative;
                div {
                    &:last-child {
                        background-color: #fff;
                        z-index: 100;
                        @include posAbslute(61px, -45px);
                        border: 1px solid #ccc;
                        padding: 10px;
                    }
                }

            }
            .user {
                font-size: 14px;
                // flex: 1;
                //flex-basis: 35px;
                width: 199px;
                margin-left: 40px;
                position: relative;
                div {
                    display: inline-block;
                }
                ul {
                    background-color: #fff;
                    border: 1px solid #ccc;
                    @include posAbslute(61px, 10px);
                    padding: 10px;
                    background-color: ghostwhite;
                    text-align: center;
                    li {
                        line-height: 27px;
                        margin-bottom: 3px;
                    }
                }
            }
            .admin {
                font-size: 14px;
                //margin-left: 10px;
                position: relative;
                margin-right: 25px;
                &::after {
                    content: '';
                    @include arrow(5px);
                    position: absolute;
                    top: 47%;
                    left: 31px;
                }
                ul {
                    border: 1px solid #ccc;
                    @include posAbslute(61px, -5px);
                    padding: 10px;
                    background-color: ghostwhite;
                    text-align: center;
                    width: 50px;
                    li {
                        line-height: 27px;
                        margin-bottom: 3px;
                    }
                }
        }
    }
    }
}
</style>
<script>
export default {
    data() {
        return {
            types: [
                {id: 1, text: '关键字', value: 'keywords', ischecked: false},
                {id: 2, text: '知识要点', value: 'knowlegde', ischecked: true},
                {id: 3, text: '标签', value: 'labels', ischecked: false},
                {id: 4, text: '案例', value: 'cases', ischecked: false},
                {id: 5, text: '供应商', value: 'supplisers', ischecked: false}
            ],
            msg: '',
            type: 'keywords',
            showGuide: false,
            showUser: false,
            showAdmin: false
        }
    },
    methods: {
        showSearch() {
            this.$store.commit;
        },
        logOutHandle() {
            console.log('退出登录');
            this.$store.commit('get_userInfo',[]);
            localStorage.removeItem('token');
        }
    }
}
</script>