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
    var nicosound = new NicoSound(origin_video_node.href);
    var nicosound_button = nicosound.createNicosoundButton();
    origin_video_node.parentNode.parentNode.appendChild(nicosound_button);
  }
};

var NicoSound = function(video_url){
  this.video_url = video_url;
}

NicoSound.button_name = "nicosound";
NicoSound.site_url = 'http://nicosound.anyap.info/';
NicoSound.smile_video_url_pattern = /sm\d*/;
NicoSound.nmm_video_url_pattern = /nm\d*/;
NicoSound.ch_video_url_pattern = /\d*/;

NicoSound.prototype.createNicosoundButton = function(){
  var nicosound_url = this.createSoundUrl();
  var nicosound_button = doc.createElement("button");
  nicosound_button.appendChild(doc.createTextNode(NicoSound.button_name));
  nicosound_button.onclick = function(){
    window.open(nicosound_url);
  };
  return nicosound_button;
};

NicoSound.prototype.createSoundUrl = function() {
  var video_id;
  if(NicoSound.smile_video_url_pattern.test(this.video_url)){
    video_id = this.video_url.match(NicoSound.smile_video_url_pattern)[0];
  } else if(NicoSound.nmm_video_url_pattern.test(this.video_url)) {
    video_id = this.video_url.match(NicoSound.nmm_video_url_pattern);
  } else if(NicoSound.ch_video_url_pattern.test(this.video_url)) {
    video_id = this.video_url.match(NicoSound.ch_video_url_pattern);
  }
  return NicoSound.site_url + 'sound/' + video_id;
};
