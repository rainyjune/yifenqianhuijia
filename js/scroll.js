/**
 * @fileOverview 微信一分钱回家-滚动模块
 * @author rainyjune <rainyjune@live.cn>
 * @version $Id: scroll.js 724557 2015-01-26 07:42:15Z chenkang $
 */
(function(factory){
  if(typeof define === "function" && define.cmd) {
    define(function(require, exports, module){
      var $ = require('zepto');
      factory($);
    });
  } else {
    factory(Zepto);
  }
}(function($){
  $.fn.autoScroll = function(){
    var self = this;
    var currentRow = 0;
    var container = null;
    var rows = 0;
    
    function init() {
      container = self.find(".d-lottery-list-container");
      rows = Math.ceil(container.children().length / 2);
      
      setInterval(function(){
        updatePosition();
        updateCurrentRow();
      }, 1000);
    }
    
    function updatePosition() {
      var perc = rowToPercent();
      container.animate({
        "top": perc
      });
    }
    
    function updateCurrentRow() {
      currentRow++;
      if (currentRow > rows) {
        currentRow = 0;
      }
    }
    
    function rowToPercent() {
      if (currentRow == 0) {
        return "0";
      }
      var tmp = currentRow - 1;
      return "-" + tmp + "00%";
    }
    init();
    return self;
  };
}));