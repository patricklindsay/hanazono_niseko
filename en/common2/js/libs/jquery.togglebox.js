/*!
 * ToggleBox - jQuery Plugin
 *
 * Copyright ©2011, Ryoji Yamamoto
 *
 * Version: 1.0.0 ()
 * Requires: jQuery v1.4.4+
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
;(function($){
	
	var ns = 'togglebox';
	
	$.fn[ns] = function(options) {
		
		var targets = this;
		
		var settings = $.extend({
			start : 1,
			hover : false,
			only  : true
		}, options);
		
		targets.each(function(){
			
			var target = $(this);
			var info = target.attr('class').match(/([^ ]+)-(\d*)-(btn|box)/);
			
			if (info == null) return;
			
			var cls = '.' + info[0];
			var name = info[1];
			var no = info[2];
			var type = info[3];
			var on = name + '-' + ns;
			
			if (type == 'btn') {
				var box = '.' + name + '-' + no + '-box';
				var action = (settings.hover ? 'mouseover' : 'click');
				$(cls).bind(action, function(){
					if (settings.only) {
						$('.'+on).hide().removeClass(on);
						$(box).show().addClass(on);
					} else {
						if ($(box).is(':hidden')) {
							$(box).show().addClass(on);
						} else {
							$(box).hide().removeClass(on);
						}
					}
					return false;
				});
			}
			
			if (type == 'box' && settings.start != no) {
				$(cls).hide();
			} else if (type == 'box') {
				$(cls).addClass(on);
			}
		});
		
		return this;
	};
	
})(jQuery);
