<template>
    <div class="admin-article">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">管理</a></el-breadcrumb-item>
            <el-breadcrumb-item><a href="/#/admin/article">文章</a></el-breadcrumb-item>
        </el-breadcrumb>
        <div class="btns-part">
            <router-link tag="div" to="/admin/article/create" class="add-button">新建文章</router-link>
            <div class="search">
                <input type="text" placeholder="请输入文章名称搜索" v-model.lazy="msg">
            </div>
            <el-select clearable v-model="recommendValue" @change="valueChange">
                <el-option value="0" label="全部"></el-option>
                <el-option value="1" label="首页推荐"></el-option>
            </el-select>
            <el-select clearable v-model="typeValue" placeholder="请选择">
                <el-option v-for="item in $store.state.typeList" :key="item.id" :value="item.text" :label="item.text"></el-option>
            </el-select>
        </div>
        <div class="table-article">
            <el-table :data="dealList" 
                style="width:100%" 
                height="490"
                stripe :border="true" 
                :cell-style="setCellStyle"
                :header-cell-style="setCellStyle"
                @row-click="openDetails">
                <!-- <el-table-column label="文章ID" prop="id" width="0"></el-table-column> -->
                <el-table-column label="首页推荐" width="80" prop="homeRecomm">
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.homeRecomm" active-color="#13ce66" inactive="#ff4949"></el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="文章名称" prop="title" width="180" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="分类位置" prop="type" width="100"></el-table-column>
                <el-table-column label="链接" prop="link" width="150" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="标签" prop="tag" width="80"></el-table-column>
                <el-table-column label="上传人" prop="uploadedBy" width="100" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="来源/作者" prop="oringin"></el-table-column>
                <el-table-column label="浏览量" prop="views"></el-table-column>
                <el-table-column label="点赞" prop="likes"></el-table-column>
                <el-table-column label="操作" width="200">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click.native.stop="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<style leng="scss" scoped>
.admin-article {
    padding-top: 23px;
    .btns-part {
        margin: 20px 5px;
        display: flex;
        .add-button {
            border: 1px solid grey;
            border-radius: 12px;
            width: 115px;
            line-height: 36px;
            text-align: center;
            margin-right: 12px;
            font-size: 14px;
        }
    }
}
</style>
<script>
import HttpManager from '@/api/getData'
export default {
    data() {
        return {
            articleList: [],
            recommendValue: '0',
            typeValue: '',
            msg: ''
        }
    },
    computed :{
        dealList() {
            return this.articleList.filter((item, index, arr) => { 
                if ((this.recommendValue == '0' || !!this.recommendValue === item.homeRecomm) && 
                (this.typeValue == '' || this.typeValue == item.tag) &&
                (this.msg == '' || item.title.includes(this.msg))) {
                    return item;
                }
            });
        }
    },
    created() {
        HttpManager.getAdminAticleList()
            .then((data) => {
                if (data.error === 0) {
                    console.log(data.data);
                    this.articleList = data.data;
                }
            })
    },
    mounted() {
        //console.log(this.$store.state.typeList[0].text);
    },
    methods: {
        valueChange(value) {
            
        },
        reload() {
            this.$forceUpdate()
        },
        //修改单元格样式
        setCellStyle() {
            return {
                "text-align": "center",
                /* "overflow": "hiddden",
                "text-overflow": "ellipsis",
                "white-space": "nowrap" */
            };
        },
        openDetails(row,column,event) {
            console.log(row,column,event);
            let routeUrl = this.$router.resolve({
                name: 'articleDetail',
                params: {id: row.id}
            });
            window.open(routeUrl.href, '_blank');
            // this.$router.push({name: 'articleDetail',params: {id: row.id}})
        },
        handleDelete(index,row) {
            let params = {params: {id: row.id}}
            console.log(index,row);
            HttpManager.deleteArticle(params).then((res) => {
                //this.reload();
                this.$router.go(0);
                console.log(res);
            })
        }
    }
}
</script>