 /**
 * メイン処理。
 */
$(function(){
	
	// 文字サイズメニューを追加する。
	//createFontSizeMenu();
	//setFontSize($.cookie('font-size'));

	// ヘッダーを固定する。
	//fixedHeader();

	// 言語の選択メニューを追加する。
	//setLangMenu();

	// カルーセルを設定する。
	//setCarousel();

	// スクロールペインを設定する。
	//setScrollPane();

	// カルーセル付きギャラリーを設定する。
	//setGallery();

	// スムーススクロールを設定する。
	setSmoothScroll();

	// 画像ホバーのハイライトを設定する。
	setHighLight();

	// fancyboxプラグインでポップアップ表示を設定する。
	setFancybox();

	// ロールオーバーの画像入替を設定する。
	setRollover();

	// スマホ時のメニュー開閉。
	/*
	if (isSumaho() && !$('body').hasClass('home')) {
		$('#sumaho_nav>ul').slideUp();
		$('#footer_menu').slideUp();
		$('#sumaho_nav>div>a').click(function(){
			$('#sumaho_nav>div>a img').toggle();
			$('#sumaho_nav>ul').slideToggle();
			$('#footer_menu').slideToggle();
			return false;
		});
	}
	*/

	// スマホ時のテーブル調整。
	if (isSumaho()) {
		$('table.oneline').each(function(){
			var me = $(this);
			me.find('tr').each(function(){
				var tr = $(this);
				tr.before($('<tr>').append(tr.find('th')));
			});
		});
		$('table.onepair').each(function(){
			var me = $(this);
			var tr = me.find('tr:first');
			tr.find('th').each(function(){
				var th = $(this);
				var td = th.next('td:first');
				tr.before($('<tr>').append(th).append(td));
			});
		});
		$('table.matrix').each(function(){
			var me = $(this);
			var tr1 = me.find('tr:even');
			var tr2 = me.find('tr:odd td');
			var tbody = $('<tbody>');
			tr1.find('th').each(function(i){
				var th = $(this);
				var td = tr2.eq(i);
				tbody.append($('<tr>').append(th).append(td));
			});
			me.html(tbody);
		});
	}

	// スマホ時グローバルナビの開閉。
	$('#nav a.lv1').each(function(){
		var a = $(this);
		a.click(function(){
			if (a.parent('li').attr('id') == 'nav_summer') return true;
			if (a.parent('li').attr('id') == 'nav_japanese') return true;
			
			if (a.attr('href').has('nav_packages_deals')) {
				location.href = 'http://vacationniseko.com/en/';
				return false;
			}
			
			var div = a.next('div.nav_box');
			$('#nav a.lv1').not(a).removeClass('current');
			a.toggleClass('current');
			$('#nav div.nav_box:visible').not(div).slideToggle('fast');
			div.slideToggle('fast');
			return false;
		});
	});

	// 左メニュー第一階層の開閉。
	$('#menu a.lv1').each(function(){
		var a = $(this);
		//var b = a.find('em');
		a.click(function(){
			var ul = a.next('ul.b1');
			if (ul.size() > 0) {
				$('#menu a.lv1').not(a).removeClass('h');
				$('#menu ul.b1:visible').not(ul).slideToggle('fast').prev('a').children('span').toggleClass('m');
				ul.slideToggle('fast');
				a.toggleClass('h').children('span').toggleClass('m');
				return false;
			}
		});
	});

	// 左メニュー第二階層の開閉。
	$('#menu a.lv2').each(function(){
		var a = $(this);
		var b = a.find('em');
		b.click(function(){
			var ul = a.next('ul.b2');
			if (ul.size() > 0) {
				$('#menu ul.b2:visible').not(ul).slideToggle('fast').prev('a').children('span').toggleClass('m');
				ul.slideToggle('fast');
				a.children('span').toggleClass('m');
				return false;
			}
		});
	});

	// テキストボックスが空欄の時に初期値を表示する。
	$('#srchInput,#mce-EMAIL').each(function(){
		var me = $(this);
		var val = me.val();
		me.focus(function(){
			if (me.val() == val) me.val('');
			me.css('color','#111111');
		});
		me.blur(function(){
			if (me.val() == '') me.val(val);
			me.css('color','#CBCBCB');
		});
	});

	// スマホ時右上のメニューボタン。
	$('#nav_btn a').click(function(){
		$('#nav').slideToggle('fast');
		$('#menu').slideToggle('fast');
		return false;
	});
	if (isSumaho()) $('#nav_btn a').click();

	// スマホ時右下の閉じるボタン。
	$('#nav_close a').click(function(){
		//if ($('#nav').is(':visible') || $('#menu').is(':visible')) {
			$('#menu ul.b2').slideUp('fast');
			$('#menu ul.b1').slideUp('fast');
			$('#nav div.nav_box').slideUp('fast');
			$('#menu a.lv2 span').removeClass('m');
			$('#menu a.lv1 span').removeClass('m');
			$('#menu a.lv1').removeClass('h');
			$('#nav a.lv1').removeClass('current');
			$('#nav').slideUp('fast');
			$('#menu').slideUp('fast');
		//} else {
			$($.browser.webkit ? 'body' : 'html').animate({scrollTop:0}, 400, 'swing');
		//}
		return false;
	});

	// スマホ時にメニュー非表示からPC表示時にメニューを表示。
	$(window).resize(function(){
		if (!isSumaho()) {
			$('#nav').show();
			$('#menu').show();
		}
	});

	// グローバルナビ毎のコンテンツを読み込む。
	$('#nav a.lv1').click(function(){
		var a = $(this);
		if (a.parent('li').attr('id') == 'nav_summer') return true;
		if (a.parent('li').attr('id') == 'nav_japanese') return true;
		if (a.hasClass('loaded')) return false;
		var div = a.next('div.nav_box');
		var url = a.attr('href');
		div.load(url + '?' + Date.now() + ' div.nav_box>*', function(){
			forTemplate();
			$('body').append('<script type="text/javascript" src="' + url.replace('html','js') + '"></script>');
		});
		a.addClass('loaded');
		return false;
	});

	// グローバルナビの天気情報を設定する。
	getNavWeater();

	// スライダーを設定する。
	setFlexslider();

	// 戻るボタンを設定する。
	setToTop();

	// 予約モジュールを設定する。
	setBookingForm();

	// 読み込みオブジェクトのサイズを調整する。
	$(window).resize(function(){
		$('object.fit,embed.fit,iframe.fit').each(function(){
			var me = $(this);
			me.css('width','100%');
			me.height(me.parent().width() * 0.73);
		});
	}).resize();

	// 表の続きを表示する。
	$('tr.show_more').each(function(){
		var me = $(this);
		me.nextAll('tr').hide();
		me.click(function(){
			me.hide().nextAll('tr').show();
		});
	});

	// IE等でテーブル内の画像を調整する。
	var ua = navigator.userAgent;
	if (!ua.match(/WebKit/i)) {
		$('table img.fit').each(function(){
			var me = $(this);
			me.removeClass('fit').attr('width', me.width()/2);
		});
	}
	
		// ページと同階層の左メニューを開く。
	if (!$('body').hasClass('home') && !$('body').hasClass('tab')) {
		if ($('body').hasClass('green')) {
			$('#menu li.open>a.lv1').click();
		} else {
			var cls = $('#contents_inner>.box:first').attr('class');
			cls = cls.match(/theme\d+/).pop();
			$('#menu li.' + cls + '>a.lv1').click();
		}
	}

	// 左メニューからヘッダーメニューを開く。（暫定対応）
	$('#menu li.theme1 a[href*="#snow-report-and-weather"]').click(function(){
		$('#nav_weather a').click();
		return false;
	});

	// 左メニューからヘッダーメニューを開く。（暫定対応）
	$('#menu li.theme1 a[href*="#lift-status"]').click(function(){
		$('#nav_lift_status a').click();
		return false;
	});

	// 日本語リンクを対応するURLに変更。
	$('#nav_japanese a').attr('href', location.href.replace('/en', '/ja'));

	// Facebookソーシャルプラグイン（Page Plugin）のJavaScriptを読み込む。
	if ($('div.fb-page').size() > 0) {
		$('body').prepend('<div id="fb-root"></div>');
		$.getScript(getRelPath() + 'common2/js/facebook-jssdk.js');
	}

	// 読み込み前の目隠しを消す。
	setTimeout(function(){
		$(window).resize();
		$('#preloader').fadeOut(500);
	}, 500);

});

