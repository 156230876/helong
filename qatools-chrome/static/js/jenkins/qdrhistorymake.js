/**
 * qdr的发布历史规范化处理
 * Created by yongchao.he on 2015/10/4,0004.
 */
(function(){
    var _initBuildHistory = function(){
        $("div#buildHistory>div.pane-content>table>tbody>tr.build-row>td.build-row-cell>div.build-name>a.tip.model-link.inside").each(function(i,href){
            //console.log("href:"+href);
            var thisa = $(this).parent().siblings(".desc");
            $.get(href+"parameters", function(result){
                var htmlDoc = $.parseHTML( result );
                var super_branchs = $(htmlDoc).find('.setting-name:contains(super_branch)');

                if(super_branchs&&super_branchs.length>0) {
                    super_branchs.each(function (i, td) {
                        if ($(td).text() !== "super_branch")return;
                        var instr = $(td).next().find("textarea.setting-input").html();
                        //console.log("instr:"+instr);
                        if(!instr)return;
                        thisa.append("<br>IN:&nbsp;&nbsp;"+instr.replace(/[\r\n]/g, "<br>"));
                    });
                }

                var lib_versions = $(htmlDoc).find('.setting-name:contains(lib_versions)');
                if(lib_versions&&lib_versions.length>0) {
                    lib_versions.each(function (i, td) {
                        if ($(td).text() !== "lib_versions")return;
                        var instr = $(td).next().find("textarea.setting-input").html();
                        //console.log("instr:"+instr);
                        if(!instr)return;
                        thisa.append("<br>lib_versions:&nbsp;&nbsp;"+instr.replace(/[\r\n]/g, "<br>"));
                    });
                }
                //thisa.after("<br>Out:"+result);
            });
        });
        $("div#buildHistory>div.pane-content>table>tbody>tr.build-row>td.build-row-cell>div.desc a").each(function(i,href){
            //console.log("href:"+href);
            var thisa = $(this);
            thisa.parent().css("word-break","break-all");
            $.get(href, function(result){
                if(!result)return;
                thisa.after("<br>Out:&nbsp;&nbsp;"+result.replace(/[\r\n]/g, "<br>"));
            });
        });

    };
    //初始化
    _initBuildHistory();
}());