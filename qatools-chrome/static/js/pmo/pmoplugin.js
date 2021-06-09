/**
 * Created by yongchao.he on 2015/9/10,0010.
 * PMO插件
 * {
      "matches":["http://pmo.corp.qunar.com/browse/*"],
      "js":["static/js/pmo/pmoplugin.js"],
      "css":["static/css/qatools-pmo.css"],
      "run_at":"document_end"
    },
 */

function doInjectPmo(){
    winLoad();
    var searchinput = "";
    var isDatong = false;
    var $body = $('body');
    var jiraid = $('meta[name="ajs-issue-key"]').attr("content");
    var username = $('meta[name="ajs-remote-user"]').attr("content");
    $("table.confluenceTable>tbody>tr:first-child").nextAll("tr").each(function(){
        var gitssh = $(this).children("td:first").text();
        console.log("gitssh:"+gitssh);
        var branch = $(this).children("td:eq(1)").text();
        console.log("branch:"+branch);
        var betajobname = $(this).children("td:eq(8)").children('a').text();
        console.log("betajobname:"+betajobname);
        addButton(gitssh,branch,betajobname);
        isDatong = true;
    });
    if(!isDatong) {
        $("#customfieldmodule a").each(function () {
            var v = $(this).attr("href");
            if (v && v.indexOf("svn.corp.qunar.com") > -1 || v.indexOf("gitlab.corp.qunar.com/") > -1) {
                //codelist += v+",";
                //$(this).after("<button>一键发布</button>");
                searchinput = v;
                var firSplit = searchinput.indexOf("/branches/");
                var firSplitgit = searchinput.indexOf("gitlab.corp.qunar.com/");
                var firSplittree = searchinput.indexOf("/tree/");
                var branch = "";
                var codeuri = searchinput;
                if (firSplit >= 0) {
                    console.log("searchinput包含'/branches/',认为是svn路径");
                    branch = searchinput.substring(firSplit + 10);
                    codeuri = searchinput.substring(0, firSplit);
                } else if (firSplitgit >= 0) {
                    console.info("searchinput包含'gitlab.corp.qunar.com/',认为是git路径");
                    if (firSplittree >= 0)branch = searchinput.substring(firSplittree + 6);
                    codeuri = searchinput.substring(firSplitgit, firSplittree);
                    codeuri = "git@" + codeuri.replace(".qunar.com/", ".qunar.com:") + ".git";
                }
                addButton(codeuri);
            }
        });
        var customfield_10685text = $("#customfield_10685-val").text();
        var re = /(git@gitlab.corp.qunar.com:.*?.git)/g;
        while (arr = re.exec(customfield_10685text)) {
            //codelist += arr[1] + ",";
            addButton(arr[1]);
        }
    }

    //todo:
    var pmo_status = ["已发布","已关闭","Done","Resolved"];
    $("body").delegate('.trigger-label,#edit-issue-submit,#issue-workflow-transition-submit','click',function(){
        var text = $.trim($("#status-val span").html());
        if($.inArray(text, pmo_status)>=0){
            console.log('已发布');
            var updateoccupying_url="http://qa.corp.qunar.com/easypublish/api/updateoccupying.shtmlasda";
            var action = "unlock";
            var envoptions = (function(){
                var envoptionstr = "";
                $.each($(".qatools-envoption"),function(option){
                    if(typeof($(option).attr("occid"))!="undefined")envoptionstr+=(","+$(option).data("occid"));
                });
                return envoptionstr;
            }());
            console.log(envoptions);
            var formdata = {from:"qatools",action:action,id:occupyinguuid};
            $.ajax({
                type:"post",//请求方式
                url:updateoccupying_url,//发送请求地址
                data:formdata,
                beforeSend:function() {
                },
                complete:function(data) {
                    layer.close(layerLoad);
                },

                timeout:3000,//超时时间：3秒
                dataType:"json",//设置返回数据的格式
                //请求成功后的回调函数 data为json格式
                success:function(json){
                    if (json.ret && json.ret == true) {
                        if (json.status) {
                            //var index = layer.getIndex(this);
                            $.each(json.data, function (key, occupyingLists) {
                                $.each(occupyingLists.occupyingList, function (key, occupyingList) {
                                    batch_occupying_checkboxs.closest("table").each(function(){
                                        var envthis = $(this);
                                        //log(envthis.data("uuid")+'|'+occupyingList.uuid);
                                        if(envthis.data("uuid")==occupyingList.uuid) {
                                            if(occupyingList.status){
                                                envthis.find("tbody>tr").css("background-color","#d5d5d5");
                                            }else{
                                                envthis.find("tr").removeAttr("style");
                                            }
                                            $.each(occupyingLists.buildhistory,function(key,data){
                                                var builduuid = data.uuid;
                                                var buildbatch = data.buildbatch;
                                                if(builduuid&&builduuid!=''){
                                                    log("builduuid:"+builduuid);
                                                    envthis.find("thead>thead a[name='occupying_rebuild_a']").data("builduuid",builduuid)
                                                        .data("buildbatch",buildbatch);
                                                }
                                            });
                                            envthis.find("td").html(doEachTdOccupying(occupyingList, occupyingLists.buildhistory));
                                        }
                                    });
                                });
                            });
                            $('#myModal-batch-occupying-cancel-content').modal('hide');
                            layer.msg('Congratulations！您已成功解除对该套环境的占用。', 4, {type: 9, rate: 'bottom', shade: [0]});
                        } else {
                            layer.msg('Sorry，环境解除占用失败，请重试！', 4, {type: 8, rate: 'bottom', shade: [0]});
                        }
                    } else {
                        layer.msg('Sorry，环境解除占用失败，请重试！', 5, {type: 8, rate: 'bottom', shade: [0]});
                    }
                },
                //请求出错的处理
                error:function(){
                    layer.msg('Sorry，环境解除占用失败，请重试！', 5, {type: 8, rate: 'bottom', shade: [0]});
                }
            });
        }
    });

    $("body").delegate("[name='easypublish-onkeybuildsubmit']", "click",function(){
        var buildurl="http://qa.corp.qunar.com/easypublish/api/onekeybuild.shtml";
        var jobuuid = $(this).data("jobuuid");
        var jobName = $(this).data("jobname");
        var _serverlistgroup = window.document.getElementById("easypublish-serverlistgroup-"+jobuuid);
        //todo:
        buildurl += "?from=qatools&jobname="+$(this).data("jobname")+"&serverlistgroup="+
            $("#easypublish-serverlistgroup-"+jobuuid).val()+"&buildgroup="+
            $("#easypublish-buildGroup-"+jobuuid).val()+"&tagname="+
            $("#easypublish-tagName-"+jobuuid).val()+"&username="+
            username+"&jiraid="+
            jiraid+"&serverlist="+
            _serverlistgroup.options[_serverlistgroup.selectedIndex].getAttribute('list');
        console.log("buildurl:"+buildurl);
        //todo 
        var $this = $(this);
        $this.attr('disabled','disabled');
        var $jobNameP = $this.parents('.js-jobContent').find('.js-jobName');
        var loadingTip = $('<span class="js-loadingTip pt5">发布中</span><div class="spinner"><div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div><div class="rect5"></div></div>');
        loadingTip.appendTo($jobNameP);
        $.getJSON(buildurl, null, function (data,status) {
            if (status != "success") {
                alert(jobName+"构建失败");
                loadingTip.remove();
                $this.attr('disabled','');
            }else{
                alert(jobName+"构建成功");
                loadingTip.remove();
                $this.attr('disabled','');
            }
        });
    });

    $("[name=occupying_searchresult_service]").click(function(){
        var buildurl="http://qa.corp.qunar.com/easypublish/api/onekeybuild.shtml";
        var jobuuid = $(this).data("jobuuid");
        buildurl += "?jobname="+$(this).data("jobname")+"&serverlistgroup="+
            $("#easypublish-serverlistgroup-"+jobuuid).val()+"&buildgroup="+
            $("#easypublish-buildGroup-"+jobuuid).val()+"&tagname="+
            $("#easypublish-tagName-"+jobuuid).val()+"&serverlist="+
            $("#easypublish-serverlist-"+jobuuid).val();
        console.log("buildurl:"+buildurl);
        $.getJSON(buildurl, null, function (data,status) {
            $("#easypublish-tagName-"+jobuuid).append(data.name);
            if (status != "success") {
                return false;
            }else{
                alert("构建成功");
            }
        });
    });

    $body.delegate('.js-evn-select','change',function(e){
        var $this = $(this),
            curOption = $(this.options[this.selectedIndex]),
            $p = $this.parent();
        //自定义机器
        if($this.val() == '自定义机器' && !($p.find('.js-serverlist-input').length)){
            var newId = this.id.replace("serverlistgroup","serverlist");
            this.insertAdjacentHTML("afterEnd","<input class='js-serverlist-input' id="+newId+" type=text placeholder=请输入机器名,以逗号分隔>");
        }
        //占用
        var userName = $('meta[name="ajs-remote-user"]').attr("content");
        var occName = curOption.attr('occuser');
        if(curOption.hasClass('js-disable')&&(userName!=occName)){
            alert('该环境已经被占用！');
            this.selectedIndex = 0;
        }
        //机器列表
        if(curOption.attr('list')){
            //js-serverList-p
            $p.find('.js-serverList-p').html("机器列表:"+curOption.attr('list'));
        }
    });

    $body.delegate('.tabTitle','click',function(e){
        $(".tabContent").addClass('js-hide');
        $(".js-"+$(this).attr('target')).removeClass('js-hide');
        $(".tabTitle").removeClass('activeTitle');
        $(this).addClass('activeTitle');
    });
}