/*================================================================================*/

// 予約モジュールを設定する。
function setBookingForm(){
	
	var bf = $('#booking_form');
	var url = bf.children('a').attr('href');
	
	bf.load(url + '?' + Date.now(), function(){
		
		// カレンダーを設定する。
		var today = Date.create(new Date(), 'en');
		$('#booking_form #checkin').datepicker({
			dateFormat    : 'yy/mm/dd',
			minDate     : today,							// 今日から選択可。
			maxDate     : today.clone().addMonths(11),		// 今日から1年後まで選択可。
			changeYear  : true,								// 年選択メニューを表示。
			changeMonth : true								// 月選択メニューを表示。
		}).val(today.format('{yyyy}/{MM}/{dd}', 'en'));

		// 予約モジュールの検索ボタン。
		$('#booking_form #serchbtn').click(function(){
			var ci = Date.create($('#checkin').val(), 'en');
			ci = ci.format('{yy}{MM}{dd}', 'en');
			$('#ci').val(ci);
			return true;
		});
		
		// トップページ用の表示。
		/*
		if ($('body').hasClass('home')){
			$('select#n option').append(' Nights');
			$('select#g option').append(' Guests');
		}
		*/
	});
}

// 戻るボタンを設定する。
function setToTop(){
	
	var win = $(window);
	var top = $('#to_top');
	var cnt = $('#contents_inner');
	var btn = 75;
	var ini = win.height() - (cnt.offset().top + btn);
	
	if (cnt.height() < $('#sidebar').height()) {
		top.fadeOut();
		return;
	}
	
	top.css('top', ini + 'px');
	
	win.scroll(function(){
		var st = win.scrollTop();
		var pos = st + ini;
		var lim = cnt.innerHeight() - btn;
		
		if (pos > lim) pos = lim;
		top.stop().animate({ 'top' : pos }, 1000);
	}).scroll();
}

