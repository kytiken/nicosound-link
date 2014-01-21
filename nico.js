"use strict";

var doc = document;
var isClicked = false;

window.onclick = function(){
  if(!isClicked){
    generateLink();
  }
  isClicked = true;
};

var NicoVideo = function(doc){
  this.doc = doc;
  //メンバ：動画リスト
}

function addNicosoundButton(video_node_list){
  //動画リストにnicosoundボタンをつける
  for (var i = 0; i < video_node_list.length; i++){
    var origin_video_node = video_node_list[i];
    var nicosound_button = createNicosoundButton(origin_video_node);
    origin_video_node.parentNode.parentNode.appendChild(nicosound_button);
  }
}

function generateLink() {
    var originLinkTag = doc.getElementsByClassName("watch");
    addNicosoundButton(originLinkTag);
}

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