function addButton(svnorgitroot,branch,betajobname){
    // if(!betajobname) {
        getJobsFromEasyPublish('http://qa.corp.qunar.com/easypublish/api/findjobaccurately.shtml?deploytype=beta&from=qatools&svnorgitroot=' + svnorgitroot, function (json) {
            if (json != "undifined") {
                var jobs = "";
                $.each(json, function (key, data) {
                    renderJobBuildForm(data);
                });
            }
        });
    // }else{
    //     var data = {};
    //     data.joburl = /^[unit|delivery|room].*/.test(betajobname)?"http://bds.corp.qunar.com/job/"+betajobname:"http://qdr.corp.qunar.com/job/"+betajobname;
    //     data.jobname = betajobname;
    //     data.branch = branch;
    //     console.log(data);
    //     renderJobBuildForm(data);
    // }
}

/*function select2Input(s){
    var ipt=document.createElement('input');
    ipt.type ='text' ;
    ipt.value =s.options[s.selectedIndex].value;//要列表的文字就把value改为text
    s.parentNode.appendChild(ipt);
    s.parentNode.removeChild(s);
}*/
function fixServerList(arr,_occ){
    var index,envName,r={};
    for(var i =0,j = arr.length;i<j;i++){
        index = arr[i].indexOf(':');
        if(index<0){
            return {
                "ALL":{
                    value:'',
                    occ:-1,
                    list:''
                }
            }
        }else{
            envName = arr[i].split(":")[0].toUpperCase();
            machineName = arr[i].split(":")[1];
            if(!r[envName]){
                r[envName] = {
                    value:envName,
                    occ:_occ.indexOf(envName),
                    list:machineName+","
                }
            }else{
                r[envName].list = r[envName].list+machineName+","
            }
        }
    }
    return r;
}

