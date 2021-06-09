/**
 * Created by yongchao.he on 2015/9/10,0010.
 * 用户账户快捷切换插件
 */
//user.qunar.com处理
function activeButton(btn){
    btn.removeClass("btn-default");
    btn.addClass("btn-danger");
    var user_name = btn.attr("data-user_name");
    var password = btn.attr("data-password");
    $("input[name=username]").val(user_name);
    $("input[name=password]").val(password);
}

function disactiveButton(btn){
    btn.removeClass("btn-danger");
    btn.addClass("btn-default");
}

function onAccountButtonClick(){
    var btns = $("button.btn-danger");
    btns.each(function(idx,account){
        disactiveButton($(account));
    });
    activeButton($(this));
}

function doInjectUserCenter(){
    $("div.qn_right").delegate("button.account","click",onAccountButtonClick);
    baidu.feOption.getOptions(['opt_item_useraccount'],function(result){
        var accounts = result["opt_item_useraccount"];
        if( accounts && accounts instanceof Array && accounts.length>0){
            var container = $("<div class='btn-container'></div>");
            accounts.forEach(function(account){
                var name = account.alias;
                if( !name )
                    name = account.user_name;
                if( !name )
                    return;
                btn = $("<button></button>");
                btn.attr("class","btn btn-default btn-xs account");
                btn.attr("data-password",account.password);
                btn.attr("data-user_name",account.user_name);
                btn.text(name);
                if( account.is_default == true )
                    activeButton(btn);
                container.append(btn);
            });
            $("div.sina_tip").before(container);
        }
        var btns = $(".default");
        if( btns.length > 0 ){
            activeButton($(btns[0]));
        }
    });
    /*chrome.storage.sync.get("user_account",function(result){
     var accounts = result.user_account;
     if( accounts ){
     var container = $("<div class='btn-container'></div>");
     accounts.forEach(function(account){
     var name = account.alias;
     if( !name )
     name = account.user_name;
     if( !name )
     return;
     btn = $("<button></button>");
     btn.attr("class","btn btn-default btn-xs account");
     btn.attr("data-password",account.password);
     btn.attr("data-user_name",account.user_name);
     btn.text(name);
     if( account.is_default == true )
     activeButton(btn);
     container.append(btn);
     });
     $("div.sina_tip").before(container);
     }
     var btns = $(".default");
     if( btns.length > 0 ){
     activeButton($(btns[0]));
     }
     });*/
}
doInjectUserCenter();