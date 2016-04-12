$(function(){

	// トップページのパネルレイアウトを設定。
	$(function(){
		var container = $('#contents_inner');
		container.isotope({
			itemSelector: '.tile',
			layoutMode: 'fitRows',
			getSortData: {
				sort1: '.sort1',
				sort2: '.sort2',
				sort3: '.sort3'
			}
		});
		
		var timer = false;
		$(window).resize(function(){
			if (timer !== false) clearTimeout(timer);
			timer = setTimeout(function(){
				var w = $(window).width();
				if (w <= 600) {
					container.isotope({ sortBy:'sort3', layoutMode:'packery' });
				} else if (w <= 980) {
					container.isotope({ sortBy:'sort2', layoutMode:'packery' });
				} else {
					container.isotope({ sortBy:'sort1', layoutMode:'fitRows' });
				}
			}, 200);
		}).resize();
	});

});
