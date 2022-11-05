require('./index.css');
require('page/common/nav-top/index.js');
require('page/common/nav-search/index.js')
require('../common/index.js');
require('utils/unslider/index.js');

var bannerHtmlTemplate = require('./banner.string');

var _common_util = require('utils/util.js');

$(function() {
    var bannerHTML = _common_util.renderHTML(bannerHtmlTemplate);
    $('.banner-content').html(bannerHTML);
    $('.banner').unslider({
        dots : true,
    });
});
