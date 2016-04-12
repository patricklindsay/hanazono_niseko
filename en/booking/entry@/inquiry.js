// メイン処理。
$(function(){

	// 戻るボタンを配置する。
	if ($('button').is('#btn_send')) {
		var btn_history_back = $('<button type="button" id="btn_history_back">' +
			'<img src="../../common/img/btn_history_back.gif" width="80" height="25" alt="Back(correct them)" />' +
			'</button>').clickpress(function(){ history.back(); });
		$('#btn_send').before(btn_history_back);
	}

});
