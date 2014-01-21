"use strict";

var doc = document;
var isClicked = false;

window.onclick = function(){
  if(!isClicked){
    var nicovideo = new NicoVideo(doc.getElementsByClassName("SYS_box_item_data"));
    nicovideo.addNicosoundButton();
  }
  isClicked = true;
};

