/**
 * @fileOverview 微信一分钱回家-领奖
 * @author rainyjune <rainyjune@live.cn>
 * @version $Id: accept_prize.js 764751 2015-04-29 02:26:17Z chenkang $
 * @template m.leju.com\trunk\weixin\templates\v1.0\pool\accept_prize.html
 */
define(function(require, exports, module){
  var $ = require("zepto");
  
  $(function(){
     var nameInput = $("#truename"),
          telphoneInput = $("#telphone"),
          phoneCodeInput = $("#phone_code"),
          imageCodeInput = $("#image_code"),
          
          imgSrc = $("#imgCodePic").attr("src");
    var getMarkButton = $("input.d-getmark");
          
          
    $("#getNewImgCode").on("click", function(){
      $("#imgCodePic").attr("src", imgSrc + "&rn=" + (new Date().getTime()));
      return false;
    
    });
    
    $(".d-getmark").on("click", function(){
      if (!isValidMobilePhone(telphoneInput.val())) {
        showTip("手机号码格式错误！");
        return false;
      }
      var url = $("#sms_api").val();
      $.post(url, { telphone:  telphoneInput.val()}, function(response){
        response = JSON.parse(response);
        if (response.code == 1) {
          showOK(response.message);
          updateMarkButton();
        } else {
          showTip(response.message);
        }
      })
      return false;
    });
    
    function updateMarkButton() {
      var remains = 60;
      getMarkButton.prop('disabled', true);
      var stimer = setInterval(function(){
        getMarkButton.val("" + remains + "秒" );
        remains--;
        if (remains < 0) {
          clearInterval(stimer);
          getMarkButton.prop('disabled', false);
          getMarkButton.val("发送验证码");
        }
      }, 1000);
      
    }
    
    function isValidMobilePhone(value){
      var cellPhoneRegExp = /^1[3|4|5|7|8][0-9]\d{8}$/;
      return !isNaN(value) && cellPhoneRegExp.test(value);
    }
    
    function isValidName(value) {
      value = $.trim(value);
      return value && value.length > 1;
    }
    
    function showTip(msg) {
      $("#wrongTipBox").find(".wrong").html(msg);
      $("#wrongTipBox").show();
      setTimeout(function(){
        $("#wrongTipBox").hide();
      }, 2000);
    }
    
    function showOK(msg) {
      $("#okTipBox").find(".ok").html(msg);
      $("#okTipBox").show();
      setTimeout(function(){
        $("#okTipBox").hide();
      }, 2000);
    }
    
    $("a.tp_button").on("click", function(){
      if (!isValidName(nameInput.val())) {
        showTip("姓名不正确");
        return false;
      }
      
      if (!$.trim(telphoneInput.val())) {
        showTip("电话不能为空！");
        return false;
      }
      
      if (!isValidMobilePhone(telphoneInput.val())) {
        showTip("手机号码格式错误！");
        return false;
      }
      
      
      if (phoneCodeInput.length && !$.trim(phoneCodeInput.val())) {
        showTip("短信验证码错误！");
        return false;
      }
      
      if (!$.trim(imageCodeInput.val())) {
        showTip("验证码错误！");
        return false;
      }
      
      $.ajax({
        type: $("#getPrizeForm").attr("method"),
        url: $("#getPrizeForm").attr("action"),
        data: $("#getPrizeForm").serialize(),
        dataType: 'json',
        success: function(data) {
          if (data.code == 1) {
            //showOK(data.message);
            //clearForm();
            location.href = data.jump_url;
          } else {
            if (data.code == -11) {
              $("#getNewImgCode").trigger("click");
            }
            showTip(data.message);
          }
        },
        error: function(xhr, type){
          showTip("网络错误");
        }
        
      });
      return false;
    
    
    });
    
    function clearForm() {
      nameInput.val("");
      telphoneInput.val("");
      phoneCodeInput.val("");
      imageCodeInput.val("");
    }
    
  });
});