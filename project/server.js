// 创建服务器
const express = require('express');
const swig = require('swig');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Cookies = require('cookies');
const User = require('./models/User');

const mainRouter = require('./routers/mainRouter');

// 创建服务器
const server = express();

// 静态文件托管
server.use('/public', express.static('./static'));

//处理请求cookies
server.use(function(req, res, next){
    // 对请求处理cookies
    let cookies = new Cookies(req, res);
    req.cookies = cookies;

    // 读取用户id的cookies
    let userId = req.cookies.get('USERID');
    if(userId){
        User.findById(userId).then((userInfo)=>{
            if(userInfo){//登录了
                req.userInfo = userInfo;
                next();
            }else{//用户信息已经被串改了
                req.userInfo = {};
                next();
            }
        })
    }else{//没有登录
        req.userInfo = {};
        next();
    }

});

//模板引擎渲染页面
//1.配置使用的模板引擎
server.engine('html', swig.renderFile);
//2.设置模板路径
server.set('views', './html');
//3.设置服务器使用模板引擎
server.set('view engine', 'html');
//4.关闭模板引擎缓存页面(适用于正在开发后台时关闭，服务器投入使用之后就打开)
swig.setDefaults({ cache: false });

// 响应页面请求
server.use('/', mainRouter);

// 处理post请求中的参数
server.use(bodyParser.urlencoded());

// 响应ajax请求的模块路由
server.use('/api', require('./routers/apiRouter'));



// 连接数据库
mongoose.connect('mongodb://localhost:27020', (error)=>{
    if(error){
        console.log('数据库连接失败');
        console.log(error);
    }else{
        console.log('数据库连接成功');
        //启动服务器
        server.listen(8000, 'localhost', (error)=>{
            console.log('服务器开始工作了');
            console.log('http://localhost:8000');
        });

    }
})









