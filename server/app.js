//引入express
let express = require('express');
let multer = require('multer');
let formidable = require('formidable');
let fs = require('fs');
let ejs = require('ejs');
let path = require('path');
let http = require('http');
let socketIO =require('socket.io');
// var bodyParser = require('body-parser');

const root = process.cwd(); 

//创建服务器
let app = express();
const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origin: '*'
    },
    transport: ['websocket']
});
io.listen(3031);
io.on('connection',(socket) => {
    console.log('user connected');
    socket.on('hello',(data) => {
        console.log(`收到客户端的消息：${data}`);
    })
});


//配置html拓展名
app.engine('.html',ejs.__express);

// 创建 application/x-www-form-urlencoded 编码解析
// var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(express.urlencoded({ extended: true }));

//资源静态化
app.use('/favicon.ico',express.static(path.join(root,'./static/img/favicon.ico')));
app.use('/static/',express.static(path.join(root,'./static/')));
app.use('/static/img',express.static(path.join(root,'./static/img')));
app.use('/data/',(req,res,next) => {
   let arr = req.url.split('?');
   arr[0] += '.json';
   req.url = arr.join('?');
    //执行放行函数
    next();
},express.static(path.join(root,'./static/data/')));
app.use('/admin/data/',(req,res,next) => {
    let arr = req.url.split('?');
    arr[0] += '.json';
    req.url = arr.join('?');
     //执行放行函数
     next();
 },express.static(path.join(root,'./static/data/')));

 //视频资源静态化
app.use('/public/uploads/', express.static(path.join(root,'./public/uploads')));

//管理后台 路由配置
app.use('/admin', require('./routes/admin'));

//移动端 配置路由
app.use('/', require('./routes/users'));

//监听端口号
//app.listen(3000,() => { console.log('sucess') })
//http协议监听端口号
http.createServer(app).listen(3001,() => { console.log('http server listen at 3001')});
