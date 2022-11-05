var _common_util = require('utils/util.js');


var _product_service = {

    //获取商品列表
    getProductList : function(requestParam, resolve,reject){
        _common_util.request({
            url     : _common_util.getServerURL('/product/list'),
            method  : 'GET',
            data    : requestParam,
            success : resolve,
            error : reject
        });
    },
};

module.exports = _product_service;