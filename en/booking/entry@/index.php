<?php
require_once('../../../common/php/common.php');
session_cache_limiter('private_no_expire');
session_name('sid');
session_start();

$sid = session_id();
$path = pathinfo(__FILE__);
$token = md5('inquiry_fid_'.$path['dirname']);
$fid = get_token($token);

// Smartyオブジェクトを取得する。
require_once('../../../common/php/smarty.php');
$smarty =& getSmarty();

// フォームIDを設定する。
$smarty->assign('fid', $fid);

// ツアー予定日に今日の日付を設定する。
$today = getdate();
$tour_date = array();
$tour_date['year']  = $today['year'];
$tour_date['month'] = $today['mon'];
$tour_date['day']   = $today['mday'];
$smarty->assign('tour_date', $tour_date);

// ページを表示する。
$smarty->assign('mode', 'form');
$smarty->display(getcwd().'/inquiry.tpl');
?>
