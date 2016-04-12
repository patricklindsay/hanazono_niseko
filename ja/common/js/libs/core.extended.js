/*!
 * JavaScript Core Extended Library.
 *
 * Date: 11:18 2010/12/02
 */
Date.time = function () {
	return (new Date()).getTime();
};

String.prototype.quotemeta = function () {
	return this.replace(/\W/g, '\\$&');
};

String.prototype.zenkaku = function () {
	return this.replace(/(\w)/g, function ($0) {
		return String.fromCharCode($0.charCodeAt(0) + 65248);
	});
}

String.prototype.hankaku = function () {
	return this.replace(/([Ａ-Ｚａ-ｚ０-９＿＠＋－，．：；])/g, function ($0) {
		return String.fromCharCode($0.charCodeAt(0) - 65248);
	});
}

String.prototype.trim = function() {
	return this.replace(/(^\s+)|(\s+$)/g, '');
}

Array.prototype.asort = function (k) {
	this.sort(function (a, b) {
		return (a[k] > b[k]) ? 1 : -1;
	});
};

Array.prototype.arsort = function (k) {
	this.sort(function (a, b) {
		return (a[k] < b[k]) ? 1 : -1;
	});
};
