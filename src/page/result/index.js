require('./index.css');

var _common_util = require('utils/util.js');

var result = {
    init : function(){
        var type = _common_util.getURLParam('type') || 'default';   
        $('.' + type + '-success').show();
    }
};

$(function(){
    result.init();
});