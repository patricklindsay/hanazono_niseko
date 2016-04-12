/**
 * メイン処理。
 */
$(function(){
	
	// メニューを追加する。
	createFontSizeMenu();
	if (!window.location.protocol.match(/^https/)) {
	createSearchForm();
	}
	
	// 文字サイズを変更する。
	setFontSize($.cookie('font-size'));
	
	// スムーススクロールを設定する。
	$('a[href*="#"]').smoothAnchor();
	
	// グローバルナビにドロップダウンメニューを表示する。
	$("#nav").droppy();
	
	// 画像ホバーのハイライトを設定する。
	setHighLight();
	
	// ポップアップ表示を設定する。
	setFancybox();
	
	// ポップアップ表示を設定する。
	//popwin();
	
	// IE6専用の処理を実行する。
	forIE6();
	
	// 日英の相互リンクを設定する。
	langLink();
	
	// RoomBossのリンクを開く。
	$('a.roomboss').each(function(){
		var me = $(this);
		var url = me.attr('href');
		me.click(function(){
			OpenRoomBossWindow(url);
			return false;
		});
	});
});

/**
 * RoomBoss用の別ウィンドウ表示。
 */
function OpenRoomBossWindow(url) {
	var width = 920;
	var height = 800;
	var left = (screen.width/2)-(width/2);
	var top = (screen.height/2)-(height/2);
	window.open(url,
		"RoomBossWindow",
		"menubar=0,status=1,scrollbars=1,resizable=1,left="+left+",top="+top+",width="+width+",height="+height+",directories=0,toolbar=0");
}

/**
 * 日英の相互リンクを設定する。
 */
function langLink()
{
	var href = location.href;
	var jp = $('#header_language_jp a');
	var en = $('#header_language_en a');
	
	// URLの言語を変更する。
	jp.attr('href', href);
	href = href.replace('/ja', '/en');
	en.attr('href', href);
	
	// 日本語ページしかない例外の設定。
	if (href.match(/educational_travel/)) en.attr('href', href.replace('/educational_travel', ''));
	if (href.match(/ski-area/)) en.attr('href', href.replace('/ski-area', ''));
}

/**
 * ポップアップウィンドウを指定のサイズで表示する。
 * classに「popwin-width-height」で指定する。
 */
function popwin()
{
	$('[class*="popwin"]').each(function(){
		var target = $(this);
		var info = target.attr('class').match(/popwin-(\d+)-(\d+)/);
		if (info == null) return;
		var width = parseInt(info[1]);
		var height = parseInt(info[2]);
		
		$(this).fancybox({
			'padding' : 10,
			'titleShow' : true,
			'titlePosition' : 'inside',
			'autoScale' : false,
			'centerOnScroll' : true,
			'transitionIn' : 'fade',
			'transitionOut' : 'fade',
			'type' : 'iframe',
			'width' : width,
			'height' : height
		});
	});
}

/**
 * IE6専用の設定。
 */
function forIE6()
{
	if ($.browser.msie && (parseFloat($.browser.version) <= 6.0)) {
		// キャッシュを有効にする。
		try { document.execCommand("BackgroundImageCache", false, true); } catch(e) {}
		// 透過PNGを有効にする。
		DD_belatedPNG.fix('#contents,.png');
	}
}

/**
 * 現在のページのドキュメントルートからの相対パスを取得する。
 */
function getRelativePath()
{
	var relPath = '';
	// URLがローカル(file://)の場合に機能しない。
	// for (var i = 0; i < location.pathname.split('/').length - 3; i++) relPath += '../';
	// ローカルルールでショートカットアイコンのパスから取得する。
	relPath = $('link[rel="shortcut icon"]').attr('href').replace('favicon.ico','');
	return relPath;
}

/**
 * highlightクラスが設定された要素内のimgに、マウスオーバー時のハイライトを設定する。
 */