function renderJobBuildForm(data){
    var resulthtml = "";
    var resulthtml2 = "";
    var serverlist = data.serverlist;
    if(data.joburl&&data.joburl.indexOf("qdr.corp.qunar.com")>=0){
        $("#easyPublishContent").append('<div class="js-jobContent" style="clear: both;margin: 3px 1px;">' +
            '<p class="js-jobName"><a class="pt5" href="'+data.joburl+'" target="_blank">' + data.jobname + '</a>：<br/>' +
            '<span style="font-size: small;color: darkgray">暂不支持QDR job的一键发布，请点击job名上的链接自行跳转发布</span></p>' +
            '</div>');
    }else if(serverlist&&serverlist!="") {
        if(serverlist.charAt(serverlist.length - 1)==",")serverlist = serverlist.substring(0,serverlist.length-1);
        var serverlistarray = serverlist.split(",");
        //todo 占用环境列表
        var _occ = "",_occname = "",_occid = "";
        if(data.env){
            for(var i in data.env){
                if(data.env[i].user){
                    _occ = _occ+i;
                }
            }
        }
        _occ = _occ.toUpperCase();
        //var _occ = "AB"

        // var buildenvarray = [];
        // for(var i=0;i<serverlistarray.length;i++){
        //     var buildenv = serverlistarray[i].indexOf(":")>0?serverlistarray[i].split(":")[0].toUpperCase():"ALL";
        //     if(buildenv === "ALL"){
        //         resulthtml = '<option value="' + buildenv + '">' + buildenv + '</option>';
        //         break;
        //     }
        //     var arrhas = buildenvarray.indexOf(buildenv)>=0;
        //     resulthtml += arrhas? '':'<option value="' + buildenv + '">' + buildenv + '</option>';
        //     buildenvarray.push(buildenv);
        // }

        _serverList = fixServerList(serverlistarray,_occ);
        for(var i in _serverList){
            _occname = "";
            _occid = "";
            resulthtml = resulthtml + '<option ';
            if(_serverList[i].occ < 0){
                resulthtml = resulthtml + ' class="js-usable qatools-envoption"';
            }else{
                resulthtml = resulthtml + ' class="js-disable qatools-envoption"';
                _occname = data.env[i].user;
            }
            _occid = data.env[i] ? data.env[i].id  : "";
            resulthtml = resulthtml + 'value="' + _serverList[i].value + '" occuser="'+_occname+ '" occid="'+_occid+'" list="'+_serverList[i].list+'">' + i +':'+ _occname + '</option>';
        }

        var buildgroups = data.buildgroup;
        if(buildgroups){
            var buildgrouparray = buildgroups.split("/");
            for(x in buildgrouparray){
                var buildgroup = buildgrouparray[x];
                resulthtml2 += '<option value="' + buildgroup + '">' + buildgroup + '</option>';
            }
        }

        //jobs += '<button name="easypublish-onkeybuildsubmit" data-joburl="' + data.joburl + '">' + data.jobname + '</button>';
        //todo 
        $("#easyPublishContent").append('<div class="js-jobContent" style="clear: both;margin: 3px 1px;">' +
            '<p class="js-jobName"><a class="pt5" href="'+data.joburl+'" target="_blank">' + data.jobname + '</a>：</p>' +
            '<select class="js-evn-select" id="easypublish-serverlistgroup-'+data.uuid+'">'+
            '<option value="" selected="selected">环境</option>'+resulthtml+
            '<option value="自定义机器">自定义</option></select>' +
                //'<select id="myModal-jenkins-newbuild-select-serverlist" multiple="multiple" title="请选择机器列表" placeholder="请选择机器列表"><option value="l-ttsbaoji1.f.beta.cn0.qunar.com" selected="selected">l-ttsbaoji1.f.beta.cn0.qunar.com</option></select>'+
            '<select id="easypublish-buildGroup-'+data.uuid+'"> <option value="" selected="selected">buildgroup</option>'+resulthtml2+' </select>' +
            '<input type="text" id="easypublish-tagName-'+data.uuid+'" placeholder="tagName">' +
            '<button name="easypublish-onkeybuildsubmit" data-jobuuid="'+data.uuid+'" data-jobname="'+data.jobname+'" data-joburl="' + data.joburl + '">一键发布</button><br/><p class="js-serverList-p"></p></div>');
    }else if(data.jobname.indexOf("nexus")>=0){
        $("#easyPublishContent").append('<div class="js-jobContent" style="clear: both;margin: 3px 1px;">' +
            '<p class="js-jobName"><a class="pt5" href="'+data.joburl+'" target="_blank">' + data.jobname + '</a>：</p>' +
            '<input type="text" id="easypublish-tagName-'+data.uuid+'" placeholder="tagName">' +
            '<button name="easypublish-onkeybuildsubmit" data-jobuuid="'+data.uuid+'" data-jobname="'+data.jobname+'" data-joburl="' + data.joburl + '">一键发布</button><br/><p></p></div>');
    }
}

