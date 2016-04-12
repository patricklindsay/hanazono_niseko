var _gaq = _gaq || [];

function trackExternal(){
	var reg = new RegExp(document.domain.escapeRegExp(),'i');
	$('a[href*="://"]').each(function(){
		if ($(this).hasClass('_external')) return;
		$(this).addClass('_external');
		var href = this.href;
		if (href.match(reg)) return;
		$(this).click(function(){
			var label = document.location.href;
			label = label.replace(/#.+|index\.[\w#]+$/g,'');
			_gaq.push(['_trackEvent', 'page_to_external', label, href]);
			_gaq.push(['_trackEvent', 'external_from_page', href, label]);
		});
	});
}

function setLinker(){
	var _link = function(a){
		var me = $(a);
		var href = me.attr('href');
		var target = me.attr('target');
		if (target == '_blank') {
			window.open(_gat._getTrackers()[0]._getLinkerUrl(href));
			return false;
		} else {
			_gaq.push(['_link', href]);
			return true;
		}
	}
	$('a._link').each(function(){
		$(this).click(function(e){
			return _link(this);
			//e.preventDefault();
		}).removeClass('_link');
	});
}

$(function(){
	var protocol = document.location.protocol;
	if (!protocol.match(/^http/)) return;
	
	_gaq.push(['_setAccount', 'UA-20299777-1']);
	_gaq.push(['_setDomainName', 'none']);
	_gaq.push(['_setAllowLinker', true]);
	_gaq.push(['_setAllowAnchor', true]);
	_gaq.push(['_addOrganic', 'images.google','q']);
	_gaq.push(['_addOrganic', 'biglobe','q',true]);
	_gaq.push(['_addOrganic', 'azby.search.nifty','q',true]);
	_gaq.push(['_addOrganic', 'nifty','q',true]);
	_gaq.push(['_addOrganic', 'infoseek','qt']);
	_gaq.push(['_addOrganic', 'rakuten','qt']);
	_gaq.push(['_addOrganic', 'livedoor-search','q',true]);
	_gaq.push(['_addOrganic', 'naver.jp','q',true]);
	_gaq.push(['_addOrganic', 'so-net','query']);
	_gaq.push(['_addOrganic', 'fresheye','kw']);
	_gaq.push(['_addOrganic', 'auone','q',true]);
	_gaq.push(['_addOrganic', 'ocnsearch', 'MT']);
	_gaq.push(['_addOrganic', 'hi-ho', 'search']);
	_gaq.push(['_addOrganic', 'odn','search']);
	_gaq.push(['_addOrganic', 'eonet','search']);
	_gaq.push(['_addOrganic', 'toppa','search']);
	_gaq.push(['_addOrganic', 'partners.search.goo', 'MT']);
	_gaq.push(['_addOrganic', 'goo', 'MT']);
	_gaq.push(['_addOrganic', 'bsearch.goo', 'MT']);
	_gaq.push(['_addOrganic', 'excite','search']);
	_gaq.push(['_addOrganic', 'asahi','Keywords']);
	_gaq.push(['_addOrganic', 's.luna.tv', 'q']);
	_gaq.push(['_addOrganic', 'lunascape', 'p']);
	_gaq.push(['_addOrganic', 'hatena', 'word']);
	_gaq.push(['_addOrganic', 'ecnavi', 'Keywords']);
	_gaq.push(['_addOrganic', 'cybozu', 'Keywords']);
	_gaq.push(['_addOrganic', 'cocacola', 'Keywords']);
	_gaq.push(['_addOrganic', 'picmy.jp', 'Keywords']);
	_gaq.push(['_addOrganic', 'adingo.jp', 'Keywords']);
	_gaq.push(['_addOrganic', 'adingosearch', 'Keywords']);
	_gaq.push(['_addOrganic', 'pex.jp', 'Keywords']);
	_gaq.push(['_addOrganic', 'went.jp', 'Keywords']);
	_gaq.push(['_addOrganic', 'unisearch.jp', 'keyword']);
	_gaq.push(['_addOrganic', 'tnc.jword.jp', 'q']);
	_gaq.push(['_addOrganic', 't-com.jword.jp', 'q']);
	_gaq.push(['_addOrganic', 'search.jword.jp', 'name']);
	_gaq.push(['_trackPageview']);
	
	setLinker();
	trackExternal();
	
	var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
});
