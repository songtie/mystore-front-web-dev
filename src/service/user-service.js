
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
};

module.exports = _user_service;