// グローバルナビの天気情報を設定する。
function getNavWeater(){
	// リフト情報xmlのURL等。
	var xml_hanazono = 'http://www.niseko.ne.jp/en/weather/hanazono/weather.xml';
	var ttl = 60;
	
	// 天気名とclass対応。
	var wcode_class = {
		'Sunny'		:'icon-sun',
		'Clear'		:'icon-sun',
		'Cloudy'	:'icon-cloud',
		'Snow'		:'icon-snow-heavy',
		'Light Snow':'icon-snow',
		'Snow Storm':'icon-snow-heavy',
		'Fog'		:'icon-fog-sun',
		'Light Rain':'icon-drizzle',
		'Rain'		:'icon-rain',
		'Sleet'		:'icon-hail',
		'Fog'		:'icon-fog'
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
		var info = $(xml).find('top'); // footは山頂。
		
		var weather = info.find('weather').text();
		$('#nav_weather_icon').addClass(wcode_class[weather]).removeClass('icon-na');
		$('#nav_weather_icon').children('span').text(weather);
		$('#nav_temperature').html(info.find('temperature').text() + '&#8451;');
		
	}, ttl);
}

// スライダーを設定する。
function setFlexslider(){
	if (typeof $.fn.flexslider != 'function') return;
	$('.flexslider').flexslider({ animation:'slide' });
}

// カルーセルを設定する。
function setCarousel(){
	if (typeof $.fn.bxSlider != 'function') return;
	$('.carousel ul').bxSlider({ auto: true, minSlides: 4, maxSlides: 4, moveSlides: 1, slideWidth: 230, slideMargin: 20});
}

// スクロールペインを設定する。
function setScrollPane(){
	if (typeof $.fn.jScrollPane != 'function') return;
	$('.scrollpane').jScrollPane().removeClass('scrollpane');
}

