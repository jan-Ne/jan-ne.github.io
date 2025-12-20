// Font Button Click
  function fontClick() {
    $(".font-menu").toggle();
  }
  
// Size Functions
  var scale = 1;
  function increaseSize() {
    if (scale < 4.9){
      scale += 0.1;
    }
    $("main").css("transform", "scale(" + scale + ")");
    $(".content-scroll").css("width", "calc(816px \* " + scale + ")");
    if (scale >= 1){
      $(".content-scroll").css("height", "calc(" + $("main").height() + "px \* " + scale + " \+ 17px");
    }
  }
  function decreaseSize() {
    if (scale > 0.6){
      scale -= 0.1;
    }
    $("main").css("transform", "scale(" + scale + ")");
    $(".content-scroll").css("width", "calc(816px \* " + scale + ")");
    if (scale > 1){
      $(".content-scroll").css("height", "calc(" + $("main").height() + "px \* " + scale + " \+ 17px");
    }
  }
