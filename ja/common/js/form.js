// フォーム関連の処理を格納するオブジェクト。
if (typeof hanazono_form == "undefined" || !hanazono_form) var hanazono_form = {};

// 都道府県のリスト。
hanazono_form.prefList = [
	['北海道','青森県','岩手県','宮城県','秋田県','山形県','福島県'],
	['東京都','神奈川県','埼玉県','千葉県','茨城県','栃木県','群馬県','山梨県'],
	['新潟県','長野県','富山県','石川県','福井県'],
	['愛知県','岐阜県','静岡県','三重県'],
	['大阪府','兵庫県','京都府','滋賀県','奈良県','和歌山県'],
	['鳥取県','島根県','岡山県','広島県','山口県'],
	['徳島県','香川県','愛媛県','高知県'],
	['福岡県','佐賀県','長崎県','熊本県','大分県','宮崎県','鹿児島県','沖縄県']
];

// 携帯ドメインのリスト。
hanazono_form.domainList = [
	['@docomo.ne.jp','@ezweb.ne.jp','@softbank.ne.jp','@t.vodafone.ne.jp','@k.vodafone.ne.jp','@c.vodafone.ne.jp','@d.vodafone.ne.jp','@h.vodafone.ne.jp','@r.vodafone.ne.jp','@n.vodafone.ne.jp','@s.vodafone.ne.jp','@q.vodafone.ne.jp']
];

/**
 * 選択メニューをテキストとポップアップリストに置換する。
 *
 * @param args	Object:{selectId:String, dataList:Array(Array())}
 */
hanazono_form.replaceSelectToPopupList = function(args)
{
	var val = $('#'+args.selectId+' option:selected').text();
	var text = $('<input type="text" id="'+args.selectId+'" class="text" value="'+val+'" />');

	text.popupList({list:args.dataList, cascade:true, id:'popup_'+args.selectId});

	$('#'+args.selectId).replaceWith(text);
};

/**
 * URLエンコードする。
 *
 * @param str	String:	URL文字列。
 * @return String:		URLエンコードした文字列。
 */
hanazono_form.urlEnc = function(str)
{
	str = str.replace(/[ 　]/g,'');
	if ($.browser.mozilla) {
		str = EscapeUTF8(str);
	} else {
		str = encodeURIComponent(str);
	}
	return str;
};

/**
 * 住所検索のボタン等を設定する。
 */
hanazono_form.displaySearchButton = function(path)
{
	// 住所・〒検索のボタンを設定する。「#search_list」が存在する場合のみ。
	if ($('div').is('#search_list')) {

		var is_search = false;
		if (path == undefined) path = '..';

		var setAddress = function(json, errmsg){
			if (json == null || json.length == 0) {
				$('div#search_list').html('<em>※' + errmsg + '</em>').fadeIn();
			} else if (json.length == 1) {
				$('#pref_code1').val(json[0].code.substr(0,3));
				$('#pref_code2').val(json[0].code.substr(3,4));
				$('#pref').val(json[0].pref);
				var reg = new RegExp(json[0].city);
				if (!$('#city').val().match(reg)) $('#city').val(json[0].city);
				$('div#search_list:visible').fadeOut();
			} else {
				$('div#search_list').empty();
				for (var i in json) {
					var addr = json[i].pref + json[i].city;
					var p = $('<p class="search_item" title="'+addr+'">'+addr+'</p>');
					p.hover(function(){
						$(this).addClass('search_item_hover');
					},function(){
						$(this).removeClass('search_item_hover');
					});
					$.data($(p).get(0),'json', json[i]);
					$(p).click(function(){
						var d = $.data($(this).get(0),'json');
						$('#pref_code1').val(d.code.substr(0,3));
						$('#pref_code2').val(d.code.substr(3,4));
						$('#pref').val(d.pref);
						var reg = new RegExp(d.city);
						if (!$('#city').val().match(reg)) $('#city').val(d.city);
						$('div#search_list:visible').fadeOut();
					});
					$('div#search_list').append(p);
				}
				$('div#search_list:hidden').fadeIn();
			}
		};

		$('#btn_search_address').clickpress(function(){
			if (is_search) return;
			if ($('#pref_code1').val().length != 3) {
				$('div#search_list').html('<em>※前3桁の郵便番号を入力して下さい。</em>').fadeIn();
				return;
			}
			is_search = true;
			var code = $('#pref_code1').val() + $('#pref_code2').val();
			code = hanazono_form.urlEnc(code);
			$.getJSON(path + '/common/php/address.php?code='+code, function(json){
				setAddress(json, '入力した郵便番号に該当する住所は見つかりませんでした。郵便番号をご確認下さい。');
				is_search = false;
			});
		});

		$('#btn_search_prefcode').clickpress(function(){
			if (is_search) return;
			var errmsg = '';
			if ($('#pref').val() == '') errmsg += '<p><em>※都道府県を入力して下さい。</em></p>';
			if ($('#city').val() == '') errmsg += '<p><em>※検索したい市区町村を入力して下さい。</em></p>';
			if (errmsg != '') {
				$('div#search_list').html(errmsg).fadeIn();
				return;
			}
			is_search = true;
			var pref = $('#pref').val();
			var city = $('#city').val();
			pref = hanazono_form.urlEnc(pref);
			city = hanazono_form.urlEnc(city);
			$.getJSON(path + '/common/php/prefcode.php?pref='+pref+'&city='+city, function(json){
				setAddress(json, '入力した住所に該当する郵便番号は見つかりませんでした。都道府県及び市町村をご確認下さい。');
				is_search = false;
			});
		});
	}
};

// メイン処理。
$(function(){

	// 「date.js」を日本語に設定する。
	/*
	Date.dayNames = ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'];
	Date.abbrDayNames = ['日', '月', '火', '水', '木', '金', '土'];
	Date.monthNames = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
	Date.abbrMonthNames = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
	Date.firstDayOfWeek = 0;
	Date.format = 'yyyy年mm月dd日';
	*/
	
});
