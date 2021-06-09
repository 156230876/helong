
/*function injectUserCenter(tabId,tab){
	var url = tab.url;
	if( url.indexOf("https://user.qunar.com/passport/login.jsp") != 0 )
		return false;
	
	chrome.tabs.executeScript(tabId,{code:"doInjectUserCenter();"});
	return true;
}*/

/*function injectJenkins(tabId,tab){
	var url = tab.url;
	//var reg = new RegExp("http://(bds|qdr).corp.qunar.com/.*?job/.*?/.*","");
	var regBds = new RegExp("http://bds.corp.qunar.com/.*?job/.*?/.*","");
	var regQdr = new RegExp("http://qdr.corp.qunar.com/.*?job/.*?/.*","");
	if( !regBds.test(url) &&!regQdr.test(url))
		return false;
	if(regBds.test(url))
		chrome.tabs.executeScript(tabId,{code:"doInjectJenkins('bds');"});
	else
		chrome.tabs.executeScript(tabId,{code:"doInjectJenkins('qdr');"});
	return true;
}*/

var KEY, TIMER, URL, alertResponse, copy2Clipboard, copyResponse, createQR, createUrl, dwz, getOauth, googl, queryKd, readClipboard, shortenUrl, shortenUrlAlert, shortenUrlCopy, sinat, tabClose, urlcn;
queryKd = function (e, t, n, r) {
	var o;
	return o = new XMLHttpRequest, o.open("GET", "http://www.kuaidi100.com/autonumber/auto?num=" + e, true), o.setRequestHeader("Content-Type", "application/json"), o.onreadystatechange = function () {
		var s, a, l, c, u;
		if (4 === o.readyState && 0 !== o.status) {
			for (c = JSON.parse(o.responseText), u = [], s = 0, a = c.length; a > s; s++)l = c[s], u.push(show("http://www.kuaidi100.com/chaxun?com=" + l.comCode + "&nu=%s", e, t, n, r));
			return u
		}
	}, o.send(), 1
}, copy2Clipboard = function (e) {
	var t;
	return t = document.getElementById("url"), void 0 !== t ? (t.value = e, t.select(), document.execCommand("copy", !1, null)) : void 0
}, readClipboard = function () {
	var e;
	return e = document.getElementById("url"), void 0 !== e ? (e.select(), document.execCommand("paste"), e.value) : void 0
}, createUrl = function () {
	var e;
	return e = document.createElement("input"), e.type = "text", e.id = "url", document.body.appendChild(e)
}, createUrl(), createQR = function (e, t, n, r) {
	var o;
	return o = JU.lsGet("qr_size", 250), show("http://qr.liantu.com/api.php?w=" + o + "&text=%s", e, t, n, r)
}, qrcode.callback = function (e) {
	return /\w{3,}:\/\/*/.test(e) ? chrome.tabs.create({url: e}) : alert(e)
}, copyResponse = function (e) {
	return "error" === e.status ? alert("response error") : copy2Clipboard(e.message)
}, alertResponse = function (e) {
	return "error" === e.status ? alert("response error") : alert(e.message)
}, shortenUrlCopy = function (e, t, n, r) {
	return shortenUrl(e, !1, copyResponse)
}, shortenUrlAlert = function (e, t, n, r) {
	return shortenUrl(e, !1, alertResponse)
}, shortenUrl = function (e, t, n) {
	var r;
	switch (r = JU.lsGet("shorten", "googl")) {
		case"dwz":
			dwz(e, t, n);
			break;
		case"sinat":
			sinat(e, t, n);
			break;
		case"urlcn":
			urlcn(e, t, n);
			break;
		default:
			googl(e, t, n)
	}
	return ga("send", "event", "shorten", r)
}, urlcn = function (e, t, n) {
	var r, o;
	return o = new XMLHttpRequest, r = "http://open.t.qq.com/api/short_url/shorten?format=json&long_url=" + encodeURIComponent(e) + "&appid=801399639&openkey=898eab772e8dbd603f03c4db1963de93", o.open("GET", r, !1), o.onreadystatechange = function () {
		var e;
		return 4 === o.readyState && 0 !== o.status ? (e = JSON.parse(o.responseText), 102 === e.errcode ? alert(e.msg) : n({
			status: "success",
			message: "http://url.cn/" + e.data.short_url
		})) : void 0
	}, o.send()
}, sinat = function (e, t, n) {
	var r, o;
	return o = new XMLHttpRequest, r = "http://api.t.sina.com.cn/short_url/shorten.json?source=1144650722&url_long=" + encodeURIComponent(e), o.open("GET", r, !1), o.onreadystatechange = function () {
		var e;
		return 4 === o.readyState && 0 !== o.status ? (e = JSON.parse(o.responseText), 500 === e.error_code ? alert(e.error) : n({
			status: "success",
			message: e[0].url_short
		})) : void 0
	}, o.send()
}, dwz = function (e, t, n) {
	var r;
	return r = new XMLHttpRequest, r.open("POST", "http://dwz.cn/create.php", true), r.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), r.onreadystatechange = function () {
		var e;
		return 4 === r.readyState && 0 !== r.status ? (e = JSON.parse(r.responseText), n({
			status: "success",
			message: e.tinyurl
		})) : void 0
	}, r.send("url=" + encodeURIComponent(e))
}, googl = function (e, t, n) {
	var r, o;
	return r = getOauth().hasToken() && !t, o = new XMLHttpRequest, o.open("POST", URL + "?key=" + KEY, true), o.setRequestHeader("Content-Type", "application/json"), r && o.setRequestHeader("Authorization", oauth.getAuthorizationHeader(URL, "POST", {key: KEY})), o.onreadystatechange = function () {
		var e;
		return 4 === o.readyState && 0 !== o.status ? (e = JSON.parse(o.responseText), void 0 === e.id ? ("401" === e.error.code && oauth.clearTokens(), n({
			status: "error",
			message: e.error.message
		})) : n({status: "success", message: e.id, added_to_history: r})) : void 0
	}, o.send(JSON.stringify({longUrl: e}))
}, KEY = "AIzaSyAfKgyjoxWmR4RJyRhmk0X-J7q2WB9TbGA", TIMER = null, URL = "https://www.googleapis.com/urlshortener/v1/url", getOauth = function () {
	return window.OAUTH || (window.OAUTH = ChromeExOAuth.initBackgroundPage({
		request_url: "https://www.google.com/accounts/OAuthGetRequestToken",
		authorize_url: "https://www.google.com/accounts/OAuthAuthorizeToken",
		access_url: "https://www.google.com/accounts/OAuthGetAccessToken",
		consumer_key: "293074347131.apps.googleusercontent.com",
		consumer_secret: "2AtwN_96VFpevnorbSWK8czI",
		scope: "https://www.googleapis.com/auth/urlshortener",
		app_name: "Right search menu"
	})), window.OAUTH
}, tabClose = function (e, t, n, r) {
	return chrome.tabs.remove(t.id)
};
var createMenuItem, execute, getAllUrl, getCi18n, getContexts, getCustomUrl, getType, getValue, isCurrent, menuReset, openTab, openUrl, run, show, showPageAction, indexOf = [].indexOf || function (e) {
		for (var t = 0, n = this.length; n > t; t++)if (t in this && this[t] === e)return t;
		return -1
	};
run = true, chrome.contextMenus.onClicked.addListener(function (info, tab) {
	//监听右键菜单单击事件,并作出相应处理
	var n, r, o;
	return r = info.menuItemId[0],
		n = info.menuItemId.slice(1),
		r = getType(r),
		o = getValue(info, tab, r),
		openTab(n, r, o, tab);//打开tab页面
}), chrome.runtime.onStartup.addListener(function () {
	return run ? menuReset() : void 0
}), chrome.runtime.onInstalled.addListener(function () {
	var e, t, n, r, o;
	if (e = JU.lsGet("all", []),
		0 === e.length && JU.syncFetch("/init.json", function (json) {
			return JU.lsSet("all", JSON.parse(json)),
				ga("send", "event", "db", "ninit")
		}),
			t = getCi18n(), !JU.lsGet("run4", !1)) {
		r = t.getMessage("i18n"), JU.lsSet("en", true), "cn" === r ? (JU.lsSet("zh_CN", true), n = {
			txtSelect: ["baidu", "Baidu fanyi", "qr_txt"],
			picSelect: ["google_pic", "baidu_pic", "su_pic", "qr_decode"],
			linSelect: ["weibo_lin", "gmail_lin", "qr_lin"],
			menSelect: ["i_title"]
		}) : "tw" === r ? JU.lsSet("zh_TW", true) : "ru" === r && JU.lsSet("ru", true), n || (n = {
			txtSelect: ["bing", "translate", "Amazon_com"],
			picSelect: ["google_pic", "su_pic", "qr_decode"],
			linSelect: ["gmail_lin", "qr_lin"],
			menSelect: ["i_title"]
		});
		for (o in n)JU.lsSet(o, JU.lsGet(o, n[o]));
		chrome.tabs.create({
			url: "options.html",
			selected: true
		}), JU.lsSet("run4", true), ga("send", "event", "option", "init")
	}
	return menuReset()
}), getValue = function (info, tab, type) {
	//根据类型决定参数值
	return {men: tab.url, txt: info.selectionText, pic: info.srcUrl, lin: info.linkUrl}[type]
}, show = function (url, tab, back, incognito, x, type, value) {
	var l;
	return null == incognito && (incognito = !1), null == x && (x = !1), null == type && (type = 1), null == value && (value = "txt"), /%l|%L/g.test(url) && (url = url.replace(/%l|%L/g, encodeURIComponent(back.title))), /%s|%S/g.test(url) && (url = url.replace(/%s|%S/g, encodeURIComponent(tab))), /%g|%G/g.test(url) && (url = url.replace(/%g|%G/g, encodeToGbk(tab))), /%t|%T/g.test(url) && (url = url.replace(/%t|%T/g, encodeToBig5(tab))), /%p|%P/g.test(url) && (url = url.replace(/%p|%P/g, encodeURIComponent(readClipboard()))), /%u|%U/g.test(url) && back && (l = back.url.split("/")[2], url = url.replace(/%u|%U/g, l)),
		openUrl(url, back, incognito, x, type, value, tab)
}, openUrl = function (url, tab, back, incognito, x, type, value) {
	//打开URL
	var l;
	return null == back && (back = false),
	null == incognito && (incognito = false),
	null == x && (x = 1),
	null == type && (type = "txt"),
	null == value && (value = ""),
		//隐身窗口
	tab && (l = tab.index), x > 0 && l++, incognito ? (chrome.windows.create({
		url: url,
		incognito: true
	}), true) : (JU.lsGet("newPage", true) ? chrome.tabs.getAllInWindow(null, function (tabs) {
		var r, o, tab;
		for (r = 0, o = tabs.length; o > r; r++)
			if (tab = tabs[r], isCurrent(tab.url, url))
				return chrome.tabs.update(tab.id, {selected: !back}), void showPageAction(tab, type, value);
		return chrome.tabs.create({url: url, selected: !back, index: l}, function (tab) {
			return showPageAction(tab, type, value)
		}), true
	}) : chrome.tabs.create({url: url, selected: !back, index: l}, function (tab) {
		return showPageAction(tab, type, value)
	}), true)
}, showPageAction = function (tab, type, value) {
	//根据ID显示弹出选项
	return /http.+|ftp.+/.test(tab.url) ? chrome.tabs.executeScript(tab.id, {code: "document.head.setAttribute('data-c-m-type','" + type + "');" + ("document.head.setAttribute('data-c-m-v','" + value.replace("'", "\\'") + "');")}) : void 0
}, isCurrent = function (turl, url) {
	//判断是否是当前页面
	//return "options.html" === url && turl.indexOf("ogeehjahodjfdkenhdbiijlibdfeppgm") > 0 && 0 === turl.indexOf("chrome-extension") && turl.indexOf(url) > 0 ? true : url === turl
	return "options.html" === url && 0 === turl.indexOf("chrome-extension") && turl.indexOf(url) > 0 ? true : url === turl;
}, getType = function (e) {
	//获取类型,菜单类型
	var t, n, r, o;
	for (r = ["men", "txt", "pic", "lin"], t = 0, n = r.length; n > t; t++)if (o = r[t], e === o[0])return o;
	return "menu"
}, execute = function (id, value, tab, back, incognito) {
	//执行特殊命令 id, value, tab, back, incognito, x
	var inc, noInc;
	return noInc = {
		kd: queryKd,
		qr: createQR,
		qr_pic: createQR,
		qr_txt: createQR,
		qr_lin: createQR,
		qr_decode: qrcode.decode,
		tab_close: tabClose
	}, id in noInc && noInc[id](value, tab, back, incognito), inc = {
		su: shortenUrlCopy,
		su_lin: shortenUrlCopy,
		su_pic: shortenUrlCopy,
		su_alert: shortenUrlAlert,
		su_lin_alert: shortenUrlAlert,
		su_pic_alert: shortenUrlAlert
	}, id in inc ? inc[id](value, tab, back, incognito) : void 0
}, getCustomUrl = function (e, t) {
	var n, r, o;
	for (r = 0, o = e.length; o > r; r++)if (n = e[r], n[0] === t)return [n[1]];
	return []
}, getAllUrl = function (e, t) {
	var n;
	return n = JU.findArray(e, "c", t), n ? [n.u] : []
}, openTab = function (id, type, value, tab, o, fg) {
	//打开tab页面 id,类型,变量,tab,左右
	var a, l, c, u, i, d, p, g, m, h, f, U, w, v, y, x;
	for (null == o && (o = 1),
		 null == fg && (fg = null),
			 l = indexOf.call(JU.lsGet(type + "Back", []), id) >= 0,
			 g = indexOf.call(JU.lsGet(type + "Incognito", []), id) >= 0,
			 l = JU.lsGet("back", !1) ? !l : l, l = null !== fg ? fg : l,
			 a = JU.lsGet("all", []), x = getAllUrl(a, id),
			 c = JU.lsGet(type + "Custom", []),
			 x = x.concat(getCustomUrl(c, id)),
			 d = JU.lsGet(type[0] + "cGroup", []),
			 p = 0,
			 f = d.length;
		 f > p;
		 p++)
		if (u = d[p], u[0] === id)
			for (v = u[1], m = 0, U = v.length; U > m; m++)
				i = v[m],
					x = x.concat(getCustomUrl(c, i)),
					x = x.concat(getAllUrl(a, i));
	for (h = 0, w = x.length; w > h; h++)
		y = x[h], ga("send", "event", "menu", id), /:|.htm/.test(y) ? show(y, value, tab, l, g, o, type) : execute(y, value, tab, l, g, o);
	//execute(y, value, tab, l, g, o)特殊功能，例如QR码等
	return true
}, getCi18n = function () {
	var e;
	return indexOf.call(window, "ci18n") < 0 && (e = JU.lsGet("locale", navigator.language.replace("-", "_")), indexOf.call(LANGUAGE, e) < 0 && (e = "en"), window.ci18n = new JU.I18n2(TRANSLATIONS[e])), window.ci18n
}, menuReset = function () {
	//重置菜单
	var e;
	return run = !1, e = getCi18n(), chrome.contextMenus.removeAll(function () {
		var menus, n, menuid, o, size, a, menuname, names, types, selectedMenusIds, type, menu, regular;
		for (types = ["men", "txt", "pic", "lin"], n = 0, size = types.length; size > n; n++) {
			//创建菜单
			type = types[n];
			selectedMenusIds = JU.lsGet(type + "Select", []);
			"lin" === type && chrome.contextMenus.create({
				contexts: ["link"],
				type: "separator",
				id: "s_" + JU.getId()
			});
			menus = JU.lsGet("all", []);
			menusCustom = JU.lsGet("menCustom", []);
			names = JU.lsGet("names", {});
			//var popupMenu = [];
			for (o = 0, a = selectedMenusIds.length; a > o; o++) {
				menuid = selectedMenusIds[o];
				menu = JU.findArray(menus, "c", menuid); //从全量localStorage的all里面找到对应信息
				/*if(type==="popup"){
					popupMenu.push(menu);
					continue;
				}*/
				if(menu){//如果是null那就是自定义的喽
					menuname = e.getMessage(menuid); //获取menuname并赋值
					menuname || (menuname = menu.n); //判断menuname是否存在（是否undefined），如果存在则不进行后续赋值，如果不存在则赋值
					menu.c in names && (menuname = names[menu.c]); //当names包含menu.c的时候，才会进行后续赋值，（||则是只要前面为fasle才会执行后面的语句）
					//menu.r && typeof(menu.r) != "undefined" && (regular = menu.r);
					menu.r && typeof(menu.r) != "undefined" && (regular = menu.r);
					createMenuItem(menuid, menuname, type, regular);
				}else{
					//自定义的菜单，特殊处理
					regular = JU.findArrayCustom(menusCustom, 2, menuid);
					regular&&regular.length==0&&(regular=null);
					createMenuItem(menuid, menuid, type, regular);
				}
			}
			//if(popupMenu.length>0)createPopupMenus(popupMenu);
		}
		return console.debug("menu reset");
	})
}, getContexts = function (type) {
	//菜单类型，对应chrome.contextMenus.create的传参contexts: ['page', 'selection', 'editable', 'link'],
	return {men: "page", txt: "selection", pic: "image", lin: "link"}[type]
}, createMenuItem = function (id, name, type, regular) {
	//创建菜单
	var r, o, s, a, l, c, u;
	s = type[0] + id, u = JU.lsGet(type + "Incognito", []), o = JU.lsGet(type + "Back", []), c = indexOf.call(u, id) >= 0, c ? name = "☢ " + name : (r = indexOf.call(o, id) >= 0, r && (name = "₪ " + name));
	try {
		if(regular) {
			return chrome.contextMenus.create({
				title: name,
				contexts: [getContexts(type)],
				id: s,
				documentUrlPatterns: regular
			})
		}else{
			return chrome.contextMenus.create({
				title: name,
				contexts: [getContexts(type)],
				id: s
			})
		}
		/**
		 * documentUrlPatterns ( optional array of string )
		 * 这使得右键菜单只在匹配此模式的url页面上生效（这个对框架也适用）。详细的匹配格式见：模式匹配页面。
		 * http://open.chrome.360.cn/extension_dev/match_patterns.html
		 * targetUrlPatterns ( optional array of string )
		 * 类似于documentUrlPatterns，但是您可以针对img/audio/video标签的src属性和anchor标签的href做过滤。
		 */
	} catch (l) {
		return a = l, console.error(a)
	}
},createPopupMenus=function(popupMenu){
	var popupMenuList = [];
	if(popupMenu){
		var tmpArray = [];
		for(var i = 0;i<popupMenu.length; i++){
			tmpArray.push(popupMenu[i]);
			if((i+1)%11==0){
				popupMenuList.push(tmpArray);
				tmpArray = [];
			}
		}
		popupMenuList.push(tmpArray);
		/*var appElement = document.querySelector('[ng-controller=PopupCtrl]');
		var $scope = angular.element(appElement).scope();
		$scope.popupMenusArrayList = popupMenuList;
		$scope.$apply();*/
	}
}, chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	/**
	 * chrome.runtime.onMessage.addListener扩展接收消息
	 * chrome.runtime.onMessageExternal.addListener扩展间接收消息
	 */
	return chrome.tabs.getSelected(null, function (tab) {
		//超级拖拽功能实现，监听消息后的处理
		var n, r, o, s;
		return s = request.x,
			1 === request.x ? 1 === request.y ? (n = "2" === JU.lsGet("rb1", "2"),
				s = "1" === JU.lsGet("rb2", "2") ? -1 : 1) : (n = "2" === JU.lsGet("rt1", "1"),
				s = "1" === JU.lsGet("rt2", "2") ? -1 : 1) : 1 === request.y ? (n = "2" === JU.lsGet("lb1", "1"),
				s = "1" === JU.lsGet("lb2", "1") ? -1 : 1) : (n = "2" === JU.lsGet("lt1", "1"),
				s = "1" === JU.lsGet("lt2", "2") ? -1 : 1),
			n = 1 === request.y, "url" === request.cmd && (show(request.values, "", tab, n, !1, s),
			ga("send", "event", "drag", "url")),
			"txt" === request.cmd ? (
                r = JU.lsGet("txtSelect", ["baidu"])[0],
				o = request.values.trim(),
				JU.isUrl(o) ? (
                    JU.isProtocol(o) || (o = "http://" + o),
					openUrl(o, tab, n, !1, s),
					ga("send", "event", "drag", "url")
                ) : (
                    openTab(r, "txt", request.values, tab, s, n),
                        ga("send", "event", "drag", r)
                )
            ) : void 0
	})
}), run && menuReset();
var _gaq;
_gaq = _gaq || function (e, t, n, r, o, s, a) {
	var l;
	return window.ga = function () {
		return console.debug(arguments)
	}
}();









