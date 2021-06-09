/**
 * Created by yongchao.he on 2015/11/24,0024.
 * 针对QDR量身定做的插件
 */

$(function(){
    function GetQueryString(name)
    {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
    }
    function isConsole(){
        var url =  window.location.href;
        //console.log(url);
        var pat=/.*console$/;
        return pat.test(url);
    }
    function getPmoUrl(){
        var url =  document.referrer;
        //console.log(url);
        var pat=/^http:\/\/pmo\.corp\.qunar\.com\/browse\/.*?/;
        return pat.test(url) ? url : null ;
    }
    function makeprodurl(tags){
        try {
            tags = tags.split("\n").join(",");
            var url = window.location.href;
            var jobname = url.match(/job\/(.+?)\/([0-9]*[1-9][0-9]*)\/console/)[1];
            return "http://qdr.corp.qunar.com/job/" + jobname + "/build?tag_Name=" + tags;
        }catch (e){
            return null;
        }
    }
    _makeprodurl = function(){
        if(isConsole()){
            //循环执行，每隔1秒钟执行一次,直到出现tag或发布终止结束循环
            var makeprodurl_timeid = window.setInterval(function(){
                var outcontent = $("pre>b>span>span[style='background-color: #00FF00;']");
                var outpre = $("#out:contains('Finished')");
                var outpreconsole = $("pre.console-output:contains('Finished')");
                var outstr = outcontent.text();
                if(outstr){
                    var indexNum = outstr.indexOf("本次发布生成版本：\n")>=0?11:10;
                    var tags = outstr.substring(indexNum);
                    var produrl = makeprodurl(tags);
                    console.log(produrl);
                    if(produrl) {
                        console.log(tags);
                        outcontent.after("<br>可直接复制下述URL到测试申请：\n若OPS发布&nbsp;<a href='" + produrl + "' target='_blank'>" + produrl + "</a>");
                    }
                    window.clearInterval(makeprodurl_timeid);
                }else if(outpre||outpreconsole){
                    window.clearInterval(makeprodurl_timeid);
                }
            }, 1000);

        }
    };
    _parseprodurl = function(){
        var tag_name = GetQueryString("tag_Name");
        //处理发布线上的qdr的自动填充
        if(tag_name) {
            var super_branchs = $("input:hidden[value='super_branch']");
            var tag_names = $("input:hidden[value='tag_name']");
            if (super_branchs.length > 0) {
                //证明是delivery的job
                var tagnameArray = [];
                if(tag_name.indexOf(",")>0){
                    tagnameArray = tag_name.split(",");
                }
                super_branchs.each(function (i, td) {
                    $(td).next().val(tagnameArray.join("\n"));
                });
                var prod_option = $("option[value='prod']");
                prod_option.attr("selected", true);
                //xiaoxiang.wang说自动勾选有风险，先注释掉该功能
                /*tagnameArray.forEach(function(tag){
                    if(tag&&tag.indexOf(":")){
                        var module = tag.substring(0,tag.indexOf(":"));
                        //console.log(module);
                        $("input[value='"+module+"'][type='checkbox']").attr("checked", true)
                    }
                });*/
            } else if (tag_names.length > 0) {
                //证明是unit的job
                tag_names.each(function (i, td) {
                    $(td).next().val(tag_name);
                });
                var prod_checkbox = $("input[value='prod'][json='prod']");
                //console.log(prod_checkbox.length);
                prod_checkbox.attr("checked",true);
            }

            //自动填充tag_message
            var pmourl = getPmoUrl();
            if(pmourl){
                $("input[value='tag_message']:hidden").next().val(pmourl);
            }
        }
    };
    _makeprodurl();
    _parseprodurl();
});