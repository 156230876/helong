/**
 * 弹出（下拉）页面
 */
$(function () {
    // 获取后台页面，返回window对象
    var bgPage = chrome.extension.getBackgroundPage();
    // 菜单点击以后执行的动作
    jQuery('ul.fe-function-list li').click(function (e) {
        var msgType = $(this).attr('data-msgtype');
        var isUseFile = $(this).attr('data-usefile');
        var targeturl = $(this).attr('data-targeturl');
        bgPage.BgPageInstance.runHelper({
            msgType: MSG_TYPE[msgType],
            useFile: isUseFile,
            targeturl: targeturl
        });
        window.close();
    });

    //获取版本展示
    var appinfo = chrome.app.getDetails();
    var version = appinfo.version;
    $("#version-popup").html("Ver." + version);
});

/** *
 * js-utils 2015-09-24
 * 模块工具类,用来初始化各模块视图、自定绑定事件以及其他辅助功能等
 * */
var JU;
JU = JU || {}, JU.lsGet = function (key, defaultvalue) {
    var value;
    return null == defaultvalue && (defaultvalue = !1), value = localStorage.getItem(key), value ? JSON.parse(value) : defaultvalue
}, JU.lsSet = function (key, value) {
    return localStorage.setItem(key, JSON.stringify(value))
};
/*var _gaq;
_gaq = _gaq || [], _gaq.push(["_setAccount", "UA-35761644-1"]), _gaq.push(["_trackPageview"]), function (e, t, n, r, a, i, u) {
    var c;
    return localStorage.analytics ? (c = document.createElement("script"), c.type = "text/javascript", c.async = !0, c.src = "https://ssl.google-analytics.com/ga.js", t = document.getElementsByTagName("script")[0], t.parentNode.insertBefore(c, t), window.ga = function (e, t, n, r) {
        return n ? _gaq.push(["_trackEvent", n, r]) : void 0
    }) : window.ga = function () {
        return console.debug(arguments)
    }
}(window, document, "script", "https://www.google-analytics.com/analytics.js", "ga"), ga("create", "UA-35761644-1"), ga("send", "pageview");*/
var _gaq;
_gaq = _gaq || function (e, t, n, r, o, s, a) {
        var l;
        return window.ga = function () {
            return console.debug(arguments)
        }
    }();
var app, ctrls, utilsDirectives;
app = angular.module("popup", ["pascalprecht.translate", "popup.controllers", "utils.directives","LocalStorageModule"]), ctrls = angular.module("popup.controllers", []), utilsDirectives = angular.module("utils.directives", []), app.config(["$translateProvider", function (e) {
    var t, n, r, a, i, u;
    for (r in TRANSLATIONS.zh_CN)for (t = 0, i = LANGUAGE.length; i > t; t++)a = LANGUAGE[t], r in TRANSLATIONS[a] || (TRANSLATIONS[a][r] = r);
    for (n = 0, u = LANGUAGE.length; u > n; n++)a = LANGUAGE[n], e.translations(a, TRANSLATIONS[a]);
    return e.registerAvailableLanguageKeys(LANGUAGE, {
        "zh-cn": "zh_CN",
        "zh-tw": "zh_TW",
        en: "en",
        ru: "ru"
    }).determinePreferredLanguage().fallbackLanguage("en"), e.useSanitizeValueStrategy("escaped")
}]);
var lsGet, indexOf = [].indexOf || function (e) {
        for (var t = 0, n = this.length; n > t; t++)if (t in this && this[t] === e)return t;
        return -1
    };
