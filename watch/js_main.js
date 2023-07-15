var Google_API = 'https://script.google.com/XXX'
var tm_startTime = 0;
var tm_endTime = 0;
var tm_video = document.querySelector("video");
var tm_interval_id = undefined;
var tm_check_url = location.href;
var tm_check_period = 33;

// check url per 0.1s
setInterval(function () {
    let now_url = location.href;
    if (now_url != tm_check_url) {
        changePageInit();
        tm_check_url = now_url;
    }
}, 100)

// 若網址有 start 與 end 則執行（更多選項：複製連結）
if (${ tm_video_start_time } != null && ${ tm_video_end_time } != null) {
    setRepeatStart(${ tm_video_start_time });
    setRepeatEnd(${ tm_video_end_time });
    setRepeat();
}

// 更多選項：複製連結
function copyShare() {
    let tm_video_id = new URL(location.href).searchParams.get("v");

    let input = document.createElement('input');
    input.value = "https://www.youtube.com/watch?v=" + tm_video_id + "&start=" + tm_startTime + "&end=" + tm_endTime;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);

    // 提示：已複製連結
    document.querySelector("#tm_more_copy_share > span").innerText = "${locale.more_copy_share_copied}";
    document.querySelector("#tm_more_copy_share > span").style.color = "#f55";

    // 恢復原始樣貌
    setTimeout(function () {
        document.querySelector("#tm_more_copy_share > span").innerText = "${locale.more_copy_share}";
        document.querySelector("#tm_more_copy_share > span").style.color = "#fff";
    }, 3000);
}

// 設定開始時間
function setRepeatStart(time = "") {
    if (time == "") {
        document.querySelector("#tm_repeat_start_time").innerText = readable(tm_video.currentTime);
        tm_startTime = tm_video.currentTime;

        if (tm_startTime > tm_endTime) {
            tm_endTime = tm_startTime;
            document.querySelector("#tm_repeat_end_time").innerText = readable(tm_video.currentTime);
        }
    } else {
        document.querySelector("#tm_repeat_start_time").innerText = readable(time);
        tm_startTime = time;

        if (tm_startTime > tm_endTime) {
            tm_endTime = tm_startTime;
            document.querySelector("#tm_repeat_end_time").innerText = readable(time);
        }
    }
}

// 設定結束時間
function setRepeatEnd(time = "") {
    if (time == "") {
        document.querySelector("#tm_repeat_end_time").innerText = readable(tm_video.currentTime);
        tm_endTime = tm_video.currentTime;

        if (tm_endTime < tm_startTime) {
            tm_startTime = tm_endTime;
            document.querySelector("#tm_repeat_start_time").innerText = readable(tm_video.currentTime);
        }
    } else {
        document.querySelector("#tm_repeat_end_time").innerText = readable(time);
        tm_endTime = time;

        if (tm_endTime < tm_startTime) {
            tm_startTime = tm_endTime;
            document.querySelector("#tm_repeat_start_time").innerText = readable(time);
        }
    }
}

// 執行重複播放
function setRepeat(element) {
    if (tm_interval_id != undefined) clearInterval(tm_interval_id);

    var title = element.getAttribute("data-title");
    var svgElement = element.querySelector("svg");
    console.log(svgElement);
    if (title != "${ locale.repeat_set }") {
        element.setAttribute("data-title", "${locale.repeat_set}");
        // check video duration per ${tm_repeat_time_check_period} ms
        tm_interval_id = setInterval(function () {
            if (tm_video.currentTime < tm_startTime || tm_video.currentTime > tm_endTime) tm_video.currentTime = tm_startTime;
        }, tm_check_period)
        
        svgElement.innerHTML = '';

        var gElement = document.createElementNS("http://www.w3.org/2000/svg", "g");

        var path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path1.setAttribute("d", "M16 17V9C16 7.89545 15.1046 7 14 7H13V5H14C16.2092 5 18 6.79085 18 9V17H20L17 20L14 17H16ZM8 7V15C8 16.1046 8.89545 17 10 17H11V19H10C7.79085 19 6 17.2092 6 15V7H4L7 4L10 7H8Z");
        gElement.appendChild(path1);

        svgElement.appendChild(gElement);
    } else {
        element.setAttribute("data-title", "${locale.repeat_unset}");
        clearInterval(tm_interval_id);
        tm_interval_id = undefined;

        svgElement.innerHTML = '';

        var gElement = document.createElementNS("http://www.w3.org/2000/svg", "g");

        var path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path1.setAttribute("d", "M7.999 15V7H9.999L6.999 4L3.99902 7H5.999V15C5.999 17.2092 7.7899 19 9.999 19H10.999V17H9.999C8.89445 17 7.999 16.1046 7.999 15Z");
        gElement.appendChild(path1);

        var path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path2.setAttribute("d", "M17.999 13.1264V9C17.999 6.79085 16.2082 5 13.999 5H12.999V7H13.999C15.1036 7 15.999 7.89545 15.999 9V13.1265C16.3187 13.0442 16.6539 13.0004 16.9993 13.0004C17.3445 13.0004 17.6795 13.0441 17.999 13.1264Z");
        gElement.appendChild(path2);

        var path3 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path3.setAttribute("d", "M20.0702 15.8288L18.656 17.243L20.0702 18.6572L18.656 20.0715L17.2418 18.6572L15.8276 20.0715L14.4133 18.6572L15.8276 17.243L14.4133 15.8288L15.8276 14.4146L17.2418 15.8288L18.656 14.4146L20.0702 15.8288Z");
        gElement.appendChild(path3);

        svgElement.appendChild(gElement);
    }
}

