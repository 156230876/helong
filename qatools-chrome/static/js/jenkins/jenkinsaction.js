/**
 * Created by yongchao.he on 2015/9/10,0010.
 * Jenkins页面处理
 */
$(function() {
    function injectJenkins() {
        var url = window.location.href;
        //var reg = new RegExp("http://(bds|qdr).corp.qunar.com/.*?job/.*?/.*","");
        var regBds = new RegExp("http://bds.corp.qunar.com/.*?job/.*?/.*", "");
        var regQdr = new RegExp("http://qdr.corp.qunar.com/.*?job/.*?/.*", "");
        var regQdrUnit = new RegExp("http://qdr.corp.qunar.com/.*?job/unit.*", "");
        var regQdrDelivery = new RegExp("http://qdr.corp.qunar.com/.*?job/delivery.*", "");
        if (!regBds.test(url) && !regQdr.test(url))
            return false;
        if (regBds.test(url)) {
            doInjectJenkins('bds');
        }else{
            if(regQdrUnit.test(url)){
                doInjectJenkins('qdr_unit');
            }else if(regQdrDelivery.test(url)){
                doInjectJenkins('qdr_delivery');
            }else{
                doInjectJenkins('qdr');
            }
        }
        return true;
    }

    function doInjectJenkins(type) {
        $("#main-panel").delegate(".passphrase", "click", onPassphraseButtonClick);

        var tds = $(".setting-name:contains(passphrase)");
        tds.each(function (i, td) {
            var btn = $("<span/>").addClass("passphrase btn btn-xs btn-danger").text("passphrase");
            $(td).html($("<div/>").append(btn).html());
        });
        var tds_tag_message = $(".setting-name:contains(tag_message)");
        tds_tag_message.each(function (i, td) {
            var addhtm = "<select id='tag_message_select' style='width:300px' onchange='this.previousSibling.lastChild.value=this.options[this.selectedIndex].value;'>"
                + "<option value='' selected>1、正常需求/BUG发布：填写jira id或pmo url</option>"
                + "<option value='故障'>2、故障处理：填写“故障”</option>"
                + "<option value='wrapper'>3、wrapper发布：填写'wrapper'</option>"
                + "<option value='APP'>4、APP发版：填写'APP'</option>"
                + "<option value='配置文件'> 5、配置文件修改：填写'配置文件'</option>"
                + "<option value='特殊项目部'>6、特殊项目部的发布：填写'特殊项目部'</option>"
                + "<option value='其他'>7、其他上述未包含的情况：填写'其他'</option>"
                + "</select>";
            $(td).parent().children(".setting-main").append(addhtm);
        });

        var tds_online_operation = $(".setting-name:contains(online_operation)");
        tds_online_operation.each(function (i, td) {
            var addhtm = "<select id='online_operation_select' style='width:300px' onchange='this.previousSibling.lastChild.value=this.options[this.selectedIndex].value;'>"
                + "<option value='deploy' selected>deploy:正常发布</option>"
                + "<option value='restart_websrv'>restart_websrv:线上紧急操作，跳过代码部署，只是上下线、重启tomcat,告警开启等</option>"
                + "</select>";
            $(td).parent().children(".setting-main").append(addhtm);
        });

        $("body").append(""
            + '<div class="scroll" id="batch_num" style="display:none;width:140px;height:25px;background:#64BFAE;color:#fff;line-height:30px;text-align:center;position:fixed;right:30px;bottom:290px;cursor:pointer;font-size:14px;">batch_num</div>'
            + '<div class="scroll" id="server_List" style="display:none;width:140px;height:25px;background:#64BFAE;color:#fff;line-height:30px;text-align:center;position:fixed;right:30px;bottom:260px;cursor:pointer;font-size:14px;">server_List</div>'
            + '<div class="scroll" id="server_Listgroup" style="display:none;width:140px;height:25px;background:#64BFAE;color:#fff;line-height:30px;text-align:center;position:fixed;right:30px;bottom:230px;cursor:pointer;font-size:14px;">server_Listgroup</div>'
            + '<div class="scroll" id="build_Group" style="display:none;width:140px;height:25px;background:#64BFAE;color:#fff;line-height:30px;text-align:center;position:fixed;right:30px;bottom:200px;cursor:pointer;font-size:14px;">build_Group</div>'
            + '<div class="scroll" id="tag_Name" style="display:none;width:140px;height:25px;background:#64BFAE;color:#fff;line-height:30px;text-align:center;position:fixed;right:30px;bottom:170px;cursor:pointer;font-size:14px;">tagName</div>'
            + '<div class="scroll" id="passphrase" style="display:none;width:140px;height:25px;background:#64BFAE;color:#fff;line-height:30px;text-align:center;position:fixed;right:30px;bottom:140px;cursor:pointer;font-size:14px;">passphrase</div>'
            + '<div class="scroll" id="tag_message" style="display:none;width:140px;height:25px;background:#64BFAE;color:#fff;line-height:30px;text-align:center;position:fixed;right:30px;bottom:110px;cursor:pointer;font-size:14px;">tag_message</div>'
            + '<div class="scroll" id="scroll" style="display:none;width:140px;height:25px;background:#64BFAE;color:#fff;line-height:30px;text-align:center;position:fixed;right:30px;bottom:80px;cursor:pointer;font-size:14px;">回到顶部</div>'
            + '<div class="scroll" id="build_submit" style="display:none;width:140px;height:25px;background:orangered;color:#fff;line-height:30px;text-align:center;position:fixed;right:30px;bottom:50px;cursor:pointer;font-size:14px;">提交部署</div>'
        );
        addDomToPage(type);
    }

    function set_passphrase(passphrase_row) {
        /*chrome.storage.sync.get("opt_item_passphrase",function(item){
         passphrase = item.opt_item_passphrase;
         if( passphrase ){
         $(passphrase_row).find("input.setting-input").val(passphrase);
         }
         });*/
        baidu.feOption.getOptions(['opt_item_passphrase'], function (item) {
            passphrase = item["opt_item_passphrase"];
            if (passphrase) {
                $(passphrase_row).find("input.setting-input").val(passphrase);
            }
        });
    }

    function onPassphraseButtonClick() {
        var passphrase_row = $(this.parentNode.parentNode);
        passphrase = $(passphrase_row).find("input.setting-input[type=password]").val();
        if (passphrase == '') {
            set_passphrase(passphrase_row);
            $(this).text("   clear  ");
        } else {
            $(passphrase_row).find("input.setting-input[type=password]").val("");
            $(this).text("passphrase");
        }

    }

    function addDomToPage(type) {
        $('<style>').html('@-webkit-keyframes shineBlue {  from { -webkit-box-shadow: 0 0 7px #FFFFFF; }  50% { -webkit-box-shadow: 0 0 10px #0080FF; }  to { -webkit-box-shadow: 0 0 7px #FFFFFF; }  } .shine_blue{  -webkit-animation-name: shineBlue;   -webkit-animation-duration: 2s;  -webkit-animation-iteration-count: infinite;   }')
            .appendTo($('head'));
        $('div[class=scroll]').fadeIn();
        /*$(window).scroll( function() {
         var scrollValue=$(window).scrollTop();
         scrollValue > 100 ? $('div[class=scroll]').fadeIn():$('div[class=scroll]').fadeOut();
         } );*/
        if (type && type.indexOf("qdr")==0 ) {
            var unit = false;
            var delivery = false;
            if(type == "qdr_unit"){
                unit = true;
            }else if(type == "qdr_delivery"){
                delivery = true;
            }
            var batch_num_tds = $(".setting-name:contains(extra_params):visible");
            var extratd,tdnext,extra_params_textarea;
            batch_num_tds.each(function (i, td) {
                if ($(td).text() !== "extra_params")return;
                extratd = $(td);
                tdnext = extratd.next();
                extra_params_textarea = tdnext.find('textarea');
            });
            var _moveandchange = function(key){
                $(".shine_blue").removeClass("shine_blue");
                $("html,body").animate({scrollTop: extratd.offset().top - $(window).height() / 2}, 500);//1000是ms,也可以用slow代替
                tdnext.addClass("shine_blue");
                var oldval = extra_params_textarea.val();
                if(unit){
                    if(oldval==""){
                        extra_params_textarea.val("beta."+key+":");
                    }else if(oldval && oldval.indexOf("beta."+key+":")<0){
                        extra_params_textarea.val(oldval+"\n"+"beta."+key+":");
                    }
                }else if(delivery){
                    $('tr[id^="ecp_modules_"]>td>input').each(function(j,inp){
                        var moduleval = $(inp).val();
                        if(moduleval&&moduleval.indexOf("fe.")==0)return;
                        if(oldval==""){
                            extra_params_textarea.val(moduleval+"."+key+":");
                        }else if(oldval && oldval.indexOf(moduleval+"."+key+":")<0){
                            extra_params_textarea.val(oldval+"\n"+moduleval+"."+key+":");
                        }
                    });
                }
            };
            $('#batch_num').click(function () {
                _moveandchange("batch_num");
            });
            $('#server_List').click(function () {
                _moveandchange("server_list");
            });
            $('#server_Listgroup').click(function () {
                _moveandchange("server_listgroup");
            });
            $('#build_Group').click(function () {
                _moveandchange("build_group");
            });
            $('#tag_Name').click(function () {
                $(".shine_blue").removeClass("shine_blue");
                var batch_num_tds = $(".setting-name:contains(super_branch):visible");
                var batch_num_tds_2 = $(".setting-name:contains(tag_name):visible");
                if (batch_num_tds.length > 0) {
                    batch_num_tds.each(function (i, td) {
                        if ($(td).text() !== "super_branch")return;
                        $("html,body").animate({scrollTop: $(td).offset().top - $(window).height() / 2}, 500);//1000是ms,也可以用slow代替
                        //$(td).css('color','red');
                        $(td).next().addClass("shine_blue");
                    });
                } else if (batch_num_tds_2.length > 0) {
                    batch_num_tds_2.each(function (i, td) {
                        if ($(td).text() !== "tag_name")return;
                        $("html,body").animate({scrollTop: $(td).offset().top - $(window).height() / 2}, 500);//1000是ms,也可以用slow代替
                        //$(td).css('color','red');
                        $(td).next().addClass("shine_blue");
                    });
                }
            });
            $('#passphrase').click(function () {
                $(".shine_blue").removeClass("shine_blue");
                var batch_num_tds = $(".setting-name:contains(passphrase):visible");
                batch_num_tds.each(function (i, td) {
                    if ($(td).text() !== "passphrase")return;
                    $("html,body").animate({scrollTop: $(td).offset().top - $(window).height() / 2}, 500);//1000是ms,也可以用slow代替
                    //$(td).css('color','red');
                    $(td).next().addClass("shine_blue");
                });
            });
            $('#tag_message').click(function () {
                $(".shine_blue").removeClass("shine_blue");
                var batch_num_tds = $(".setting-name:contains(tag_message):visible");
                batch_num_tds.each(function (i, td) {
                    if ($(td).text() !== "tag_message")return;
                    $("html,body").animate({scrollTop: $(td).offset().top - $(window).height() / 2}, 500);//1000是ms,也可以用slow代替
                    //$(td).css('color','red');
                    $(td).next().addClass("shine_blue");
                });
            });

            tds_extra_params = $(".setting-name:contains(extra_params)");
            tds_extra_params.each(function (i, td) {
                var addhtm = "<p>"
                    + "排除指定机器举例：<br>"
                    + "flightfe.flight_site_new.server_list-=l-w1.f.cn1.qunar.com<br>"
                    + "只发指定机器举例：<br>"
                    + "​flightfe.flight_site_new.server_list:l-w1.f.cn1.qunar.com<br>"
                    + "</p>";
                $(td).parent().children(".setting-main").append(addhtm);
            });
        } else {
           /* var passphrase_td = $(".setting-name:contains(passphrase):visible");
            var tag_message_td = $(".setting-name:contains(tag_message):visible");
            var scroll_ids = "";
            $('div[class=scroll]').fadeIn();*/
            $('#batch_num').click(function () {
                $(".shine_blue").removeClass("shine_blue");
                var batch_num_tds = $(".setting-name:contains(batch_num):visible");
                batch_num_tds.each(function (i, td) {
                    if ($(td).text() !== "batch_num")return;
                    $("html,body").animate({scrollTop: $(td).offset().top - $(window).height() / 2}, 500);//1000是ms,也可以用slow代替
                    //$(td).css('color','red');
                    $(td).next().addClass("shine_blue");
                });
            });
            $('#server_List').click(function () {
                $(".shine_blue").removeClass("shine_blue");
                var batch_num_tds = $(".setting-name:contains(server_List):visible");
                batch_num_tds.each(function (i, td) {
                    if ($(td).text() !== "server_List")return;
                    $("html,body").animate({scrollTop: $(td).offset().top - $(window).height() / 2}, 500);//1000是ms,也可以用slow代替
                    //$(td).css('color','red');
                    $(td).next().addClass("shine_blue");
                });
            });
            $('#server_Listgroup').click(function () {
                $(".shine_blue").removeClass("shine_blue");
                var batch_num_tds = $(".setting-name:contains(server_Listgroup):visible");
                batch_num_tds.each(function (i, td) {
                    if ($(td).text() !== "server_Listgroup")return;
                    $("html,body").animate({scrollTop: $(td).offset().top - $(window).height() / 2}, 500);//1000是ms,也可以用slow代替
                    //$(td).css('color','red');
                    $(td).next().addClass("shine_blue");
                });
            });
            $('#build_Group').click(function () {
                $(".shine_blue").removeClass("shine_blue");
                var batch_num_tds = $(".setting-name:contains(build_Group):visible");
                batch_num_tds.each(function (i, td) {
                    if ($(td).text() !== "build_Group")return;
                    $("html,body").animate({scrollTop: $(td).offset().top - $(window).height() / 2}, 500);//1000是ms,也可以用slow代替
                    //$(td).css('color','red');
                    $(td).next().addClass("shine_blue");
                });
            });
            $('#tag_Name').click(function () {
                $(".shine_blue").removeClass("shine_blue");
                var batch_num_tds = $(".setting-name:contains(tag_Name):visible");
                batch_num_tds.each(function (i, td) {
                    if ($(td).text() !== "tag_Name")return;
                    $("html,body").animate({scrollTop: $(td).offset().top - $(window).height() / 2}, 500);//1000是ms,也可以用slow代替
                    //$(td).css('color','red');
                    $(td).next().addClass("shine_blue");
                });
            });
            $('#passphrase').click(function () {
                $(".shine_blue").removeClass("shine_blue");
                var batch_num_tds = $(".setting-name:contains(passphrase):visible");
                batch_num_tds.each(function (i, td) {
                    if ($(td).text() !== "passphrase")return;
                    $("html,body").animate({scrollTop: $(td).offset().top - $(window).height() / 2}, 500);//1000是ms,也可以用slow代替
                    //$(td).css('color','red');
                    $(td).next().addClass("shine_blue");
                });
            });
            $('#tag_message').click(function () {
                $(".shine_blue").removeClass("shine_blue");
                var batch_num_tds = $(".setting-name:contains(tag_message):visible");
                batch_num_tds.each(function (i, td) {
                    if ($(td).text() !== "tag_message")return;
                    $("html,body").animate({scrollTop: $(td).offset().top - $(window).height() / 2}, 500);//1000是ms,也可以用slow代替
                    //$(td).css('color','red');
                    $(td).next().addClass("shine_blue");
                });
            });

        }
        $('#scroll').click(function () {
            $(".shine_blue").removeClass("shine_blue");
            $("html,body").animate({scrollTop: 0}, 200);
        });
        $("#build_submit").click(function () {
            $("#yui-gen1-button").trigger("click");
            $(".shine_blue").removeClass("shine_blue");
            $("html,body").animate({scrollTop: 0}, 200);
        });
    }

//初始化
    injectJenkins();
});