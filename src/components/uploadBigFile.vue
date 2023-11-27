<template>
    <div class="wrapper">
        <el-upload
          class="upload-demo"
          ref="upload"
          action="#"
          :on-change="handleChange"
          :file-list="fileList"
          :auto-upload="false">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload()">上传文件</el-button>
          <el-button size="small" type="warning" @click="pauseUpload">暂停上传</el-button>
          <el-button size="small" type="info" @click="continueUpload">继续上传</el-button>
          <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
        </el-upload>
        <el-progress :percentage=percentage></el-progress>
    </div>
</template>

<script>
import HttpManager from '@/api/getData';
export default {
    // props: { chunksize },
    data() {
      return {
          // fileChunks: [],
          file: '',
          fileList: [],
          percentage: 0,
          uploadedList: [],
          controller: '',
          total: 0,
        };
    },
    watch: {},
    computed: {},
    methods: {
        /* ***文件状态改变时的钩子****** */
        //保存最后一次上传的文件
        handleChange(file,fileList) {
            this.file = file;
            //this.fileList = [ file ];
            this.fileList = [fileList[fileList.length - 1]];
            console.log('onchange',this.file);
        },
        //文件切片
        createFileChunk(file, size = 1024 * 10 * 1024) {
          //定义一个数组用来存储每一份切片
          const fileChunkList = [];
          //存储索引，以cur和cur+size作为开始和结束位置利用slice方法进行切片
          let cur = 0;
          while (cur < file.size) {
            fileChunkList.push({ file: file.slice(cur, cur + size) });
            cur += size;
          }
          return fileChunkList;
        },
        //
        formDataList(fileChunkList, lastModified, fileName) {
            let list = fileChunkList.map(({file}, index) => {
              let hash = lastModified + '_' + index + '_'  + fileName;
              const formData = new FormData();
              formData.append("file", file);
              formData.append("hash", hash);
              formData.append("currIndex", index);
              formData.append("filename", fileName);
              formData.append("total", fileChunkList.length);
              return formData;
            });
            return list;
        },
        /* 
        ** 控制
        **limit 最大并发量
        **requestList 
        */
        ajax(limit, requestList) {
            const length = requestList.length;
            const resultList = new Array(length).fill(null);
            let cur = 0; //当前请求下标位置
            const controlConcurrrency = async () => {
              if ( requestList.length === 0) { 
                return; 
              }
              try {
                  let currRequest = requestList.shift();
                  if (this.uploadedList.indexOf(cur) > -1) {
                    console.log('切片',cur,'已上传，跳过')
                    cur++;
                  } else {
                    let signal = this.controller.signal;
                    HttpManager.postFile(currRequest,{ signal})
                      .then((result) => {
                        resultList[cur] = result;
                        this.uploadedList.push(cur);
                        this.percentage = Math.ceil( this.uploadedList.length / this.total * 100 );
                        //console.log('有效上传(uploaded中的除外)',result)
                        console.log('当前上传第',cur,'个切片， 上传进度', this.percentage, result);
                        cur++;
                      });
                  }
              } catch(error) {
                console.error('ERROR',error);
              } finally {
                controlConcurrrency();
              }
            }
            for (let i = 0; i < limit; i++) {
              controlConcurrrency()
            }
        },
        /* 上传文件 */
        submitUpload() {
            console.log('上传文件',this.file);
            if (this.file === '') {
                this.$message({
                  type: 'warning',
                  message: '请先选择要上传的文件!'
                })
            }
            // let size = this.chunksize * 1024 * 1024;
            let lastModified = this.file.raw.lastModified, fileName = this.file.name;
            //获取文件切片列表
            let fileChunkList = this.createFileChunk(this.file.raw);
            this.total = fileChunkList.length;
            let requestArr = this.formDataList(fileChunkList, lastModified, fileName);
            this.controller= new AbortController();
            this.ajax(10, requestArr);
        },
        /* 暂停上传 */
        pauseUpload() {
            console.log(this.controller);
          if (this.controller === '') {
            alert('没有正在上传的文件')
          } else {
            this.controller.abort();
            console.log(this.controller);
          }
        },
        /* 继续上传 */
        continueUpload() {
            this.submitUpload();
        }
    },
    created() {},
    mounted() {}
};
</script>
<style lang="scss" scoped>
    .wrapper{
        padding: 10px;
    }
</style>