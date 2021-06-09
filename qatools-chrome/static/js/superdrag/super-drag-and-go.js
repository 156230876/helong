/**
 * 超级拖拽功能实现
*/

!function() {
    var s_x, s_y;

    s_x = 0;

    s_y = 0;

    if (!('s_b' in window)) {
        window.s_b = true;
        document.addEventListener('dragstart', function (e) {
            s_x = e.screenX;
            return s_y = e.screenY;
        }, false);
        document.addEventListener('dragover', function (e) {
            if (e.toElement.tagName === 'INPUT' || e.toElement.tagName === 'TEXTAREA') {
                return true;
            }
            if (e.preventDefault) {
                e.preventDefault();
            }
            return false;
        }, false);
        document.addEventListener('drop', function (e) {
            var data, msg, x, y;
            if (e.toElement.tagName === 'INPUT' || e.toElement.tagName === 'TEXTAREA') {
                return true;
            }
            if (e.preventDefault) {
                e.preventDefault();
            }
            x = 1;
            if (e.screenX < s_x) {
                x = -1;
            }
            y = 1;
            if (e.screenY < s_y) {
                y = -1;
            }
            data = e.dataTransfer.getData('URL');
            msg = 'url';
            if (!data) {
                data = e.dataTransfer.getData('Text');
                msg = 'txt';
            }
            if (data) {
                // chrome.runtime.sendMessage('ogeehjahodjfdkenhdbiijlibdfeppgm', { //给其他插件发消息
                chrome.runtime.sendMessage( {
                    cmd: msg,
                    values: data,
                    x: x,
                    y: y
                });
                return false;
            }
        }, true);
    }
}();