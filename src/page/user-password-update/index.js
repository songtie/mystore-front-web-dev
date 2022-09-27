require('./index.css');
var nav_side = require('page/common/nav-side/index.js');

var _common_util = require('utils/util.js');
var _user_service = require('service/user-service.js');


var user_password_update ={
    init : function(){
        this.onLoad();
        this.bindEvents();
    },
    onLoad : function(){
        nav_side.init({
            name : 'modify-password'
        });
    },
    bindEvents : function(){
        var _this = this;
        $(document).on('click', '.btn-submit' , function(){
            var formData = {
                oldPassword         : $.trim($('#oldPassword').val()),
                newPassword         : $.trim($('#newPassword').val()),
                newPasswordRepeat   : $.trim($('#newPasswordRepeat').val()),
            };

            var validateResult = _this.formDataValidate(formData);

            if(validateResult.status){
                console.log(formData);
                _user_service.modifyPassword(formData,function(res,msg){
                    _common_util.successTips(msg);
                    window.location.href = './user-center.html';
                },function(errMsg){
                    _common_util.errorTips(errMsg);
                });
            }else{
                //验证不通过
                _common_util.errorTips(validateResult.msg)
            }
        });
    },
    formDataValidate : function(formData){
        var result = {
            status : false,
            msg    : ''  
        };
        if(!_common_util.validate(formData.oldPassword,'require')){
            result.msg = '旧密码不能为空';
            return result;
        }
        if(!_common_util.validate(formData.newPassword,'require')){
            result.msg = '新密码不能为空';
            return result;
        }
        if(formData.newPassword.length < 8){
            result.msg = '密码最少要8位';
            return result;
        }
        if(formData.newPassword != formData.newPasswordRepeat){
            result.msg = '两次密码不一致';
            return result;
        }
        result.status = true;
        result.msg = '通过验证';
        return result;
    }
};

$(function(){
    user_password_update.init();
});