
  // 设置css3
  function setStyle(obj, name, value) {
    var bigname = name.charAt(0).toUpperCase() + name.substring(1);
    obj.style['Webkit' + bigname] = value;
    obj.style['Moz' + bigname] = value;
    obj.style['ms' + bigname] = value;
    obj.style['O' + bigname] = value;
    obj.style[name] = value;
  }
  
  // 随机函数
  function rnd(iMin, iMax) {
    return Math.floor(Math.random() * (iMax - iMin + 1)) + iMin;
  }