require('./index.css');

var _common_util = require('utils/util.js');

var nav_search = {
    init : function(){
        this.bindEvents();
        this.loadKeyword();
        return this;
    },
    bindEvents : function(){
        var _this = this;
        $('#search-button').click(function(){
            _this.searchSubmit();
        });
        $('#search-input').keyup(function(e){
            if(e.keyCode === 13){
                _this.searchSubmit();
            }  
        })
    },
    loadKeyword : function(){
        var keyword = _common_util.getURLParam('keyword');
        if(keyword){
            $('#search-input').val(keyword);
        }
    },
    searchSubmit : function(){
        var keyword = $.trim($('#search-input').val());
        if(keyword){
            window.location.href = './product-list.html?keyword=' + keyword;
        }else{
            window.location.href = './index.html';
        }
    }
};

module.exports = nav_search.init();