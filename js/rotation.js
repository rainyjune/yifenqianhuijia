/*************************************
rotation.js
*************************************/
define(function(require, exports, module){
  
  function rotation(ele) {
    return new Rotation(ele);
  }
  
  function Rotation(ele) {
    this.ele = ele;
    this.init();
  }

  Rotation.prototype.init = function() {
    var that = this;
    var ele = that.ele;
  
    that.rot = ele.rot;
    that.hand = ele.hand;
    that.rotTime = ele.rotTime;
    that.rotDeg = ele.rotDeg;
    that.handDeg = ele.handDeg;
  
    that.setRotate(that.rotDeg);
    that.setHand(that.handDeg);
  }

  Rotation.prototype.setRotate = function(d) {
    var that = this;
    // 设置轮盘初始角度、运转为零
    setStyle(that.rot, 'transform', 'rotate(0)');
    setStyle(that.rot, 'transition', 'none');
  
    // 运动
    setTimeout(function() {
      setStyle(that.rot, 'transform', 'rotate(' + d + 'deg)');
      setStyle(that.rot, 'transition', that.rotTime * 0.6 + 'ms all ease');
    }, 0)
  
  }

  Rotation.prototype.setHand = function(d) {
    var that = this;
  
    // 设置指针初始角度、运转为零
    setStyle(that.hand, 'transform', 'rotate(0)');
    setStyle(that.hand, 'transition', 'none');
  
    // 运动
    setTimeout(function() {
      setStyle(that.hand, 'transform', 'rotate(' + d + 'deg)');
      setStyle(that.hand, 'transition', that.rotTime + 'ms all ease');
    }, 0)
  };
  
  return rotation;

});