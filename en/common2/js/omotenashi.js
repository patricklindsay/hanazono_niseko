/*!
 * OMOTENASHI CONTENTS®
 * ©2014 cab Co.,Ltd. All Rights Reserved.
 */
;(function($){

	// Deferred関数を展開する。
	//$.deferred.define();

	// http://openweathermap.org/ のAPIと都道府県コード対ID。
	var apiurl = 'http://api.openweathermap.org/data/2.5/weather?id=';
	var citycode = {'01':'2128295','02':'2130658','03':'2111834','04':'2111149','05':'2113719','06':'2110556','07':'2112923','08':'2111901','09':'1849053','10':'1857843','11':'6940394','12':'2113015','13':'1850147','14':'1848354','15':'1855431','16':'1849876','17':'1860243','18':'1863985','19':'1859100','20':'1856215','21':'1863641','22':'1851717','23':'1856057','24':'1849796','25':'1853574','26':'1857910','27':'1853909','28':'1859171','29':'1855612','30':'1926004','31':'1849892','32':'1857550','33':'1854383','34':'1862415','35':'1848689','36':'1850158','37':'1851100','38':'1926099','39':'1859146','40':'1863967','41':'1853303','42':'1856177','43':'1858421','44':'1854487','45':'1856717','46':'1860827','47':'1856035'};
	var prefname = {'01':'北海道','02':'青森県','03':'岩手県','04':'宮城県','05':'秋田県','06':'山形県','07':'福島県','08':'茨城県','09':'栃木県','10':'群馬県','11':'埼玉県','12':'千葉県','13':'東京都','14':'神奈川県','15':'新潟県','16':'富山県','17':'石川県','18':'福井県','19':'山梨県','20':'長野県','21':'岐阜県','22':'静岡県','23':'愛知県','24':'三重県','25':'滋賀県','26':'京都府','27':'大阪府','28':'兵庫県','29':'奈良県','30':'和歌山県','31':'鳥取県','32':'島根県','33':'岡山県','34':'広島県','35':'山口県','36':'徳島県','37':'香川県','38':'愛媛県','39':'高知県','40':'福岡県','41':'佐賀県','42':'長崎県','43':'熊本県','44':'大分県','45':'宮崎県','46':'鹿児島県','47':'沖縄県'};
	var prefcf   = {'01':71,'02':81,'03':81,'04':71,'05':81,'06':81,'07':81,'08':61,'09':81,'10':61,'11':81,'12':71,'13':61,'14':61,'15':81,'16':81,'17':81,'18':81,'19':81,'20':61,'21':71,'22':71,'23':61,'24':81,'25':81,'26':61,'27':61,'28':71,'29':81,'30':71,'31':71,'32':81,'33':81,'34':61,'35':81,'36':81,'37':81,'38':71,'39':81,'40':71,'41':81,'42':81,'43':81,'44':81,'45':61,'46':81,'47':81};
	var prefdef  = '42'; // デフォルト県。
	var placecode = '1852899'; // 佐世保

	// 天気アイコンと和名。
	var weather = {'01':'快晴','02':'晴れ','03':'曇り','04':'曇り','09':'小雨','10':'雨','11':'雷雨','13':'雪','50':'霧'};

	$(function(){
		
		// テスト。
		var pref = '42';
		var cf = 81;
		
		if (typeof SURFPOINT != 'undefined') {
			//console.info(SURFPOINT);
			
			// どこどこJPから都道府県コードとCF値を取得する。
			var pref = SURFPOINT.PrefCode;
			var cf = SURFPOINT.PrefCF;
		}
		
		// Googleアナリティクスのイベントに都道府県名とCF値を記録する。
		//_gaq.push(['_trackEvent', 'access_area', SURFPOINT.PrefAName.camelize(), cf, true]);
		
		// CF値が閾値より低い場合は、デフォルトにする。
		if (cf < prefcf[pref]) pref = prefdef;
		
		// 鹿児島県からのアクセスは長崎県（デフォルト）にする。
		if (pref == '46') pref = prefdef;
		
		// デフォルト県の場合はアクセス地域の天気情報を隠す。
		if (pref == prefdef) {
			$('#a_notice').hide();
			$('#w_from_box').hide();
		}
		
		// デフォルト県の天気情報を取得して表示する。
		//jsonp(apiurl + citycode[prefdef], function(data, status){
		jsonp(apiurl + placecode, function(data, status){
			
			var data = Base64.decode(data.data);
			//console.info(data);
			//data = (new Function('return ' + data))();
			data = JSON.parse(data);
			//console.info(data);
			var icon = data.weather[0].icon;
			var temp = Math.round(data.main.temp - 273.15);
			
			$('#w_icon').attr('src', 'img/weather/' + icon + '.png');
			$('#w_icon').attr('alt', weather[icon.substring(0,2)]);
			$('#w_temp').html('（' + temp + '&#8451;' + '）');
			
		}, 600);
		
		// アクセス地域の天気情報を取得して表示する。
		jsonp(apiurl + citycode[pref], function(data, status){
			
			var data = Base64.decode(data.data);
			//console.info(data);
			//data = (new Function('return ' + data))();
			data = JSON.parse(data);
			//console.info(data);
			var icon = data.weather[0].icon;
			var temp = Math.round(data.main.temp - 273.15);
			
			$('#w_from').html(prefname[pref]);
			$('#w_icon_from').attr('src', 'img/weather/' + icon + '.png');
			$('#w_icon_from').attr('alt', weather[icon.substring(0,2)]);
			$('#w_temp_from').html('（' + temp + '&#8451;' + '）');
			$('#a_from').attr('src', 'img/access/' + pref + '.png');
			
			if (pref == prefdef) {
				$('#a_from').attr('alt', '長崎県の交通アクセス');
				$('#w_title').html('皆さまのご来館をお待ちしております');
			} else {
				$('#a_from').attr('alt', prefname[pref] + 'からハウステンボスの交通アクセス');
				$('#w_title').html(prefname[pref] + 'からのご来館をお待ちしております');
			}
			
		}, 600);
		
		// 天気情報CMSのURL。
		var url = 'https://spreadsheets.google.com/feeds/cells/1hlu1yymgLS9lgwrH4xFB6kF5bZzV9X7eAaZkJCtn1CI/od6/public/basic?alt=rss';
		
		// 天気情報メッセージを読み込む。
		jsonp(url, function(data, status){
			
			var data = Base64.decode(data.data);
			var xml = parseFromString(data);
			//console.info(xml);
			
			// 指定セルの値を取得する。
			var cells = function(n){
				return '' || $(xml).find('title:contains(' + n + ') + description').text();
			};
			
			$('#w_text').html(cells('A4'));
			//$('#w_text').html('ハウステンボスでは、「光の王国」が開催され、華やかなクリスマスシーズンをお楽しみいただける季節となりました。ハウステンボス以外へのご旅行、ご出張の皆様も、当ホテルから眺める光の王国に、心をなごませていただけることでしょう。どうぞお楽しみにご来館くださいませ。');
			
		}, 60);
		
	});
})(jQuery);
