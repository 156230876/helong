!function() {
	chrome.extension.onRequest.addListener(
		function (data) {
			bookingurl = data.session_item_addressbarurl;
			init(bookingurl);
		}
	);

	function init(bookingurl) {
		if (bookingurl) {
			$("#bookingurl").val(bookingurl);
			var policyid = get_policyid(bookingurl);
			var otadomain = get_domain(bookingurl);
			if (policyid == "" || otadomain == "") {
				alert("你在耍我么，这根本不是touch的booking串！");
				return;
			}
			$("#policyid").val(policyid);
			$("#domain").val(otadomain);
			var policytype = getTypeByBookingUrl(bookingurl);
			var editurl = build_policy_edit_url(otadomain, policyid, policytype);
			$("#editurl").html('<a target="_blank" href="' + editurl + '">' + editurl + '</a>').show();
		}
	}

	function getOcpUrlFromRequest() {
		url = "";
		if (this.location.search.indexOf("?ocp=") == 0 && this.location.search.length > 6) {
			url = this.location.search.substring(5, this.location.search.length);
		}
		return url == "" && (url = null), unescape(url)
	}
	/**
	 * 获取指定的URL参数值
	 * URL:http://www.abc.com/index?name=yongchao.he
	 * 参数：paramName URL参数
	 * 调用方法:getParam("name")
	 * 返回值:yongchao.he
	 */
	function getParam(paramName) {
		var url = getOcpUrlFromRequest();
		paramValue = "", isFound = !1;
		if (url) {
			arrSource = url.substring(0, url.length).split("&"), i = 0;
			while (i < arrSource.length && !isFound) arrSource[i].indexOf("=") > 0 && arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase() && (paramValue = arrSource[i].split("=")[1], isFound = !0), i++
		}
		return paramValue == "" && (paramValue = null), paramValue
	}

	function get_policyid(bookingurl) {
		var touch_patt = /\$policyId=(.*?)\$/g;
		var touch_ids = touch_patt.exec(bookingurl);
		var pad_patt = /policyId\%3D(.*?)\%/g;
		var pad_ids = pad_patt.exec(bookingurl);
		return touch_ids && touch_ids[0] ? touch_ids[0].replace("$policyId=", "").replace("$", "") : (pad_ids && pad_ids[0] ? pad_ids[0].replace("policyId%3D", "").replace("%", "") : "");
	}

	function get_domain(bookingurl) {
		var patt = /\&domain=(.*?)\&/g;
		var ids = patt.exec(bookingurl);
		return ids && ids[0] ? ids[0].replace("&domain=", "").replace("&", "") : "";
	}

	function getTypeByBookingUrl(bookingurl) {
		if (!bookingurl)return "";
		var policytype = "";
		if (bookingurl.indexOf("&flightType=oneWay&") != -1) {
			policytype += "oneway_";
		} else if (bookingurl.indexOf("roundtooneway=true") != -1) {
			policytype += "round_";
		} else {
			policytype += "oneway_";
		}
		if (bookingurl.indexOf("isinterflight=1") == -1) {
			policytype += "gn";
		} else {
			policytype += "gj";
		}
		return policytype;
	}

	function build_policy_edit_url(otadomain, policyid, policytype) {
		var baseurl = "";
		var editurl = "";
		switch (policytype) {
			case "oneway_gn":
				baseurl = "http://fuwu.qunar.com/npolicy/policy/action/view";
				editurl = baseurl + "?domain=" + otadomain + "&act=3&ptype=2&id=" + policyid;
				break;
			case "round_gn":
				baseurl = "http://" + otadomain + "/tts/backAdmin/national/editRoundTripPolicy.jsp";
				editurl = baseurl + "?act=edit&id=" + policyid;
				break;
			case "oneway_gj":
				baseurl = "http://fuwu.qunar.com/npolicy/policy/action/view";
				break;
			case "round_gj":
				baseurl = "http://fuwu.qunar.com/npolicy/policy/action/view";
				break;
			default:
				baseurl = "http://fuwu.qunar.com/npolicy/policy/action/view";
		}
		return editurl;

	}

	var bookingurl = getOcpUrlFromRequest();
	init(bookingurl);
}();
