require('./index.css');
require('page/common/nav-top/index.js');
require('page/common/nav-search/index.js');
var _common_util = require('utils/util.js');
var _product_service = require('service/product-service.js');
var _cart_service = require('service/cart-service.js');
var productDetailTemplate = require('./index.string');

var product_detail = {
    requestParam : {
        productId : _common_util.getURLParam('productId') || ''
    },
    init : function(){
        this.onLoad();
        this.bindEvents();
    },
    onLoad : function(){
        if(!this.requestParam.productId){
            window.location.href = './index.html';
        }else{
            this.loadProductDetail();
        }
    },
    bindEvents : function(){

        var _this = this;

        $(document).on('mouseenter', '.sub-img-item' , function(){
            var imageURL = $(this).find('.sub-img').attr('src');
            $('.main-img').attr('src',imageURL);
        });

        $(document).on('click', '.product-count-btn' , function(){
            var type = $(this).hasClass('add') ? 'add' : 'minus';
            var $productCount = $('.product-count');
            var currentCount = parseInt($productCount.val());
            var min = 1;
            var max = _this.data.stock || 1;

            if(type === 'add'){
                $productCount.val(currentCount < max ? currentCount+1 : max);
            }else if(type === 'minus'){
                $productCount.val(currentCount > min ? currentCount-1 : min);
            }
        });

        $(document).on('click', '.add-cart' , function(){
            _cart_service.addToCart({
                productId : _this.data.id,
                quantity  : $('.product-count').val()
            }, function(res){
                window.location.href = './result.html?type=add-cart';
            },function(errorMsg){
                _common_util.errorTips(errorMsg);
            });
        });

    },
    loadProductDetail : function(){
        var productDetailHTML = '';
        var _this = this;
        _product_service.getProductDetail(this.requestParam,
            function(res){
                _this.data = res;
                _this.processData(res);
                productDetailHTML = _common_util.renderHTML(productDetailTemplate, res);
                // console.log(productDetailHTML);
                $('.page-wrap').html(productDetailHTML);
            }, function(errorMsg){
                
            });
    },
    processData : function(data){
        data.subImages = data.subImages.split(',');
    }
};

$(function(){
    product_detail.init();
});