function getJobsFromEasyPublish(inurl,callback){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", inurl, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            try {
                var resp = JSON.parse(xhr.responseText);
                callback(resp);
            }catch (e){
                console.log("parse json error, "+e);
            }
        }
    }
    xhr.send();
}



//pmo滚动浮层begin
function Drag()
{
    //初始化
    this.initialize.apply(this, arguments)
}
Drag.prototype = {
    //初始化
    initialize : function (drag, options)
    {
        this.drag = this.$(drag);
        this._x = this._y = 0;
        this._moveDrag = this.bind(this, this.moveDrag);
        this._stopDrag = this.bind(this, this.stopDrag);

        this.setOptions(options);

        this.handle = this.$(this.options.handle);
        this.maxContainer = this.$(this.options.maxContainer);

        this.maxTop = Math.max(this.maxContainer.clientHeight, this.maxContainer.scrollHeight) - this.drag.offsetHeight;
        this.maxLeft = Math.max(this.maxContainer.clientWidth, this.maxContainer.scrollWidth) - this.drag.offsetWidth;

        this.limit = this.options.limit;
        this.lockX = this.options.lockX;
        this.lockY = this.options.lockY;
        this.lock = this.options.lock;

        this.onStart = this.options.onStart;
        this.onMove = this.options.onMove;
        this.onStop = this.options.onStop;

        this.handle.style.cursor = "move";

        this.changeLayout();

        this.addHandler(this.handle, "mousedown", this.bind(this, this.startDrag))
    },
    changeLayout : function ()
    {
        this.drag.style.top = this.drag.offsetTop + "px";
        this.drag.style.left = this.drag.offsetLeft + "px";
        this.drag.style.position = "absolute";
        this.drag.style.margin = "0"
    },
    startDrag : function (event)
    {
        var event = event || window.event;

        this._x = event.clientX - this.drag.offsetLeft;
        this._y = event.clientY - this.drag.offsetTop;

        this.addHandler(document, "mousemove", this._moveDrag);
        this.addHandler(document, "mouseup", this._stopDrag);

        event.preventDefault && event.preventDefault();
        this.handle.setCapture && this.handle.setCapture();

        this.onStart()
    },
    moveDrag : function (event)
    {
        var event = event || window.event;

        var iTop = event.clientY - this._y;
        var iLeft = event.clientX - this._x;

        if (this.lock) return;

        this.limit && (iTop < 0 && (iTop = 0), iLeft < 0 && (iLeft = 0), iTop > this.maxTop && (iTop = this.maxTop), iLeft > this.maxLeft && (iLeft = this.maxLeft));

        this.lockY || (this.drag.style.top = iTop + "px");
        this.lockX || (this.drag.style.left = iLeft + "px");

        event.preventDefault && event.preventDefault();

        this.onMove()
    },
    stopDrag : function ()
    {
        this.removeHandler(document, "mousemove", this._moveDrag);
        this.removeHandler(document, "mouseup", this._stopDrag);

        this.handle.releaseCapture && this.handle.releaseCapture();

        this.onStop()
    },
    //参数设置
    setOptions : function (options)
    {
        this.options =
        {
            handle:			this.drag, //事件对象
            limit:			true, //锁定范围
            lock:			false, //锁定位置
            lockX:			false, //锁定水平位置
            lockY:			false, //锁定垂直位置
            maxContainer:	document.documentElement || document.body, //指定限制容器
            onStart:		function () {}, //开始时回调函数
            onMove:			function () {}, //拖拽时回调函数
            onStop:			function () {}  //停止时回调函数
        };
        for (var p in options) this.options[p] = options[p]
    },
    //获取id
    $ : function (id)
    {
        return typeof id === "string" ? document.getElementById(id) : id
    },
    //添加绑定事件
    addHandler : function (oElement, sEventType, fnHandler)
    {
        return oElement.addEventListener ? oElement.addEventListener(sEventType, fnHandler, false) : oElement.attachEvent("on" + sEventType, fnHandler)
    },
    //删除绑定事件
    removeHandler : function (oElement, sEventType, fnHandler)
    {
        return oElement.removeEventListener ? oElement.removeEventListener(sEventType, fnHandler, false) : oElement.detachEvent("on" + sEventType, fnHandler)
    },
    //绑定事件到对象
    bind : function (object, fnHandler)
    {
        return function ()
        {
            return fnHandler.apply(object, arguments)
        }
    }
};
//应用
// <div id="easyPublishBox">
//     <h2 class="tabTitle"  target="publisb">快速部署</h2>
//     <div id="easyPublishContent" class="js-publish tabContent"></div>
//     <h2 class="tabTitle" target="ng">nginx配置</h2>
//     <div class="tabContent js-ng hide"><a href="http://qa.corp.qunar.com/ngConfig/editNginxPage">nginx配置</a></div>
//     <h2 class="tabTitle" target="db">数据库比对工具</h2>
//     <div class="tabContent js-db hide"><a href="http://l-tools1.f.beta.cn6.qunar.com:9006/step1.jsp"></a></div>
// </div>

