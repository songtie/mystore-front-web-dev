require('./index.css');


var _common_util = require('utils/util.js');
var _user_service = require('service/user-service.js');

var errorItem = {
    show : function(errorMsg){
        $('.user-form-error').show().find('.errro-message').text(errorMsg);
    },
    hide : function(){
        $('.user-form-error').hide().find('.errro-message').text('');
    }
};

var user_password_reset ={
    data : {
        username : '',
        question : '',
        answer   : '',
        token    : ''
    },
    init : function(){
        this.onLoad();
        this.bindEvents();
    },
    onLoad : function(){
        this.loadStepOne();
    },
    bindEvents : function(){
        var _this = this;
        $('#submit-username').click(function(){
            var username = $.trim($('#username').val());
            _this.data.username = username;
            if(username){
                _user_service.getResetPasswordQuestion(username, function(res){
                    _this.data.question = res;
                    _this.loadStepTwo();
                }, function(errorMsg){
                    errorItem.show(errorMsg);
                });
            }else{
                errorItem.show('用户名不能为空');
            }
        });
        $('#submit-answer').click(function(){
            var answer = $.trim($('#answer').val());
            _this.data.answer = answer;
            if(answer){
                _user_service.checkResetPasswordAnswer(_this.data, function(res){
                    _this.data.token = res;
                    _this.loadStepThree();
                }, function(errorMsg){
                    errorItem.show(errorMsg);
                });
            }else{
                errorItem.show('密码提示问题的答案不能为空');
            }
        });
        $('#submit-password').click(function(){
            var password = $.trim($('#password').val());
            _this.data.password = password;
            if(password){
                _user_service.resetPassword(_this.data, function(res){
                    window.location.href = "./result.html?type=resetPassword";
                }, function(errorMsg){
                    errorItem.show(errorMsg);
                });
            }else{
                errorItem.show('新密码不能为空');
            }
        });
    },
    loadStepOne : function(){
        $('.step-one').show();
    },
    loadStepTwo : function(){
        errorItem.hide();
        $('.step-one').hide()
        .siblings('.step-two').show()
        .find('.question').text(this.data.question);
    },
    loadStepThree : function(){
        errorItem.hide();
        $('.step-two').hide()
        .siblings('.step-three').show();
    },
    submit : function(){
        var formData = {
            username : $.trim($('#username').val()),
            password : $.trim($('#password').val())
        };
        
        var validateResult = this.formDataValidate(formData);
        
        if(validateResult.status){
            //验证通过
            _user_service.login(formData,function(res){
                window.location.href = _common_util.getURLParam('redirect') || './index.html';
            },function(errMsg){
                errorItem.show(errMsg);
            });
        }else{
            //验证不通过
            errorItem.show(validateResult.msg);
        }
    },   
    formDataValidate : function(formData){
        var result = {
            status : false,
            msg    : ''  
        };
        
        if(!_common_util.validate(formData.username,'require')){
            result.msg = '用户名不能为空';
            return result;
        }
        if(!_common_util.validate(formData.password,'require')){
            result.msg = '密码不能为空';
            return result;
        }
        result.status = true;
        result.msg = '通过验证';
        return result;
    }
};

$(function(){
    user_password_reset.init();
});