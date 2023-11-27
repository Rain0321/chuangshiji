import { get, post, deletes } from './http';
export default {
    //请求首页数据
    getHomeData : () => get('/static/data/home.json'),

    //新建文章
    postArticleData: (data) => post('/admin/article/create',data),

    //管理模块获取文章列表
    getAdminAticleList: () => get('/admin/article'),

    //上传图片
    postImg: (img) => post('/admin/upload/img', img),

    //请求分类类型列表
    getTypeData : () => get('/admin/types'),

    //获取文章详情
    getArticleDetail: (id,params) => get(`/article/detail/${id}`),

    //删除文章
    deleteArticle: (params) => deletes('/admin/article/delete', params),

    //文件是否已存在
    getFileExist: (params) => get('/admin/upload/file/isexist',params),

    //上传分段文件
    postChunkFile: (data) => post('/admin/upload/chunkfile', data),

    //
    postFile: (data, config) => post('/admin/upload/file',data, config),
}