<template>
    <div class="title">
        <h2>{{ title }}</h2>
        <router-link v-if="showMore" tag="div" to="/course" class="more">
            <span>更多</span>
            <img src="/static/img/home/more.png" alt="">
        </router-link>
    </div>
</template>
<style lang="scss" scoped>
.title {
    display: flex;
    //border-left: 3px solid #c69c47;
    padding: 10px ;
    margin-bottom: 11px;
    h2 {
        font-size: 16px;
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
            left: 2px;
            top: 0px;
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
            top:35%;
            right: 0px;
            width: 14px;
        }
    }
}
</style>
<script>
export default {
    props: ['title', 'showMore']
}
</script>
