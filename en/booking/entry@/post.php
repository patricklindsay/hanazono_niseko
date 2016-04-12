<?php
require_once('../../../common/php/common.php');
session_cache_limiter('private_no_expire');
session_name('sid');
session_start();

// このフォームのメールアドレス。
define('MAIL_FROM', 'no-reply@harmonyresorts.com');
define('MAIL_TO', 'kamonohashi.hanazono@gmail.com,daisuke.tozawa@harmonyresorts.com,kotoba.mitsuoka@harmonyresorts.com,daisuke.tsuchiya@harmonyresorts.com');
//define('MAIL_TO', 'ryoji.yamamoto.0512@gmail.com');
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

$taikai = get_val('taikai');
$name = get_val('name');
$gender = get_val('gender');
$birthday_y = get_val('birthday_y');
$birthday_m = get_val('birthday_m');
$birthday_d = get_val('birthday_d');
$age = get_val('age');
$address1 = get_val('address1');
$address2 = get_val('address2');
$address3 = get_val('address3');
$address4 = get_val('address4');
$address5 = get_val('address5');
$tel1 = get_val('tel1');
$tel2 = get_val('tel2');
$tel3 = get_val('tel3');
$email = get_val('email');
$email2 = get_val('email2');
$info = get_val('info');
$kinkyu1 = get_val('kinkyu1');
$kinkyu2 = get_val('kinkyu2');
$kinkyu3 = get_val('kinkyu3');
$kinkyu_name1 = get_val('kinkyu_name1');
$kinkyu_name2 = get_val('kinkyu_name2');
$category = get_val('category');
$stance = get_val('stance');
$company = get_val('company');
$number = get_val('number');
$memo = get_val('memo');
$signing = get_val('signing');

// 送信データの形式に合わせて変換する。
$birthday_y = mb_convert_kana($birthday_y, 'a');
$birthday_m = mb_convert_kana($birthday_m, 'a');
$birthday_d = mb_convert_kana($birthday_d, 'a');
$address1 = mb_convert_kana($address1, 'a');
$address2 = mb_convert_kana($address2, 'a');
$email = mb_convert_kana($email, 'a');
$email2 = mb_convert_kana($email2, 'a');
$tel1 = str_replace(array('ー','ｰ'), array('-','-'), $tel1);
$tel2 = str_replace(array('ー','ｰ'), array('-','-'), $tel2);
$tel3 = str_replace(array('ー','ｰ'), array('-','-'), $tel3);
$tel1 = mb_convert_kana($tel1, 'a');
$tel2 = mb_convert_kana($tel2, 'a');
$tel3 = mb_convert_kana($tel3, 'a');
$kinkyu1 = str_replace(array('ー','ｰ'), array('-','-'), $kinkyu1);
$kinkyu2 = str_replace(array('ー','ｰ'), array('-','-'), $kinkyu2);
$kinkyu3 = str_replace(array('ー','ｰ'), array('-','-'), $kinkyu3);
$kinkyu1 = mb_convert_kana($kinkyu1, 'a');
$kinkyu2 = mb_convert_kana($kinkyu2, 'a');
$kinkyu3 = mb_convert_kana($kinkyu3, 'a');
$memo = mb_convert_kana($memo);

// テンプレート用に変数を設定する。
$smarty->assign('enc', $enc);

$smarty->assign('taikai', $taikai);
$smarty->assign('name', $name);
$smarty->assign('gender', $gender);
$smarty->assign('birthday_y', $birthday_y);
$smarty->assign('birthday_m', $birthday_m);
$smarty->assign('birthday_d', $birthday_d);
$smarty->assign('age', $age);
$smarty->assign('address1', $address1);
$smarty->assign('address2', $address2);
$smarty->assign('address3', $address3);
$smarty->assign('address4', $address4);
$smarty->assign('address5', $address5);
$smarty->assign('tel1', $tel1);
$smarty->assign('tel2', $tel2);
$smarty->assign('tel3', $tel3);
$smarty->assign('email', $email);
$smarty->assign('email2', $email2);
$smarty->assign('info', $info);
$smarty->assign('kinkyu1', $kinkyu1);
$smarty->assign('kinkyu2', $kinkyu2);
$smarty->assign('kinkyu3', $kinkyu3);
$smarty->assign('kinkyu_name1', $kinkyu_name1);
$smarty->assign('kinkyu_name2', $kinkyu_name2);
$smarty->assign('category', $category);
$smarty->assign('stance', $stance);
$smarty->assign('company', $company);
$smarty->assign('number', $number);
$smarty->assign('memo', $memo);
$smarty->assign('signing', $signing);


