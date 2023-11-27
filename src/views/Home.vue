<template>
<div class="page-home" >
   <div class="part-banner">
        <div class="left-banner">
            <el-carousel :autoplay="false">
                <el-carousel-item v-for="item in bannerList" :key="item.id">
                    <router-link tag="div" :to="item.toherf">
                        <img :src="item.img" alt="">
                        <p>{{ item.text }}</p>
                    </router-link>
                </el-carousel-item>
            </el-carousel>
        </div>
        <div class="right-tool">
            <router-link v-for="item in toolList" :key="item.id" :to="item.goLink" tag="li" class="img-wapper">
                <img :src="item.img" alt="">
            </router-link>
        </div>
   </div>
   <div class="part-nav">
        <router-link tag="div" v-for="item in types" :key="item.id" :to="item.goLink + item.id">
            <h3>{{ item.text }}</h3>
            <p>{{ item.e_text }}</p>
            <span v-for="childItem in item.children" :key="childItem.c_id">{{ childItem.c_text }}/</span>
        </router-link>
   </div>
   <div class="part-course">
        <div class="title">
            <h2>课程</h2>
            <router-link tag="div" to="/course" class="more">
                <span>更多</span>
                <img src="/static/img/home/more.png" alt="">
            </router-link>
        </div>
        <div class="list-course">
            <router-link v-for="item in courseList" :key="item.id" tag="div" :to="item.link" class="container-course">
                <el-card :body-style="{ padding: '0px' }">
                        <img :src="item.img" alt="">
                        <h4>{{ item.title }}</h4>
                        <div class="info-course">
                            <span>讲师：{{ item.teacher }}</span>
                            <span>{{ item.num }}节</span>
                        </div>
                    </el-card>
            </router-link>
            <!-- <el-row>
                <el-col v-for="item in courseList" :key="item.id">
                    <el-card>
                        <img :src="item.img" alt="">
                        <h4>{{ item.title }}</h4>
                        <div>
                            <span>讲师：{{ item.teacher }}</span>
                            <span>{{ item.num }}</span>
                        </div>
                    </el-card>
                </el-col>
            </el-row> -->
        </div>
   </div>
   <div class="part-case">
        <div class="title">
            <h2>案例</h2>
            <router-link tag="div" to="/course" class="more">
                <span>更多</span>
                <img src="/static/img/home/more.png" alt="">
            </router-link>
        </div>
        <div class="list-case">
            <router-link v-for="item in caseList" :key="item.id" tag="div" :to="item.link" 
                class="container-case">
                <div @mouseenter="changIsEnter(item.id)" @mouseleave="leaveCase">
                    <el-card :class="{'enter-case': isEnter == item.id}">
                        <div class="case-title">
                            <span>{{ item.title }}</span>
                            <img :src="isEnter? '/static/img/home/case_hover.png' : '/static/img/home/case.png'" alt="">
                        </div>
                        <div class="case-content">
                            <!-- <span>{{ item.content }}</span> -->
                            {{ item.content }}
                        </div>
                    </el-card>

                </div>
            </router-link>
        </div>
   </div>
   <div class="part-article">
        <div class="title">
            <h2>文章</h2>
            <router-link tag="div" to="/course" class="more">
                <span>更多</span>
                <img src="/static/img/home/more.png" alt="">
            </router-link>
        </div>
        <article-list :dataList="articleList"></article-list>
   </div>
   <div class="part-test">
        <div class="title">
            <h2>测试题</h2>
            <router-link tag="div" to="/course" class="more">
                <span>更多</span>
                <img src="/static/img/home/more.png" alt="">
            </router-link>
        </div>
        <div class="list-test">
            <img src="/static/img/home/test-week.png" alt=""><img src="/static/img/home/test-mouth.png" alt=""><img src="/static/img/home/test.png" alt="">
        </div>
   </div>
