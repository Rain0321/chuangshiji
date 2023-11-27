<template>
    <div class="wrapper">
        <el-form>
            <el-form-item label="课程名称"></el-form-item>
            <el-form-item label="课程分类"></el-form-item>
            <el-form-item label="课程标签"></el-form-item>
            <el-form-item label="讲师姓名"></el-form-item>
            <el-form-item label="封面"></el-form-item>
            <el-form-item label="课程介绍"></el-form-item>
            <el-form-item label="目录"></el-form-item>
            <!--  -->
            <div class="directory" v-for="(item, index) in form.dynamicItem" :key="index">
                <el-form-item class="form-style">
                    <span slot="label">课时{{ index + 1 }}</span>
                      <el-input v-model="item.name" size="small" class="special-style" />
                </el-form-item>
                <el-form-item
                      class="form-style"
                      :prop="'dynamicItem.' + index + '.file'"
                      :rules="[
                        {required: false, message: '请上传视频', trigger: 'blur'}
                      ]"
                    >
                    <uploadBigFile></uploadBigFile>
                    <!-- <el-upload
                      class="upload-demo"
                      ref="upload"
                      action=""
                      :on-preview="handlePreview"
                      :on-remove="handleRemove"
                      :http-request="uploadHandle"
                      :auto-upload="false"
                      :on-success="handleAvatarSuccess"
                      :on-change="changeHandle"
                      multiple
                      :limit="3"
                      :on-exceed="handleExceed"
                      :file-list="item.fileList">
                      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload(index)">上传到服务器</el-button>
                      <el-button size="small" type="primary" @click="pauseHandle">暂停上传</el-button>
                      <span v-if="!item.fileName == false">{{ item.fileName }}</span>
                    </el-upload> -->
                </el-form-item>
                <el-form-item>
                      <el-button v-if="index+1 == form.dynamicItem.length" type="primary" size="mini" @click.stop="addItem(form.dynamicItem.length)">+</el-button>
                      <el-button v-if="index !== 0" type="danger" size="mini" @click="deleteItem(item, index)">-</el-button>
                </el-form-item>
            </div>
              <!-- *** -->
            <!-- <el-form-item label="上传视频">
                <el-upload
                class="upload-demo"
                ref="upload"
                action="#"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :http-request="uploadHandle"
                :file-list="fileList"
                :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
            </el-form-item> -->
        </el-form>
        <!-- <div class="customer-dialog">
          <el-dialog
            :title="title"
            :visible="false"
            :before-close="cancel"
            width="55.5%"
            :destroy-on-close="true"
            :close-on-click-modal="false"
          >
            <el-form
              ref="form"
              class="customer-form"
              :model="form"
              label-width="97px"
              :inline="true"
              :rules="rules"
              label-suffix=":"
            >
            
          
              <el-form-item label="结算币种" prop="" class="form-style">
                <el-select v-model="form.currency" placeholder="请选择" size="small">
                  <el-option
                    v-for="item in currencyTypeList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
          
              <el-form-item label="所属地区" prop="" class="form-style">
                <el-select v-model="form.currency" placeholder="请选择" size="small">
                  <el-option
                    v-for="item in currencyTypeList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
                    
              <el-form-item label="税号" prop="" class="address form-style" style="width:100%">
                <el-input v-model.trim="form.phone" placeholder="请输入" maxlength="50" size="small" style="width:100%" />
              </el-form-item>
          
              
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button size="small" @click="cancel">取 消</el-button>
              <el-button size="small" type="primary" @click="handleSave('form')">保 存</el-button>
            </div>
          </el-dialog>
        </div> -->
    </div>
</template>

