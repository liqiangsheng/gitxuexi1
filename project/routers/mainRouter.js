const express = require('express');
const User = require('../models/User');
//创建路由：处理页面请求的

const router = express.Router();

//首页
router.get('/', (req, res, next)=>{
    res.render('home', {
        homeActive: 'active',
        username: req.userInfo.username
    });
    
})
//产品页面
router.get('/product', (req, res, next)=>{
    res.render('product', {
        productActive: 'active',
        username: req.userInfo.username
    });
})
//关于我们
router.get('/about', (req, res, next)=>{
    res.render('about', {
        aboutActive: 'active',
        username: req.userInfo.username
    });
})

//登录
router.get('/login', (req, res, next)=>{
    res.render('login', {
        loginActive: 'active'
    });
})
//注册
router.get('/register', (req, res, next)=>{
    res.render('register', {
        regActive: 'active'
    });
})




module.exports = router;