// 點擊【更多設定】按鈕

function tm_more_popup_hide() {
    let popup = document.getElementById("tm_more_popup");
    popup.innerHTML = ' \
//# tm_more_panel_main.html \
    ';

    let tm_more = document.querySelectorAll(".tm_popup");
    for (let i = 0; i < tm_more.length; i++) {
        tm_more[i].style.display = "none";
    }
}

function tm_more_popup_listener() {
    var popup = document.getElementById("tm_more_popup");
    var showPopupButton = document.getElementById("tm_repeat_more");
    if (!popup.contains(event.target) && !showPopupButton.contains(event.target)) {
        tm_more_popup_hide();
    }
}

// 點集集其他地方關掉 popup
document.addEventListener("mousedown", tm_more_popup_listener);

function tm_more_popup() {
    let tm_more_button = document.querySelector("#tm_repeat_more");
    let tm_more_content = document.querySelector("#tm_more_popup");

    if (tm_more_content.style.display === "none") {
        tm_more_content.style.display = "inline-block";
        tm_more_content.style.left = tm_more_button.offsetLeft + "px";
    } else {
        tm_more_popup_hide();
    }
}

// 換頁時初始化所有循環設定
function changePageInit() {
    clearInterval(tm_interval_id);
    tm_interval_id = undefined;
    tm_startTime = 0;
    tm_endTime = 0;
    document.querySelector("#tm_repeat_start_time").innerText = readable(tm_startTime);
    document.querySelector("#tm_repeat_end_time").innerText = readable(tm_endTime);
}

// 可視化：預設精度爲 0.1 秒
function readable(floatNum, precision = 1) {
    let h = parseInt(floatNum / 3600);
    let m = parseInt((floatNum - h * 3600) / 60);
    let s = parseFloat(floatNum - h * 3600 - m * 60).toFixed(precision);

    if (m < 10) m = "0" + m;
    if (s < 10) s = "0" + s;

    return h + ":" + m + ":" + s;
}

// 顯示成功訊息
function showSuccess(message) {
    let div = document.createElement('div');
    div.className = 'slidein-message success-message';
    div.innerHTML = '<p>' + message + '</p>';
    document.body.appendChild(div);
    setTimeout(function () {
        div.remove();
    }, 2000);
}

function showError(message) {
    let div = document.createElement('div');
    div.className = 'slidein-message error-message';
    div.innerHTML = '<p>' + message + '</p>';
    document.body.appendChild(div);
    setTimeout(function () {
        div.remove();
    }, 2000);
}

function tm_save_click() {
    let popup = document.getElementById("tm_more_popup");
    popup.innerHTML = ' \
//# tm_save_list.html \
    ';

    let range_block = document.querySelector("#tm_more_save_range")
    range_block.innerText = readable(tm_startTime) + '~' + readable(tm_endTime);
}

function close_expand() {
    let tm_expand = document.querySelectorAll(".tm_repeat_more_expand");
    for (let i = 0; i < tm_expand.length; i++) {
        tm_expand[i].style.display = "none";
    }
}

function tm_save_to_cloud() {
    let name = document.querySelector("#tm_save_input").value;
    if (name === "") {
        showError("${locale.name_empty}");
        return;
    }

    let script = document.createElement('script');
    script.setAttribute('id', 'callback-script');

    script.src = Google_API + '?callback=saveCloud&action=new&name=' + name +
        '&url=' + window.location.href + '&start=' + tm_startTime + '&end=' + tm_endTime;
    document.body.appendChild(script);
}

function saveCloud(response) {
    document.querySelector("#tm_save_input").value = "";
    document.querySelector("#tm_save_list").style.display = "none";

    showSuccess("${locale.save_to_cload_successfully}")
    let div = document.getElementById("callback-script");
    div.remove();
}

function tm_laod_click() {
    let tm_repeat_more_list = document.querySelector("#tm_repeat_more_list");
    let tm_segment_content = document.querySelector("#tm_repeat_segment_list");

    if (tm_segment_content.style.display === "none") {
        close_expand();
        tm_segment_content.style.display = "inline-block";
        tm_segment_content.style.left = (tm_repeat_more_list.offsetLeft + tm_repeat_more_list.offsetWidth) + "px";

        let script = document.createElement('script');
        script.setAttribute('id', 'callback-script');

        script.src = Google_API + '?callback=loadCloud&action=search&url=' + window.location.href;
        document.body.appendChild(script);

        tm_segment_content.innerHTML = "";

        let div = document.createElement('div');
        div.setAttribute("data-start", "1");
        let span = document.createElement('span');
        span.textContent = "${locale.waiting}";
        div.appendChild(span);
        tm_segment_content.appendChild(div);
    } else {
        close_expand();
    }
}

function loadCloud(response) {
    let message = response.message;
    let tm_segment_content = document.querySelector("#tm_repeat_segment_list");
    tm_segment_content.innerHTML = "";

    for (let i = 0; i < message.length; i++) {
        let div = document.createElement('div');
        div.setAttribute("data-start", message[i][2]);
        div.setAttribute("data-end", message[i][3]);
        div.setAttribute("onclick", "load_segment_click(this)");
        let span = document.createElement('span');
        span.textContent = message[i][0];
        div.appendChild(span);
        tm_segment_content.appendChild(div);
    }
}

function load_segment_click(button) {
    let start = button.getAttribute("data-start");
    let end = button.getAttribute("data-end");
    setRepeatStart(parseFloat(start));
    setRepeatEnd(parseFloat(end));
    setRepeat();
}