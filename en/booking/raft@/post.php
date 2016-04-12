<?php
require_once('../../../common/php/common.php');
session_cache_limiter('private_no_expire');
session_name('sid');
session_start();

// このフォームのメールアドレス。
define('MAIL_FROM', 'raft@harmonyresorts.com');
define('MAIL_TO', 'raft@harmonyresorts.com,raft.nhr@gmail.com,raft@hanazononiseko.com');
//define('MAIL_FROM', 'r.yamamoto@cab-net.jp');
//define('MAIL_TO', 'r.yamamoto@cab-net.jp');

$sid = session_id();
$path = pathinfo(__FILE__);
$token = md5('inquiry_fid_'.$path['dirname']);
$fid = get_token($token);

// フォームIDが違う場合、セッションを破棄してフォームに戻る。
if (empty($_POST['fid']) || $_POST['fid'] != $fid) {
	// キャッシュから読み込まれないようにランダムなパラメータを付与する。
	delete_session('index.php'.'?t='.time());
	exit;
}

// Smartyオブジェクトを取得する。
require_once('../../../common/php/smarty.php');
$smarty =& getSmarty();

// フォームIDを設定する。
$smarty->assign('fid', $fid);

// 送信データを取得する。
$enc = $_POST['enc'];
$tour_date = get_val('tour_date');
$tour_date_y = get_val('tour_date_y');
$tour_date_m = get_val('tour_date_m');
$tour_date_d = get_val('tour_date_d');
//print_r($tour_date);
$tour_content = get_val('tour_content');
$persons1 = get_val('persons1');
$persons2 = get_val('persons2');
$transfer = get_val('transfer');
$accommodation = get_val('accommodation');
$name = html_str(get_val('name'));
$pref_code1 = html_str(get_val('pref_code1'));
$pref_code2 = html_str(get_val('pref_code2'));
$city = html_str(get_val('city'));
$tel = html_str(get_val('tel'));
$fax = html_str(get_val('fax'));
$email = html_str(get_val('email'));
$email2 = html_str(get_val('email2'));
$memo = html_str(get_val('memo'));

// 送信データの形式に合わせて変換する。
$tour_date_y = mb_convert_kana($tour_date_y, 'a');
$tour_date_m = mb_convert_kana($tour_date_m, 'a');
$tour_date_d = mb_convert_kana($tour_date_d, 'a');
$kana = mb_convert_kana($kana, 'HVc');
$pref_code1 = mb_convert_kana($pref_code1, 'a');
$pref_code2 = mb_convert_kana($pref_code2, 'a');
$city = mb_convert_kana($city, 'a');
$email = mb_convert_kana($email, 'a');
$email2 = mb_convert_kana($email2, 'a');
$tel = str_replace(array('ー','ｰ'), array('-','-'), $tel);
$tel = mb_convert_kana($tel, 'a');
$fax = str_replace(array('ー','ｰ'), array('-','-'), $fax);
$fax = mb_convert_kana($fax, 'a');
$memo = mb_convert_kana($memo);

// テンプレート用に変数を設定する。
$smarty->assign('enc', $enc);
$smarty->assign('tour_date', $tour_date);
$smarty->assign('tour_date_y', $tour_date_y);
$smarty->assign('tour_date_m', $tour_date_m);
$smarty->assign('tour_date_d', $tour_date_d);
$smarty->assign('tour_content', $tour_content);
$smarty->assign('persons1', $persons1);
$smarty->assign('persons2', $persons2);

$smarty->assign('transfer', $transfer);
$smarty->assign('accommodation', $accommodation);
$smarty->assign('name', $name);
$smarty->assign('pref_code1', $pref_code1);
$smarty->assign('pref_code2', $pref_code2);
$smarty->assign('city', $city);
$smarty->assign('tel', $tel);
$smarty->assign('fax', $fax);
$smarty->assign('email', $email);
$smarty->assign('email2', $email2);
$smarty->assign('memo', $memo);

// エラー情報の配列。エラー有りで「true」とする。
$errors = array();

$errors['name'] = empty($name);

$errors['email'] = (empty($email)) ? true : !check_email($email);
$errors['email2'] = (empty($email2)) ? true : !check_email($email2);

