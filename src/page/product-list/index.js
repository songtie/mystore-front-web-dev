require('./index.css');
require('page/common/nav-top/index.js');
require('page/common/nav-search/index.js');

var _common_util = require('utils/util.js');
var _product_service = require('service/product-service.js');

var productListTemplate = require('./index.string');

var product_list = {
    requestParam : {
        keyword     : _common_util.getURLParam('keyword') || '',
        categoryId  : _common_util.getURLParam('categoryId') || '',
        orderBy     : _common_util.getURLParam('orderBy') || '',
        pageNum     : _common_util.getURLParam('pageNum') || 1,
        pageSize    : _common_util.getURLParam('pageSize') || 20,
    },
    init : function(){
        this.onLoad();
        this.bindEvents();
    },
    onLoad : function(){
        this.loadProductList();
    },
    bindEvents : function(){
        var _this = this;
        $('.sort-item').click(function(){
            //$(this)的优化，先缓存
            var $this = $(this);
            if($this.data('type') === 'default'){
                if($this.hasClass('active')){
                    return;
                }else{
                    $this.addClass('active').siblings('.sort-item').removeClass('active asc desc');
                    _this.requestParam.orderBy = 'default';
                }
            }
            else if($this.data('type') === 'price'){
                $this.addClass('active').siblings('.sort-item').removeClass('active asc desc');
                if(!$this.hasClass('asc')){
                    $this.addClass('asc').removeClass('desc');
                    _this.requestParam.orderBy = 'price_asc';
                }else{
                    $this.addClass('desc').removeClass('asc');
                    _this.requestParam.orderBy = 'price_desc';
                }
            }

            _this.loadProductList();
        });
    },
    loadProductList : function(){
        var requestParam = this.requestParam;
        var productListHTML = '';

        _product_service.getProductList(requestParam, function(res){
            productListHTML = _common_util.renderHTML(productListTemplate, {list : res.records});
            //console.log(productListHTML);
            $('.product-list-content').html(productListHTML);
        }, function(errorMsg){

        });
    }
};

$(function(){
    product_list.init();
});


