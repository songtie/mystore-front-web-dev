var _common_util = require('utils/util.js');


var _cart_service = {

    //获取购物车数量
    getCartCount : function(resolve,reject){
        _common_util.request({
            url : _common_util.getServerURL('/cart/get_cart_count'),
            method : 'POST',
            success : resolve,
            error : reject
        });
    },
};

module.exports = _cart_service;