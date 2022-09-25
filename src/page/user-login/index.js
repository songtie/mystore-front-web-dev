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
        $('.user-form-error').hide.find('.error-message').text('');
    }
}

var user_login = {
    init : function(){
        this.bindEvents();
    },
    bindEvents : function(){
        var _this = this;
        $('#submit').click(function(){
            _this.submit();
        });
        $('.user-form-item').keyup(function(e){
            if(e.keyCode == 13){
                _this.submit();
            }
        })
    },
    submit : function(){
        var formData = {
            username : $.trim($('#username').val()),
            password : $.trim($('#password').val())
        }

        var validateResult = this.formDataValidate(formData);

        if(validateResult.status){
            _user_service.login(formData, function(res){
                window.location.href = _common_util.getURLParam('redirect') || './index.html';
            }, function(errorMsg){
                errorItem.show(errorMsg);
            })
        }else{
            errorItem.show(validateResult.msg);
        }
    },
    formDataValidate : function(formData){
        var result = {
            status : false,
            msg    : ''
        }
        //校验
        if(!_common_util.validate(formData.username,'require')){
            result.msg = '用户名不能为空';
            return result;
        }
        if(!_common_util.validate(formData.password,'require')){
            result.msg = '密码不能为空';
            return result;
        }
        result.status = true;
        result.msg = '通过校验';
        return result;
    }
};

$(function(){
    user_login.init();
})

