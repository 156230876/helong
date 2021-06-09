/**
 * 桌面提醒
 */
baidu.feNotification = (function(){
	
	/**
	 * html式，可以简单的用查询变量传递参数
	 * @param {string} notify_file 提醒页面路径：相对路径
	 */
	var notifyHtml = function(notify_file) {
        if(!window.webkitNotifications) {
            return;
        }
	    var encode = encodeURIComponent;
	    var notification = webkitNotifications.createHTMLNotification(
	        chrome.extension.getURL(notify_file)
	    );
	    notification.show();

	    return notification;
	};

	/**
	 * 文本格式，可以设置一个图标和标题
	 * @param {Object} options
	 * @config {string} type notification的类型，可选值：html、text
	 * @config {string} icon 图标
	 * @config {string} title 标题
	 * @config {string} message 内容
	 */
	var notifyText = function(options){
        /*if(!window.webkitNotifications) {
            return;
        }*/
		if(!options.icon) {
			options.icon = "static/images/icon48.png";
		}
		if(!options.title) {
			options.title = "\u5C0F\u63D0\u793A";//ASCII
		}
		//创建提醒
		if(window.webkitNotifications) {
			var ntfi ;
			if (window.webkitNotifications.checkPermission() == 0) {
				ntfi = webkitNotifications.createNotification(
					chrome.runtime.getURL(options.icon),
					options.title,
					options.message
				);
				ntfi.display = function() {};
				ntfi.onerror = function() {};
				ntfi.onclose = function() {};
				ntfi.onclick = function() {this.cancel();};
				ntfi.replaceId = 'Meteoric';
				ntfi.show();
			} else {
				window.webkitNotifications.requestPermission($jy.notify);
			}
			//是否配置了自动关闭
			if(options.autoClose !== false) {
				// 显示完之后默认5秒关闭，具体还要看用户是否进行了自定义配置
				ntfi.ondisplay = function(e) {
					var userComstomNotificationTime = localStorage.getItem("opt_item_notification");
					var number = parseInt(userComstomNotificationTime);
					setTimeout(function() { ntfi.cancel(); }, number || 5000);
				}
			}
		}else if("Notification" in window){
			var notification ;
			// 判断是否有权限
			if (Notification.permission === "granted") {
				notification = new Notification(options.title, {
					body: options.message,
					icon: chrome.runtime.getURL(options.icon)
					//tag : {} // 可以加一个tag,实例化的notification的id
				});
			}
			//如果没权限，则请求权限
			else if (Notification.permission !== 'denied') {
				Notification.requestPermission(function(permission) {
					// Whatever the user answers, we make sure we store the
					// information
					if (!('permission' in Notification)) {
						Notification.permission = permission;
					}
					//如果接受请求
					if (permission === "granted") {
						notification = new Notification(options.title, {
							"icon": chrome.runtime.getURL(options.icon),
							"body": options.message
						});
					}
				});
			}
			//是否配置了自动关闭
			if(options.autoClose !== false) {
				// 显示完之后默认5秒关闭，具体还要看用户是否进行了自定义配置
				notification.onshow = function(e) {
					var userComstomNotificationTime = localStorage.getItem("opt_item_notification");
					var number = parseInt(userComstomNotificationTime);
					setTimeout(function() { notification.close(); }, number || 5000);
				}
			}
		}


	    return notification;
	};
	
	return {
		notifyHtml : notifyHtml,
		notifyText : notifyText
	};
})();




