/*!
 * SlidesLite - jQuery Plugin
 * The simple slide show fade and scroll only.
 *
 * Copyright ©2011, Ryoji Yamamoto
 *
 * Version: 1.2.0 (15:47 2011/08/08)
 * Requires: jQuery v1.4.4+
 * Support: DD_belatedPNG 0.0.8a
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
;(function($){
	
	var name_space = 'slidesLite';
	
	var shuffle = function(a){
		var i = a.length;
		while (i) {
			var j = Math.floor(Math.random()*i);
			var b = a[--i];
			a[i] = a[j];
			a[j] = b;
		}
	};
	
	$.fn[name_space] = function(options) {
		
		var elements = this;
		
		var settings = $.extend({
			'wait'      : 2000,
			'duration'  : 8000,
			'fade'      : 2000,
			'easing'    : 'swing',
			'loop'      : true,
			'overlay'   : '',
			'random'    : false
		}, options);
		
		var prefix = name_space.replace(/[A-Z]/g,function($0){return '-' + $0.toLowerCase();});
		var ddpng = (typeof DD_belatedPNG != 'undefined') ? true : false;
		var ie6 = ($.browser.msie && $.browser.version <= 6) ? true : false;
		
		elements.each(function(){
			
			var target = $(this);
			
			target.css({
				'position' : 'relative',
				'overflow' : 'hidden'
			});
			
			var width = target.width();
			var height = target.height();
			var cnt = target.find('li').css({'position':'absolute','top':0}).size() - 1;
			
			if (settings.overlay != '' && !(ie6 && !ddpng)) {
				var overlay = $('<img src="' + settings.overlay + '" class="' + prefix + '-overlay" />').css({
					'position'   : 'absolute',
					'top'        : 0,
					'z-index'    : 100
				});
				target.prepend(overlay);
				if (ie6) DD_belatedPNG.fix('.' + prefix + '-overlay');
			}
			
			target.find('li').hide().each(function(){
				var t = $(this);
				var top = (height - t.find('img').height()) + 'px';
				var left = (width - t.find('img').width()) + 'px';
				var zero = '0px';
				var data = {};
				
				if (t.hasClass('sl-up')) {
					data = {'ta': top, 'tb': zero, 'la': zero, 'lb': zero};
				} else if (t.hasClass('sl-down')) {
					data = {'ta': zero, 'tb': top, 'la': zero, 'lb': zero};
				} else if (t.hasClass('sl-left')) {
					data = {'ta': zero, 'tb': zero, 'la': left, 'lb': zero};
				} else if (t.hasClass('sl-right')) {
					data = {'ta': zero, 'tb': zero, 'la': zero, 'lb': left};
				} else {
					data = {'ta': zero, 'tb': zero, 'la': zero, 'lb': zero};
				}
				
				$.data(this, prefix, data);
				t.css({ 'left': data.la, 'top': data.ta });
			});
			
			var order = [];
			for (var i = 0; i < cnt + 1; i++) order.push(i);
			if (settings.random) shuffle(order);
			var n = 0;
			var img = target.find('li:eq(' + order[n] + ')');
			img.fadeIn(settings.fade);
			
			var loop = function(){
				var data = $.data(img.get(0), prefix);
				
				img.animate({
					'left': data.lb,
					'top': data.tb
				},{
					'duration': settings.duration,
					'easing': settings.easing,
					'complete': function(){
						if (!settings.loop && n == cnt) return;
						$(this).fadeOut(settings.fade, function(){
							var d = $.data(this, prefix);
							$(this).css({
								'left': d.la,
								'top': d.ta
							});
						});
						n = (n == cnt) ? 0 : n + 1;
						img = target.find('li:eq(' + order[n] + ')');
						img.fadeIn(settings.fade);
						setTimeout(function(){ loop(); }, 1);
					}
				});
			};
			
			setTimeout(function(){ loop(); }, settings.wait);
		});
		
		return this;
	};
	
})(jQuery);