<script>
import md5 from 'js-md5' //引入MD5加密
import HttpManager from '@/api/getData';
import uploadBigFile from '../../../components/uploadBigFile.vue';
export default {
    components: { uploadBigFile },
    props: {},
    data() {
      return {
        controller: '',
        form: {
          dynamicItem: [
          //默认显示一条
            {
              name: '',
              fileName: '',
              fileList: [],
              fileUrl: ''
            }
          ]
        }
      };
    },
    watch: {},
    computed: {},
    methods: {
        addItem(length) {
          if (length >= 10) {
            this.$message({
              type: 'warning',
              message: '最多可新增10条!'
            })
          } else {
            this.form.dynamicItem.push({
              name: '',
              phone: '',
              address: ''
            })
          }
        },
        //删除方法
        deleteItem(item, index) {
          this.form.dynamicItem.splice(index, 1)
        },
        submitUpload(params) {
            this.$refs.upload[params].submit();
            console.log('点击上传按钮',params);
        },
        handleRemove(file) {
        console.log('删除',file);
        },
        handlePreview(file) {
          console.log('点击文件列表',file);
        },
        changeHandle(file,files) {
          console.log('文件change',file,files);
        },
        handleExceed() {
            console.log(this,'一节课只能上传一个视频');
        },
        //
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
        //自定义上传操作
        uploadHandle(param) {
            let file = param.file;
            let chunkSize = 1024 * 1024 * 10;
            //分片数组
            const fileChunkList = this.createFileChunk(file);
            //文件名
            let fileName = file.name;
            //文件最后修改时间
            let lastModified = file.lastModified;
            let uploadedList = []; //已上传列表
            let total = fileChunkList.length;
            this.controller= new AbortController();
          /*   if (this.abortController) {
                // 如果存在abortController,就取消掉上次的请求,注意不同接口如果使用同一个abortController,则会被abort() 一起取消掉
                this.abortController.abort()
                this.abortController = ""
            } else {
                this.abortController = new AbortController()
            } */
            let requestList = fileChunkList.map(({file}, index) => {
              let hash = lastModified + '_' + index + '_'  + fileName;
              const formData = new FormData();
              formData.append("file", file);
              formData.append("hash", hash);
              formData.append("currIndex", index);
              formData.append("filename", fileName);
              formData.append("total", fileChunkList.length);
              return formData;
            })
            /* *******遍历请求列表发送请求*************** */
           /*  for (let i = 0; i < requestList.length; i++) {
              HttpManager.postFile(requestList[i])
                  .then((res) => {
                      console.log('上传分片结果', res);
                  })

            } */


            /* *******控制请求并发*************** */
            let counter = 0; //计数器，限制并发请求数量
            let limit = 5;  //最大并发量
            let cur = 0;  // 当前请求下标位置
            let percentage = 0; //上传进度
            const controlConcurrrency = async () => {
              if (uploadedList.indexOf(cur) > -1) { 
                return; 
              }
              /* ******************* */
              /* while (counter < limit && requestList.length > 0) {
                let currRequest = requestList.shift();
                counter++;
                await HttpManager.postFile(currRequest);
                counter--;
                uploadedList.push(cur);
                cur++;
                percentage = ( cur / total * 100 ).toFixed(2);
                console.log('当前上传第',cur,'个切片， 上传进度', percentage);
              } */

              /* ********请求队列*********** */
              if (requestList.length === 0) {
                return;
              }
              try {
                let currRequest = requestList.shift();
                let signal = this.controller.signal;
                let result = await HttpManager.postFile(currRequest,{ signal});
                uploadedList.push(cur);
                cur++;
                percentage = ( cur / total * 100 ).toFixed(2);
                console.log('当前上传第',cur,'个切片， 上传进度', percentage,result);
              } catch(error) {
                console.error('ERROR',error);
              } finally {
                controlConcurrrency();
              }
            }
            for (let i = 0; i < limit; i++) {
              controlConcurrrency()
            }
            /* *******控制请求并发*************** */
            console.log('http-request',file);
            /* let fileSlice = file.slice(0,chunkSize);
            let prog = '';
            //file = file.slice(0,1024 * 1024 * 10);
            let start = Date.now();
            let render = new FileReader();
            render.readAsBinaryString(file);
            render.onprogress = (e) => {
                if (e.lengthComputable) {
                    prog = e.loaded + '/' + e.total;
                    console.log('读取进度',prog);
                }
            }
            render.onload = () => {
                console.log('读取完毕，用时：',Date.now() - start);
                let result = render.result;
                let chunkCount = Math.ceil(result / chunkSize);
                let fileChunk = result.slice(0,chunkSize);
                let formData = new FormData();
                formData.append('file', fileChunk);
                formData.append('fileSlice', fileSlice);
                formData.append('currentChunk', 1);
                formData.append('chunkCount', chunkCount);
                console.log('开始上传',fileChunk,fileSlice)
                HttpManager.postFile(formData)
                .then((res) => {
                    console.log('上传完毕', res);
                })
            } */
            /* let formData = new FormData();
            formData.append('file', file);
            formData.append('fileName', fileName);
            formData.append('username',this.$store.state.userIfo.username);
            let data = {'file': file} */
           /*  HttpManager.postFile(formData)
                .then((res) => {
                    console.log(res);
                }) */
            // fileToBolb(file).then((res) => {
            //     console.log(res);
            // });
            //uploadByPieces(file, 3);
            
        },
        /* ************暂停上传************** */
        pauseHandle() {
          console.log(this.controller);
          if (this.controller === '') {
            alert('没有正在上传的文件')
          } else {
            this.controller.abort();
            console.log(this.controller);
          }
        },
        
        handleAvatarSuccess(res,file,fileList) {
            console.log('success',res,file,fileList);
        }
    },
    created() {},
    mounted() {}
};
</script>
<style lang="scss" scoped>
    .wrapper{
        padding: 30px;
        background-color: #fff;
        overflow: auto;
        .directory {
            display: flex;
            .form-style {
                display: flex;
                margin-right: 20px;
                ::v-deep .el-input__inner {
                    width: 290px;
                }
                .upload-demo {
                    display: flex;
                }
            }
        }
    }
</style>