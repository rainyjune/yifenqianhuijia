/**
 * @fileOverview 微信一分钱回家-加载更多模块
 * @author rainyjune <rainyjune@live.cn>
 * @version $Id: loadMore.js 724557 2015-01-26 07:42:15Z chenkang $
 */
  
  $(function(){
    
    $("a.d-more").on("click", function(){
      var url = $("#load_more_url").val();
      showLoadingIcon();
      $.getJSON(url, function(data){
        //alert("Result Data:["+data+"]");
        //alert("typeof data:" + (typeof data));
        //console.log(data);
        if ($.isArray(data) && data.length > 0) {
          //alert("is array");
          $("a.d-more").hide();
          handleMoreArray(data);
        } else {
          //alert("not a array");
        }
      });
      return false;
    });
    
    //ganxie
    $(".d-friends-word").on("click", "a.d-right", function(){
      var text = $(this).parent().find("span.win_text").html();
      $(".sCityFixBox").hide();
      $("#ganxie").find(".thankBox").html("<p>" + text + "</p>");
      $("#ganxie").show();
      return false;
    });
    
    //baoguang
    $(".d-friends-word").on("click", "a.d-a1", function(){
      var text = $(this).parent().find("span.win_text").html();
      $(".sCityFixBox").hide();
      $("#baoguang").find(".thankBox").html("<p>" + text + "</p>");
      $("#baoguang").show();
      return false;
    });
    
    $("#ganxie, #baoguang").on("click", function(){
      $(this).hide();
      return false;
    });
  });
  
  function showLoadingIcon() {
    $("a.d-more").html("<img src='http://src.house.sina.com.cn/imp/imp/deal/e7/0b/f/b4cf7680895aa192750cc57f74b_p10_mk10.gif' width='19' height='19' />");
  }
  
  function handleMoreArray(arr) {
    var theArr = [];
    $.each(arr, function(index, item) {
      var str = friendTemplate(item).outerHTML;
      theArr.push(str);
    });
    var theLongString = theArr.join("");
    $(".d-friends-word").append(theLongString);
  }