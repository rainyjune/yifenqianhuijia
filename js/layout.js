/****************************************
Layouts
****************************************/

  function layouts(ele) {
    return new Layouts(ele);
  }
  
  function Layouts(ele) {
    this.ele = ele;
    this.init(ele);
  }
  
  Layouts.prototype.init = function() {
    var that = this;
    var ele = that.ele;
    that.radiusbox = ele.radiusbox; // 最外框*
    that.box = ele.box; // 轮盘*
    that.disTwoSide = ele.disTwoSide; // 距离两边的距离
    that.iScale = 1;
    that.maxRadiusR = 0;
    that.eleheight = window.getComputedStyle(that.box).width.slice(0, -2);
    that.setLayouts();
    window.addEventListener('resize', function() {
      that.setLayouts();
    }, false);
  }
  
  // 轮盘大小
  Layouts.prototype.setLayouts = function() {
    var that = this;
    that.maxRadiusR = Math.min(window.innerWidth, window.innerHeight) - that.disTwoSide * 2;
    that.iScale = Math.max(that.maxRadiusR / that.eleheight, 1).toFixed(2);
    that.radiusbox.style.height = Math.max(that.maxRadiusR, that.eleheight) + 'px';
    setStyle(that.box, 'transform-origin', 'top center');
    setStyle(that.box, 'transform', 'scale3d(' + that.iScale + ', ' + that.iScale + ', ' + that.iScale + ')');
    return that;
  }

