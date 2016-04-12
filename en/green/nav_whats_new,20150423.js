// Twitterウィジェット。
!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?"http":"https";if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
//!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");

$(function(){
	
	// 相対パスを設定する。
	setRelPath();
	
	// ニセコHANAZONOのYouTube情報。
	var xml_youtube = 'http://gdata.youtube.com/feeds/api/users/hanazonopowdertv/uploads?max-results=1';
	var ttl1 = 60;
	
	// ニセコHANAZONOのYouTubeの1件目を表示。
	jsonp(xml_youtube, function(data, status){
		
		var data = Base64.decode(data.data);
		var xml = parseFromString(data);
		
		var entry = $(xml).find('entry:eq(0)');
		
		var id = entry.find('id').text().replace('http://gdata.youtube.com/feeds/api/videos/', '');
		var title = entry.find('title').text();
		var published = Date.create(entry.find('published').text(), 'en');
		
		published = published.format('{yyyy}/{MM}/{dd}', 'en');
		
		$('#youtube_url').attr('href', 'http://www.youtube.com/watch?v=' + id);
		$('#youtube_url').attr('title', title + '(' + published + ')');
		$('#youtube_img').attr('src', 'http://i.ytimg.com/vi/' + id + '/maxresdefault.jpg');
		
	}, ttl1);
	
	// ニセコHANAZONOのブログURL。
	var xml_blog = 'http://hanazononiseko-news-en.blogspot.com/atom.xml';
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
