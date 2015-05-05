/*******************************************
roulette.js
*******************************************/
  
function roulette(ele) {
	return new Roulette(ele);
}

function Roulette(ele) {
	this.ele = ele;
	this.init();
}

Roulette.prototype.init = function() {
	var that = this;
	var ele = that.ele;
	this.radiusbox = ele.radiusbox; // *外框
	this.box = ele.box; // *轮盘
	this.disTwoSide = ele.disTwoSide || 10; // 轮盘距离窗口两边的宽度
	this.rot = ele.rot; // *要旋转的轮盘
	this.hand = ele.hand; // *指针
	this.clickTime = ele.clickTime || 0; // *可点击的次数
	this.radius = ele.radius; // 轮盘共分为几份
	this.hand = ele.hand; // *指针旋转的角度
	this.evHand = ele.evHand || ele.hand; // 点击抽奖
	this.fnClick = ele.fnClick || function() {}; // 点击执行
	this.fnClickEnd = ele.fnClickEnd || function() {}; // 点击结束后回调
	this.gameOver = ele.gameOver || function() {}; // 游戏结束
	this.fnClickBefore = ele.fnClickBefore || function() {}; // 点击之前
  
  
  this.requestUrl = ele.requestUrl || "";


	this.setRouletteSize(); // 布局随窗口的大小计算轮盘的大小
	this.evHand.__ready = true; // 是否可点击
	this.evHand.__clickTime = 0; // 已点击的次数
	this.evHand.addEventListener('click', function() {
		that.fnClickBefore && that.fnClickBefore();
		that.startGame();
	}, false)
}

Roulette.prototype.startGame = function() {
	var that = this;

	// 运动结后才可再次点击
	if (this.evHand.__ready == false) {
		return false;
	}
	this.evHand.__ready = false;

	//if (this.clickTime == this.evHand.__clickTime) {
  if (this.clickTime == 0) {
		this.gameOver && this.gameOver(); // 游戏结束
		this.evHand.__ready = true;
		return false;
	} else {
		this.evHand.__clickTime++
	}

	// 轮盘旋转角度 
	this.setRouletteRotate();
}

Roulette.prototype.setRouletteSize = function() {
	// 布局随窗口的大小计算轮盘的大小
	var oLayouts = {
		radiusbox: this.radiusbox, // 外框
		box: this.box, // 轮盘
		disTwoSide: this.disTwoSide // 轮盘距离窗口两边的宽度
	};

	layouts(oLayouts);
}

Roulette.prototype.setRouletteRotate = function() {
	var oRotation = null;
	var that = this;

	this.fnClick && this.fnClick();
  
  beforeAjaxRotate.call(that);
  
  $.ajax({
    dataType: "json",
    url: that.requestUrl,
    success: function( data, textStatus, jqXHR ) {
      if (data.code == 1) {
        handleRotate.call(that, data);
        that.clickTime = data.remain_num;
        if (data.remain_num == 0) {
          //that.evHand.__ready = false;
          //that.gameOver && that.gameOver(); // 游戏结束
        }
      } else {
        alert("错误:" + data.message);
      }
    },
    //TODO
    error: function(  jqXHR,  textStatus,  errorThrown ) {
      debugger;
    }
  });
  
  function handleRotate(args) {
    var n = args.id;
    
    // 轮盘转动的角度
    var rotDeg = this.rotDeg || rnd(3, 6) * 360 /*随机转5-8圈*/ + (n * 180 / this.radius) /*第几块的一半*/ ;
  
    // 指针转动的角度
    var handDeg = this.handDeg || (180 / this.radius * (2 * n - 1) + 360 /*缓冲一圈*/ ) /*转到第几个*/ + rotDeg + rnd(-(180 / this.radius - 3), 180 / this.radius - 3) /*偏移量*/ ;
  
    // 指针转动的时间
    var rotTime = this.rotTime || rnd(1500, 3000);
  
    // 运动结束后才可再次点击
    setTimeout(function() {
      that.fnClickEnd && that.fnClickEnd(args); // 点击结束
      that.evHand.__ready = true;
    }, rotTime)
  
    // 轮盘旋转的角度	
    oRotation = {
      rot: this.rot, // 要旋转的轮盘
      hand: this.hand, // 指针
      rotTime: rotTime, // 旋转的时间 
      rotDeg: rotDeg, // 轮盘旋转的角度
      handDeg: handDeg // 指针旋转的角度
    }
    rotation(oRotation);
  
  }
  
  
  function beforeAjaxRotate() {
    var n = rnd(1, this.radius); // 随机中几等奖数
  
    // 轮盘转动的角度
    var rotDeg = this.rotDeg || rnd(6, 12) * 360 /*随机转6-12圈*/ + (n * 180 / this.radius) /*第几块的一半*/ ;
  
    // 指针转动的角度
    var handDeg = this.handDeg || (180 / this.radius * (2 * n - 1) + 360 /*缓冲一圈*/ ) /*转到第几个*/ + rotDeg + rnd(-(180 / this.radius - 3), 180 / this.radius - 3) /*偏移量*/ ;
  
    // 指针转动的时间
    var rotTime = this.rotTime || rnd(10000, 15000);
  
    // 轮盘旋转的角度	
    oRotation = {
      rot: this.rot, // 要旋转的轮盘
      hand: this.hand, // 指针
      rotTime: rotTime, // 旋转的时间 
      rotDeg: rotDeg, // 轮盘旋转的角度
      handDeg: handDeg // 指针旋转的角度
    }
    rotation(oRotation);
  }
}
  
