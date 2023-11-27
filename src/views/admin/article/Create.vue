<template>
    <div class="wrapper">
        <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">管理</a></el-breadcrumb-item>
        <el-breadcrumb-item><a href="/#/admin/article">文章</a></el-breadcrumb-item>
        <el-breadcrumb-item>新建</el-breadcrumb-item>
      </el-breadcrumb>
        <el-form label-width="100px" ref="creatArticle" :rules="rules" :model="data">
            <el-form-item label="文章名称" prop="title">
                <el-input v-model="data.title" @blur="titleBlurHandle"></el-input>
            </el-form-item>
            <el-form-item label="文章分类" prop="type">
                <el-cascader 
                reg="elcascader"
                v-model="data.type"
                :options="typeList"
                :props="{ expandTrigger: 'hover', value: 'idtype', label: 'label', checkStrictly: true}"
                @change="handleChange"
                ></el-cascader>
            </el-form-item>
            <el-form-item label="文章来源">
                <el-input v-model="data.athur"></el-input>
            </el-form-item>
            <el-form-item label="首页推荐">
                <el-switch
                  v-model="data.isRecommend"
                  active-color="#13ce66"
                  inactive-color="#ececfe">
                </el-switch>
            </el-form-item>
            <el-form-item label="文章标签" prop="tag">
                <el-cascader
                    v-model="data.tag"
                    :options="tagOptions"
                    :props="{ multiple: true ,expandTrigger: 'hover'}"
                    clearable></el-cascader>
            </el-form-item>
            <el-form-item label="文章性质" prop="radio">
                <el-radio v-model="data.radio" label="原创">原创</el-radio>
                <el-radio v-model="data.radio" label="转载">
                    转载
                </el-radio>
            </el-form-item>
            <el-form-item prop="href" :required="data.radio == '转载' ? true : false">
                <el-input placeholder="请输入转载链接" v-model="data.href" ></el-input>
            </el-form-item>
            <el-form-item label="文章内容" prop="content">
                <div>
                    <Toolbar
                    style="border-bottom: 1px solid #ccc"
                    :editor="editor"
                    :defaultConfig="toolbarConfig"
                    :mode="mode"></Toolbar>
                    <Editor
                    style="height: 500px; overflow-y: hidden;"
                    v-model="data.content"
                    :defaultConfig="editorConfig"
                    :mode="mode"
                    @onCreated="onCreated"></Editor>
                </div>
            </el-form-item>
            <el-form-item>
                <el-button type="success" @click="submitData">提交</el-button>
                <el-button type="danger" >取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import { DomEditor } from '@wangeditor/editor';
