/**
 * @fileOverview 微信一分钱回家
 * @author rainyjune <rainyjune@live.cn>
 * @version $Id: huojiang.js 724557 2015-01-26 07:42:15Z chenkang $
 * @template m.leju.com\trunk\weixin\templates\v1.0\pool\huojiang.html
 */
define(function(require, exports, modules) {
    var $ = require("zepto");
    var mValidate = require("mValidate");
    $("form").mValidate({
        itemSelector: ".v_input1",//待验证项
        alert:{ selector: "#wrongTipBox",//错误提示弹窗
            errorTextSelector: "p",//错误弹窗中，错误文案输出位置
            isSingle: true, //是否单独输出错误信息，true则显示第一个错误
            showTime: 2000 //错误信息显示时间
        },
        submit:{ type: "ajax", //提交类型，"ajax" or "form"
                btnSelector: "#btn_submit", //提交触发按钮
                ajaxUrl: $("#form").attr("action"),// ajax提交时用
                ajaxCallback: submitSucc // ajax回调函数
        }
    });

    function submitSucc(data){
        var $tishi = $("#okTipBox");
        if(data.status == "succ"){
            $tishi.show().find("p").html(data.msg);
            window.setTimeout(function(){
                window.location.href = data.info;
            }, 1000);
        }else{
          $tishi = $("#wrongTipBox");
            $tishi.show().find("p").html(data.info);
            window.setTimeout(function(){
                $tishi.hide();
            }, 1000);
        }
    }

})