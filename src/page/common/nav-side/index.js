require('./index.css');
var htmlTemplate = require('./index.string');

var _common_util = require('utils/util.js');

var nav_side = {

    option : {
        name : '',
        navSideList : [
            {name : 'user-center', description:'个人中心',href:'./user-center.html'},
            {name : 'modify-password', description:'修改密码',href:'./user-password.html'},
            {name : 'order-list', description:'我的订单',href:'./order-list.html'},
            {name : 'about', description:'关于MyStore',href:'./about.html'}
        ]
    },

    init : function(option){
        $.extend(this.option, option);
        this.renderNavSide();
    },
    renderNavSide : function(){
        
        for(var i = 0; i < this.option.navSideList.length; i ++){
            if(this.option.navSideList[i].name === this.option.name){
                this.option.navSideList[i].isActive = true;
            }
        }

        var result = _common_util.renderHTML(htmlTemplate, {navSideList: this.option.navSideList});
        $('.nav-side').html(result);
    }
};

module.exports = nav_side;