require('./index.css');
require('page/common/nav-top-simple/index.js');
require('../common/index.js');
var _common_util = require('utils/util.js');

var _user_service = require('service/user-service.js');

var errorItem = {
    show : function(errorMsg){
        $('.user-form-error').show().find('.error-message').text(errorMsg);
    },
    hide : function(){
        $('.user-form-error').hide().find('.error-message').text('');
    }
}

var user_register = {
    init : function(){
        this.bindEvents();
    },
    bindEvents : function(){
        var _this = this;

        $('#username').blur(function(){
            var username = $.trim($('#username').val());
            if(username){
                _user_service.checkUsername(username, function(res){
                    errorItem.hide();
                },function(errorMsg){
                    errorItem.show(errorMsg);
                });
            }
            
        });
        //验证邮箱是否可用
        $('#email').blur(function(){
            var email = $.trim($('#email').val());
            if(email){
                _user_service.checkEmail(email, function(res){
                    errorItem.hide();
                }, function(errorMsg){
                    errorItem.show(errorMsg);
                })
            }
        });
        //验证电话是否可用
        $('#phone').blur(function(){
            var phone = $.trim($('#phone').val());
            if(phone){
                _user_service.checkPhone(phone, function(res){
                    errorItem.hide();
                }, function(errorMsg){
                    errorItem.show(errorMsg);
                })
            }
        });

        $('#submit').click(function(){
            _this.submit();
        });
    },
    submit : function(){
        var formData = {
            username        : $.trim($('#username').val()),
            password        : $.trim($('#password').val()),
            repeatPassword  : $.trim($('#repeatPassword').val()),
            phone           : $.trim($('#phone').val()),
            email           : $.trim($('#email').val()),
            question        : $.trim($('#question').val()),
            answer          : $.trim($('#answer').val()),
        }

        var validateResult = this.formDataValidate(formData);

        if(validateResult.status){
            delete formData.repeatPassword;
            //JSON对象和JSON字符串的格式问题
            _user_service.register(formData, function(res){

            }, function(errorMsg){

            });
        }else{
            errorItem.show(validateResult.msg);
        }
    },
    formDataValidate : function(formData){
        var result = {
            status : false,
            msg    : ''
        }
        if(!_common_util.validate(formData.username,'require')){
            result.msg = '用户名不能为空';
            return result;
        }
        if(!_common_util.validate(formData.password,'require')){
            result.msg = '密码不能为空';
            return result;
        }
        if(formData.password.length < 8){
            result.msg = '密码最少要8位';
            return result;
        }
        if(formData.password != formData.repeatPassword){
            result.msg = '两次密码不一致';
            return result;
        }
        if(!_common_util.validate(formData.phone,'phone')){
            result.msg = '电话号码格式不正确';
            return result;
        }
        if(!_common_util.validate(formData.email,'email')){
            result.msg = '邮箱格式不正确';
            return result;
        }
        if(!_common_util.validate(formData.question,'require')){
            result.msg = '密码提示问题不能为空';
            return result;
        }
        if(!_common_util.validate(formData.answer,'require')){
            result.msg = '密码提示问题的答案不能为空';
            return result;
        }
        result.status = true;
        result.msg = '通过验证';
        return result;
    }
};

$(function(){
    user_register.init();
})

