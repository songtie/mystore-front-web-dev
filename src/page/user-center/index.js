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
    },
    onLoad : function(){
        navSide.init({
            name : 'user-center'
        });
        this.loadUserInfo();
    },
    loadUserInfo : function(){
        _user_service.getUserInfo(function(res){
            var renderReuslt = _common_util.renderHTML(htmlTemplate,res);
             $('.panel-body').html(renderReuslt);
        }, function(errorMsg){
            _common_util.errorTips(errorMsg);
        })
    }
};

$(function(){
    user_center.init();
})