$(function(){
	
	// リフト情報xmlのURL等。
	var xml_hanazono = 'http://www.niseko.ne.jp/weather/hanazono/lift.xml';
	var xml_hirafu = 'http://www.niseko.ne.jp/weather/hirafu/lift.xml';
	var ttl = 60;
	
	// リフト名とtrインデックス対応。
	var lift_order = {
		'花園第1クワッド フード付':0,
		'花園第2クワッド':1,
		'花園第3クワッド フード付':2,
		'スインギングモンキー':3,
		'キング第4':4,
		'エース第2クワッド(センターフォー)':5,
		'キング第3トリプル フード付':6
	};
	
	// 運行状況名とclass対応。
	var status_class = {
		'':'close',
		'○運行':'open',
		'○運行中':'open',
		'×運休':'close',
		'×本日営業終了':'close',
		'×待機調査中':'close',
		'△準備中':'hold',
		'△運行待ち':'hold',
		'○減速運転':'slow',
		'○減速運転中':'slow'
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
