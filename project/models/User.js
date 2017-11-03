// 创建用户表结构
const mongoose = require('mongoose');

let userSchemas = mongoose.Schema({
    username: String,
    password: String
});

//创建用户模型
let UserModel = mongoose.model('user', userSchemas);

//向外输出
module.exports = UserModel;

