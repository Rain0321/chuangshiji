<template>
    <div class="article-list">
        <ul>
            <router-link v-for="item in dataList" :key="item.id" tag="li" :to="'article/detail/' + item.id">
                <!-- <img src="/static/img/home/R-C.jpg" alt=""> -->
                <!-- <span>{{ item.goodNum }}</span> -->
                <span>{{ item.title }}</span>
                <span>{{ item.type }}</span>
                <span>{{ item.creatTime }}</span>
            </router-link>
        </ul>
    </div>
</template>
<style lang="scss" scoped>
.article-list {
    padding: 29px 14px 6px 24px;
    background-color: #fff;
    ul {
        li {
            margin-bottom: 18px;
            display: flex;
            span {
                &:first-child {
                    font-size: 15px;
                    flex: 1;
                }
                &:nth-child(2) {
                    background-color: #faf6e9;
                    color: #c49c47;
                    padding: 1px 5px;
                    font-size: 12px;
                    margin-right: 12px;
                    border-radius: 2px;
                }
                &:last-child {
                    font-size: 12px;
                }
            }
        }
    }
}
</style>
<script>
export default {
    props: ["dataList"]
}
</script>