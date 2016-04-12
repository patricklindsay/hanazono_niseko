// Twitterウィジェット。
!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?"http":"https";if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
//!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");

$(function(){
	
	// 相対パスを設定する。
	setRelPath();
	
	// ニセコHANAZONOのYouTube情報。
	var xml_youtube = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=UUrNyeY4kGLL0-Hs8wC98peg&maxResults=1&key=AIzaSyC_NKXDAJaP_Kev97VqfwpycsXbLjZSkEQ';
	var ttl1 = 60;
	
	// ニセコHANAZONOのYouTubeの1件目を表示。
	jsonp(xml_youtube, function(data, status){
		
		var data = Base64.decode(data.data);
		data = jQuery.parseJSON(data);
		//console.info(data);
		
		var item = data.items[0];
		//console.info(item);
		
		var id = item.snippet.resourceId.videoId;
		var title = item.snippet.title;
		var published = Date.create(item.snippet.publishedAt, 'ja');
		
		published = published.format('{yyyy}/{MM}/{dd}', 'ja');
		
		$('#youtube_url').attr('href', 'https://www.youtube.com/watch?v=' + id);
		$('#youtube_url').attr('title', title + '(' + published + ')');
		$('#youtube_img').attr('src', item.snippet.thumbnails.standard.url);
		
	}, ttl1);
	
	// ニセコHANAZONOのブログURL。
	var xml_blog = 'http://hanazononiseko-news-ja.blogspot.com/atom.xml';
	var ttl2 = 60;
	
	// ニセコHANAZONOブログの1件目を表示。
	jsonp(xml_blog, function(data, status){
		
		var data = Base64.decode(data.data);
		var xml = parseFromString(data);
		//console.info(xml);
		
		var entry = $(xml).find('entry:eq(0)');
		var content = '<p>' + entry.find('content').text() + '</p>';
		//console.info(content);
		var img = $(content).find('img:eq(0)').attr('src');
		var html = content.stripTags('div','p','img','a','span','xml','w','m','style');
		//console.info(html);
		html = html.replace(/^<!--\[if.+if]-->/, '');
		//console.info(html);
		html = html.replace(/ߘ/, '');
		html = html.replace(/^(<br \/>|<br>| ){1,}/, '');
		html = html.replace(/(<br \/>|<br>| ){1,}$/, '');
		html = html.replace(/(<br \/>|<br>){2,}/g, '<br /><br />');
		html = '<p>' + html.truncateOnWord(600) + '</p>';
		//html = '<p>' + html + '</p>';
		
		var published = Date.create(entry.find('published').text(), 'en');
		published = published.format('({yyyy}/{MM}/{dd} {hh}:{mm})', 'en');
		
		$('#blog_img').attr('src', img);
		$('#blog_url,#blog_title').attr('href', entry.find('link[rel="alternate"]').attr('href'));
		$('#blog_title').html(entry.find('title').text());
		$('#blog_published').html(published);
		$('#blog_text').html(html);
		
	}, ttl2);
});
