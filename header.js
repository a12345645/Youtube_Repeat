// ==UserScript==
// @name                 Youtube 指定片段循環播放
// @name:en              Youtube Repeat Specific Part
// @namespace            -
// @version              20200428.1
// @description          可自由設定影片循環播放，無須轉跳其他網站服務。
// @description:en       Freely set the start and end time to loop. No other sites used.
// @author               LianSheng
// @match                *://*.youtube.com/*
// @require              https://greasyfork.org/scripts/402133-toolbox/code/Toolbox.js
// @grant                GM_setValue
// @grant                GM_getValue
// @grant                GM_registerMenuCommand
// @compatible           chrome >= 71
// @license              MIT
// ==/UserScript==

// 內部版本號: 0.7.0

// ================【Language】================ //

const codeTable = {
    "1": "zh-tw",
    "2": "en"
};

const LOCALE = {
    "zh-tw": {
        repeat_set_start: "設定循環開始",
        repeat_set_end: "設定循環結束",
        repeat_set: "執行循環",
        repeat_unset: "停止循環",
        more: "更多選項",
        more_copy_share: "複製連結",
        more_copy_share_copied: "連結已複製",
        save_to_cload: "保存片段",
        save_to_cload_successfully: "成功保存",
        yes: "確認",
        name: "名字",
        range: "範圍",
        name_empty: "請填入名字",
        load_segment: "載入片段",
        waiting: "等待中",
    },
    "en": {
        repeat_set_start: "set repeat start",
        repeat_set_end: "set repeat end",
        repeat_set: "repeat start",
        repeat_unset: "repeat stop",
        more: "more",
        more_copy_share: "copy link",
        more_copy_share_copied: "copied",
        save_to_cload: "save segment",
        save_to_cload_successfully: "saved successfully",
        yes: "yes",
        name: "name",
        range: "range",
        name_empty: "please fill the name",
        load_segment: "load segment",
        waiting: "waiting",
    }
};