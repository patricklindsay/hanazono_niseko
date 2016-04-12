$(function(){
	
	// リフト情報xmlのURL等。
	var xml_hanazono = 'http://www.niseko.ne.jp/weather/hanazono/weather.xml';
	var ttl = 60;
	
	// 天気名とclass対応。
	var wcode_class = {
		'快晴'	:'icon-sun',
		'晴れ'	:'icon-sun',
		'曇り'	:'icon-cloud',
		'雪'	:'icon-snow-heavy',
		'小雪'	:'icon-snow',
		'吹雪'	:'icon-snow-heavy',
		'霧'	:'icon-fog-sun',
		'小雨'	:'icon-drizzle',
		'雨'	:'icon-rain',
		'みぞれ'	:'icon-hail',
		'濃霧'	:'icon-fog'
	};
	
	// 値がブランクの場合ハイフンを返す。
	var def = function(val){
		if (val.isBlank()) {
			return '&mdash;';
		} else {
			return val;
		}
	};
	
	// ニセコHANAZONOの天気情報。
	jsonp(xml_hanazono, function(data, status){
		
		var data = Base64.decode(data.data);
		var xml = parseFromString(data);
		
		// foot（山麓）とtop（山頂）の元データが逆。
		var top = $(xml).find('foot');
		var foot = $(xml).find('top');
		
		$('#foot_qualitysnow').text(foot.find('qualitysnow').text());
		$('#foot_snow').text(foot.find('snow').text());
		var weather = foot.find('weather').text();
		$('#foot_weather_icon').addClass(wcode_class[weather]).removeClass('icon-na');
		$('#foot_weather_icon').children('span').text(weather);
		$('#foot_weather').text(weather);
		$('#foot_qualitysnow').text(foot.find('qualitysnow').text());
		$('#foot_temperature').text(foot.find('temperature').text());
		$('#foot_wind').text(foot.find('wind').text());
		
		$('#top_qualitysnow').text(top.find('qualitysnow').text());
		$('#top_snow').text(top.find('snow').text());
		var weather = top.find('weather').text();
		$('#top_weather_icon').addClass(wcode_class[weather]).removeClass('icon-na');
		$('#top_weather_icon').children('span').text(weather);
		$('#top_weather').text(weather);
		$('#top_qualitysnow').text(top.find('qualitysnow').text());
		$('#top_temperature').text(top.find('temperature').text());
		$('#top_wind').text(top.find('wind').text());
		
	}, ttl);
	
});
