var _common_util = require('utils/util.js');


var _cart_service = {

    //获取购物车数量
    getCartCount : function(resolve,reject){
        _common_util.request({
            url : _common_util.getServerURL('/cart/get_cart_count'),
            method : 'GET',
            success : resolve,
            error : reject
        });
    },
    //加入购物车
    addToCart : function(productInfo, resolve,reject){
        _common_util.request({
            url : _common_util.getServerURL('/cart/add'),
            method : 'POST',
            data : productInfo,
            success : resolve,
            error : reject
        });
    },
    //获取购物车列表
    getCartList : function(resolve,reject){
        _common_util.request({
            url : _common_util.getServerURL('/cart/list'),
            method : 'GET',
            success : resolve,
            error : reject
        });
    },
    //设置购物车列表中某项选中checked
    setCartItemChecked : function(productId, resolve,reject){
        _common_util.request({
            url : _common_util.getServerURL('/cart/set_cart_item_checked'),
            method : 'POST',
            data : {
                productId : productId
            },
            success : resolve,
            error : reject
        });
    },
    //设置购物车列表中某项不选中unchecked
    setCartItemUnChecked : function(productId, resolve,reject){
        _common_util.request({
            url : _common_util.getServerURL('/cart/set_cart_item_unchecked'),
            method : 'POST',
            data : {
                productId : productId
            },
            success : resolve,
            error : reject
        });
    },
    //设置购物车列表所有项选中allchecked
    setAllChecked : function(resolve,reject){
        _common_util.request({
            url : _common_util.getServerURL('/cart/set_all_checked'),
            method : 'POST',
            success : resolve,
            error : reject
        });
    },
    //设置购物车列表所有项不选中unallchecked
    setAllUnChecked : function(resolve,reject){
        _common_util.request({
            url : _common_util.getServerURL('/cart/set_all_unchecked'),
            method : 'POST',
            success : resolve,
            error : reject
        });
    },
    //更新购物车列表中商品的数量
    updateCart : function(cartInfo, resolve,reject){
        _common_util.request({
            url : _common_util.getServerURL('/cart/update'),
            method : 'POST',
            data : cartInfo,
            success : resolve,
            error : reject
        });
    },
    //删除购物车列表中商品，支持批量删除
    deleteCartItems : function(productIds, resolve,reject){
        _common_util.request({
            url : _common_util.getServerURL('/cart/delete'),
            method : 'POST',
            data : {
                productIds : productIds
            },
            success : resolve,
            error : reject
        });
    },
};

module.exports = _cart_service;