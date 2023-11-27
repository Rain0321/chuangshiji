<template>
    <div class="wrapper">
        <el-button @click="changeHandle">新建轮播</el-button>
    </div>
</template>

<script>
export default {
    components: {},
    props: {},
    data() {
      return {
      };
    },
    watch: {},
    computed: {},
    methods: {
        changeHandle() {
            this.$router.push('/admin/banner/create');
        }
    },
    created() {
        console.log(this.$router);
    },
    mounted() {}
};
</script>
<style lang="scss" scoped>
    .wrapper{
        padding-top: 40px;
    }
</style>