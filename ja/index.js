$(function(){
	
	//$('#slideshow').slidesLite({'overlay':'slides/overlay.png','random':true});
	
	$('#slides_inner').jCarouselLite({
		btnNext		: '#slides_next',
		btnPrev		: '#slides_prev',
		easing		: 'easeInOutExpo',
		visible		: 1,
		auto		: 4500,
		speed		: 1500,
		scroll		: 1
	});
	
	$('#livecamera').fancybox({
		'padding'		: 10,
		'titleShow'		: false,
		'autoScale'		: false,
		'transitionIn'	: 'fade',
		'transitionOut' : 'fade',
		'type'			: 'iframe',
		'scrolling'		: 'no',
		'width'			: 640,
		'height'		: 480
	});
	
});
