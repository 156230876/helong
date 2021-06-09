$(function(){
    console.log("加载team插件");
    async function init() {
        console.log("刚进入页面第一次初始化");
        const res = await fetch("https://team.corp.kuaishou.com/pm/api/search-v3/groupSql", {
            "headers": {
                "accept": "application/json, text/plain, */*",
                "accept-language": "zh-CN,zh;q=0.9",
                "content-type": "application/json",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin"
            },
            "referrer": "https://team.corp.kuaishou.com/search/task?filterId=292&group=priority&mode=sql&sql=%E9%A1%B9%E7%9B%AE%20%3D%20%E5%B0%8F%E7%A8%8B%E5%BA%8F%E9%A1%B9%E7%9B%AE%20%20and%20%E4%BB%BB%E5%8A%A1%E7%8A%B6%E6%80%81%20in%20%28%E5%85%B3%E9%97%AD%EF%BC%88%E5%B7%B2%E5%8F%91%E5%B8%83%EF%BC%89%2C%E5%B7%B2%E5%8F%91%E5%B8%83%2C%E5%B7%B2%E7%BB%93%E6%9D%9F%2C%E5%B7%B2%E7%BB%9F%E8%AE%A1%2C%E6%B5%8B%E8%AF%95%E5%AE%8C%E6%88%90%2C%E5%85%B3%E9%97%AD%29%20%20%20%20AND%20%E4%BB%BB%E5%8A%A1%E5%88%86%E7%B1%BB%20in%20%28%E7%BA%BF%E4%B8%8B%E7%BC%BA%E9%99%B7%29%20ORDER%20BY%20%E4%BC%98%E5%85%88%E7%BA%A7%20DESC",
            "referrerPolicy": "no-referrer-when-downgrade",
            "body": "{\"groupFieldKey\":\"priority\",\"groupFieldValues\":[],\"query\":\"'项目' = '小程序项目' and '任务状态' in ('关闭（已发布）', '已发布', '已结束', '已统计', '测试完成', '关闭') AND '任务分类' in ('线下缺陷') ORDER BY '优先级' DESC\"}",
            "method": "POST",
            "mode": "cors",
            "credentials": "include"
        }).then(res => res.json());
        console.log("发完请求了",res)
    }
    init();
});
