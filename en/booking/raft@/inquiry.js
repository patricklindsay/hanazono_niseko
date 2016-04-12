// メイン処理。
$(function(){

	// 都道府県の選択リストを設定する。
	/*
	if ($('input:visible').is('#pref')) {
		$('#pref').popupList({list:hanazono_form.prefList, cascade:false, colwidth:'5em'});
	}
	*/

	// 要素を格納する変数。
	var el = null;

	// 住所検索ボタンの説明とボタンを配置する。
	/*
	if ($('input:visible').is('#pref_code1')) {
		el = $('#tr_pref_code > td');
		el.prepend('<p class="ex"><em>※&nbsp;郵便番号を入力して住所検索ボタンを押すと、ご住所欄に自動入力されます。</em></p>');
		el.append('<button type="button" id="btn_search_address"><img src="../../common/img/btn_search_address.gif" width="75" height="25" alt="住所検索" /></button>');
		el.append('<div id="search_list"></div>');
		hanazono_form.displaySearchButton('../..');
	}
	*/

	// AjaxZip2の住所データのパスを設定する。
	//AjaxZip2.JSONDATA = '../../common/js/libs/ajaxzip2/data';

	// 郵便番号のテキストボックスにAjaxZip2を設定する。
	// 全角英数を半角に変換する。
	/*
	$('#pref_code2').keyup(function(){
		$(this).val($(this).val().hankaku());
		AjaxZip2.zip2addr('pref_code1','pref','city','pref_code2');
	}).blur(function(){ $(this).val($(this).val().hankaku()); })
	.after('<p class="ex"><em>※&nbsp;郵便番号を入力すると、自動的にご住所を設定します。</em></p>');
	*/
	
	// 戻るボタンを配置する。
	if ($('button').is('#btn_send')) {
		var btn_history_back = $('<button type="button" id="btn_history_back">' +
			'<img src="../../common/img/btn_history_back.gif" width="80" height="25" alt="Back(correct them)" />' +
			'</button>').clickpress(function(){ history.back(); });
		$('#btn_send').before(btn_history_back);
	}

	// ダイアログを設定。
	$('.msgbox').dialog({
		autoOpen  : false,
		modal     : true,
		draggable : false,
		resizable : false,
		show      : 'fade',
		hide      : 'fade',
		buttons : {
			'OK' : function(){
				$(this).dialog('close');
			}
		}
	});

	var today = new Date();
	var today = Date.create(Date.create().format('{yyyy}/{MM}/{dd}'));
	var afterDate = new Date(today.getTime() + (2 * 86400000)); // 明後日
	var maxDate = new Date(today.getTime() + (366 * 86400000)); // 1年後
	var setTourDate = function(dt) {
		$('#tour_date_y').val(dt.getFullYear());
		$('#tour_date_m').val(dt.getMonth()+1);
		$('#tour_date_d').val(dt.getDate());
	};

	var tour_content = $('#tour_content');
	var hw1 = tour_content.find('option:eq(1)').val();
	var hw2 = tour_content.find('option:eq(2)').val();
	var hayawari = function(seldate){
		var choice = Date.create(seldate);
		var offer = Date.create().addDays(28); // 明後日の2日分を除く
		if (offer <= choice) {
			//tour_content.find('option:eq(1),option:eq(2)').show();
			if (!tour_content.is(':contains("' + hw1 + '")')) {
				tour_content.find('option:eq(0)').after('<option value="' + hw2 + '">' + hw2 + '</option>');
				tour_content.find('option:eq(0)').after('<option value="' + hw1 + '">' + hw1 + '</option>');
			}
		} else {
			if (tour_content.val() == hw1 || tour_content.val() == hw2) {
				tour_content.get(0).selectedIndex = 0;
			}
			//tour_content.find('option:eq(1),option:eq(2)').hide();
			if (tour_content.is(':contains("' + hw1 + '")')) {
				tour_content.find('option:eq(1),option:eq(2)').remove();
			}
		}
	};

	var isRaftBBQ = function(date){
		var d = Date.create(date);
		
		if (/^Rafting, BBQ and Onsen/.test(tour_content.val())) {
			// 2014年7月10日～10月31日のみ選択可。
			if (d.isBetween('2014/7/9', '2014/11/1')) {
				return 1;
			} else {
				return 0;
			}
		} else {
			return -1;
		}
	};

	var isRaftTriple = function(date){
		var d = Date.create(date);
		
		if (/Rafting and HANAZONO/.test(tour_content.val())) {
			// 2014年6月28日～2014年10月13日(10月は土日祝)のみ選択可。
			if (d.isBetween('2014/6/27', '2014/10/14')) {
				return 1;
			} else if (d.getMonth() == 9 && (d.isSaturday() || d.isSunday() || d.is('2014/10/13'))) {
				return 1;
			} else {
				return 0;
			}
		} else {
			return -1;
		}
	};

	var isDucky = function(date){
		var d = Date.create(date);
		
		if (/^Ducky/.test(tour_content.val())) {
			// 2014年6月7日～2014年10月31日のみ選択可。
			if (d.isBetween('2014/6/6', '2014/11/1')) {
				return 1;
			} else {
				return 0;
			}
		} else {
			return -1;
		}
	};

	var isHayawari = function(date){
		var d = Date.create(date);
		
		if (/^1 month in advance/.test(tour_content.val())) {
			// 2014年5月3,4,5,6日と8月9～17日は選択不可。
			// 2014年4月26日～2014年10月31日、または、30日前のみ選択可。
			if (d.isBetween('2014/5/2', '2014/5/7') || d.isBetween('2014/8/8', '2014/8/18')) {
				return 0;
			} else if (d.isBetween('2014/4/25', '2014/11/1') && d.daysFromNow() >= 29) {
				return 1;
			} else {
				return 0;
			}
		} else {
			return -1;
		}
	};

	var isJogai = function(date){
		var d = Date.create(date);
		
		if (/^Peak dates Rafting/.test(tour_content.val())) {
			// 2014年5月3,4,5,6日と8月9～17日は選択不可。
			if (d.isBetween('2014/5/2', '2014/5/7') || d.isBetween('2014/8/8', '2014/8/18')) {
				return 1;
			} else {
				return 0;
			}
		} else {
			return -1;
		}
	};

	var isWebYoyaku = function(date){
		var d = Date.create(date);
		
		if (/^Online 10%/.test(tour_content.val())) {
			// 2014年5月3,4,5,6日と8月9～17日は選択不可。
			// 2014年4月26日～2014年10月31日のみ選択可。
			if (d.isBetween('2014/5/2', '2014/5/7') || d.isBetween('2014/8/8', '2014/8/18')) {
				return 0;
			} else if (d.isBetween('2014/4/25', '2014/11/1')) {
				return 1;
			} else {
				return 0;
			}
		} else {
			return -1;
		}
	};

	var isMeiten = function(date){
		var d = Date.create(date);
		
		if (/^Rafting and Locals Favourite/.test(tour_content.val())) {
			// 2014年4月26日～2014年10月31日のみ選択可。
			if (d.isBetween('2014/4/25', '2014/11/1')) {
				return 1;
			} else {
				return 0;
			}
		} else {
			return -1;
		}
	};

	var isLunchOnsen = function(date){
		var d = Date.create(date);
		
		if (/^Rafting, Lunch and Onsen/.test(tour_content.val())) {
			// 2014年5月17日～2014年10月31日のみ選択可。
			if (d.isBetween('2014/5/16', '2014/11/1')) {
				return 1;
			} else {
				return 0;
			}
		} else {
			return -1;
		}
	};

	var isKidsRaft = function(date){
		var d = Date.create(date);
		
		if (/^Kids Rafting/.test(tour_content.val())) {
			// 2014年7月12日～2014年9月15日のみ選択可。
			if (d.isBetween('2014/7/11', '2014/9/16')) {
				return 1;
			} else {
				return 0;
			}
		} else {
			return -1;
		}
	};

	var isSeakayak = function(date){
		var d = Date.create(date);
		
		if (/^Sea Kayaking/.test(tour_content.val())) {
			// 2014年7月12日～2014年9月15日のみ選択可。
			if (d.isBetween('2014/7/11', '2014/9/16')) {
				return 1;
			} else {
				return 0;
			}
		} else {
			return -1;
		}
	};

	var isCanyoning = function(date){
		var d = Date.create(date);
		
		if (/^Canyoning/.test(tour_content.val())) {
			// 2014年7月20日～2014年9月7日のみ選択可。
			if (d.isBetween('2014/7/19', '2014/9/8')) {
				return 1;
			} else {
				return 0;
			}
		} else {
			return -1;
		}
	};

	tour_content.change(function(){
		
		if (/(^Ducky)/.test(tour_content.val())) {
			$('#persons2').val('-');
			$('#in_persons2').hide();
		} else {
			$('#in_persons2').show();
		}
		
		var selectDate = new Date($('#tour_date_y').val(), $('#tour_date_m').val()-1, $('#tour_date_d').val());
		
		if (isJogai(selectDate) === 0){
			$('#msgbox_jogai').dialog('open');
			//$('#datepicker').datepicker('setDate', afterDate);
			//setTourDate(afterDate);
			tour_content.val('Please choose your tour');
			return;
		}
		
		if (isHayawari(selectDate) === 0){
			$('#msgbox_hayawari').dialog('open');
			//$('#datepicker').datepicker('setDate', afterDate);
			//setTourDate(afterDate);
			tour_content.val('Please choose your tour');
			return;
		}
		
		if (isRaftBBQ(selectDate) === 0){
			$('#msgbox_raftbbq').dialog('open');
			//$('#datepicker').datepicker('setDate', afterDate);
			//setTourDate(afterDate);
			tour_content.val('Please choose your tour');
			return;
		}
		
		if (isRaftTriple(selectDate) === 0){
			$('#msgbox_rafttriple').dialog('open');
			//$('#datepicker').datepicker('setDate', afterDate);
			//setTourDate(afterDate);
			tour_content.val('Please choose your tour');
			return;
		}
		
		if (isDucky(selectDate) === 0){
			$('#msgbox_ducky').dialog('open');
			//$('#datepicker').datepicker('setDate', afterDate);
			//setTourDate(afterDate);
			tour_content.val('Please choose your tour');
			return;
		}
		
		if (isWebYoyaku(selectDate) === 0){
			$('#msgbox_web').dialog('open');
			//$('#datepicker').datepicker('setDate', afterDate);
			//setTourDate(afterDate);
			tour_content.val('Please choose your tour');
			return;
		}
		
		if (isMeiten(selectDate) === 0){
			$('#msgbox_meiten').dialog('open');
			//$('#datepicker').datepicker('setDate', afterDate);
			//setTourDate(afterDate);
			tour_content.val('Please choose your tour');
			return;
		}
		
		if (isLunchOnsen(selectDate) === 0){
			$('#msgbox_lunchonsen').dialog('open');
			//$('#datepicker').datepicker('setDate', afterDate);
			//setTourDate(afterDate);
			tour_content.val('Please choose your tour');
			return;
		}
		
		if (isKidsRaft(selectDate) === 0){
			$('#msgbox_kidsraft').dialog('open');
			//$('#datepicker').datepicker('setDate', afterDate);
			//setTourDate(afterDate);
			tour_content.val('Please choose your tour');
			return;
		}
		
		if (isSeakayak(selectDate) === 0){
			$('#msgbox_seakayak').dialog('open');
			//$('#datepicker').datepicker('setDate', afterDate);
			//setTourDate(afterDate);
			tour_content.val('【ツアー内容をお選びください】');
			return;
		}
		
		if (isCanyoning(selectDate) === 0){
			$('#msgbox_canyoning').dialog('open');
			//$('#datepicker').datepicker('setDate', afterDate);
			//setTourDate(afterDate);
			tour_content.val('Please choose your tour');
			return;
		}
	});

	$('#datepicker').datepicker({
		'dateFormat': 'yy/mm/dd',
		'showMonthAfterYear': true,
		'minDate': 2, // 明後日から
		'maxDate': '+1y',
		'showOn': 'button',
		'buttonImageOnly': true,
		'buttonImage': './img/ico_calendar.png',
		/*
		'buttonText': '選択',
		'nextText': '来月',
		'prevText': '先月',
		'dayNames': ['日曜日','月曜日','火曜日','水曜日','木曜日','金曜日','土曜日'],
		'dayNamesMin': ['日','月','火','水','木','金','土'],
		'dayNamesShort': ['日','月','火','水','木','金','土'],
		'monthNames': ['年 1 月','年 2 月','年 3 月','年 4 月','年 5 月','年 6 月','年 7 月','年 8 月','年 9 月','年 10 月','年 11 月','年 12 月'],
		*/
		'onSelect': function(dateText, inst) {
			var ymd = dateText.split('/');
			$('#tour_date_y').val(ymd[0]);
			$('#tour_date_m').val(ymd[1]/1);
			$('#tour_date_d').val(ymd[2]/1);
			//hayawari(dateText);
		},
		'beforeShowDay' : function(date){
			
			if (isRaftBBQ(date) === 0) {
				return [false, 'ui-state-disabled'];
			} else if (isRaftTriple(date) === 0) {
				return [false, 'ui-state-disabled'];
			} else if (isDucky(date) === 0) {
				return [false, 'ui-state-disabled'];
			} else if (isWebYoyaku(date) === 0) {
				return [false, 'ui-state-disabled'];
			} else if (isMeiten(date) === 0) {
				return [false, 'ui-state-disabled'];
			} else if (isLunchOnsen(date) === 0) {
				return [false, 'ui-state-disabled'];
			} else if (isHayawari(date) === 0) {
				return [false, 'ui-state-disabled'];
			} else if (isJogai(date) === 0) {
				return [false, 'ui-state-disabled'];
			} else {
				return [true, ''];
			}
		}
	});

	$('#tour_date_y,#tour_date_m,#tour_date_d').change(function(e){
		var selectDate = new Date($('#tour_date_y').val(), $('#tour_date_m').val()-1, $('#tour_date_d').val());
		
		if (selectDate.daysSince(today.format('{yyyy}/{MM}/{dd}')) < 2){
			$('#msgbox_kako').dialog('open');
			$('#datepicker').datepicker('setDate', afterDate);
			setTourDate(afterDate);
			tour_content.val('Please choose your tour');
			return;
		}
		
		if (isJogai(selectDate) === 0){
			$('#msgbox_jogai').dialog('open');
			//$('#datepicker').datepicker('setDate', afterDate);
			//setTourDate(afterDate);
			tour_content.val('Please choose your tour');
			return;
		}
		
		if (isHayawari(selectDate) === 0){
			$('#msgbox_hayawari').dialog('open');
			//$('#datepicker').datepicker('setDate', afterDate);
			//setTourDate(afterDate);
			tour_content.val('Please choose your tour');
			return;
		}
		
		if (isRaftBBQ(selectDate) === 0){
			$('#msgbox_raftbbq').dialog('open');
			//$('#datepicker').datepicker('setDate', afterDate);
			//setTourDate(afterDate);
			tour_content.val('Please choose your tour');
			return;
		}
		
		if (isRaftTriple(selectDate) === 0){
			$('#msgbox_rafttriple').dialog('open');
			//$('#datepicker').datepicker('setDate', afterDate);
			//setTourDate(afterDate);
			tour_content.val('Please choose your tour');
			return;
		}
		
		if (isDucky(selectDate) === 0){
			$('#msgbox_ducky').dialog('open');
			//$('#datepicker').datepicker('setDate', afterDate);
			//setTourDate(afterDate);
			tour_content.val('Please choose your tour');
			return;
		}
		
		if (isWebYoyaku(selectDate) === 0){
			$('#msgbox_web').dialog('open');
			//$('#datepicker').datepicker('setDate', afterDate);
			//setTourDate(afterDate);
			tour_content.val('Please choose your tour');
			return;
		}
		
		if (isMeiten(selectDate) === 0){
			$('#msgbox_meiten').dialog('open');
			//$('#datepicker').datepicker('setDate', afterDate);
			//setTourDate(afterDate);
			tour_content.val('Please choose your tour');
			return;
		}
		
		if (isLunchOnsen(selectDate) === 0){
			$('#msgbox_lunchonsen').dialog('open');
			//$('#datepicker').datepicker('setDate', afterDate);
			//setTourDate(afterDate);
			tour_content.val('Please choose your tour');
			return;
		}
		
		if (isKidsRaft(selectDate) === 0){
			$('#msgbox_kidsraft').dialog('open');
			//$('#datepicker').datepicker('setDate', afterDate);
			//setTourDate(afterDate);
			tour_content.val('Please choose your tour');
			return;
		}
		
		if (isSeakayak(selectDate) === 0){
			$('#msgbox_seakayak').dialog('open');
			//$('#datepicker').datepicker('setDate', afterDate);
			//setTourDate(afterDate);
			tour_content.val('Please choose your tour');
			return;
		}
		
		if (isCanyoning(selectDate) === 0){
			$('#msgbox_canyoning').dialog('open');
			//$('#datepicker').datepicker('setDate', afterDate);
			//setTourDate(afterDate);
			tour_content.val('Please choose your tour');
			return;
		}
		
		//setTourDate(selectDate);
		$('#datepicker').datepicker('setDate', selectDate);
		/*
		hayawari(selectDate);
		if (selectDate < afterDate) {
			$('#datepicker').datepicker('setDate', afterDate);
			setTourDate(afterDate);
		} else if (selectDate > maxDate) {
			$('#datepicker').datepicker('setDate', maxDate);
			setTourDate(maxDate);
		} else {
			$('#datepicker').datepicker('setDate', selectDate);
			setTourDate(selectDate);
		}
		*/
	});
	
	if ($('#mode').val() == 'form') {
		setTourDate(afterDate);
		setTimeout(function(){ $('#tour_date_y,#tour_date_m,#tour_date_d').change(); }, 1000);
	} else {
		var selectDate = new Date($('#tour_date_y').val(), $('#tour_date_m').val()-1, $('#tour_date_d').val());
		$('#datepicker').datepicker('setDate', selectDate);
	}

});
