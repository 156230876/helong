/**
 * Created by yongchao.he on 2015/9/10,0010.
 * code by jin.meng
 * 通过双击bds job中的历史记录，可触发一键同步沙盒
 */
$(function () {
    function xlog(value) {
        console.log(value);
    }

    function getTagFromText(text) {
        var arr = text.split('=');
        try {
            tag = arr[1];
        } catch (err) {
            xlog(err);
            tag = null;
        }
        return tag;
    }

    function getBuildUrl(job, tag, group, env) {
        var buildUrl = 'http://qa.corp.qunar.com/easypublish/api/onekeybuild.shtml?buildgroup=' + group + '&jobname=' + job + '&serverlistgroup=' + env + '&tagname=' + tag;
        return buildUrl;
    }

    function getTag(elem) {
        try {
            text = elem.childNodes[2].textContent
        }
        catch (err) {
            xlog(err);
            text = null
        }
        //xlog(elemTag)
        var tag = null;
        if (text) {
            tag = getTagFromText(text)
        }
        return tag;
    }


    function    buildSandbox(elem) {
        tag = getTag(elem);
        try {
            job = $("#main-panel :header")[0].textContent.split(" ")[1];
        } catch (e) {
            xlog(e);
            job = "";
        }
        //xlog(elem);
        //xlog(job + " " + tag);
        url = getBuildUrl(job, tag, "e", "e");
        //xlog('invoke ' + url);
        $.get(url);
    }


    function main() {
//timeList=$("#buildHistory tbody tr td a[class='tip model-link tl-tr']")
//iconList=$("#buildHistory tbody tr td a[class!='tip model-link tl-tr']")
        descList = $("#buildHistory tbody tr td[class='desc']");
        for (var i = 0; i < descList.length; i++) {
            var elem = descList[i];
            //xlog(elem)
            $(elem).append("<br><span>双击可发沙盒</span>");
            tag = getTag(elem);
            //xlog(i + " " + tag);
            if (tag) {
                $(elem).unbind("dblclick");
                $(elem).delegate(this, "dblclick", function () {
                    buildSandbox(this);
                })
            }
        }
    }
    setTimeout(function () {
        main();
    }, 1000);
});