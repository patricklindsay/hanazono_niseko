// スノーシーズンの終了告知を追加する。
$(function(){

	// 終了告知用の背景等を設置する。
	$('body').prepend('<img src="img/btn_close.png" alt="閉じる" id="btn_close" class="none" /><div id="close_snow_season" class="tc none">&ensp;</div><div id="close_snow_season_bg" class="tc none">&ensp;</div>');
	
	// スノーシーズンの終了告知の本体を読み込む。
	$('#close_snow_season').load('close_snow_season.html #close_snow_season>*', function(){
		forTemplate();
		
		// 終了告知をフェードインで表示する。
		$('#close_snow_season_bg').delay(500).fadeIn();
		$('#btn_close,#close_snow_season').delay(1000).fadeIn();
		
		// 右上の閉じるボタン押下で終了告知を消す。
		$('#btn_close').click(function(){
			$('#btn_close,#close_snow_season,#close_snow_season_bg').fadeOut();
		});
	});

});
