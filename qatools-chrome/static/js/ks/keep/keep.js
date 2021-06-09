$(function(){
    console.log("加载keep插件");

    function addBtn() {
        setTimeout(function () {
            console.log("开始注入稳定性监测触发button");
            $("#emas-next-web").attr("color","red");
            debugger

            $("u:contains(打包成功)").each(function (index,item) {
                var packageDownloadBtn = $(item).parent().parent();
                var packageUrl = packageDownloadBtn.attr("href");
                var flag = packageUrl.endsWith(".apk") ? "Android" : "iOS";
                /*var dataV = "";
                $.each(packageDownloadBtn.data(), function(name,value) {
                    console.log(name, value);
                    dataV = name;
                });
                console.log("packageUrl:",packageUrl);
                $("button['data-"+dataV+"']:contains('IPA')").after()*/
                var stabilityTestBtn = $('<button type="button" class="el-popover__reference" style="margin-left: 5px;"><font color="green"><u>触发稳定性测试</u></font></button>');
                stabilityTestBtn.click(function () {
                    stabilityTestBtn.prepend('<span class="loader-07"></span>');
                    console.log("请求稳定性测试平台，包地址是：",packageUrl);
                    $.post("http://172.17.38.8:8001/trigJob",{
                        "plat": flag,
                        "package": packageUrl,
                        "user": "heyongchao"
                    },function(result){
                        console.log("触发稳定性测试接口返回的内容：",result);
                    }).success(function (result) {
                        console.log("触发稳定性测试接口返回的内容success：",result);
                    }).error(function (err) {
                        console.log("触发稳定性测试接口返回的内容error：",err);
                    }).complete(function () {
                        stabilityTestBtn.find('span.loader-07').remove();
                        console.log("触发稳定性测试接口结束");
                    });
                });
                packageDownloadBtn.after(stabilityTestBtn);
                packageDownloadBtn.parents("div.cell.el-tooltip").width("190px");
            })
            //$("div.cell.el-tooltip").width("175px");
            $("div.el-table__fixed-right").width("500px");
            $("col[name='el-table_2_column_13']").attr("width","200");
            console.log("注入稳定性监测触发button 结束");
        },5000);
    }
    function init() {
        console.log("刚进入页面第一次初始化");

        addBtn();

        var oldHash = window.location.hash;
        setInterval(function() {
            var ischanged = isHashChanged();  // TODO，检测hash值或其中某一段是否更改的函数
            if(ischanged) {
                hashChangeFire();  // TODO，对应新的hash执行的操作函数
            }
        }, 150);
        function hashChangeFire(){
            console.log("URL产生了变化，重新addBtn");
            addBtn();
        }
        function isHashChanged() {
            var newHash = window.location.hash;
            if(oldHash == newHash){
                return false;
            }else {
                oldHash = newHash;
                return true;
            }
        }
    }
    init();
});
