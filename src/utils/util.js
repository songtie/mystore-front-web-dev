var Hogan = require('hogan.js');

var config = {
    serverHost : 'http://localhost:8099'
}

var _common_util = {
    request : function(param){
        var _this = this;
        $.ajax({
            type        : param.method || 'GET',
            url         : param.url || '',
            contentType : param.contentType || 'application/x-www-form-urlencoded',
            dataType    : param.type || 'json',
            data        : param.data || '',
            xhrFields   : {
                withCredentials : true,
            },
            success  : function(res){
                //请求成功，且服务器返回code为0
                if (0 === res.code){
                    typeof param.success === 'function' && param.success(res.data, res.message);
                }
                //请求成功，且服务器返回code为1，表示错误
                else if (1 === res.code){
                    typeof param.error === 'function' && param.error(res.message);
                }
                //请求成功，且服务器返回code为10，表示参数错误
                else if (10 === res.code){
                    typeof param.error === 'function' && param.error(res.message);
                }
                //请求成功，且服务器返回code为11，表示需要登录
                else if (11 === res.code){
                    _this.toLogin();
                    //typeof param.error === 'function' && param.error(res.message);
                }
            },
            //请求失败，服务器返回的HTTP状态码不是200
            error    : function(err){
                typeof param.error === 'function' && param.error(err.statusText);
            }
        });
    },
    //跳转到登录页面
    toLogin : function(){
        window.location.href = './user-login.html?redirect='+ encodeURIComponent(window.location.href);
    },
    getServerURL : function(path){
        return config.serverHost + path;
    },
    errorTips : function(msg){
        alert(msg || '出错啦~~~');
    },
    getURLParam : function(name){
        //http://localhost:8080/product/list?keyword=aaa&pageSize=1
        var paramString = window.location.search.substring(1);
        var regExp = new RegExp('(^|&)' + name +'=([^&]*)(&|$)');
        var result = paramString.match(regExp);
        return result ? decodeURIComponent(result[2]) : null;
    },
    renderHTML: function(htmlTemplate, data){
        var template = Hogan.compile(htmlTemplate);
        var result = template.render(data);
        return result;
    },
    //字段校验，支持字符串非空校验(require),手机格式,邮箱格式
    validate : function(value , type){
        var value = $.trim(value);
        if('require' === type){
            return !!value;
        }
        if('phone' === type){
            return /^1\d{10}$/.test(value);
        }
        if('email' === type){
            return /^\w+([-+.]\w+)*@\w+([-.]\ w+)*\.\w+([-.]\w+)*$/.test(value);
        }
    }
};

module.exports = _common_util;