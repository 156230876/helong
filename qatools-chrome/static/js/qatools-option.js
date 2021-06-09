/**
 * Qatools配置项
 */
baidu.feOption = (function(){
	/**
	 * 将这些配置项保存到background-page，这样才能对每个页面生效
	 * @param {Object} items {key:value}
	 */
	var _saveOptionItemByBgPage = function(items){
		for(var key in items){
			if(items[key] && items[key] instanceof Array){
				window.localStorage.setItem(key,JSON.stringify(items[key]));
			}else{
				window.localStorage.setItem(key,items[key]);
			}

			//chrome.storage.local.set({key:items[key]});
		}
	};
	
	/**
	 * 从background-page获取配置项
	 * @param {Object} items ["",""]
	 * @return {key:value}
	 */
	var _getOptionItemByBgPage = function(items){
		var rst = {};
		for(var i = 0,len = items.length;i < len;i++){
			var valueArray =  window.localStorage.getItem(items[i]);
			if(!valueArray)continue;
			if(valueArray.indexOf("{")>-1){
				rst[items[i]] = JSON.parse(valueArray);
			}else{
				rst[items[i]] = valueArray;
			}
			/*chrome.storage.local.get(items[i],function(valueArray){
				rst[items[i]] = valueArray;
			});*/
        }
        return rst;
    };
	
	/**
	 * 向background-page发送请求，提取配置项
	 * @param {Object} items
	 * @param {Function} 回调方法
	 */
	var _goGetOptions = function(items,callback){
		chrome.extension.sendMessage({
			type : MSG_TYPE.GET_OPTIONS,
			items : items
		},callback);
	};
	
	/**
	 * 向background-page发送请求，保存配置项
	 * @param {Object} items
	 * @param {Object} callback
	 */
	var _goSetOptions = function(items){
		chrome.extension.sendMessage({
			type : MSG_TYPE.SET_OPTIONS,
			items : items
		});
	};
	
	/**
	 * 由background-page触发
	 * @param {Object} items
	 * @param {Object} callback
	 */
	var _doGetOptions = function(items,callback){
		if(callback && typeof callback == 'function'){
			callback.call(null,_getOptionItemByBgPage(items));
		}
	};
	
	/**
	 * 由background-page触发
	 * @param {Object} items
	 * @param {Object} callback
	 */
	var _doSetOptions = function(items){
		_saveOptionItemByBgPage(items);
	};
	
	/**
	 * 获取某一项配置
	 * @param {String} optName 配置参数名
	 */
	var _getOptionItem = function(optName){
		return _getOptionItemByBgPage([optName])[optName];
	};
	
	/**
	 * 保存启动项
	 */
	var _save_opt_form_start = function(){
		var items = {};
		items['opt_item_contextMenus'] = $('#opt_item_contextMenus').prop('checked');
		items['opt_item_notification'] = $('#opt_item_notification').val();
		_goSetOptions(items);
	};
	
	/**
	 * 显示启动项
	 */
	var _show_opt_form_start = function(){
		var optItems = [
			'opt_item_contextMenus',
			"opt_item_notification",
			"opt_item_passphrase"
		];
		_goGetOptions(optItems,function(opts){
			$.each(optItems,function(i,item){
				if(!opts[item])return true;
				if (i == 1 || i == 2) {
					$('#' + item).val(opts[item]);
				} else if (opts[item] === 'true') {
					$('#' + item).prop('checked', "checked");
				}
			});
		});
		//特殊处理
		load_user_account();
		/*var appinfo = chrome.app.getDetails();
		var version = appinfo.version;
		var getUpdateVersionUrl = "http://qa.corp.qunar.com/qatoolschrome/qatools/update.json";
		_httpGetJson(getUpdateVersionUrl,function(data){
			var lastVersion = data.lastversion;
			if(compareVersion(version,lastVersion)) {
				baidu.feNotification.notifyText({
					message: "检测到更新，最新版本" + lastVersion + "请到Chrome扩展程序界面操作更新！不过原则上重启浏览器会自动更新。"
				});
			}
		});*/

	};

	/**
	 * 判断是否需要更新,true为需要，false为不需要
	 */
	function compareVersion(oldVersion,lastVersion){
		if(!oldVersion||!lastVersion||oldVersion.length==0||lastVersion.length==0){
			return false; //不需要更新
		}
		var oldArr =(oldVersion+"").split("."); //字符分割
		var lastArr =(lastVersion+"").split(".");
		var index1 = 0,index2 = 0;
		while(index1 < oldArr.length && index2 < lastArr.length) {
			var number1 = oldArr[index1];
			var number2 = lastArr[index2];
			if(number1<number2)return true;
			index1 ++;
			index2 ++;
		}
		return false;
	}

	/**
	 * 保存Jenkins插件配置
	 */
	var _save_opt_form_jenkins = function(){
		var items = {};
		items['opt_item_passphrase'] = $('#opt_item_passphrase').val();
		_goSetOptions(items);
	};

	/**
	 * 保存userinfo插件配置
	 */
	var _save_opt_form_userinfo = function(){
		var items = {};
		var rows = [];
		$(".user_account_row").each(function(i,tr){
			var row = $(tr);
			var is_default = row.find(".default-account").prop("checked");
			var index = row.attr("data-index");
			var alias = row.find(".alias").val();
			var user_name = row.find(".user_name").val();
			var password = row.find(".password").val();
			rows.push({"index":index,"alias":alias,"user_name":user_name,"password":password,"is_default":is_default});
		});

		//chrome.storage.sync.set({"user_account":rows});
		items['opt_item_useraccount'] = rows;
		_goSetOptions(items);
	};
	function change_default_account(td){
		$(".default-account").each(function(i,b){
			$(b).prop("checked",false);
		});
		$(td).find(".default-account").prop("checked",true);
	}
	function render_user_account_row(index,alias_value,user_name_value,password_value,is_default_value){
		var is_default = "<td class='center default-account-td'><input type='radio' name='default-account' class='default-account'/></td>";
		var alias = "<td class='center'><input class='alias'/></td>";
		var user_name = "<td class='center'><input class='user_name'/></td>";
		var password = "<td class='center'><input type='password' class='password'/></td>";
		var btn = "<td class='center'><button class='btn btn-primary btn-sml delete_user_account'>删除</button></td>";
		var tr = $("<tr class='user_account_row'/>");

		tr.append(is_default).append(alias).append(user_name).append(password).append(btn);
		tr.attr("data-index",index);
		tr.find(".alias").val(alias_value);
		tr.find(".user_name").val(user_name_value);
		tr.find(".password").val(password_value);
		if( is_default_value == true ){
			tr.find(".default-account").prop("checked",true);
		}

		$("#user_center_table_body").append(tr);
	}

	function load_user_account(){
		var optItems = ["opt_item_useraccount"];
		_goGetOptions(optItems,function(opts){
			accounts = opts["opt_item_useraccount"];
			$("#user_center_table_body").html("");
			if( accounts && accounts instanceof Array && accounts.length>0 ){
				accounts.forEach(function(account){
					var is_default = account.is_default;
					var index = account.index;
					var alias = account.alias;
					var user_name = account.user_name;
					var password = account.password;
					render_user_account_row(index,alias,user_name,password,is_default);
				});
			}
		});
		/*chrome.storage.sync.get("opt_item_useraccount",function(result){
			var accounts = result.user_account;
			if( accounts ){
				accounts.forEach(function(account){
					var is_default = account.is_default;
					var index = account.index;
					var alias = account.alias;
					var user_name = account.user_name;
					var password = account.password;
					render_user_account_row(index,alias,user_name,password,is_default);
				});
			}
		});*/
	}

	/**
	 * 保存相应的表单配置
	 * @param {Object} form_id
	 */
	var _save = function(form_id){
		switch(form_id){
			case 'opt_form_start':
				//_save_opt_form_start();
				break;
			case 'opt_form_jenkins':
				_save_opt_form_jenkins();
				break;
			case 'opt_form_userinfo':
				_save_opt_form_userinfo();
				break;
			case '':

				break;
		}
		console.log("config save sucess");
	};
	
	/**
	 * 关闭配置页面
	 */
	var _closeTab = function(){
        chrome.tabs.query({active:true, currentWindow:true}, function (tabs) {
            var tab = tabs[0];
			chrome.tabs.remove(tab.id);
		});
	};

	//提示成功信息
	ShowSuccessMessage = function(message, life) {
		var time = 2000;
		if (!life) {
			time = life;
		}

		if ($("#tip_message").text().length > 0) {
			var msg = "<span>" + message + "</span>";
			$("#tip_message").empty().append(msg);
		} else {
			var msg = '<div id="tip_message"><span>' + message + '</span></div>';
			$("body").append(msg);
		}

		$("#tip_message").fadeIn(time);
		$("#tip_message").fadeOut(time)
		//setTimeout($("#tip_message").fadeOut(time), time);

	};

	//提示错误信息
	ShowErrorMessage = function(message, life) {
		ShowSuccessMessage(message, life);
		$("#tip_message span").addClass("error");
	};

	//ShowSuccessMessage("Hello success!", 5000); // 第二个参数life是指消息显示时间
	//ShowErrorMessage("Hello error!", 50000);
	
	/**
	 * 事件绑定
	 */
	var _bindEvent = function(){
		//左边的可选项菜单切换右边显示相应配置项或内容
		$('#fe-opt-list-item>li').click(function(e){
			var $this = $(this).siblings().removeClass('selected').end().addClass('selected');
			$($this.attr('data-content')).siblings().removeClass('selected').addClass('fe-hide').end().removeClass('fe-hide').addClass('selected');
		});

		//给添加用户按钮注册事件--用户中心快捷登录插件配置
		$("#add_user_center_account").click(function(){
			var rows = $(".user_account_row");
			var index;
			if( rows.length == 0 )
				index = 0;
			else
				index = parseInt($(rows[rows.length-1]).attr("data-index")) + 1;

			render_user_account_row(index,"","","","");

			//_save_opt_form_userinfo();
		});

		$("section.fe-opt-content.row").delegate("input,select","blur",function(){
			//当input失去焦点时触发对应form表单提交的submit事件
			var forms = $(this).parents("form");
			$.each(forms,function(i,formsubmit){
				//保存各个值
				_save($(formsubmit).attr('id'));
			});
		}).delegate("#user_center_table_body button.delete_user_account","click",function(){
			var row = $(this.parentNode.parentNode);
			var forms = row.parents("form");
			row.remove();
			$.each(forms,function(i,formsubmit){
				//保存各个值
				_save($(formsubmit).attr('id'));
			});
			//_save_opt_form_userinfo();
		}).delegate(".default-account-td","click",function(){
			change_default_account(this);
			//_save_opt_form_userinfo();
		});

	};

	/**
	 * 获取json数据
	 */
	var _httpGetJson = function(inurl,callback){
		var xhr = new XMLHttpRequest();
		xhr.open("GET", inurl, true);
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
				var resp = JSON.parse(xhr.responseText);
				callback(resp);
			}
		};
		xhr.send();
	};

	/**
	 *
	 */
	var _fixwindow = function(){
		var win_h = $(window).height();
		var right_h = $(".right.col-md-8").height();
		var content_h = win_h - 80 - 76 - 73; //-footer-pageheader-navbar
		$(".left.col-md-4").height(right_h>content_h?right_h:content_h);
	};

	/**
	 * 初始化各个配置项
	 */
	var _initOptions = function(){
		_show_opt_form_start();
	};
	
	/**
	 * 初始化
	 */
	var _init = function(){
		_bindEvent();
		_initOptions();
		_fixwindow();
	};
	
	return {
		init : _init,
		doSetOptions : _doSetOptions,
		doGetOptions : _doGetOptions,
		getOptionItem : _getOptionItem,
        getOptions : _goGetOptions,
        setOptions : _goSetOptions
	};
})();