function setHighLight()
{
	$('.highlight img').each(function(){
		var el = $(this).parent();
		$(el).css('background-color','#fff').hover(
			function(){ $(el).find('img').fadeTo('fast', 0.75); },
			function(){ $(el).find('img').fadeTo('fast', 1.0); }
		);
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
		$('.font_size_m a').addClass('current');
		$('.font_size_l a').removeClass('current');//.css('background-position','0 0');
	} else {
		$('.font_size_m a').removeClass('current');//.css('background-position','0 0');
		$('.font_size_l a').addClass('current');
	}
	return false;
};

/**
 * ヘッダーにフォントサイズのメニューを追加する。
 */
function createFontSizeMenu()
{
	var ul = $('<ul class="header_font_size"></ul>');
	ul.append($('<li id="font_size" class="png"><span class="reader">フォントサイズ</span></li>'));
	var a = $('<a href="#TOP" class="png"><span class="reader"></span></a>').css('cursor','pointer');
	ul.append($('<li class="font_size_m btn"></li>').append(a.clone().find('span').text('標準').end().clickpress(function(){ return setFontSize('1.2em'); })));
	ul.append($('<li class="font_size_l btn"></li>').append(a.clone().find('span').text('拡大').end().clickpress(function(){ return setFontSize('1.5em'); })));
	$('#header').append(ul);
}

/**
 * ヘッダーにサイト内検索のフォームを追加する。
 */
function createSearchForm()
{
	var div = '<div id="navi_search">'
			+ '<form action="http://www.google.com/cse" id="cse-search-box" name="cse-search-box">'
			+ '<input type="hidden" name="cx" value="003080879582333711453:l2oeydt_fao" />'
			+ '<input type="hidden" name="ie" value="UTF-8" />'
			+ '<input type="text" name="q" id="srchInput" value="" />'
			+ '<input type="submit" name="sa" id="srchBtn" value="" />'
			+ '</form>'
			+ '<script type="text/javascript" src="http://www.google.com/cse/brand?form=cse-search-box&amp;lang=ja"></script>'
			+ '</div>';
	$('#header_navi').after(div);
}

/**
 * fancyboxプラグインでポップアップ表示を設定する。
 */
function setFancybox()
{
	if (typeof $.fn.fancybox == 'function') {
		
		// 通常のポップアップを設定する。
		$('a.popup,a.popimg,a[rel^="popimg"],area.popimg,area[rel^="popimg"]').each(function(){
			var me = $(this);
			me.fancybox({
				'centerOnScroll' : true,
				'cyclic' : true
			}).removeClass('popup').removeClass('popimg');
		});
		
		// ポップアップウィンドウを指定のサイズで表示する。
 		// classに「popwin-width-height#id」で指定する。
 		var boxid_cnt = 0;
		$('a[class*="popwin"]').each(function(){
			var me = $(this);
			var info = me.attr('class').match(/popwin-(\d+)-(\d+)(#[^ ]+|)/);
			if (info == null) return;
			var popcls = info[0];
			var width = parseInt(info[1]);
			var height = parseInt(info[2]);
			var id = info.length > 2 ? info[3] : null;
			
			if (height == 0) height = $(window).height() - 100;
			
			var fboxopt = {
				'padding'        : 10,
				'titleShow'      : true,
				'titlePosition'  : 'inside',
				'autoScale'      : false,
				'centerOnScroll' : true,
				'transitionIn'   : 'fade',
				'transitionOut'  : 'fade',
				'width'          : width,
				'height'         : height
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

// base64.min.js
(function(e){if(e.Base64){return}var f="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var c=function(s){var r={};for(var q=0,p=s.length;q<p;q++){r[s.charAt(q)]=q}return r
}(f);var h=function(p){var q=(p.charCodeAt(0)<<16)|(p.charCodeAt(1)<<8)|(p.charCodeAt(2));
return f.charAt(q>>>18)+f.charAt((q>>>12)&63)+f.charAt((q>>>6)&63)+f.charAt(q&63)
};var o=function(q){if(q.match(/[^\x00-\xFF]/)){throw"unsupported character found"
}var r=0;while(q.length%3){q+="\0";r++}var p=q.replace(/[\x00-\xFF]{3}/g,h);if(!r){return p
}p=p.substr(0,p.length-r);while(r--){p+="="}return p};var l=e.btoa||o;var k=function(p){var q=(c[p.charAt(0)]<<18)|(c[p.charAt(1)]<<12)|(c[p.charAt(2)]<<6)|(c[p.charAt(3)]);
return String.fromCharCode(q>>16)+String.fromCharCode((q>>8)&255)+String.fromCharCode(q&255)
};var b=function(q){q=q.replace(/[^A-Za-z0-9\+\/]/g,"");var r=0;while(q.length%4){q+="A";
r++}var p=q.replace(/[A-Za-z0-9\+\/]{4}/g,k);if(r>=2){p=p.substring(0,p.length-[0,0,2,1][r])
}return p};var a=e.atob||b;var d=/[^\x00-\x7F]/g;var n=function(p){var q=p.charCodeAt(0);
return q<2048?String.fromCharCode(192|(q>>>6))+String.fromCharCode(128|(q&63)):String.fromCharCode(224|((q>>>12)&15))+String.fromCharCode(128|((q>>>6)&63))+String.fromCharCode(128|(q&63))
};var j=function(p){return p.replace(d,n)};var g=/[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g;
var i=function(p){var s=p.charCodeAt(0);var r=p.charCodeAt(1);if(s<224){return String.fromCharCode(((s&31)<<6)|(r&63))
}else{var q=p.charCodeAt(2);return String.fromCharCode(((s&15)<<12)|((r&63)<<6)|(q&63))
}};var m=function(p){return p.replace(g,i)};e.Base64={fromBase64:b,toBase64:o,atob:a,btoa:l,utob:j,btou:m,encode:function(p){return l(j(p))
},encodeURI:function(p){return l(j(p)).replace(/[+\/]/g,function(q){return q=="+"?"-":"_"
}).replace(/=+$/,"")},decode:function(p){return m(a(p.replace(/[-_]/g,function(q){return q=="-"?"+":"/"
})))}}})(this);