// カルーセル付きギャラリーを設定する。
function setGallery(){
	if (typeof $.fn.bxSlider != 'function') return;
	$('div.gallery ul').bxSlider({
		auto: false, minSlides: 5, maxSlides: 5, moveSlides: 1, slideWidth: 400, slideMargin: 5,
		onSlideBefore: function ($slideElement, oldIndex, newIndex) {
			var a = $slideElement.children();
			var src = a.attr('href');
			var img = a.parents('div.gallery').find('div.mainimage img');
			$('div.mainimage').css('background','url(' + src + ') no-repeat left top');
			$('div.mainimage').css('background-size','100%');
			img.fadeTo('slow', 0.01, function(){
				img.attr('src', src);
				img.fadeTo('fast', 1.00);
			});
		},
		onSliderLoad: function(){
			$('div.gallery .bx-viewport a').each(function(){
				var a = $(this);
				a.click(function(){
					var src = a.attr('href');
					var img = a.parents('div.gallery').find('div.mainimage img');
					$('div.mainimage').css('background','url(' + src + ') no-repeat left top');
					$('div.mainimage').css('background-size','100%');
					img.fadeTo('fast', 0.01, function(){
						img.attr('src', src);
						img.fadeTo('fast', 1.00);
					});
					return false;
				});
			})
		}
	});
}

// ヘッダーを固定する。
function fixedHeader(){
	
	var timer = false;
	$(window).resize(function(){
		if (timer !== false) clearTimeout(timer);
		timer = setTimeout(function(){
			
			// IE6、スマホ、タブレットは固定しない。
			var r = (document.all ? document.body.clientWidth : window.innerWidth);
			if (isIE6() || isSumaho() || isTablet() || r <= 800) {
				
				$('body').removeClass('fixed');
				$('#header,#nav,#slides,#image_path').removeClass('fixed');
				$(window).unbind('scroll');
				
			} else {
				$('body,#header,#slides,#image_path').addClass('fixed');
				
				// ページ内リンクのスクロール位置を調整する。
				if (location.hash) {
					setTimeout(function(){
						window.scrollBy(0, -145);
					},200);
				}
				
				$('#page_top,#page_down').css('right', parseInt(($(window).width()-$('#footer_inner').width())/2-100) + 'px');
			}
			
			// IEなら#imageの画像をリサイズする
			var w = 1200,
				h = 240;
			if(_ua().indexOf('ie') >= 0 && $('#image').width(document.documentElement.clientWidth) < w){
				$('#image').width(document.documentElement.clientWidth);
				$('#image').height(parseInt(h * (document.documentElement.clientWidth / w)));
				$('#image_page_title').width(document.documentElement.clientWidth);
				$('#image_page_title').height(parseInt(h * (document.documentElement.clientWidth / w)));
			}
			
		},200);
	}).resize();
}

// スマートフォン端末かどうか確認する。
function isSumaho(){
	var ua  = navigator.userAgent;
	var ip  = ((ua.indexOf('iPhone') > 0 && ua.indexOf('iPad') == -1) || ua.indexOf('iPod') > 0);
	var ad  = (ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0);
	var etc = (ua.indexOf('Windows Phone') > 0 || ua.indexOf('BlackBerry') > 0);
	var w = (document.all ? document.body.clientWidth : window.innerWidth);
	return ip || ad || etc || w <= 598;
}

// タブレット端末かどうか確認する。
function isTablet(){
	var ua = navigator.userAgent;
	var ip = (ua.indexOf('iPad') > 0);
	var ad = (ua.indexOf('Android') > 0 && ua.indexOf('Mobile') == -1);
	var r = (document.all ? document.body.clientWidth : window.innerWidth);
	return ip || ad || r <= 800;
}

// IE6かどうかを確認する。
function isIE6(){
	return !!$.browser.msie && $.browser.version < 7 && !window.XMLHttpRequest;
}

/**
 * JSONPラッパー。
 */
