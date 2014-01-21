"use strict";

var doc = document;
var isClicked = false;

window.onclick = function(){
  if(!isClicked){
    var nicovideo = new NicoVideo(doc.getElementsByClassName("section"));
    nicovideo.addNicosoundButton();
  }
  isClicked = true;
};
