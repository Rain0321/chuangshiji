import Vue from 'vue';
import Router from 'vue-router';
import homeView from '@v/Home'

Vue.use(Router);

export default new Router({
    routes: [
        {path: '/', name: 'home', component: homeView},
        {path: '/signin', name: 'sign-in', component: () => import('@v/signIn'), meta: {noHead: true}},
        {path: '/signup', name: 'sign-up', component: () => import('@v/signUp'), meta: {noHead: true}},
        {path: '/chart', name: 'chart', component: () => import('@v/Chart')},
        {path: '/type/:id', name: 'typeDetail', component: () => import('@v/typeDetail')},
        {path: '/article', name: 'article', component: () => import('@v/article/article')},
        {path: '/article/detail/:id', name: 'articleDetail', component: () => import('@v/article/articleDetail')},
        {path: '/personal', name: 'personal', component: () => import('@v/Personal')},
        {path: '/admin/article', name: 'adminArticle', component: () => import('@v/admin/article/Article')},
        {path: '/admin/course', name: 'adminCourse', component: () => import('@v/admin/course/Course')},
        {path: '/admin/course/create', name: 'createCourse', component: () => import('@v/admin/course/createCourse')},
        {path: '/admin/article/editor', name: 'articleEditor', component: () => import('@v/admin/article/Editor')},
        {path: '/admin/article/create', name: 'articleCreate', component: () => import('@v/admin/article/Create')},
        {path: '/admin/banner', name: 'adminBanner', component: () => import('@v/admin/banner/homeBanner')},
        {path: '/admin/banner/create', name: 'createBanner', component: () => import('@v/admin/banner/createHomeBanner')}
    ]
})