function winLoad(){
    var hideClass = "js-hide";
    $("body").append('<div id="easyPublishBox"><h2 class="tabTitle activeTitle"  target="publish">快速部署<span class="icon"></span></h2><div id="easyPublishContent" class="js-publish tabContent"></div><h2 class="tabTitle" target="ng">nginx配置<span class="icon"></span></h2><div class="tabContent js-ng '+hideClass+'"><a href="http://qa.corp.qunar.com/ngConfig/editNginxPage" target="_blank">nginx配置</a></div><h2 class="tabTitle" target="db">数据库比对工具<span class="icon"></span></h2><div class="tabContent js-db '+hideClass+'"><a href="http://l-tools1.f.beta.cn6.qunar.com:9006/step1.jsp" target="_blank">数据库比对工具</a></div></div>');
    var oBox = document.getElementById("easyPublishBox");
    var oTitle = oBox.getElementsByTagName("h2")[0];
    var oSpan = document.getElementsByTagName("span")[0];
    var oDrag = new Drag(oBox, {handle:oTitle, limit:false});

    var aInput = document.getElementsByTagName("input");

    //锁定范围接口
    aInput[0].onclick = function ()
    {
        oDrag.limit = !oDrag.limit;
        this.value = oDrag.limit ? "取消锁定范围" : "锁定范围"
    };

    //水平锁定接口
    aInput[1].onclick = function ()
    {
        oDrag.lockX = !oDrag.lockX;
        this.value = oDrag.lockX ? "取消水平锁定" : "水平锁定"
    };

    //垂直锁定接口
    aInput[2].onclick = function ()
    {
        oDrag.lockY = !oDrag.lockY;
        this.value = oDrag.lockY ? "取消垂直锁定" : "垂直锁定"
    };

    //锁定位置接口
    aInput[3].onclick = function ()
    {
        oDrag.lock = !oDrag.lock;
        this.value = oDrag.lock ? "取消锁定位置" : "锁定位置"
    };

    //开始拖拽时方法
    oDrag.onStart = function ()
    {
        oSpan.innerHTML = "开始拖拽"
    };

    //开始拖拽时方法
    oDrag.onMove = function ()
    {
        oSpan.innerHTML = "left:" + this.drag.offsetLeft + ", top:" + this.drag.offsetTop
    };

    //开始拖拽时方法
    oDrag.onStop = function ()
    {
        oSpan.innerHTML = "结束拖拽"
    };
};
//pmo滚动浮层end
//初始化
doInjectPmo();
