<?php
/*
 * System name : TransmitMail
 * Description : 設定ファイル
 * Author : TAGAWA Takao (dounokouno@gmail.com)
 * License : MIT License
 * Since : 2010-11-19
 * Modified : 2014-09-08
*/

// ----------------------------------------------------------------
// 設定
// ----------------------------------------------------------------

// 送信先メールアドレス（カンマ区切りで複数の宛先を設定可能）
// ※複数の宛先を指定する場合は必ず「自動返信メールの送信元メールアドレス」を指定してください
define('TO_EMAIL', 'info@harmonyresorts.com,event.info.hanazono@gmail.com');

// CC送信先メールアドレス（空でも可）（カンマ区切りで複数の宛先を設定可能）
define('CC_EMAIL', '');

// BCC送信先メールアドレス（空でも可）（カンマ区切りで複数の宛先を設定可能）
define('BCC_EMAIL', '');

// 送信メール件名
define('TO_SUBJECT', '[Niseko HANAZONO Resort] HANAZONO FREESTYLE COMP ENTRY');

// 自動返信（true=>yes, false=>no）
define('AUTO_REPLY', true);

// 自動返信メールの宛先（入力画面のname値）
define('AUTO_REPLY_EMAIL', 'EmailAddress');

// 自動返信メールの件名（空の場合は送信メール件名が設定されます）
define('AUTO_REPLY_SUBJECT', '[Niseko HANAZONO Resort] HANAZONO FREESTYLE COMP ENTRY [Automatic reply]');

// 自動返信メールの送信元メールアドレス（空の場合は送信先メールアドレスが設定されます）
define('AUTO_REPLY_FROM_EMAIL', 'no-reply@harmonyresorts.com');

// 自動返信メールの送信元メールアドレスの名前（空でも可）
define('AUTO_REPLY_NAME', 'Nihon Harmony Resorts KK');

// セッションによる多重送信防止を利用する（true=>yes, false=>no）
define('SESSION', true);

// チェックモードを利用する（true=>yes, false=>no）
define('CHECK_MODE', true);

// ファイル添付機能を利用する（true=>yes, false=>no）
define('FILE', false);

// ファイル添付を許可する拡張子（カンマ区切りで複数の拡張子を設定可能）
//  例1）画像 → gif,jpg,jpeg,png
//  例2）Office系 → doc,docx,xls,xlsx,ppt,pptx
define('FILE_ALLOW_EXTENSION', 'gif,jpg,jpeg,tif,tiff,png,pdf,doc,docx,xls,xlsx,ppt,pptx');

// 1ファイルの上限サイズ（Byte）
//  例）512000Bytes = 500KB
define('FILE_MAX_SIZE', 2097152);

// ファイルの保存期間（秒）
//  例）30分 = 1800秒
define('FILE_RETENTION_PERIOD', 1800);

// 自動返信にファイル添付する（true=>yes, false=>no）
define('FILE_AUTO_REPLY', false);

// CSVファイルを出力（true=>yes, false=>no）
define('CSV_OUTPUT', false);

// 拒否ホスト名またはIPアドレスを正規表現で記述（複数あれば「|」（パイプ）で区切る）
//  例1）前方一致は先頭に ^ をつける → ^192.168.1.*
//  例2）後方一致は末尾に $ をつける → *.example.jp$
//  例3）上記両方を設定する場合 → ^192.168.1.*|*.example.jp$
define('DENY_HOST', '');


// ----------------------------------------------------------------
// 設定（外部SMTPサーバーを利用する場合）
// ----------------------------------------------------------------
// 外部SMTPサーバーを利用する（true=>yes, false=>no）
define('SMTP', false);

// 外部SMTPサーバーのホスト名
//  Gmailの場合）ssl://smtp.gmail.com もしくは tls://smtp.gmail. com
define('SMTP_HOST', '');

// 外部SMTPのポート番号
//  Gmailの場合）465
define('SMTP_PORT', '');

// 外部SMTPに接続するプロトコル（SMTP_AUTH, POP_BEFORE, SMTP）
//  Gmailの場合）SMTP_AUTH
define('SMTP_PROTOCOL', '');

// 外部SMTPに接続するユーザー名
//  Gmailの場合）username@gmail.com
define('SMTP_USER', '');

// 外部SMTPに接続するパスワード
define('SMTP_PASSWORD', '');


// ----------------------------------------------------------------
// ※以下は必要な場合のみ編集してください
// ----------------------------------------------------------------

// エラー表示（On=>表示, Off=>非表示）
ini_set('display_errors', 'Off');
error_reporting(E_ALL ^ E_STRICT ^ E_DEPRECATED);

// ログファイル出力ディレクトリ
define('DIR_LOGS', './logs');

// CSVファイル
define('CSV_FILE', 'data.csv');		// CSVのファイル名
define('CSV_ENCODE', 'SJIS-win');	// CSVのエンコード

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
define('ERROR_LEN', ' : Please enter a {文字数}-character');
define('ERROR_URL', ': Please enter in the format of the URL');
define('ERROR_NUM_RANGE', ' : Please enter a number in the range of {範囲}');
define('ERROR_FILE_EXTENSION', ' : The extension is not allowed');
define('ERROR_FILE_EMPTY', ' : Empty file');
define('ERROR_FILE_MAX_SIZE', '({ファイルサイズ}) : Size exceeded');
define('ERROR_FILE_UPLOAD', ' : Upload failed');
define('ERROR_FILE_REMOVE', ' : Could not delete');
define('ERROR_FILE_NOT_EXIST', ' : Not Found');
define('ERROR_FILE_OVER_THE_PERIOD', ' : Exceeded the temporary storage period');
define('ERROR_DENY', 'Access from your host has been rejected by the administrator');
define('ERROR_FAILURE_SEND_MAIL', 'Failed to send mail');
define('ERROR_FAILURE_SEND_AUTO_REPLY', 'Failed to send auto-reply mail');

// 入力フォームパーツの属性
define('ATTR_CHECKED', 'checked');
define('ATTR_SELECTED', 'selected');

// ライブラリディレクトリ
define('DIR_LIB', './lib');

// 一時保存ディレクトリ
define('DIR_TEMP', './temp');

// ファイルアップロード
define('FILE_NAME_PREFIX', 'file_');

// セッション設定
if (SESSION) {
	ini_set('session.save_handler', 'files');
	session_name('TRANSMITMAILSESSID');
	session_save_path(DIR_TEMP);
	session_set_cookie_params(0, DIR_MAILFORM, $_SERVER['SERVER_NAME']);
}