function jsonp(url, callback, ttl, encoding) {
	// プロキシのURL。
	//var proxy = 'http://www.omotenashi-contents.jp/' + 'proxy/index.php?';
	var proxy = 'http://hanazononiseko.com/' + 'proxy/index.php?';
	ttl = ttl || 300;
	encoding = encoding || 'UTF-8';
	$.getJSON(proxy + 'callback=?', { 'url' : url, 'encoding' : encoding, 'ttl' : ttl }, callback);
}

/**
 * 相対パスを返す。
 */
function getRelPath(){
	$('link[rel="shortcut icon"]').attr('href').match(/^([\./]+)/);
	return RegExp.$1;
}

/**
 * 相対パスを設定する。
 */
function setRelPath(){
	var relpath = getRelPath();
	$('a.setrel').each(function(){
		var href = $(this).attr('href');
		$(this).attr('href', relpath + href).removeClass('setrel');
	});
	$('img.setrel').each(function(){
		var src = $(this).attr('src');
		$(this).attr('src', relpath + src).removeClass('setrel');;
	});
}

// Firefoxだけsrcとhrefにテンプレート変数を設定できない件の対応。
function title2attr(){
	$('[title^="@@"]').each(function(){
		var me = $(this);
		var url = me.attr('title').replace(/^@@/,'');
		switch (me.get(0).tagName.toLowerCase()) {
			case 'a':
				me.get(0).href = url;
				break;
			case 'img':
				me.get(0).src = url;
				break;
		}
		me.removeAttr('title');
	});
}

// 年月日の形式に変換する。
function nengappi(val, day){
	if (day) {
		return Date.create(val).format('{yyyy}年{M}月{d}日({dow})', 'ja').replace('曜日','');
	} else {
		return Date.create(val).format('{yyyy}年{M}月{d}日', 'ja');
	}
}

/**
 * テンプレートを読み込む。
 */
function loadTemplate(id, cb){
	
	// テンプレートのパスを設定する。
	var tpldir = getRelPath() + 'common2/js/' + id + '/';
	
	// テンプレートを読み込む。
	$.ajax({
		url : tpldir + id + '.html', dataType : 'html',
		error : function(XMLHttpRequest, textStatus, errorThrown){
			//console.info(XMLHttpRequest);
			//console.info(textStatus);
			//console.info(errorThrown);
			var errmsg = [
				XMLHttpRequest.status,
				XMLHttpRequest.statusText,
				errorThrown.result,
				errorThrown.name,
				errorThrown.message
			].join("\n");
			//alert(errmsg);
		},
		success : cb
	});
}

// テンプレートに再実行。
function forTemplate(){
	var isIE6 = !!$.browser.msie && $.browser.version < 7 && !window.XMLHttpRequest;
	if (isIE6) { DD_belatedPNG.fix('.png'); }
	setHighLight();
	setFancybox();
	setRollover();
}

/**
 * xml文字列をXMLドキュメントで返す。
 */
function parseFromString(xmlstr){
	
	var isIE = /*@cc_on!@*/false;
	var xml = null;
	var xmldom;
	
	if (!isIE && window.DOMParser) {
		
		//alert('window.DOMParser');
		xmldom = new DOMParser();
		xmldom.async = false;
		var dom = xmldom.parseFromString(xmlstr, 'application/xml');
		if (!dom) return xml;
		xml = dom.documentElement;
		
	} else if (window.ActiveXObject) {
		
		//alert('Microsoft.XMLDOM');
		//xmldom = new ActiveXObject('Microsoft.XMLDOM');
		//alert('MSXML2.DOMDocument');
		xmldom = new ActiveXObject('MSXML2.DOMDocument');
		//alert('Msxml2.DOMDocument.3.0');
		//xmldom = new ActiveXObject('Msxml2.DOMDocument.3.0');
		
		xmldom.async = false;
		xmldom.loadXML(xmlstr);
		
		if (xmldom.parseError.errorCode != 0) {
			var xmlerr = xmldom.parseError;
			//alert(xmlerr.reason);
		} else {
			xml = xmldom.documentElement;
		}
	}
	
	return xml;
}

/**
 * ロールオーバーで_onのファイルに差し替える。
 */