</div>
</template>
<style lang="scss">
@import '@/style/mixin.scss';
.page-home {
    .title {
            display: flex;
            //border-left: 3px solid #c69c47;
            padding-left: 3px;
            margin-bottom: 11px;
            margin-top: 28px;
            h2 {
                font-size: 22px;
                font-weight: 500;
                color: #666666;
                flex: 1;
                position: relative;
                padding-left: 13px;
                &::before {
                    content: '';
                    border-left: 5px solid #c69c47;
                    height: 21px;
                    position: absolute;
                    left: -4px;
                    top: 4px;
                }
            }
            .more {
                position: relative;
                span {
                    font-size: 13px;
                    color: #999999;
                    font-weight: 550;
                    margin-right: 20px;
                }
                img {
                    position: absolute;
                    top:11px;
                    right: 0px;
                    width: 14px;
                }
            }
        }

    .part-banner {
        display: flex;
        width: 100%;
        height: 285px;
        .left-banner {
            // height: 600px;
            position: relative;
            background-color: beige;
            flex:1 ;
            overflow: hidden;
            .el-carousel {
                height: 285px;
            }
            .el-carousel__container {
                height: 285px;
            }
            .el-carousel__item {
                height: 285px;
                overflow: hidden;
                img {
                    width: 100%;
                    height: 285px;
                }
                p {
                    position: absolute;
                    bottom: 10px;
                    left: 10px;
                    background-color: bisque;
                    opacity: 0.5;
                }
            }
        }
        .right-tool {
            //background-color: #ccc;
            width: 30.47%;
            margin-left: 8px;
            display: flex;
            flex-wrap: wrap;
            .img-wapper {
                @include wh(48.4%, 48.4%);
                &:nth-child(2n) {
                    margin-left: 9px;
                }
                &:nth-child(3n+3),
                &:nth-child(2n+4) {
                    margin-top: 7px;
                }
                img {
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
    .part-nav {
        display: flex;
        flex-wrap: wrap;
        padding: 25px 10px 51px;
        margin-top: 14px;
        justify-content: center;
        background-color: #fff;
        height: 200px;
        div {
            border: 0.5px solid #ccc;
            width: 22%;
            height: 50%;
            // padding-top: 23px;
            word-break: break-all;
            padding-left: 26px;
            padding-bottom: 12px;
            &:nth-child(-n+4) {
                border-top: none;
            }
            &:nth-child(n+5) {
                border-bottom: none;
                padding-top: 14px;
            }
            &:first-child,
            &:nth-child(5) {
                border-left: none;
            }
            &:last-child,
            &:nth-child(4) {
                border-right: none;
            }
            &:nth-child(2),
            &:nth-child(6) {
                flex: 1;
            }
            h3 {
                font-size: 20px;
                font-weight: 540;
            }
            p {
                color: #6d6d6d;
                font-size: 12px;
                text-transform: capitalize;
            }
            span {
                font-size: 12px;
                color: #999999;
            }
        }
    }
    .part-course {
        .list-course {
            display: flex;
            justify-content: space-between;
            .container-course {
                width: 222px;

                .el-card {
                    .el-card__body {
                        height: 213px;
                        position: relative;
                    }
                    img {
                        width: 100%;
                        height: 125px;
                    }
                    h4 {
                        font-size: 14px;
                        font-weight: normal;
                        padding: 5px 10px;
                    }
                    .info-course {
                        //display: flex;
                        padding: 6px 12px 10px;
                        font-size: 12px;
                        position: absolute;
                        bottom: 1px;
                        width: 88%;
                        span {
                            &:last-child {
                                background-color: #c69c47;
                                color: #fff;
                                padding: 1px 2px;
                                border-radius: 2px;
                                float: right;
                            }
                        }
                    }
                }
            }

        }
        
        
    }
    .part-case {
        .list-case {
            display: flex;
            justify-content: space-between;
            .container-case {
                width: 300px;
                    .el-card__body {
                        padding: 30px 16px;
                    }
                .case-title {
                    font-size: 15px;
                    display: flex;
                    span {
                        width: 200px;
                        word-break: break-all;
                        display: inline-block;
                        flex: 1;
                    }
                    img {
                        width: 40px;
                        height: 31px;
                        margin-left: 10px;
                    }
                }
                .case-content {
                    margin-top: 23px;
                    width: 100%;
                    word-break: break-all;
                    height: 69px;
                    font-size: 13px;
                    overflow: hidden;
                    display: -webkit-box;
                    //white-space: nowrap;
                    text-overflow: ellipsis;
                    -webkit-line-clamp: 4;
                    -webkit-box-orient: vertical;
                }
            }
        }
        .enter-case {
            color: #fff;
            background-color: #c69c47;
        }
    }
    .part-test {
        .list-test {
            display: flex;
            justify-content: space-between;
            padding-top: 3px;
            img {
                width: 300px;
            }
        }
    }
}
</style>
<script>
import HttpManager from '../api/getData';
import articleList from '../components/articleList.vue';

export default {
  components: { articleList },
    data() {
        return {
            types: [],
            bannerList: {},
            courseList: [],
            caseList: [],
            articleList: [],
            //鼠标是进入案例列表
            isEnter: 0,
            toolList: [{id: 1, "img": "/static/img/home/tool1.png", "goLink": "/article/detail/:id"},
                       {id: 2, "img": "/static/img/home/tool2.png", "goLink": "/article/detail/:id"},
                       {id: 3, "img": "/static/img/home/tool3.png", "goLink": "/article/detail/:id"},
                       {id: 4, "img": "/static/img/home/tool4.png", "goLink": "/article/detail/:id"}
                    ]
        }
    },
    created() {
        //获取首页数据
        HttpManager.getHomeData().then(({ data }) => {
            //console.log(data);
            this.bannerList = data.banner;
            this.types = data.types;
            this.courseList = data.course;
            this.caseList = data.case;
            this.articleList = data.article;
        })
    },
    methods: {
        changIsEnter(id) {
            this.isEnter = id;
            //console.log('entercase',this.isEnter)
        },
        leaveCase() {
            this.isEnter = 0;
        }
    }
}
</script>