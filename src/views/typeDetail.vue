<template>
    <div class="page-types">
        <div class="part-nav">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
                <el-breadcrumb-item>{{ type.text }}</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="nav-container">
                <el-menu mode="horizontal" :router="true" active-text-color="#c49c47">
                    <el-menu-item v-for="item in typeList" :key="item.id" :index="'/type/' + item.id">{{ item.text }}</el-menu-item>
                </el-menu>
                <div class="btn-tool">
                    <router-link to="/tool" tag="span">媒体库/供应商</router-link>
                </div>
            </div>
        </div>
        <div class="detail-menu">
            <div class="menu-left">
                <menu-title title="核心综述" :showMore="true"></menu-title>
            </div>
            <div class="menu-right">
                <menu-title title="测试题" :showMore="false"></menu-title>
            </div>
        </div>
        <div class="detail-submenu">
            <div class="submenu-nav">
                <!-- <el-tabs>
                    <el-tab-pane v-for="item in type.children" :key="item.c_id" :label="item.c_text" >{{ item.c_text }}</el-tab-pane>
                </el-tabs> -->
                <el-menu mode="horizontal" :default-active="1" active-text-color="#c49c47" @select="getSubInfo(item.c_id)">
                    <el-menu-item v-for="item in type.children" :key="item.c_id" :index="item.c_id">{{ item.c_text }}</el-menu-item>
                </el-menu>
            </div>
            <div class="submenu-container">
                <div class="submenu-left">
                    <menu-title title="核心综述" :showMore="true"></menu-title>
                    <div class="description"></div>
                    <menu-title title="文章" :showMore="true"></menu-title>
                </div>
                <div class="submenu-right">
                    <menu-title title="名师精品课"></menu-title>
                    <menu-title title="甄选案例库" :showMore="true"></menu-title>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
.page-types {
    .el-breadcrumb__item {
        margin: 10px 0 15px 1px;
    }
    .nav-container {
        display: flex;
        height: 40px;
        line-height: 40px;
        .btn-tool {
            color: #fff;
            background-color: #c49c47;
            border-radius: 3px;
            font-size: 14px;
            margin-left: 15px;
            padding: 0px 18px;
            height: 35px;
            line-height: 35px;
        }
        .el-menu {
            flex: 1;
            display: flex;
            justify-content: space-around;
            li {
                height: 40px;
                line-height: 40px;
            }
        }
    }
    .detail-menu {
        display: flex;
        width: 100%;
        margin-top: 20px;
        
        .menu-left {
            width: 70%;
            height: 300px;
            background-color: #fff;
        }
        .menu-right {
            margin-left: 20px;
            background-color: #fff;
            width: 30%;
        }
    }
    .detail-submenu {
        background-color: #fff;
        height: 300px;
        margin-top: 20px;
        padding: 0 10px;
        .submenu-container {
            margin-top: 15px;
            display: flex;
            .submenu-left {
                width: 70%;
            }
            .submenu-right {
                width: 30%;
                margin-left: 20px;
            }
        }
    }
}
</style>
<script>
import { mapState } from 'vuex';
import menuTitle from '@c/Title'
export default {
    components: {menuTitle},
    data() {
        return {
            //当前页面的分类信息
            type: {}

        }
    },
    created() {
    },
    mounted() {
        this.dealType();

    },
    watch: {
        //监听路由变化
        $route() {
            this.dealType();
        }
    },
    computed: {
        ...mapState(['typeList'])
    },
    methods: {
        //获取当前页面的分类
        dealType() {
            setTimeout(() => {
                this.type = this.typeList.filter(item => item.id == (+this.$route.params.id))[0];
            },1000)
        },
        getSubInfo(id) {
            //获取二级分类的信息
        }
    }
}
</script>