import { IEditorConfig } from '@wangeditor/editor'
import { mapState } from 'vuex';
import HttpManager from '@/api/getData';
export default {
    components: { Editor, Toolbar },
    props: {},
    data() {
      return {
        data: {
            title: '',
            type: [],
            athur: '',
            isRecommend: false,
            radio: '原创',
            content: '',
            herf: '---',
        },
        tagOptions: [{
          value: '指南',
          label: '指南',
          children: [{
            value: '设计原则',
            label: '设计原则',
            children: [{
              value: '一致',
              label: '一致'
            }, {
              value: '反馈',
              label: '反馈'
            }, {
              value: '效率',
              label: '效率'
            }, {
              value: '可控',
              label: '可控'
            }]
          }, {
            value: '导航',
            label: '导航',
            children: [{
              value: '侧向导航',
              label: '侧向导航'
            }, {
              value: '顶部导航',
              label: '顶部导航'
            }]
          }]
        }, {
          value: '组件',
          label: '组件',
          children: [{
            value: 'basic',
            label: 'Basic',
            children: [{
              value: 'layout',
              label: 'Layout 布局'
            }, {
              value: 'Color 色彩',
              label: 'Color 色彩'
            }, {
              value: 'Typography 字体',
              label: 'Typography 字体'
            }, {
              value: 'icon',
              label: 'Icon 图标'
            }, {
              value: 'button',
              label: 'Button 按钮'
            }]
          }]
        }],
        typeList: [],
        typeOption: [],
        rules: {
            title: [
                { required: true, message: '请输入文章名称' },
                { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
            ],
            type: [
                { required: true, message: '请选择分类', trigger: 'blur' }
            ],
            tag: [
                { required: true, message: '请选择标签', trigger: 'blur' }
            ],
            radio: [
                { required: true, trigger: 'blur' }
            ],
            content: [
                { required: true, message: '请输入活动名称', trigger: 'blur' },
                { min: 30, message: '长度在 30 个字符以上', trigger: 'blur' }
            ],
            href: [{ message: '请输入转载链接', }]
        },
        editor: null,
        //html: '<p>hello</p>',
        toolbarConfig: { },
        editorConfig: { 
          placeholder: '请输入内容...',
          MENU_CONF: {
            uploadImage: {
              customUpload: (file, insertFn) => { 
                console.log(file);
                let formData = new FormData();
                formData.append('file', file);
                formData.append('username',this.$store.state.userIfo.username);
                HttpManager.postImg(formData)
                  .then((res) => {
                    insertFn(res.imgUrl, 'alt', res.imgUrl)
                      console.log(res);
                  })
              }
            }
          }
       },
        mode: 'default', // or 'simple'
      };
    },
    watch: {},
    computed: {
        ...mapState([ 'userIfo']),
        dealData() {
          let dealObject = {};
          for (let key in this.data) {
            if ( key !== 'type' && key !== 'tag' && key !== 'type_id') {
                dealObject[key] = this.data[key];
            }
          }
          let typeArr = this.data.type;
          var typeStr;
          if (typeArr.length === 1) {
            typeStr = this.getTypeLabel(this.typeList, typeArr[0]);
          } else {
            typeStr = this.getTypeLabel(this.typeList, typeArr[0]) + '-' + this.getTypeLabel(this.typeList, typeArr[1]);
          }
          Object.assign(dealObject,{type: typeStr});
          Object.assign(dealObject,{type_id: typeArr[typeArr.length - 1]})
          let tagArr = this.data.tag;
          let tagStr = tagArr.reduce((accumulator,currentValue) => {
            return accumulator + currentValue.join('/');
          },'')
          Object.assign(dealObject, { tag: tagStr});
          Object.assign(dealObject, { tag: tagStr});
          Object.assign(dealObject, { create_time: this.getNowDate()});
          Object.assign(dealObject, { type_id: this.data.type.join(',')});
          return dealObject;
        }
        
    },
    methods: {
      getNowDate() {
				var myDate = new Date;
				var year = myDate.getFullYear(); //获取当前年
				var mon = myDate.getMonth() + 1; //获取当前月
				var date = myDate.getDate(); //获取当前日
				var hours = myDate.getHours(); //获取当前小时
				var minutes = myDate.getMinutes(); //获取当前分钟
				var seconds = myDate.getSeconds(); //获取当前秒
				var now = year + "-" + mon + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
				return now;
			},
        getTypeLabel(typeArr,id) {
            let result = [];
              this.findLabel(result,typeArr,id);
            return result[0];
        },
        findLabel(result,list,id) {
          list.forEach((item) => {
              const {idtype,label,children} = item;
              if (idtype == id) {
                result.push(label);
              } else if (Array.isArray(children) && children.length > 0) {
                this.findLabel(result,children,id);
            }
            })
        },
        onCreated(editor) {
            this.editor = Object.seal(editor);// 一定要用 Object.seal() ，否则会报错
            //console.log('oncreated',editor, this.editor);
          },
        handleChange(e) {
            //sconsole.log(e);
        },
        titleBlurHandle() {
            //console.log('type',this.data.type,'tag',this.data.tag);
        },

        submitData() {
            this.$refs.creatArticle.validate((valid) => {
              if (valid) {
            HttpManager.postArticleData(this.dealData)
                    .then((res) => {
                      console.log(res);
                        if (res.error == 0) {
                            this.$router.replace('/admin/article')
                        }
                    });
                console.log('submit!',this.data,this.dealData);
              } else {
                console.log('error submit!!');
                return false;
              }
            });
        },
        elCascaderOnClick() {
          let that = this;
          setTimeout(() => {
            // 控制文字label部分点击隐藏下拉框
            document.querySelectorAll(".el-cascader-node__label").forEach((el) => {
              (el).onclick = function() {
                this.previousElementSibling.click();
                that.$refs.elcascader.dropDownVisible = false;
              };
            });
            // 控制单选框部分点击隐藏下拉框
            document
              .querySelectorAll(".el-cascader-panel .el-radio")
              .forEach((el) => {
                (el).onclick = () => {
                  that.$refs.elcascader.dropDownVisible = false;
                };
              });
          }, 100);
        }
    },
    created() {
      console.log(Array.isArray(this.typeList));
        HttpManager.getTypeData().then((res) => {
          if (res.error === 0) {
            this.typeList = res.data;

          }
          
          let str = this.getTypeLabel(this.typeList,5);
          let str2 = this.getTypeLabel(this.typeList,20);
          console.log('getlabel',str, str2, this.typeList);
        })
    },
    mounted() {
      
    },
    updated() {
      const toolbar = DomEditor.getToolbar(this.editor);

      const curToolbarConfig = toolbar.getConfig();
      //console.log( 'toolbar', curToolbarConfig) // 当前菜单排序和分组
      const config = this.editor.getConfig();
      //console.log('congfig',IEditorConfig);
    
    },
    beforeDestroy() {
        const editor = this.editor
        if (editor == null) return
        editor.destroy() // 组件销毁时，及时销毁编辑器
    }
};
</script>
<style lang="scss" scoped>
@import '@wangeditor/editor/dist/css/style.css';
    .wrapper{
        padding: 20px 10px;
        .el-form {
            margin-top: 30px;
            color: #ececfe;
        }
    }
</style>