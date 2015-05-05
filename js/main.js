/**
 * @fileOverview 微信一分钱回家-转盘页
 * @author rainyjune <rainyjune@live.cn>
 */
  
  $(function(){
    var is_turn = $("#is_turn").val();
    var isSelf = $("#is_self").val();
    var lukyUsers = $(".d-lottery-list-container").children();
    
    // Get activity info.
    $.getJSON('./data/activity.json', function(data) {
      if (data.topPoster) {
        $("#topPoster").attr("src", data.topPoster);
      }
      $("#sponsor").text(data.sponsor);
      if (data.startDate && data.endDate) {
        $("#duration").text(data.startDate + " — " + data.endDate);
      }
      $(".goalMoney").prepend(data.goalMoney);
      if (data.fullfilledText) {
        $("#fullfilledText").html(data.fullfilledText);
      }
      if (data["guide_share_text_1"]) {
        $(".shareBox h3").html(data["guide_share_text_1"]);
      }
      if (data["guide_share_text_2"]) {
        $(".shareBox h4").html(data["guide_share_text_2"]);
      }
    });
    
    // Get user info
    $.getJSON("./data/user.json", function(data) {
      $(".head").attr("src", data.useravatar);
    });
    
    // Get current user's data in this activity
    $.getJSON("./data/userRecord.json", function(data) {
      if (data.fullfilled) {
        $(".raiseFundsBox").removeClass("none");
      }
    });
    
    
    $("#panResult").on("click", "a.close", function(){
      $("#panResult").hide();
      return false;
    });
    
    if (is_turn > 0) {
      rouletteGame();
    }
    
    if (isSelf != 1 && is_turn ==0) {
      $("a.evHand").on("click", function(){
        showTip("亲，不能帮同一好友重复筹款哦~");
        return false;
      });
    }
    
    
    //$(".d-lottery-list").autoScroll();
    if (lukyUsers.length > 2) {
      //code
      $(".d-lottery-list").autoScroll();
    }
    
    $("a.popup").on("click", function(){
      $("#shareBoxContainer").show();
      return false;
    });
    
    $("#shareBoxContainer").on("click",  function(){
      $(this).hide();
    });
  });
  
  function showTip(msg) {
    $("#wrongTipBox").find(".wrong").html(msg);
    $("#wrongTipBox").show();
    setTimeout(function(){
      $("#wrongTipBox").hide();
    }, 2000);
  }
  
  // 轮盘赌
  function rouletteGame() {
    var shownum = document.getElementById('shownum');
    var eles = {};
    eles.radiusbox = document.getElementById('radiusbox'); // 轮盘外框
    eles.box = eles.radiusbox.getElementsByClassName('box')[0]; // 轮盘
    eles.rot = eles.box.getElementsByClassName('rot')[0]; // 要转的元素
    eles.hand = eles.box.getElementsByClassName('hand')[0]; // 指针
    eles.evHand = eles.box.getElementsByClassName('evHand')[0]; // 指针点击按钮
    
    // exe
    var game = roulette({
      requestUrl: document.getElementById("wheel_draw_url").value,
      radiusbox : eles.radiusbox,
      box : eles.box,
      rot : eles.rot,
      hand: eles.hand,
      evHand: eles.evHand,
      clickTime : 6000000,
      radius : $("#items span").length,
      fnClickEnd: function(n){
        //alert('恭喜您获得'+n.money+'等奖');
        var resultMoneyTotal = $("#resultMoneyTotal");
        resultMoneyTotal.text(parseInt(resultMoneyTotal.text()) + parseInt(n.money) + "元");
        
        var helpCount = $("#helpCount");
        helpCount.text(parseInt(helpCount.text()) + 1);
        
        $("#resultMoney").text(n.money);
        $(".expenses").find("i").html(n.money >= 0 ? "¥" + n.money : "¥<em>-" + Math.abs(n.money) + "</em>");
        $("#panResult").show();
        
        if (n.remain_num == 0) {
          $("#panResult").one("click", "a.close", function(){
            document.location.reload(true);
            return false;
          });
        }

        // insert this record to the activity list
        var str = friendTemplate(n).outerHTML;
        //console.log("str", str);
        $("div.d-friends-word").prepend(str);
        $("div.d-friends-box").removeClass("none");
        // Update the load_more_url value
        var loadMoreUrl = $("#load_more_url").val();
        var oldOffsetResult = loadMoreUrl.match(/&offset=(\d+)&/);
        if (oldOffsetResult && oldOffsetResult[1] && !isNaN(oldOffsetResult[1])) {
          var oldOffset = parseInt(oldOffsetResult[1]);
          var theNewUrl = loadMoreUrl.replace(/&offset=(\d+)&/, "&offset="+ (oldOffset + 1) +"&");
          
          //console.log("theNewUrl:", theNewUrl);
          $("#load_more_url").val(theNewUrl);
        }
      },
      gameOver: function(){
        showTip("亲，不能帮同一好友重复筹款哦~");
        setTimeout(function(){
          document.location.reload(true);
        }, 2000);
      }
    });
  }