require('./index.css');
var paginationTemplate = require('./index.string');

var _common_util = require('utils/util.js');


var Pagination = function(){
    this.defaultOption = {
        container       : null,
        current         : 1,
        pages           : 1,
        hasPreviousPage : false,
        previousPage    : -1,
        hasNextPage     : false,
        nextPage        : -1,
        pageRange       : 3,
        onClickItem     : null
    };

    var _this = this;
    $(document).on('click' , '.page-item' , function(){
        var $this = $(this);
        if($this.hasClass('active') || $this.hasClass('disabled')){
            return ;
        }

        typeof _this.option.onClickItem === 'function'
         ? _this.option.onClickItem($this.data('value')) : null;

    }) ;
};

// |上一页| 1 2 3 4 5 |下一页|  3/6
Pagination.prototype.render = function(userOption){

    //准备数据
    this.option = $.extend({}, this.defaultOption, userOption);

    if(!(this.option.container instanceof jQuery)){
        return;
    }
    if(this.option.pages <= 1){
        return;
    }

    var option = this.option;
    option.hasPreviousPage  = option.current > 1;
    option.previousPage     = option.current - 1;
    option.hasNextPage      = option.current < option.pages;
    option.nextPage         = option.current + 1; 

    var pageArray = [];
    pageArray.push({
        name        : '上一页',
        value       : this.option.previousPage,
        disabled    : !this.option.hasPreviousPage,
    });

    // |上一页| 1 2 3 4 5 |下一页|  3/6

    var start = (option.current - option.pageRange) > 0 ? (option.current - option.pageRange) : (1);
    var end = (option.current + option.pageRange) > option.pages ? option.pages : (option.current + option.pageRange);

    for( var i = start; i <= end ; i++){
        pageArray.push({
            name : i,
            value : i,
            active : (i === option.current), 
        });
    }

    pageArray.push({
        name        : '下一页',
        value       : this.option.nextPage,
        disabled    : !this.option.hasNextPage,
    });

    var paginationHTML = _common_util.renderHTML(paginationTemplate, {
        pageArray : pageArray,
        current   : option.current,
        pages     : option.pages  
    });

    option.container.html(paginationHTML);
};

module.exports = Pagination;