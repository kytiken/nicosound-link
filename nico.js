"use strict";
var NicoVideo = function(video_node_list){
  this.video_node_list = video_node_list;
};

NicoVideo.smile_video_url_pattern = /watch\/sm\d*/
NicoVideo.nmm_video_url_pattern = /watch\/nm\d*/
NicoVideo.ch_video_url_pattern = /watch\/\d*/

NicoVideo.prototype.addNicosoundButton = function(){
  //動画リストにnicosoundボタンをつける
  for (var i = 0; i < this.video_node_list.length; i++){
    var origin_video_node = this.video_node_list[i];
    var nicosound = new NicoSound(NicoVideo.getVideoUrl(origin_video_node));
    var nicosound_button = nicosound.createNicosoundButton();
    origin_video_node.appendChild(nicosound_button);
  }
};

NicoVideo.getVideoUrl = function(video_node){
  var a_tag_nodes = video_node.getElementsByTagName('a');
  var video_url;
  for (var i = 0; i < a_tag_nodes.length; i++){
    if(NicoVideo.smile_video_url_pattern.test(a_tag_nodes[i].href)){
      video_url = a_tag_nodes[i].href;
    } else if(NicoVideo.nmm_video_url_pattern.test(a_tag_nodes[i].href)) {
      video_url = a_tag_nodes[i].href;
    } else if(NicoVideo.ch_video_url_pattern.test(a_tag_nodes[i].href)) {
      video_url = a_tag_nodes[i].href;
    }
  }
  return video_url;
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
