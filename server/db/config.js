const mysql = require('mysql');

module.exports={ //公开该模块（以便其它模块使用）
    config:{
        host:'127.0.0.1',//连接数据库的地址。（默认：localhost）
        port:3306,//连接地址对应的端口。（默认：3306）
        user:'root',//mysql的连接用户名
        password:'123456',//对应用户的密码
        database:'chuangshiji' //所需要连接的数据库的名称  
    },
    connect(sql,params) {      //connect('sql语句',[参数],回调函数（err,data){})
        return new Promise((resolve,reject) => {
            let conn = mysql.createConnection(this.config);//1。创建数据库    
            conn.connect();//2.连接数据库
            conn.query(sql,params,(err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });//3.执行sql语句,第二个参数是一个数据格式，数组元素的先后顺序，对应sql语句中的？的顺序
            conn.end();//4。关闭数据库

        })
    }
}
