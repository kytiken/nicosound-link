"use strict";

var doc = document;
var isClicked = false;

window.onclick = function(){
  if(!isClicked){
    generateLink();
  }
  isClicked = true;
};

function addNicosoundButton(video_node_list){
  //動画リストにnicosoundボタンをつける
  for (var i = 0; i < video_node_list.length; i++){
    var origin_video_node = video_node_list[i];
    var button = new Button(origin_video_node);
    var nsButton = button.createNsButton();
    origin_video_node.parentNode.parentNode.appendChild(nsButton);
  }
}

function generateLink() {
    var originLinkTag = doc.getElementsByClassName("watch");
    addNicosoundButton(originLinkTag);
}

var Button = function(originTagNode) {
  this.originTagNode = originTagNode;
};

Button.prototype.createNsButton = function(){
  var nicosound = createSoundUrl(this.originTagNode.href);
  var nsButton = doc.createElement("button");
  var button = nsButton.appendChild(doc.createTextNode("nicosound"));
  nsButton.onclick = function(){
    window.open(nicosound);
  };
  return nsButton;
};

Button.prototype.createPushButton = function() {
  var pushButton = doc.createElement("button");
  var text = doc.createTextNode("push");
  pushButton.appendChild(text);
  pushButton.onclick = function(){
    var sm = localStorage.getItem("sm");
    sm = toArray(sm);
    sm.push(this.originTagNode);
    localStorage.setItem("sm",sm);
  };
  return pushButton;
};

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
