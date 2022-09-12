require('./index.css');

var _common_util = require('utils/util.js');
var _user_service = require('service/user-service.js');
var _cart_service = require('service/cart-service.js');

var nav_top = {
    init : function(){
        this.bindEvents();
        this.loadUserInfo();
        this.loadCartCount();
        return this;
    },
    bindEvents : function(){
        $('.js-login').click(function(){
            _common_util.toLogin();
        });
        $('.js-register').click(function(){
            window.location.href = './user-register.html';
        });
        $('.js-logout').click(function(){
            _user_service.logout(
                function(res){
                    window.location.reload();
                },
                function(errorMsg){
                    _common_util.errorTips(errorMsg);
                }
            )
        });
    },
    loadUserInfo : function(){
        _user_service.getUserDetail(
            function(res){
                $('.user.not-login').hide().siblings('.user.login').show().find('.username').text(res.username);
            },
            function(errorMsg){
                //不用处理
            }
        )
    },
    loadCartCount : function(){
        _cart_service.getCartCount(
            function(res){
                $('.cart-count').text(res || 0);
            },
            function(errorMsg){
                $('.cart-count').text(0);
            }
        )

    }
};

module.exports = nav_top.init();