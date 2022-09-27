require('./index.css');
require('page/common/nav-top/index.js');
require('page/common/nav-search/index.js')
var navSide = require('page/common/nav-side/index.js')
require('../common/index.js');
var _common_util = require('utils/util.js');
var _user_service = require('service/user-service.js');

var htmlTemplate = require('./index.string');


var user_center = {
    init : function(){
        this.onLoad();
        this.bindEvents();
    },
    onLoad : function(){
        navSide.init({
            name : 'user-center'
        });
        this.loadUserInfo();
    },
    bindEvents : function(){
        //页面是使用JS动态加载的
        //JS中的事件冒泡原理
        //$('#sumbit')
        var _this = this;
        $(document).on('click', '#btn-submit' , function(){
            console.log('abc');
            var formData = {
                phone           : $.trim($('#phone').val()),
                email           : $.trim($('#email').val()),
                question        : $.trim($('#question').val()),
                answer          : $.trim($('#answer').val()),
            };
            var validateResult = _this.formDataValidate(formData);

            if(validateResult.status){
                //验证通过
                _user_service.updateUserInfo(formData,function(res,msg){
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
    loadUserInfo : function(){
        _user_service.getUserInfo(function(res){
            var renderReuslt = _common_util.renderHTML(htmlTemplate,res);
             $('.panel-body').html(renderReuslt);
        }, function(errorMsg){
            _common_util.errorTips(errorMsg);
        })
    },
    formDataValidate : function(formData){
        var result = {
            status : false,
            msg    : ''  
        };
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
    user_center.init();
})