/**
 * @fileOverview 微信一分钱回家-首页
 * @author rainyjune <rainyjune@live.cn>
 * @version $Id: index.js 724557 2015-01-26 07:42:15Z chenkang $
 * @template m.leju.com\trunk\weixin\templates\v1.0\pool\index.html
 */
define(function(require, exports, module){
  var $ = require("zepto");
  require("./loadMore.js");
  require("./scroll.js");
  
  $(function(){
    
    var lukyUsers = $(".d-lottery-list-container").children();
    $("a.popup").on("click", function(){
      $(".sCityFixBox").eq(0).show();
      return false;
    });
    
    $(".sCityFixBox").on("click", function(){
      $(this).hide();
    });
    
    if (lukyUsers.length > 2) {
      //code
      $(".d-lottery-list").autoScroll();
    }
    //$(".d-lottery-list").autoScroll();
  });
});