// エラー情報の配列。エラー有りで「true」とする。
$errors = array();

$errors['name'] = empty($name);
$errors['gender'] = empty($gender);
$errors['age'] = empty($age);

$errors['email'] = (empty($email)) ? true : !check_email($email);
$errors['email2'] = (empty($email2)) ? true : !check_email($email2);


$errors['address'] = !check_prefcode($address1, $address2) || empty($address3) || empty($address4) || empty($address5);

/*
if ($email != $email2) {
	$errors['email'] = true;
	$errors['email2'] = true;
}
*/

$errors['taikai'] = (bool)($taikai == '[Please choose the competition name]');
$errors['category'] = (bool)($category == '[Please choose the Category]');

$errors['stance'] = false;
if ($category == 'Male Snowboard' || $category == 'Female Snowboard'){
	$errors['stance'] = (bool)($stance == '[Please choose the Stance]');
}

$errors['tel'] = !check_tel($tel1); // && !check_tel($tel2) && !check_tel($tel3);
$errors['kinkyu'] = !check_tel($kinkyu1); // && !check_tel($kinkyu2) && !check_tel($kinkyu3);

$errors['kinkyu_name'] = empty($kinkyu_name1) || empty($kinkyu_name2);

$errors['company'] = empty($company);
$errors['number'] = empty($number);

$errors['memo'] = (bool)($memo == 'Please leave any comments, requests here.');

$errors['signing'] = empty($signing);

// エラーが無く、エンコーディングフラグがONの場合、メールを送信する。
if (!in_array(true, $errors) && $enc == 1)
{
	// セッションを削除する。
	delete_session();

	// メールを送信する。
	//$to = MAIL_TO.','.$email;
	$to = $email;
	$subject = '[Niseko HANAZONO Resort] HANAZONO FREESTYLE COMP ENTRY '.$name.'';
	$message .= "*This email has been sent to you automatically.\n";
	$message .= "\n";
	$message .= "Thank you for your entry into the tournament.\n";
	$message .= "\n";
	$message .= "<<<<<<<<<< Details of your booking >>>>>>>>>>\n";
	$message .= '[Sent] '. get_datetime() ."\n";
	$message .= "\n";
	$message .= '[Competition] '.$taikai."\n";
	$message .= '[Name] '.$name."\n";
	$message .= '[Sex] '.$gender."\n";
	$message .= '[DOB] '.$birthday_y.'/'.$birthday_m.'/'.$birthday_d.''."\n";
	$message .= '[Age] '.$age.''."\n";
	$message .= '[Address] (PO Code)'.$address1.'-'.$address2."\n";
	$message .= ' (Prefecture) '.$address3."\n";
	$message .= ' (City/Town Name) '.$address4."\n";
	$message .= ' (Street Address) '.$address5."\n";
	$message .= '[Phone] '.$tel1."\n";
	$message .= '[Email Address] '.$email."\n";
	$message .= '[Confirm Email Address] '.$email2."\n";
	$message .= '[Would you like to e-mail receive updates?] '.$info."\n";
	$message .= '[Emergency Contact(Phone)] '.$kinkyu1."\n";
	$message .= '[Emergency Contact Name] '.$kinkyu_name1."\n";
	$message .= '[Emergency Contact Relation] '.$kinkyu_name2."\n";
	$message .= '[Category] '.$category."\n";
	$message .= '[Stance] '.$stance."\n";
	$message .= '[Insurance Company Name] '.$company."\n";
	$message .= '[Insurance Number] '.$number."\n";
	$message .= '[Sponsors, Comments etc] '."\n".$memo."\n";
	$message .= '[Full Name] '.$signing."\n";
	$message .= "\n";
	$message .= "-- \n";
	$message .= "Nihon Harmony Resorts KK(Rafting Division)\n";
	$message .= "328-1 Aza-Iwaobetsu, Kutchan-cho Abuta-gun, Hokkaido, 044-0082\n";
	$message .= "Tel:0136-21-3333 Fax:0136-22-3884\n";
	$message = str_replace("\r\n", "\n", $message);
	$message = str_replace("\r", "\n", $message);
	$headers = 'From: '. MAIL_FROM;
	$headers .= "\n";
	$headers .= 'Bcc: '. MAIL_TO;
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
