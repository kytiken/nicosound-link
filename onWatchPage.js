var url = createSoundUrl( location.pathname );
var doc = document;
var widthLeft = doc.getElementById('siteHeaderLeftMenu');
if (widthLeft) {
	var link = doc.createElement('li');
	link.innerHTML = '<a href="' + url + '" style="border-left:#383838 solid 1px; border-right:none;"><span style="border-left:#666 solid 1px; border-right:none;">nicosound</span></a>';

	widthLeft.parentNode.appendChild(link);
}

function createSoundUrl( sourcePathname ){
	var url = 'http://nicosound.anyap.info/';
	
	var videoId;
	var m = sourcePathname.match( /^\/watch\/([a-z]{2}[0-9]+)/i );
	if(m)
	{
		videoId = m[1];
	}
	else
	{	// thread check
		if('Video' in window)
		{
			videoId = Video.id;
		}
		else
		{
			var head = doc.getElementsByTagName('head')[0];
			if(head)
			{
				m = head.innerHTML.match( /http:\/\/m\.nicovideo\.jp\/watch\/([a-z]{2}[0-9]{3,})/i );
				if(m && m.length > 1)
				{
					videoId = m[1];
				}
			}
		}
	}
	if(videoId)
	{
		return url + 'sound/' + videoId;
	}
	
/*
	m = sourcePathname.match( /\/tag\/(\w+)/i );
	if( m ){
		return url + 'tag/' + m[1];
	}
//*/
	
	return url;
}
