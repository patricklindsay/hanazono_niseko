$(function(){
	
	// リフト情報xmlのURL等。
	var xml_hanazono = 'http://www.niseko.ne.jp/en/weather/hanazono/lift.xml';
	var xml_hirafu = 'http://www.niseko.ne.jp/en/weather/hirafu/lift.xml';
	var ttl = 60;
	
	// リフト名とtrインデックス対応。
	var lift_order = {
		'Hanazono1':0,
		'Hanazono2 ':1, // 元データの末尾にスペースあり
		'Hanazono3':2,
		'Swinging Monkey':3,
		'King #4':4,
		'Ace Quad #2(center four)':5,
		'King Hooded Triple Lift #3':6
	};
	
	// 運行状況名とclass対応。
	var status_class = {
		'':'close',
		'��Operathing':'open',
		'Operating':'open',
		'suspended':'close',
		'Closed':'close',
		'Operation temporarily suspended':'close',
		'Standby':'hold',
		'On hold':'hold',
		'Operation slowed':'slow'
	};
	
	// ニセコHANAZONOのリフト情報。
	jsonp(xml_hanazono, function(data, status){
		
		var data = Base64.decode(data.data);
		var xml = parseFromString(data);
		
		$(xml).find('lift').each(function(){
			var lift = $(this);
			var i = lift_order[lift.find('name').text()];
			var c = status_class[lift.find('status').text()];
			var s = $('td.lift-status').eq(i).children('i');
			s.addClass(c).addClass('icon-circle').removeClass('icon-na');
			$('td.lift-name').eq(i).children('small').text(lift.find('reserve').text());
		});
		
	}, ttl);
	
	// ニセコグラン・ヒラフのリフト情報。
	jsonp(xml_hirafu, function(data, status){
		
		var data = Base64.decode(data.data);
		var xml = parseFromString(data);
		
		$(xml).find('lift').each(function(){
			var lift = $(this);
			var i = lift_order[lift.find('name').text()];
			var c = status_class[lift.find('status').text()];
			var s = $('td.lift-status').eq(i).children('i');
			s.addClass(c).addClass('icon-circle').removeClass('icon-na');
			$('td.lift-name').eq(i).children('small').text(lift.find('reserve').text());
		});
		
	}, ttl);
});
