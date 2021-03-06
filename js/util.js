/**
 * @fileOverview 微信一分钱回家-渲染小伙伴信息
 * @author rainyjune <rainyjune@live.cn>
 * @version $Id: util.js 724557 2015-01-26 07:42:15Z chenkang $
 */

  
  
  function friendTemplate(obj) {
    var container = document.createElement("div");
    container.className = "d-friends-view";
    
    var img = document.createElement("img");
    img.className = "d-friends-img";
    img.src = obj.headimgurl;
    container.appendChild(img);
    
    var h4 = document.createElement("h4");
    var cite = document.createElement("cite");
    cite.appendChild(document.createTextNode(obj.add_ctime || obj.dateline));
    h4.appendChild(document.createTextNode(obj.nickname));
    h4.appendChild(cite);
    container.appendChild(h4);
    
    var p = document.createElement("p");
    var i = document.createElement("i");
    if (obj.money < 0) {
      i.className = "d-i1";
    }
    var span = document.createElement("span");
    span.className = "win_text";
    i.appendChild(document.createTextNode(parseInt(obj.money) + "元"));
    span.appendChild(document.createTextNode(obj.win_text));
    p.appendChild(i);
    p.appendChild(document.createTextNode(" , "));
    p.appendChild(span);
    container.appendChild(p);
    
    if ( document.querySelectorAll("#is_self").length == 0 || (document.querySelectorAll("#is_self").length && parseInt(document.getElementById("is_self").value)) ) {
      var a = document.createElement("a");
      a.className = obj.money > 0 ? "d-right" : "d-a1";
      a.href = "#";
      a.appendChild(document.createTextNode(obj.money > 0 ? "感谢TA" : "曝光TA"));
      container.appendChild(a);
    }
    
    var rateImg = document.createElement("img");
    rateImg.className = "d-icon";
    var goodSrc = "./images/d-icon-good.png";
    var badSrc = "./images/d-icon-bad.png";
    rateImg.src = obj.money > 0 ? goodSrc : badSrc;
    container.appendChild(rateImg);
    
    return container;
  }
  
  function renderGiftItems(items) {
    var arr = [];
    $.each(items, function(index, item){
      arr.push("<span class='radius" + (index + 1) + "'><em>" + item + "</em></span>");
    });
    $("#items").html(arr.join(''));
  }

  function renderWinners(items) {
    var arr = [];
    $.each(items, function(index, item){
      arr.push("<div><h4>"+item.nickname+"</h4><p>获得"+item.name+"</p></div>");
    });
    $(".d-lottery-list-container").eq(0).html(arr.join(''));
  }