function setRollover()
{
	$('img.rollover').each(function(){
		var me = $(this);
		var src = me.attr('src');
		
		if (!src) return;
		
		var img = src.match(/(\w*\.\w*?)$/ig).pop();
		
		//var on_src = src.replace(/\.(\w*?)$/, function(){ return '_on.' + RegExp.$1; });
		var on_src = src.replace(img, img.replace('.','_on.'));
		
		me.hover(function(){
			$(this).attr('src', on_src);
		},function(){
			$(this).attr('src', src);
		}).removeClass('rollover');
	});
}

/**
 * bodyタグ(ページ全体を意味する)の文字サイズを設定し、Cookieに保存する。
 *
 * @param size String: CSSのfont-sizeに指定する文字列。
 */
function setFontSize(size)
{
	size = size || '1.2em';
	$('body').css('font-size', size);
	$.cookie('font-size', size, {expires:365,path:'/'});
	if (size == '1.2em') {
		$('li#font_size_normal a').addClass('current');
		$('li#font_size_zoom a').removeClass('current');
	} else {
		$('li#font_size_normal a').removeClass('current');
		$('li#font_size_zoom a').addClass('current');
	}
	return false;
};

/**
 * ヘッダーにフォントサイズのメニューを追加する。
 */
function createFontSizeMenu()
{
	var ul = $('<ul id="header_font_size" class="notablet"></ul>');
	ul.append($('<li id="font_size">文字サイズ</li>'));
	var a = $('<a href="#" class="noscroll"><span></span></a>').css('cursor','pointer');
	ul.append($('<li id="font_size_normal"></li>').append(a.clone().find('span').text('標準').end().click(function(){ return setFontSize('1.2em'); })));
	ul.append($('<li id="font_size_zoom"></li>').append(a.clone().find('span').text('拡大').end().click(function(){ return setFontSize('1.4em'); })));
	$('#header_info_inner').append(ul);
}

/**
 * 言語の選択メニューを追加する。
 */
function setLangMenu(){
	
	var rel = getRelPath();
	
	var sel = $([
		'<select id="header_lang">',
		'<option value="' + location.href + '">日本語</option>',
		'<option value="' + rel + 'english/index.html' + '">English</option>',
		'<option value="' + rel + 'chinese_cn/index.html' + '">中文简体</option>',
		'<option value="' + rel + 'chinese_tw/index.html' + '">中文繁体</option>',
		'<option value="' + rel + 'korean/index.html' + '">한국어</option>',
		'</select>'
	].join(''));
	
	sel.change(function(){
		var url = $(this).val();
		if (isSumaho() || isTablet()) {
			location.href = url;
		} else {
			window.open(url, '_blank');
		}
	});
	
	$('#header_menu').after(sel);
}

/**
 * スムーススクロールを設定する。
 */
function setSmoothScroll() {
	$('a[href^=#],area[href^=#]').click(function() {
		if ($(this).hasClass('noscroll')) return false;
		var speed = 400;
		var href= $(this).attr('href');
		var target = $(href == '#' || href == '' ? 'html' : href);
		var top = target.offset().top;
		var position = top - 15; //(isIE6() || isSumaho() || isTablet() ? 15 : 145);
		$($.browser.webkit ? 'body' : 'html').animate({scrollTop:position}, speed, 'swing');
		return false;
	});
}

/**
 * highlightクラスが設定された要素のマウスオーバー時のハイライトを設定する。
 */
function setHighLight()
{
	$('a.highlight').each(function(){
		var a = $(this);
		var img = a.children('img');
		a.css({
			//'background-color':'#ffffff',
			//'width': img.width() + 'px',
			//'height': img.height() + 'px',
			'display':'block'
		});
		$(img).hover(
			function(){ img.fadeTo(100, 0.9); },
			function(){ img.fadeTo(100, 1.0); }
		);
		a.removeClass('highlight');
	});
}

/**
 * fancyboxプラグインでポップアップ表示を設定する。
 */
