$(function(){
	
	// ブログURL。
	var xml_blog = 'http://hanazononiseko-hpg-en.blogspot.com/atom.xml';
	var ttl1 = 60;
	
	// ブログの1件目を表示。
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
		html = html.replace(/^(<br \/>| ){1,}/, '');
		html = html.replace(/(<br \/>| ){1,}$/, '');
		//html = '<p>' + html.truncateOnWord(600) + '</p>';
		html = '<p>' + html + '</p>';
		
		var published = Date.create(entry.find('published').text(), 'en');
		published = published.format('({yyyy}/{MM}/{dd} {hh}:{mm})', 'en');
		
		$('#hpg_blog_img').attr('src', img);
		$('#hpg_blog_url,#hpg_blog_title').attr('href', entry.find('link[rel="alternate"]').attr('href'));
		$('#hpg_blog_title').html(entry.find('title').text());
		$('#hpg_blog_published').html(published);
		$('#hpg_blog_text').html(html);
		
	}, ttl1);
	
});
