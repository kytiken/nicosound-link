isClicked = false;
window.onclick = function(){
  if(!isClicked){
    generateLink();
  }
  isClicked = true;
};

function generateLink(){
  var originLinkTag = document.getElementsByClassName("mylistVideo");
  for(var i = 0; i < originLinkTag.length; i++){
    var originTagNode = originLinkTag[i];
    var button = new Button(originTagNode);
    var nsButton = button.createNsButton();
    originTagNode.parentNode.appendChild(nsButton);
  }
}

var Button = function(originTagNode){
  this.originTagNode = originTagNode;
};

Button.prototype.createNsButton = function(){
  var nicosound = createSoundUrl(this.originTagNode.getElementsByTagName("a")[0].href);
  var nsButton = document.createElement("button");
  var button = nsButton.appendChild(document.createTextNode("nicosound"));
  nsButton.onclick = function(){
    window.open(nicosound);
  };
  return nsButton;
};

Button.prototype.createPushButton = function(){
  var pushButton = document.createElement("button");
  var text = document.createTextNode("push");
  pushButton.appendChild(text);
  pushButton.onclick = function(){
    var sm = localStorage.getItem("sm");
    sm = toArray(sm);
    sm.push(this.originTagNode);
    localStorage.setItem("sm",sm);
  };
  return pushButton;
};

function createSoundUrl( sourcePathname ){
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
