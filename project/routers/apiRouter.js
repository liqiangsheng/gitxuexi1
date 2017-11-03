const express = require('express');
const User = require('../models/User');
const url = require('url');

const router = express.Router();

router.post('/register', (req, res, next)=>{
    let responseData = {
        message: '',
        code: 0
    };
    //判断用户名、密码、确认密码是否都不为空
    //为空，注册失败，
    // 密码和确认密码是否相等
    //不相等，注册失败，

    //取出需要注册的参数 用户名、密码、确认密码
    //判断用户名是否注册过
    // 注册过，注册失败，该用户已存在
    // 没有注册过, 注册该用户 --->> 将这条用户数据添加到数据库中
    // 添加失败，注册失败，服务器未知错误
    // 添加成功，注册成功

    //读取get请求参数
    // let query = url.parse(req.url, true).query;

    // 读取post请求参数
    let query = req.body;
    console.log(query);

    //判断用户名、密码、确认密码是否都不为空
    if(query.username == '' || query.password == '' || query.comfirmPassword == ''){
        console.log('用户名、密码、确认密码都不能为空');
        responseData.message = '用户名、密码、确认密码都不能为空';
        responseData.code = 1;
        res.json(responseData);
    }
    // 密码和确认密码是否相等
    else if(query.password != query.comfirmPassword){
        console.log('两次密码不一致');
        responseData.message = '两次密码不一致';
        responseData.code = 2;
        res.json(responseData);
    }
    else{
        //判断用户名是否注册过
        User.findOne({
            username: query.username
        }).then(result=>{
            if(result){//存在该用户
                console.log('该用户已存在');
                responseData.message = '该用户已存在';
                responseData.code = 3;
                res.json(responseData);
            }else{
                //不存在该用户，执行注册
                //保存数据
                let user = new User({
                    username: query.username,
                    password: query.password
                });
                user.save().then(userInfo=>{
                    if(userInfo){//保存数据成功
                        console.log('注册成功');
                        responseData.message = '注册成功';
                        responseData.code = 0;
                        res.json(responseData);

                    }else{//保存数据失败
                        console.log('注册失败，数据库错误');
                        responseData.message = '注册失败，数据库错误';
                        responseData.code = 4;
                        res.json(responseData);
                    }
                })
            }
        })

    }
    
})


//登录请求处理
router.post('/login', (req, res)=>{
    let responseData = {
        message: '登录成功',
        code: 0
    };
    // 获得post的参数
    let query = req.body;
    // 判断用户名和密码是否为空
    if(query.username == '' || query.password == ''){
        responseData.message = '用户名或密码不能为空';
        responseData.code = 1;
        res.json(responseData);
    }
    // 根据用户名查询数据库
    else{
        User.findOne({
            username: query.username
        }).then((userInfo)=>{
            if(userInfo){
                // 查询到了结果，校验密码是否相等  
                if(userInfo.password == query.password){
                    //用户名和密码相等， 登录成功
                    //设置cookie，将用户id保存在cookies中
                    req.cookies.set('USERID', userInfo._id);
                    res.json(responseData);
                }else{
                    //和密码错误， 登录成功
                    responseData.message = '密码错误';
                    responseData.code = 2;
                    res.json(responseData);
                }

            }else{
                //该用户不存在
                responseData.message = '该用户不存在';
                responseData.code = 3;
                res.json(responseData);
            }
        });

    }
    
    

})


// 处理退出请求
router.get('/logout', (req, res, next)=>{
    //请求用户id cookie
    req.cookies.set('USERID', null);
    res.json({
        message: '退出成功',
        code: 0
    })   
})

module.exports = router;