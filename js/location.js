/**
 * @fileOverview 微信一分钱回家-定位页
 * @author rainyjune <rainyjune@live.cn>
 * @version $Id: location.js 724557 2015-01-26 07:42:15Z chenkang $
 * @template m.leju.com\trunk\weixin\templates\v1.0\pool\location.html
 */
define(function(require, exports, module){
  var $ = require("zepto");
  var weixinApi = require("weixinApi");
  
  $(function(){
    
    var isVisited = parseInt($("#is_visited").val());
    
    //if (isVisited != 1) {
    //  $("#splashContainer").show();
    //}
    
    //setTimeout(function(){
    //  $("#splashContainer").hide();
    //}, 2000);
    
    $(".sCityBtnBox").on("click", function(){
      if (($("#phone").val() != "") && !isValidMobilePhone($("#phone").val())) {
        alert("手机号码格式错误！");
        return false;
      }
        
      //$("#shareBoxContainer").show();
      $("#splashContainer").show();
      setTimeout(function(){
        var start = $("#start_place option").eq($("#start_place").attr("selectedIndex")).text();
        var end = $("#end_place").val();
        var phone = $("#phone").val();
        location.href = $("#share_success").val() + "&start_place=" + encodeURIComponent(start) + "&end_place=" + encodeURIComponent(end) + "&phone=" + encodeURIComponent(phone);
      }, 2000);
      return false;
    });
    
    $(".sCityFixBox").on("click", function(){
      $(this).hide();
      return false;
    });
    
    function isValidMobilePhone(value){
      var cellPhoneRegExp = /^1[3|4|5|7|8][0-9]\d{8}$/;
      return !isNaN(value) && cellPhoneRegExp.test(value);
    }
    
    /*
    // 开启Api的debug模式
    //WeixinApi.enableDebugMode();
    // 需要分享的内容，请放到ready里
    WeixinApi.ready(function(Api) {
      // 分享的回调
      var wxCallbacks = {
          //async : true,
          // 分享操作开始之前
          ready : function() {
            // 你可以在这里对分享的数据进行重组
            //alert("准备分享");
          },
          // 分享被用户自动取消
          cancel : function(resp) {
            // 你可以在你的页面上给用户一个小Tip，为什么要取消呢？
            //alert("分享被取消，msg=" + resp.err_msg);
          },
          fail : function(resp) {
            // 分享失败了，是不是可以告诉用户：不要紧，可能是网络问题，一会儿再试试？
            //alert("分享失败，msg=" + resp.err_msg);
          },
          confirm : function(resp) {
            // 分享成功了，我们是不是可以做一些分享统计呢？
            //ealert("分享成功");
            var start = $("#start_place option").eq($("#start_place").attr("selectedIndex")).text();
            var end = $("#end_place option").eq($("#end_place").attr("selectedIndex")).text();
            location.href = $("#share_success").val() + "&start_place=" + encodeURIComponent(start) + "&end_place=" + encodeURIComponent(end);
          }
      };
      Api.shareToFriend(wxData, wxCallbacks);
      Api.shareToTimeline(wxData, wxCallbacks);
    });
    */
  });
  
});