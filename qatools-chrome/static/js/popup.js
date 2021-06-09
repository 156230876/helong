
/*$("#parsebookingurl").click(function(){
	var bookingurl = $("#bookingurl").val();
	chrome.storage.sync.set({"bookingurl":bookingurl});
	var openurl = chrome.extension.getURL("template/qatools_onekey_change_price.html");
	window.open(openurl);
});*/

/*$("#save_pass_phrase").click(function(){
	var passphrase = $("#passphrase").val();
	chrome.storage.sync.set({"passphrase":passphrase});
});

function save_user_account(){
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

	chrome.storage.sync.set({"user_account":rows});
}*/



/**chrome.storage.sync.get("bookingurl",function(item){
	bookingurl = item.bookingurl;
	if( bookingurl ){
		$("#bookingurl").val(bookingurl);
	}
});
*/
/*
chrome.tabs.getSelected(null,
	function(w){
		//$("#bookingurl").val(w.url);
		window.sessionStorage.setItem("session_item_addressbarurl",w.url);
	}
);*/
