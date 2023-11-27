<template>
    <div class="wrapper">
        <el-form label-width="200px" :model="data" ref="createBanner" :rules="rules">
            <el-form-item label="轮播名称" prop="title">
                <el-input v-model="data.title"></el-input>
            </el-form-item>
            <el-form-item label="链接地址" prop="href">
                <el-input v-model="data.href"></el-input>
            </el-form-item>
            <el-form-item label="上传图片" prop="img">
                <el-upload
                  class="upload-demo"
                 
                  drag
                  action="#"
                  accept="image/jpg,image/jpeg,image/png" 
                  :http-request="uploadHandle"
                  :before-upload="beforeHandle"
                  :file-list="fileList"
                  list-type="picture"
                  multiple>
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                  <div class="el-upload__tip" slot="tip">为避免图片变形，请上传xx比例的图片</div>
                </el-upload>
            </el-form-item>
            <el-form-item label="轮播顺序" prop="order">
                <el-input v-model.number="data.order"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="success" @click="sendData">提交</el-button>
                <el-button type="info">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import HttpManager from '@/api/getData';
export default {
    components: {},
    props: {},
    data() {
      return {
        data: {
            imgUrl: ''
        },
        rules: {
            title: [
            { required: true, message: '请输入名称' }
            ],
            href: [{ required: true, message: '请输入文章名称' }]
        },
        fileList: []
        }
    },
    watch: {},
    computed: {},
    methods: {
        beforeHandle(file) {
            console.log(file.size / 1024 / 1024,file.name)
        },
        //上传图片
        uploadHandle(param) {
            console.log(param,param.file);
            let file = param.file;
            let fileName = file.name;
            let formData = new FormData();
            formData.append('file', file);
            formData.append('username',this.$store.state.userIfo.username);
            HttpManager.postImg(formData)
                .then((res) => {
                    let obj = {};
                    obj.name = fileName;
                    obj.url = res.imgUrl;
                    this.fileList.push(obj);
                    this.data.imgUrl = res.imgUrl;
                    console.log(res);
                })
        },
        sendData() {

        }
    },
    created() {},
    mounted() {}
};
</script>
<style lang="scss" scoped>
    .wrapper{
        padding-top: 40px;
        ::v-deep .el-upload-list--picture {
            width: 75%;
        }
    }
</style>