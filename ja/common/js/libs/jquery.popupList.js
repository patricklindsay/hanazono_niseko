// 選択リストをポップアップ表示する。
(function($){
	
	var _id = 0;
	
	$.fn.popupList = function(args){
		
		var list = args.list;
		var cascade = args.cascade || false;
		var colwidth = args.colwidth;
		var id = args.id;
		
		var me = this;
		var data = $.data($(me).get(0), 'popupList', {});
		data.id = _id++;
		
		var setPosition = function(){
			var offset = $(me).offset();
			offset.top += $(me).get(0).offsetHeight + 2;
			$(div).css({'top':offset.top,'left':offset.left});
		};
		
		var listClick = function(e){
			var el = e.target;
			var popup = $('div.popup-list')[data.id];
			
			while (true) {
				if (el == popup) {
					return true;
				} else if (el == document) {
					$(popup).hide();
					return false;
				} else {
					el = $(el).parent()[0];
				}
			}
		};
		
		var div = $('<div '+((id != undefined) ? 'id="'+id+'" ': '')+'class="popup-list"></div>').css({
			'position':'absolute',
			'display':'none'
		});
		
		var table = $('<table></table>').css({
			'border-collapse':'separate',
			'border-spacing':'2px',
			'empty-cells':'hide'
		});
		
		var m = 0;
		for (var i = 0; i < list.length; i++) {
			if (m < list[i].length) m = list[i].length;
		}
		var rmax = (cascade) ? m : list.length;
		var cmax = (cascade) ? list.length : m;
		
		for (var r = 0; r < rmax; r++){
			var tr = $('<tr></tr>');
			for (var c = 0; c < cmax; c++){
				var val = (cascade) ? list[c][r] : list[r][c];
				var td = $('<td></td>');
				if (colwidth != undefined) $(td).css('width',colwidth);
				if (val == undefined) {
					$(td).html('&nbsp;');
				} else {
					$(td).addClass('popup-item').text(val);
					
					$(td).click(function(){
						$(me).val($(this).text());
						$(document).unbind('mousedown', listClick);
						$(div).hide();
					});
					
					$(td).hover(function(){
						$(this).addClass('popup-item-hover');
					},function(){
						$(this).removeClass('popup-item-hover');
					});
				}
				$(tr).append(td);
			}
			$(table).append(tr);
		}
		
		$(div).append(table);
		$('body').append(div);
		
		var showPopup = function(){
			setPosition();
			$(div).show();
			$(document).bind('mousedown', listClick);
		};
		
		$(me).click(showPopup);
		//$(me).focus(showPopup);
	};
	
})(jQuery);
