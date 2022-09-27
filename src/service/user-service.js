
var _common_util = require('utils/util.js');


var _user_service = {

    //退出登录
    logout : function(resolve,reject){
        _common_util.request({
            url : _common_util.getServerURL('/user/logout'),
            method : 'GET',
            success : resolve,
            error : reject
        });
    },
    //获取用户详情
    getUserDetail : function(resolve,reject){
        _common_util.request({
            url : _common_util.getServerURL('/user/get_user_detail'),
            method : 'POST',
            success : resolve,
            error : reject
        });
    },
    //获取用户信息,如果没有登录会强制跳转登录
    getUserInfo : function(resolve,reject){
        _common_util.request({
            url : _common_util.getServerURL('/user/get_user_info'),
            method : 'POST',
            success : resolve,
            error : reject
        });
    },
    //用户登录
    login : function(userInfo, resolve,reject){
        _common_util.request({
            url : _common_util.getServerURL('/user/login'),
            method : 'POST',
            data   : userInfo, 
            success : resolve,
            error : reject
        });
    },
    //校验用户名是否已存在
    checkUsername: function (username, resolve, reject) {
        _common_util.request({
            url     : _common_util.getServerURL('/user/check_field'),
            method  : 'POST',
            data    : {fieldName:'username',fieldValue:username},
            success : resolve,
            error   : reject
        });
    },
    //校验邮箱是否已存在
    checkEmail: function (email, resolve, reject) {
        _common_util.request({
            url     : _common_util.getServerURL('/user/check_field'),
            method  : 'POST',
            data    : {fieldName:'email',fieldValue:email  },
            success : resolve,
            error   : reject
        });
    },
    //校验电话号码是否已存在
    checkPhone: function (phone, resolve, reject) {
        _common_util.request({
            url     : _common_util.getServerURL('/user/check_field'),
            method  : 'POST',
            data    : {fieldName:'phone',fieldValue:phone  },
            success : resolve,
            error   : reject
        });
    },
    //注册
    register: function (userInfo, resolve, reject) {
        _common_util.request({
            url         : _common_util.getServerURL('/user/register'),
            method      : 'POST',
            contentType : 'application/json',
            data        : JSON.stringify(userInfo),
            success     : resolve,
            error       : reject
        });
    },
    //更新用户信息
    updateUserInfo: function (userInfo, resolve, reject) {
        _common_util.request({
            url         : _common_util.getServerURL('/user/update_user_info'),
            method      : 'POST',
            contentType : 'application/json',
            data        : JSON.stringify(userInfo),
            success     : resolve,
            error       : reject
        });
    },
    //重置密码时，获取用户名对应的提示问题
    getResetPasswordQuestion: function (username, resolve, reject) {
        _common_util.request({
            url     : _common_util.getServerURL('/user/get_forget_question'),
            method  : 'POST',
            data    : {username : username},
            success : resolve,
            error   : reject
        });
    },
    //重置密码时，check填的answer是否正确
    checkResetPasswordAnswer: function (formData, resolve, reject) {
        _common_util.request({
            url     : _common_util.getServerURL('/user/check_forget_answer'),
            method  : 'POST',
            data    : {
                username : formData.username,
                question : formData.question,
                answer   : formData.answer
            },
            success : resolve,
            error   : reject
        });
    },
    //重置密码
    resetPassword: function (formData, resolve, reject) {
        _common_util.request({
            url     : _common_util.getServerURL('/user/reset_forget_password'),
            method  : 'POST',
            data    : {
                username    : formData.username,
                newPassword : formData.password,
                forgetToken : formData.token
            },
            success : resolve,
            error   : reject
        });
    },
};

module.exports = _user_service;