lsGet = function (e, t) {
    return null == t && (t = e), e in localStorage ? JSON.parse(localStorage[e]) : t
}, ctrls.controller("PopupCtrl", ["$scope", "$translate","localStorageService", function (e, t, localstorage) {
    //localstorage.set("popupMenu",[{"C":"i_title","T":"all","M":"MEN","U":"template/options/options.html","L":"all","H":"这个是简介","K":"筑梦者","R":["http://*/*","https://*/*","ftp://*/*"],"V":36}]);
    var n,
        popupMenu = [],//= localstorage.get("popupMenu"),
        popupMenuList = [],
        menus, menuid, o, size, a, menuname, names, types, selectedMenusIds,
        type = "popup", menu, regular,menusCustom;
    selectedMenusIds = JU.lsGet(type + "Select",[]);
    menus = JU.lsGet("all", []);
    menusCustom = JU.lsGet(type + "Custom", []);
    names = JU.lsGet("names", {});
    for (o = 0, a = selectedMenusIds.length; a > o; o++) {
        menuid = selectedMenusIds[o];
        console.log(menuid);
        menu = JU.findArray(menus, "c", menuid); //从全量localStorage的all里面找到对应信息
        if(!menu){
            for(var p = 0;p<menusCustom.length;p++){
                if($.isArray(menusCustom[p])){
                    var menuCustom = menusCustom[p];
                    if(menuCustom[0] == menuid){
                        menu = {"n":menuCustom[0],"c":menuCustom[0],"t":"all","m":"POPUP","u":menuCustom[1],"l":"all","h":menuCustom[0],"k":"筑梦者","v":0,"r":menuCustom[2]};
                    }
                }
            }
        }
        menu && popupMenu.push(menu);
    }
    if(popupMenu&&popupMenu.length>0){
        console.log(JSON.stringify(popupMenu));
        var tmpArray = [];
        for(var i = 0;i<popupMenu.length; i++){
            tmpArray.push(popupMenu[i]);
            if((i+1)%11==0){
                popupMenuList.push(tmpArray);
                tmpArray = [];
            }
        }
        popupMenuList.push(tmpArray);
    }
    console.debug("popupmenu reset");
    //console.log(JSON.stringify(popupMenu));
    e.popupMenusArrayList = popupMenuList;
    return ga("send", "event", "popup", "open"), n = lsGet("locale", ""), n || (n = navigator.language.replace("-", "_")), indexOf.call(LANGUAGE, n) < 0 && (n = "en"), t.use(n), e.text = "", e.btns = [], e.defaultSearch = function () {
        return e.btns.length > 0 ? e.search(e.btns[0].id) : void 0
    }, e.read = function (t, n) {
        var r, a, i, u, c, o, s, l, p, d, g, v, f, h, m, y, A;
        for (e.text = n, e.type = t, i = lsGet(t + "Back", []), p = lsGet(t + "Incognito", []), m = lsGet(e.type + "Select", []), u = lsGet(t + "Custom", []), c = lsGet(t[0] + "cGroup", []), A = lsGet("all", []), h = lsGet("names", {}), o = 0, g = m.length; g > o; o++) {
            for (s = m[o], r = !0, d = 0, v = A.length; v > d; d++)y = A[d], y.c === s && (r = !1, f = s, f || (f = y.n), y.c in h && (f = h[y.c]));
            r && (f = s), f || (f = s), l = indexOf.call(p, s) >= 0, l ? f = "☢ " + f : (a = indexOf.call(i, s) >= 0, a && (f = "₪ " + f)), e.btns.push({
                id: s,
                name: f
            })
        }
        return e.$apply()
    }, chrome.tabs.query({active: !0, windowId: chrome.windows.WINDOW_ID_CURRENT}, function (t) {
        var n;
        return n = t[0].id, /http.+|ftp.+/.test(t[0].url) ? chrome.tabs.executeScript(n, {code: '[document.head.getAttribute("data-c-m-t"),document.head.getAttribute("data-c-m-v")]'}, function (t) {
            return t && t[0] && t[0][0] ? e.read(t[0][0], t[0][1]) : chrome.tabs.executeScript(n, {code: 'var _v;var _t=document.body.getElementsByTagName("input");for(var i in _t){if(_t[i].type=="text"){_v=_t[i].value;break;}}_v;'}, function (t) {
                var n;
                return n = "", t && t[0] && (n = t[0]), e.read("txt", n)
            })
        }) : e.read("txt", "")
    }), e.search = function (t) {
        return chrome.tabs.getSelected(null, function (n) {
            return chrome.runtime.getBackgroundPage(function (r) {
                return r.openTab(t, e.type, e.text, !1, n)
            })
        }), ga("send", "event", "popup", t)
    }, 1
}]), utilsDirectives.directive("enter", function () {
    return function (e, t, n) {
        return t.bind("keydown", function (t) {
            var r;
            return 13 === t.keyCode ? n.enter ? e.$apply(n.enter) : (t.preventDefault(), r = $("input").index(this) + 1, $("input:eq(" + r + ")").focus()) : void 0
        })
    }
}), utilsDirectives.directive("integer", function () {
    var e;
    return e = /^\-?\d*$/, {
        require: "ngModel", link: function (t, n, r, a) {
            return a.$parsers.unshift(function (t) {
                return e.test(t) ? (a.$setValidity("integer", !0), t) : void a.$setValidity("integer", !1)
            })
        }
    }
}), utilsDirectives.directive("json", function () {
    return {
        replace: !0, template: "<span>{{ value }}</span>", restrict: "E", link: function (e, t, n) {
            var r, a;
            if (r = n.url) {
                a = new XMLHttpRequest, a.open("GET", chrome.extension.getURL(r)), a.onreadystatechange = function () {
                    var t;
                    return 4 === this.readyState && this.responseText && (t = n.key) ? e.value = JSON.parse(this.responseText)[t] : void 0
                };
                try {
                    return a.send()
                } catch (i) {
                }
            }
        }
    }
});

