<?php
/*
 * System name : TransmitMail
 * Description : 設定ファイル
 * Author : TAGAWA Takao (dounokouno@gmail.com)
 * License : MIT License
 * Since : 2010-11-19
 * Modified : 2011-10-16
*/

// ----------------------------------------------------------------
// 設定
// ----------------------------------------------------------------

// 送信先メールアドレス（カンマ区切りで複数の宛先を設定可能）
// ※複数の宛先を指定する場合は必ず「自動返信メールの送信元メールアドレス」を指定してください
// ※空の場合、自動返信メールの宛先にメールが送信されます
define('TO_EMAIL', 'raft@harmonyresorts.com,raft.nhr@gmail.com,raft@hanazononiseko.com');

// 送信メール件名
define('TO_SUBJECT', '[Niseko HANAZONO Resort] Online Booking Form');

// 自動返信（true=>yes, false=>no）
define('AUTO_REPLY', true);

// 自動返信メールの宛先（入力画面のname値）
define('AUTO_REPLY_EMAIL', 'EmailAddress');

// 自動返信メールの件名（空の場合は送信メール件名が設定されます）
define('AUTO_REPLY_SUBJECT', '[Niseko HANAZONO Resort] Online Booking Form [Auto Reply]');

// 自動返信メールの送信元メールアドレス（空の場合は送信先メールアドレスが設定されます）
define('AUTO_REPLY_FROM_EMAIL', 'raft@harmonyresorts.com');

// 自動返信メールの送信元メールアドレスの名前（空でも可）
define('AUTO_REPLY_NAME', 'Nihon Harmony Resorts KK(Rafting Division)');

// 拒否ホスト名またはIPアドレスを正規表現で記述（複数あれば「|」（パイプ）で区切る）
//  例1）前方一致は先頭に ^ をつける → ^192.168.1.*
//  例2）後方一致は末尾に $ をつける → *.example.jp$
//  例3）上記両方を設定する場合 → ^192.168.1.*|*.example.jp$
define('DENY_HOST', '');


// ----------------------------------------------------------------
// ※以下は必要な場合のみ編集してください
// ----------------------------------------------------------------

// エラー表示（On=>表示, Off=>非表示）
ini_set('display_errors', 'Off');

// ログファイル出力ディレクトリ
define('DIR_LOGS', './logs');

// 文字コード
define('CHARASET', 'UTF-8');
define('REG_OPTION', 'u');

// メールフォームプログラムファイル
define('MAILFORM_PROGRAM', 'index.php');

// メールフォームプログラム設置ディレクトリ
define('DIR_MAILFORM', str_replace(MAILFORM_PROGRAM, '', $_SERVER['PHP_SELF']));

// テンプレートファイル
define('TMPL_INPUT', 'input.html');		// 入力画面
define('TMPL_CONFIRM', 'confirm.html');	// 確認画面
define('TMPL_FINISH', 'finish.html');		// 完了画面
define('TMPL_ERROR', 'error.html');		// エラー画面

// 送信メール文章テンプレート
define('MAIL_BODY', './conf/mail_body.txt');							// 送信メール
define('MAIL_AUTO_REPLY_BODY', './conf/mail_autoreply_body.txt');	// 自動返信メール

// エラーメッセージ
define('ERROR_REQUIRED', ' : Field is required');
define('ERROR_HANKAKU', ' : Please enter single-byte character');
define('ERROR_HANKAKU_EISU', ' : Please enter alphanumeric');
define('ERROR_HANKAKU_EIJI', ' : Please enter alphabetic characters');
define('ERROR_NUM', ' : Please enter a number');
define('ERROR_NUM_HYPHEN', ' : Please enter a hyphen and number');
define('ERROR_HIRAGANA', ' : Please enter in hiragana');
define('ERROR_ZENKAKU_KATAKANA', ' : Please enter full-width katakana');
define('ERROR_HANKAKU_KATAKANA', ' : Please enter half-width katakana');
define('ERROR_ZENKAKU', ' : Please enter, including double-byte character');
define('ERROR_ZENKAKU_ALL', ' : Please enter double-byte characters all');
define('ERROR_EMAIL', ' : Please enter in the correct format');
define('ERROR_MATCH', ' : Does not match');
define('ERROR_EITHER', ' : The field is required to either');
define('ERROR_LEN', ' : Please enter a {文字数}-character');
define('ERROR_URL', ': Please enter in the format of the URL');
define('ERROR_DENY', 'Access from your host has been rejected by the administrator');
define('ERROR_FAILURE_SEND_MAIL', 'Failed to send mail');
define('ERROR_FAILURE_SEND_AUTO_REPLY', 'Failed to send auto-reply mail');

// 入力フォームパーツの属性
define('ATTR_CHECKED', 'checked="checked"');
define('ATTR_SELECTED', 'selected="selected"');

// セッション設定
define('DIR_TEMP', './temp');
session_name('TRANSMITMAILSESSID');
session_save_path(DIR_TEMP);
session_set_cookie_params(0, DIR_MAILFORM, $_SERVER['HTTP_HOST']);

?>