function injectFuwu(tabId,tab){
	var url = tab.url;
	var reg = new RegExp("http://fuwu.qunar.com/npolicy/policy/action/view.*","");
	if( !reg.test(url) )
		return false;

	chrome.tabs.executeScript(tabId,{code:"doInjectFuwu();"});
	return true;
}

/*function injectPmo(tabId,tab){
	var url = tab.url;
	var reg = new RegExp("http://pmo.corp.qunar.com/browse/.*?","");
	if( !reg.test(url) )
		return false;

	chrome.tabs.executeScript(tabId,{code:"doInjectPmo();"});
	return true;
}*/

var completeHandlers = [];
//completeHandlers.push(injectUserCenter);
//completeHandlers.push(injectJenkins);
completeHandlers.push(injectFuwu);
//completeHandlers.push(injectPmo); //迁移至manifest.json调用

function onComplete(tabId,tab){
	completeHandlers.forEach(function(handler){
		if( handler(tabId,tab) )
			return false;
	});
}


chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,tab){
	if( changeInfo.status && changeInfo.status == "complete" ){
		onComplete(tabId,tab);
	}
});

chrome.storage.onChanged.addListener(function(changes,areaName){
	console.log(areaName);
	console.log(changes);
});

var BgPageInstance = (function () {

	//各种元素的就绪情况
	var _readyState = {
		css: false,
		js: false,
		html: true,
		allDone: false
	};

	//侦测的interval
	var _detectInterval = null;

	//侦测就绪情况
	var _detectReadyState = function () {
		_detectInterval = window.setInterval(function () {
			if (_readyState.css && _readyState.js && _readyState.html) {
				_readyState.allDone = true;
				window.clearInterval(_detectInterval);
			}
		}, 100);
	};


	/**
	 * 执行前端FCPHelper检测
	 */
	var _doFcpDetect = function (tab) {
		//所有元素都准备就绪
		if (_readyState.allDone) {
			chrome.tabs.sendMessage(tab.id, {
				type: MSG_TYPE.BROWSER_CLICKED,
				event: MSG_TYPE.FCP_HELPER_DETECT
			});
		} else {
			//正在准备数据，请稍等...
			//显示桌面提醒
			baidu.feNotification.notifyText({
				message: "正在准备数据，请稍等..."
			});
		}
	};

	/**
	 * 执行栅格检测
	 */
	var _doGridDetect = function (tab) {
		chrome.tabs.sendMessage(tab.id, {
			type: MSG_TYPE.BROWSER_CLICKED,
			event: MSG_TYPE.GRID_DETECT
		});
	};

	/**
	 * 提醒层 缓存
	 * @type {Array}
	 */
	var _notificationCache = [];

	/**
	 * 查看页面wpo信息
	 */
	var _showPageWpoInfo = function (wpoInfo) {
		chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
			var tab = tabs[0];
			try {
				_notificationCache[tab.id].cancel();
			} catch (e) {
			}
			if (!wpoInfo) {
				baidu.feNotification.notifyText({
					message: "对不起，检测失败"
				});
			} else {
				if (window.webkitNotifications && webkitNotifications.createHTMLNotification) {
					baidu.feNotification.notifyHtml("template/qatools_wpo.html?" + JSON.stringify(wpoInfo));
				} else {
					chrome.tabs.create({
						url: "template/qatools_wpo.html?" + JSON.stringify(wpoInfo),
						active: true
					});
				}
			}
		});
	};

	/**
	 * 获取页面wpo信息
	 * @return {[type]}
	 */
	var _getPageWpoInfo = function () {
		chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
			var tab = tabs[0];
			//显示桌面提醒
			_notificationCache[tab.id] = baidu.feNotification.notifyText({
				message: "正在统计，请稍后...",
				autoClose: true
			});
			chrome.tabs.sendMessage(tab.id, {
				type: MSG_TYPE.GET_PAGE_WPO_INFO
			});
		});
	};

	/**
	 * 执行JS Tracker
	 * @private
	 * https://github.com/ChineseDron/Tracker
	 * http://ucren.com/tracker/docs/
	 */
	var _doJsTracker = function () {
		chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
			var tab = tabs[0];
			chrome.tabs.executeScript(tab.id, {
				code: "void function(t,r,a,c,k){t.tracker_type='bm';t.tracker_uid='fehelper';"
				+ "(k=t.TrackerGlobalEvent)?k.f(r):[(k=t[a]('script')).charset='utf-8',"
				+ "k.src='http://www.ucren.com/'+c+'/'+c+'.js?'+Math.random(),"
				+ "t.documentElement.appendChild(k)]}(document,'TrackerJSLoad','createElement','tracker') ",
				allFrames: false,
				runAt: 'document_end'
			});
		});
	};

	/**
	 * 代码压缩工具
	 * @private
	 */
	var _goCompressTool = function () {
		var url = "http://www.baidufe.com/fehelper/codecompress.html";
		chrome.tabs.query({windowId: chrome.windows.WINDOW_ID_CURRENT}, function (tabs) {
			var isOpened = false;
			var tabId;
			var reg = new RegExp("fehelper.*codecompress.html$", "i");
			for (var i = 0, len = tabs.length; i < len; i++) {
				if (reg.test(tabs[i].url)) {
					isOpened = true;
					tabId = tabs[i].id;
					break;
				}
			}
			if (!isOpened) {
				chrome.tabs.create({
					url: url,
					active: true
				});
			} else {
				chrome.tabs.update(tabId, {highlighted: true});
			}
		});
	};
	var _clearDnsCache = function () {
        var url = "chrome://net-internals/#dns";
        chrome.tabs.query({windowId: chrome.windows.WINDOW_ID_CURRENT}, function (tabs) {
            var isOpened = false;
            var tabId;
            for (var i = 0, len = tabs.length; i < len; i++) {
                if (tabs[i].url == url) {
                    isOpened = true;
                    tabId = tabs[i].id;
                    break;
                }
            }
            if (!isOpened) {
                chrome.tabs.create({
                    url: url,
                    active: true
                },function (tab) {
                    tabId = tab.id;
                });
            }else {
                chrome.tabs.update(tabId, {selected: true});
			}
        });
    };
	/**
	 * Qunar QA工具平台
	 * @private
	 */
	var _goQunarQATool = function () {
		var url = "http://qa.corp.qunar.com";
		chrome.tabs.query({windowId: chrome.windows.WINDOW_ID_CURRENT}, function (tabs) {
			var isOpened = false;
			var tabId;
			var reg = new RegExp("qa.corp.qunar.com[/]$", "i");
			for (var i = 0, len = tabs.length; i < len; i++) {
				if (reg.test(tabs[i].url)) {
					isOpened = true;
					tabId = tabs[i].id;
					break;
				}
			}
			if (!isOpened) {
				chrome.tabs.create({
					url: url,
					active: true
				});
			} else {
				chrome.tabs.update(tabId, {highlighted: true});
			}
		});
	};

	/**
	 * 创建或更新成功执行的动作
	 * @param evt
	 * @param content
	 * @private
	 */
	var _tabUpdatedCallback = function (evt, content) {
		return function (newTab) {
			if (content) {
				chrome.tabs.sendMessage(newTab.id, {
					type: MSG_TYPE.TAB_CREATED_OR_UPDATED,
					content: content,
					event: evt
				});
				if(content.indexOf("onekey_change_price|")==0)
				chrome.tabs.sendRequest(newTab.id, {
					"session_item_addressbarurl":content.substring(20,content.length)
				});
			}
		};
	};

	/**
	 * 打开对应文件，运行该Helper
	 * @param tab
	 * @param file
	 * @param txt
	 * @private
	 */
	var _openFileAndRun = function (tab, file, txt) {
		chrome.tabs.query({windowId: chrome.windows.WINDOW_ID_CURRENT}, function (tabs) {
			var isOpened = false;
			var tabId;
			var reg = new RegExp("^chrome.*" + file + ".html$", "i");
			for (var i = 0, len = tabs.length; i < len; i++) {
				if (reg.test(tabs[i].url)) {
					isOpened = true;
					tabId = tabs[i].id;
					break;
				}
			}
			if (!isOpened) {
				chrome.tabs.create({
					url: 'template/qatools_' + file + '.html',
					active: true
				}, _tabUpdatedCallback(file, txt));
			} else {
				chrome.tabs.update(tabId, {highlighted: true}, _tabUpdatedCallback(file, txt));
			}

		});
	};

	var _openUrlAndRun = function (tab, url, txt) {
		chrome.tabs.query({windowId: chrome.windows.WINDOW_ID_CURRENT}, function (tabs) {
			var isOpened = false;
			var tabId;
			var reg = new RegExp("^chrome.*" + url + "$", "i");
			for (var i = 0, len = tabs.length; i < len; i++) {
				if (reg.test(tabs[i].url)) {
					isOpened = true;
					tabId = tabs[i].id;
					break;
				}else if(tabs[i].url.indexOf(url)>=0){
					isOpened = true;
					tabId = tabs[i].id;
					break;
				}
			}
			if (!isOpened) {
				chrome.tabs.create({
					url: url,
					active: true
				}, _tabUpdatedCallback(url, txt));
			} else {
				chrome.tabs.update(tabId, {highlighted: true}, _tabUpdatedCallback(url, txt));
			}

		});
	};

	/**
	 * 根据给定参数，运行对应的Helper
	 */
	var _runHelper = function (config) {
		chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
			var tab = tabs[0];
			// 如果是采用独立文件方式访问，直接打开该页面即可
			if(config.targeturl){
				_openUrlAndRun(tab, config.targeturl);
			}else if (config.useFile == '1') {
				_openFileAndRun(tab, config.msgType);
			} else {
				switch (config.msgType) {
					//fcphelper检测
					case MSG_TYPE.FCP_HELPER_DETECT:
						_doFcpDetect(tab);
						break;
					//栅格检测
					case MSG_TYPE.GRID_DETECT:
						_doGridDetect(tab);
						break;
					//查看网页加载时间
					case MSG_TYPE.SHOW_PAGE_LOAD_TIME:
						_getPageWpoInfo();
						break;
					//js tracker
					case MSG_TYPE.JS_TRACKER:
						_doJsTracker();
						break;
					//代码压缩
					case MSG_TYPE.CODE_COMPRESS:
						_goCompressTool();
						break;
                    //清理Chrome的DNS缓存
                    case MSG_TYPE.CLEAR_DNS_CACHE:
                        _clearDnsCache();
                        break;
				}
			}
		});
	};

	/**
	 * 创建扩展专属的右键菜单
	 */
	var _createContextMenu = function () {
		_removeContextMenu();
		baidu.contextMenuId = chrome.contextMenus.create({
			title: "QaTools",
			contexts: ['page', 'selection', 'editable', 'link'],
			documentUrlPatterns:['http://*/*','https://*/*']
		});
		chrome.contextMenus.create({
			title: "Qunar QA工具平台",
			contexts: ['page', 'selection', 'editable'],
			parentId: baidu.contextMenuId,
			onclick: function (info, tab) {
				_goQunarQATool();
			}
		});
		chrome.contextMenus.create({
			type: 'separator',
			contexts: ['all'],
			parentId: baidu.contextMenuId
		});
		chrome.contextMenus.create({
			documentUrlPatterns:[
				"*://touch.qunar.com/*",
				"*://fuwutouch1.beta.qunar.com/*",
				"*://fuwutouch2.beta.qunar.com/*",
				"*://fuwutouch3.beta.qunar.com/*",
				"*://fuwutouch4.beta.qunar.com/*"
			],
			title: "操作变价",
			contexts: ['page', 'selection', 'editable'],
			parentId: baidu.contextMenuId,
			onclick: function (info, tab) {
				//window.sessionStorage.setItem("session_item_addressbarurl",tab.url);
				chrome.tabs.executeScript(tab.id, {
					code: '(' + (function () {
						return window.getSelection().toString();
					}).toString() + ')()',
					allFrames: false
				}, function (txt) {
					_openFileAndRun(tab, 'onekey_change_price', "onekey_change_price|"+tab.url);
				});

			}
		});
		chrome.contextMenus.create({
			type: 'separator',
			contexts: ['all'],
			parentId: baidu.contextMenuId
		});
		chrome.contextMenus.create({
			title: "JSON格式化",
			contexts: ['page', 'selection', 'editable'],
			parentId: baidu.contextMenuId,
			onclick: function (info, tab) {
				chrome.tabs.executeScript(tab.id, {
					code: '(' + (function () {
						return window.getSelection().toString();
					}).toString() + ')()',
					allFrames: false
				}, function (txt) {
					_openFileAndRun(tab, 'jsonformat', txt);
				});
			}
		});
		chrome.contextMenus.create({
			type: 'separator',
			contexts: ['all'],
			parentId: baidu.contextMenuId
		});
		chrome.contextMenus.create({
			title: "字符串编解码",
			contexts: ['page', 'selection', 'editable'],
			parentId: baidu.contextMenuId,
			onclick: function (info, tab) {
				chrome.tabs.executeScript(tab.id, {
					code: '(' + (function () {
						return window.getSelection().toString();
					}).toString() + ')()',
					allFrames: false
				}, function (txt) {
					_openFileAndRun(tab, 'endecode', txt);
				});
			}
		});
		chrome.contextMenus.create({
			type: 'separator',
			contexts: ['all'],
			parentId: baidu.contextMenuId
		});
		chrome.contextMenus.create({
			title: "生成二维码",
			contexts: ['page', 'selection', 'editable', 'link'],
			parentId: baidu.contextMenuId,
			onclick: function (info, tab) {
				chrome.tabs.executeScript(tab.id, {
					code: '(' + (function () {
						return window.getSelection().toString() || location.href;
					}).toString() + ')()',
					allFrames: false
				}, function (txt) {
					_openFileAndRun(tab, 'qrcode', txt);
				});
			}
		});
		chrome.contextMenus.create({
			type: 'separator',
			contexts: ['all'],
			parentId: baidu.contextMenuId
		});
		chrome.contextMenus.create({
			title: "代码格式化",
			contexts: ['page', 'selection', 'editable'],
			parentId: baidu.contextMenuId,
			onclick: function (info, tab) {
				chrome.tabs.executeScript(tab.id, {
					code: '(' + (function () {
						return window.getSelection().toString();
					}).toString() + ')()',
					allFrames: false
				}, function (txt) {
					_openFileAndRun(tab, 'codebeautify', txt);
				});
			}
		});
		chrome.contextMenus.create({
			type: 'separator',
			contexts: ['all'],
			parentId: baidu.contextMenuId
		});
		chrome.contextMenus.create({
			title: "代码压缩",
			contexts: ['page', 'selection', 'editable'],
			parentId: baidu.contextMenuId,
			onclick: function (info, tab) {
				_goCompressTool();
			}
		});
	};

	/**
	 * 移除扩展专属的右键菜单
	 */
	var _removeContextMenu = function () {
		if (!baidu.contextMenuId) return;
		chrome.contextMenus.remove(baidu.contextMenuId);
		baidu.contextMenuId = null;
	};

	/**
	 * 创建或移除扩展专属的右键菜单
	 */
	var _createOrRemoveContextMenu = function () {

		//管理右键菜单
		if (baidu.feOption.getOptionItem('opt_item_contextMenus') !== 'false') {
			_createContextMenu();
		} else {
			_removeContextMenu();
		}
	};

	/**
	 * 接收来自content_scripts发来的消息
	 */
	var _addExtensionListener = function () {
		chrome.runtime.onMessage.addListener(function (request, sender, callback) {
			//处理CSS的请求
			if (request.type == MSG_TYPE.GET_CSS) {
				//直接AJAX获取CSS文件内容
				baidu.network.readFileContent(request.link, callback);
			}
			//处理JS的请求
			else if (request.type == MSG_TYPE.GET_JS) {
				//直接AJAX获取JS文件内容
				baidu.network.readFileContent(request.link, callback);
			}
			//处理HTML的请求
			else if (request.type == MSG_TYPE.GET_HTML) {
				//直接AJAX获取JS文件内容
				baidu.network.readFileContent(request.link, callback);
			}
			//处理cookie
			else if (request.type == MSG_TYPE.GET_COOKIE) {
				baidu.network.getCookies(request, callback);
			}
			//移除cookie
			else if (request.type == MSG_TYPE.REMOVE_COOKIE) {
				baidu.network.removeCookie(request, callback);
			}
			//设置cookie
			else if (request.type == MSG_TYPE.SET_COOKIE) {
				baidu.network.setCookie(request, callback);
			}
			//CSS准备就绪
			else if (request.type == MSG_TYPE.CSS_READY) {
				_readyState.css = true;
			}
			//JS准备就绪
			else if (request.type == MSG_TYPE.JS_READY) {
				_readyState.js = true;
			}
			//HTML准备就绪
			else if (request.type == MSG_TYPE.HTML_READY) {
				_readyState.html = true;
			}
			//提取配置项
			else if (request.type == MSG_TYPE.GET_OPTIONS) {
				baidu.feOption.doGetOptions(request.items, callback);
			}
			//保存配置项
			else if (request.type == MSG_TYPE.SET_OPTIONS) {
				baidu.feOption.doSetOptions(request.items, callback);
				//管理右键菜单
				//_createOrRemoveContextMenu();
			}
			//保存当前网页加载时间
			else if (request.type == MSG_TYPE.CALC_PAGE_LOAD_TIME) {
				_showPageWpoInfo(request.wpo);
			}
			// 从popup中点过来的
			else if (request.type == MSG_TYPE.FROM_POPUP) {
				_runHelper(request.config);
			}

			return true;
		});
	};

	/**
	 * 初始化
	 */
	var _init = function () {
		_addExtensionListener();
		_detectReadyState();
		//_createOrRemoveContextMenu();
	};

	return {
		init: _init,
		runHelper: _runHelper
	};
})();

//初始化
BgPageInstance.init();
