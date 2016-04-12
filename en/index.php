<?php
/********************************************************************************/
// 共通モジュールを読み込む。
require_once('../common/php/basics.php');
require_once('../common/php/libs/magpierss-0.72/rss_fetch.inc');
/********************************************************************************/

define('MAGPIE_OUTPUT_ENCODING', 'UTF-8');
define('XML_LIFT_HANAZONO',    'http://www.niseko.ne.jp/en/weather/hanazono/lift.xml');		// リフト情報XML
define('XML_LIFT_HIRAFU',      'http://www.niseko.ne.jp/en/weather/hirafu/lift.xml');		// リフト情報XML
define('XML_WEATHER_HANAZONO', 'http://www.niseko.ne.jp/en/weather/hanazono/weather.xml');	// 気象情報XML
define('BLOG_FEED',            'http://hanazononiseko-news-en.blogspot.com/atom.xml');		// ブログのフィード
define('BLOG_CONTENT_LEN', 170);

$lift_hirafu_order = array('Swinging Monkey','King #4','Hirafu Gondola(four-seater)','Ace Quad #2(center four)','King Hooded Triple Lift #3');
$none_nighter      = array('Swinging Monkey','King #4');

// リフト情報XMLと気象情報XMLを取得する。
$xml_lift_hanazono    = @simplexml_load_file(XML_LIFT_HANAZONO);
$xml_lift_hirafu      = @simplexml_load_file(XML_LIFT_HIRAFU);
$xml_weather_hanazono = @simplexml_load_file(XML_WEATHER_HANAZONO);

// 更新日時を取得する。
$update_lift_hanazono    = date_conv('Y/m/d H:i', $xml_lift_hanazono->update);
$update_lift_hirafu      = date_conv('Y/m/d H:i', $xml_lift_hirafu->update);
$update_weather_hanazono = date_conv('Y/m/d H:i', $xml_weather_hanazono->update);

// ブログのフィードを取得する。
$feed = fetch_rss(BLOG_FEED);
for ($i = 0; $i < 6; $i++) {
	$item = $feed->items[$i];
	preg_match_all('/<img.*?src=(["\'])(.+?)\1.*?>/i', $item['atom_content'], $res);
	$feed->items[$i]['img'] = (count($res) > 0 && count($res[2]) > 0 && preg_match('/^http:\/\//', $res[2][0])) ? $res[2][0] : null;
	$feed->items[$i]['atom_content'] = mb_substr(strip_tags($item['atom_content']), 0, BLOG_CONTENT_LEN);
	$feed->items[$i]['updated_format'] = date_conv('Y/m/d H:i',$item['updated']);
}

// 最新のYouTube動画の情報を取得する。
$path = 'http://gdata.youtube.com/feeds/api/users/hanazonopowdertv/uploads?max-results=2';
$xml = @simplexml_load_file($path);
if ($xml !== FALSE) {
$gdata = xml2array($xml);
}

// 動画のID、タイトルを取得する。
$htv = array();
if (is_array($gdata)) {
	foreach($gdata['feed'][0]['entry'] as $i => $entry) {
		$htv[$i]['id'] = str_replace('http://gdata.youtube.com/feeds/api/videos/', '', $entry['id'][0]['_value']);
		$htv[$i]['title'] = $entry['title'][0]['_value'];
		$published = date_parse((string)$xml->entry->published);
		$t = mktime($published['hour'] - 9,$published['minute'],$published['second'],$published['month'],$published['day'],$published['year']);
		$htv[$i]['date'] = date('Y/m/d',$t);
	}
}

/********************************************************************************/
// HTMLテンプレートをレンダリングする。
$path = pathinfo(__FILE__);
xml_declaration();
require_once($path['filename'].'.tpl');
/********************************************************************************/
