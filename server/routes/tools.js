let db = require('../db/config');

module.exports = {
    //新增文章 data：前端返回的数据
    addArticle (data) {
        return new Promise ((resolve, reject) => {
            let { title, type, href, tag, userName,athur,content,create_time,type_id} = data;
            let isRecommend, views = 0, likes = 0;
            if ( data.isRecommend === 'true') {
                isRecommend = 1;
            } else {
                isRecommend = 0;
            }
            let sql = 'INSERT INTO article VALUES(default,?,?,?,?,?,?,?,?,?,?,?,?)';
            db.connect(sql, [isRecommend, title, type, href, tag, userName,athur,views, likes, content,create_time,type_id])
                .then ((res) => {
                    console.log(res);
                    resolve(res)
            },(err) => {
                reject(err);
            })
        })
    },
    //查询文章列表
    selectArticle() {
        return new Promise ((resolve,reject) => {
            let sql = 'SELECT id,homeRecomm, title, type, link, tag, uploadedBy, oringin,views, likes FROM article';
            db.connect(sql).then((result) => {
                resolve(result);
            }, (err) => reject(err));
        })

    }
}