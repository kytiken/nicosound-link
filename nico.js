"use strict";

var doc = document;
var isClicked = false;

window.onclick = function(){
  if(!isClicked){
    var nicovideo = new NicoVideo(doc, NicoVideo.mylist_page_type);
    nicovideo.addNicosoundButton();
  }
  isClicked = true;
};

var NicoVideo = function(doc, page_type){
  this.video_node_list = doc.getElementsByClassName("watch");
  this.page_type = page_type;
};

NicoVideo.mylist_page_type = "mylist"

NicoVideo.prototype.addNicosoundButton = function(){
  //動画リストにnicosoundボタンをつける
  for (var i = 0; i < this.video_node_list.length; i++){
    var origin_video_node = this.video_node_list[i];
    var nicosound_button = createNicosoundButton(origin_video_node);
    origin_video_node.parentNode.parentNode.appendChild(nicosound_button);
  }
};

var Button = function(originTagNode) {
  this.originTagNode = originTagNode;
};

function createNicosoundButton(origin_video_node){
  var nicosound = createSoundUrl(origin_video_node.href);
  var nsButton = doc.createElement("button");
  var button = nsButton.appendChild(doc.createTextNode("nicosound"));
  nsButton.onclick = function(){
    window.open(nicosound);
  };
  return nsButton;
}

function createSoundUrl( sourcePathname ) {
  var url = 'http://nicosound.anyap.info/';
  var searchId = /sm\d*/;
  var videoId = sourcePathname.match(searchId);
  if(videoId == null){
    var searchId = /nm\d*/;
    var videoId = sourcePathname.match(searchId);
  } else if(videoId == null){
    var searchId = /\d*/;
    var videoId = sourcePathname.match(searchId);
  }
  return url + 'sound/' + videoId;
}