if ($email != $email2) {
	$errors['email'] = true;
	$errors['email2'] = true;
}

/*
$errors['pref_code'] = false;
if (empty($pref_code1) || empty($pref_code2)) {
	$errors['pref_code'] = true;
} else {
	$errors['pref_code'] = !check_prefcode($pref_code1, $pref_code2);
}

$errors['pref'] = false;
if (empty($pref)) {
	$errors['pref'] = true;
} else {
	$errors['pref'] = !check_pref($pref);
}

$errors['city'] = empty($city);
$errors['pref'] = ($errors['pref'] || $errors['city']);
*/

$errors['tour_content'] = (bool)($tour_content == '[Select Tour name]');

$errors['tel'] = !check_tel($tel);

$errors['memo'] = false;
if ($memo == 'Please leave any comments, requests here.') $memo = '';
//$errors['memo'] = (bool)($tour_content == '「ラフティング＆ランチ温泉パック」午前' && empty($memo));

$p1 = str_replace(array('人','なし'), array(''), $persons1);
$p2 = str_replace(array('人','なし'), array(''), $persons2);
$pnum = $p1 + $p2;
$errors['persons'] = (bool)($pnum == 0);

// エラーが無く、エンコーディングフラグがONの場合、メールを送信する。
if (!in_array(true, $errors) && $enc == 1)
{
	// セッションを削除する。
	delete_session();

	// メールを送信する。
	$to = MAIL_TO.','.$email;
	$subject = '[Niseko HANAZONO Resort] Online Booking Form'.$name.'';
	$message .= "*This email has been sent to you automatically.\n";
	$message .= "*Our staff will contact you shortly and provide a confirmation of\n";
	$message .= " availability, please note until such time the booking remains tentative.\n";
	$message .= "\n";
	$message .= "Thank you for booking online.\n";
	$message .= "\n";
	$message .= "<<<<<<<<<< Details of your booking >>>>>>>>>>\n";
	$message .= '[Sent] '. get_datetime() ."\n";
	$message .= "\n";
	$message .= '[Tour date] '.$tour_date_y.'/'.$tour_date_m.'/'.$tour_date_d.''."\n";
	$message .= '[Tour name] '.$tour_content."\n";
	$message .= '[Number of participants] '.'Adult (13 years old and above):'.$persons1.', Child (under 12 years old):'.$persons2."\n";
	$message .= '[Accommodation pickup] '.$transfer."\n";
	$message .= '[Accommodation name] '.$accommodation."\n";
	$message .= "\n";
	$message .= '[Name] '.$name."\n";
	$message .= '[Post code] '.$pref_code1.'-'.$pref_code2."\n";
	$message .= '[Address] '.$pref.$city."\n";
	$message .= '[Phone] '.$tel."\n";
	$message .= '[Fax] '.$fax."\n";
	$message .= '[Email address] '.$email."\n";
	$message .= '[Notes] '."\n".$memo."\n";
	$message .= "\n";
	$message .= "--\n";
	$message .= "Nihon Harmony Resorts KK(Rafting Division)\n";
	$message .= "328-1 Aza-Iwaobetsu, Kutchan-cho Abuta-gun, Hokkaido, 044-0082\n";
	$message .= "Tel:0136-21-3333 Fax:0136-22-3884\n";
	$message = str_replace("\r\n", "\n", $message);
	$message = str_replace("\r", "\n", $message);
	$headers = 'From: '. MAIL_FROM;
	send_mail($to, $subject, $message, $headers);

	// ページを表示する。
	$smarty->assign('mode', 'thanks');
	$smarty->display(getcwd().'/inquiry.tpl');

// エラーが無く、エンコーディングフラグがOFFの場合、確認画面を表示する。
} elseif (!in_array(true, $errors) && $enc == 0) {

	// ページを表示する。
	$smarty->assign('mode', 'check');
	$smarty->display(getcwd().'/inquiry.tpl');

// それ以外の場合(＝エラーがある)、エラー付きの入力画面を表示する。
} else {

	// エラー情報を設定する。
	$smarty->assign('errors', $errors);

	// ページを表示する。
	$smarty->assign('mode', 'errors');
	$smarty->display(getcwd().'/inquiry.tpl');
}

?>