function setFancybox()
{
	if (typeof $.fn.fancybox == 'function') {
		
		// 通常のポップアップを設定する。
		$('a.popup,a[rel^="popup"],area.popup,area[rel^="popup"]').each(function(){
			var me = $(this);
			me.fancybox({
				'centerOnScroll' : true,
				'cyclic' : true,
				'overlayOpacity' : 0.7,
				'overlayColor'   : '#000000'
			}).removeClass('popup');
		});
		
		// ポップアップウィンドウを指定のサイズで表示する。
 		// classに「popwin-width-height#id」で指定する。
 		var boxid_cnt = 0;
		$('a[class*="popwin"],area[class*="popwin"]').each(function(){
			var me = $(this);
			var info = me.attr('class').match(/popwin-(\d+)-(\d+)(#[^ ]+|)/);
			if (info == null) return;
			var popcls = info[0];
			var width = parseInt(info[1]);
			var height = parseInt(info[2]);
			var id = info.length > 2 ? info[3] : null;
			
			if (width == 0) width = $(window).width() * 0.8;
			if (height == 0) height = $(window).height() * 0.8;
			
			var fboxopt = {
				'padding'        : 10,
				'titleShow'      : true,
				'titlePosition'  : 'inside',
				'autoScale'      : false,
				'centerOnScroll' : true,
				'transitionIn'   : 'fade',
				'transitionOut'  : 'fade',
				'width'          : width,
				'height'         : height,
				'overlayOpacity' : 0.9,
				'overlayColor'   : '#ffffff'
			};
			
			if (id) {
				var href = me.attr('href');
				var boxid = 'box_' + Base64.encode(href + id).replace(/=/g,'');
				if (!$('div').is('#' + boxid)) {
					var div = $('<div></div>');
					$('body').append(
						div.clone().addClass('none').append(
							div.clone().attr('id', boxid).css({
								'text-align' : 'left',
								'width'  : width  + 'px',
								'height' : height + 'px'
							})
						)
					);
					$('#' + boxid).load(href + ' ' + id);
				}
				me.attr('href', '#' + boxid).fancybox(fboxopt).removeClass(popcls);
			} else {
				fboxopt.type = 'iframe';
				me.fancybox(fboxopt).removeClass(popcls);
			}
		});
		
	}
}

function _ua(){
	var userAgent = window.navigator.userAgent.toLowerCase();
	var appVersion = window.navigator.appVersion.toLowerCase();
	if (userAgent.indexOf('msie') != -1) {
		//IE全般
		if (appVersion.indexOf("msie 6.") != -1) {
			return "ie6";
		}else if (appVersion.indexOf("msie 7.") != -1) {
			return "ie7";
		}else if (appVersion.indexOf("msie 8.") != -1) {
			return "ie8";
		}else if (appVersion.indexOf("msie 9.") != -1) {
			return "ie9";
		}else if (appVersion.indexOf("msie 10.") != -1) {
			return "ie10";
		}else{
			return "ie";
		}
	}else if (userAgent.indexOf('chrome') != -1) {
		return "chrome";
	}else if (userAgent.indexOf('safari') != -1) {
		return "safari";
	}else if (userAgent.indexOf('firefox') != -1) {
		return "firefox";
	}else if (userAgent.indexOf('opera') != -1) {
		return "opera";
	}else{
		return userAgent;
	}
};


// 2015/06/05 12:18 星様より追加ご指示
// ヒートマップ付きアクセス解析ツール | Ptengine
// http://www.ptengine.jp/
window._pt_lt = new Date().getTime();
window._pt_sp_2 = [];

_pt_sp_2.push('setAccount,73b3db4a');

var _protocol = (("https:" == document.location.protocol) ? " https://" : " http://");

(function() {
	var atag = document.createElement('script'); atag.type = 'text/javascript'; atag.async = true;
	atag.src = _protocol + 'js.ptengine.jp/pta.js';
	var stag = document.createElement('script'); stag.type = 'text/javascript'; stag.async = true;
	stag.src = _protocol + 'js.ptengine.jp/pts.js';
	var s = document.getElementsByTagName('script')[0]; 
	s.parentNode.insertBefore(atag, s);s.parentNode.insertBefore(stag, s);
})();
