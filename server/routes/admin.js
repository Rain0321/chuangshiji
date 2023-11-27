const express = require('express');
let multer = require('multer');
let formidable = require('formidable');
let fs = require('fs');
let db = require('../db/config');
let tools =require('../routes/tools');
const url = require('url');
let query = require('querystring');
let path = require('path');

const root = process.cwd();

let router = express.Router();

//获取文章列表
router.get('/article',(req,res) => {
    tools.selectArticle().then((result) => {
        let list = result.map((item) => {
            if (item.homeRecomm === 1) {
                item.homeRecomm = true;
            } else {
                item.homeRecomm = false;
            }
            return item;
        })
        res.json({error: 0, msg: 'success', data: list});
        console.log(result)
    })
    
});

//创建文章
router.post('/article/create', (req,res) => {
    console.log(req.body);
    tools.addArticle(req.body).then(() => {
        res.json({ error: 0, msg: 'success' });
    })
});

//上传图片
router.post('/upload/img',multer({dest: './static/img/upload'}).single('file'), (req, res) => {
    let originalname = req.file.originalname.split('.');
    let type = originalname[originalname.length-1];
    let path = './static/img/upload/'+req.file.filename + '.' + type;
    fs.renameSync('./static/img/upload/' + req.file.filename,path);
    console.log(req.file,req.body);
    res.json({error: 0, msg: 'success', imgUrl: path});
})

//上传大文件
router.post('/upload/file',(req,res) => {
    let form = new formidable.IncomingForm();
    form.uploadDir = path.join(root,'public/uploads');
    form.maxFieldSize = 250000 * 1024;
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        let index = fields.currIndex;
        let { file } = files;
        let count = 0;
        //console.log(file);
        fs.rename(file.filepath, path.join(root,'public/uploads/') + fields.hash,() => {
            count++;
            res.send(`文件分片:${fields.currIndex}接收成功`);         
            /* if (count == fields.total) {

            } */
            console.log(index, fields.currIndex,fields);

        });
        //console.log(fields,files)
        //res.send(index);
    })
    //res.json({error: 0});
})

//获取分类列表
router.get('/types',(req,res) => {
    let sql = 'SELECT * FROM type WHERE parent_id = ?';
    db.connect(sql,0).then((result) => {
        //console.log(result);
        let promiseList = result.map((item) => {
            return db.connect(sql,item.idtype);
        })
        Promise.all(promiseList).then((value) => {
            //console.log(value);
            for (let i = 0, len = value.length; i < len; i++) {
                Object.assign(result[i],{children: value[i]});
            }
            res.json({error:0, data: result});
        })
        //console.log(typeList);
    })
})

//删除文章
router.delete('/article/delete', (req,res) => {
    let query = url.parse(req.url).query
    let index = query.indexOf('=');
    let id = [query.slice(index + 1)];
    let sql = 'DELETE FROM article where id=?';
    db.connect(sql,id).then((result) => {

        res.json({error: 0,msg: result});
    })
    console.log(url.parse(req.url));
})

router.get('/upload/file/isexist', (req,res) => {
    let queryObj = query.parse(url.parse(req.url).query);
    console.log(queryObj,url.parse(req.url));
    if (queryObj.filename === '魔女-2018_BD韩语中字.mp4') {
        res.json({error: 0,data: {skipUpload: true}});
    } else if (queryObj.filename === '[电影天堂www.dytt89.com]流浪地球2-2023_HD国语中字超清版.mp4') {
        res.json({error: 0, uploaded: [1,2]});
    } else {
        res.json({error:0, uploaded: []});
    }
})

//导出该路由
module.exports = router;


