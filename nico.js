isClicked = false;
window.onclick = function(){
  if(!isClicked){
    generateLink();
  }
  isClicked = true;
};

var doc = document;
function generateLink() {
    "use strict";
    var originLinkTag = doc.getElementsByClassName("watch");
    for (var i = 0; i < originLinkTag.length; i++){
    var originTagNode = originLinkTag[i];
    var button = new Button(originTagNode);
    var nsButton = button.createNsButton();
    originTagNode.parentNode.parentNode.appendChild(nsButton);
  }
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
