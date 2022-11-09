require('./index.css');

var navTop = require('page/common/nav-top/index.js');
var _common_util = require('utils/util.js');
var _cart_service = require('service/cart-service.js');
var cartTemplate = require('./index.string');

var cart = {
    data : {

    },
    init : function(){
        this.onLoad();
        this.bindEvents();
    },
    onLoad : function(){
        this.loadCart();
    },
    bindEvents : function(){
        var _this = this;
        $(document).on('click', '.cart-select', function(){
            var $this = $(this);
            var productId = $this.parents('.cart-table').data('product-id');
            if($this.is(':checked')){
                _cart_service.setCartItemChecked(productId, function(res){
                    _this.renderCart(res);
                },function(errorMsg){
                    _this.showErrorTips();
                });
            }else{
                _cart_service.setCartItemUnChecked(productId, function(res){
                    _this.renderCart(res);
                },function(errorMsg){
                    _this.showErrorTips();
                });
            }
        });

        $(document).on('click', '.cart-select-all', function(){
            var $this = $(this);
            if($this.is(':checked')){
                _cart_service.setAllChecked(function(res){
                    _this.renderCart(res);
                },function(errorMsg){
                    _this.showErrorTips();
                });
            }else{
                _cart_service.setAllUnChecked(function(res){
                    _this.renderCart(res);
                },function(errorMsg){
                    _this.showErrorTips();
                });
            }
        });

        $(document).on('click', '.count-btn', function(){
            var $this           = $(this);
            var $productCount   = $this.siblings('.count-input');
            var currentCount    = parseInt($productCount.val());

            var productId       = $this.parents('.cart-table').data('product-id');
            var type            = $this.hasClass('add') ? 'add' : 'minus';
            var minCount        = 1;
            var maxCount        = parseInt($productCount.data('stock'));
            var newCount        = -1;

            if(type === 'add'){
                if(currentCount >= maxCount){
                    _common_util.errorTips("商品数量已经达到库存上限");
                    return ;
                }
                newCount = currentCount + 1;
            }else if (type === 'minus'){
                if(currentCount <= minCount){
                    return;
                }
                newCount = currentCount - 1;
            }

            _cart_service.updateCart({productId : productId, quantity : newCount}, 
                function(res){
                    _this.renderCart(res);
                }, function(errorMsg){
                    _this.showErrorTips();
                });
        });

        $(document).on('click', '.cart-delete', function(){
            if(window.confirm('确认要从购物车中删除该商品吗？')){
                var productId = $(this).parents('.cart-table').data('product-id');
                _this.deleteCartItems(productId);
            }
        });

        $(document).on('click', '.cart-delete-selected', function(){
            var arrayProductIds = [];
            var $selectedItem = $('.cart-select:checked');

            for(var i = 0; i < $selectedItem.length; i++){
                arrayProductIds.push($($selectedItem[i]).parents('.cart-table').data('product-id'));
            }

            if(arrayProductIds.length){
                var productIds = arrayProductIds.join(',');
                _this.deleteCartItems(productIds);
            }else{
                _common_util.errorTips("请先在购物车中选择要删除的商品");
            }
        });

        $(document).on('click', '.submit-btn', function(){
            if(_this.data.cart.cartTotalPrice && _this.data.cart.cartTotalPrice > 0){
                window.location.href = './order-confirm.html';
            }else{
                _common_util.errorTips("请选择商品后再提交哦");
            }
        });
    },
    loadCart : function(){
        var _this = this;
        $('.page-wrap').html('<div class="loading"></div>');
        _cart_service.getCartList(function(res){
            _this.renderCart(res);
        }, function(errorMsg){
            _this.showErrorTips();
        });
    },
    renderCart : function(data){
        this.data.cart = data;
        this.data.isNotEmpty = !!data.cartItemVOList.length;
        console.log(this.data); 
        var cartHTML = _common_util.renderHTML(cartTemplate , this.data);
        $('.page-wrap').html(cartHTML);
        navTop.loadCartCount();
    },
    deleteCartItems : function(productIds){
        var _this = this;
        _cart_service.deleteCartItems(productIds, function(res){
            _this.renderCart(res);
        }, function(errorMsg){
            _this.showErrorTips();
        })
    },
    showErrorTips : function(){
        $('.page-wrap').html('<p class="error-tip">出错啦，刷新下试试吧。</p>');
    }
};

$(function(){
    cart.init();
});