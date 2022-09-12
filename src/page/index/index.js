require('./index.css');
// require('page/common/nav-top-simple/index.js');
require('page/common/nav-top/index.js');
require('page/common/nav-search/index.js')
var navSide = require('page/common/nav-side/index.js')
require('../common/index.js');



var _common_util = require('utils/util.js');

// _common_util.request({
//     url : 'http://localhost:8099/product/detail?productId=1',//跨域问题
//     success : function(res){
//         console.log(res);
//     },
//     error : function(err){
//         console.log(err)
//     }
// });

navSide.init({
    name : 'order-list'
});

console.log('index: index.js');

