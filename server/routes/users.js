const express = require('express');
const { result } = require('lodash');
const url = require('url');
let db = require('../db/config');

let router = express.Router();

router.get('/',(req,res) => {
    //渲染模板
    res.render('chuangshiji.html')
})
//登陆
router.post('/login/submit',(req,res) => res.json({error: 0, msg: 'success', data: 'Liangry'}));
router.post('/login/getValidateCode',(req,res) => res.json({error: 0, msg: 'success', data: 'Liangry'}));

//获取文章详情
router.get('/article/detail/:id', (req,res) => {
    let { id } = req.params;
    console.log(url.parse(req.url),req.params);
    let sql = 'select * from article where id = ?';
    db.connect(sql,[id]).then((result) => {
        console.log(id,result)
        res.json({error: 0, data: result})
    })
})

//导出该路由
module.exports = router;
