// ==UserScript==
// @name                 New Userscript
// @name:en              New Userscript
// @namespace            -
// @version              0.1
// @description          try to take over the world!
// @description:en       try to take over the world!
// @author               a12345645
// @match                *://*.youtube.com/*
// @grant                GM_setValue
// @grant                GM_getValue
// @grant                GM_registerMenuCommand
// @compatible           chrome >= 71
// @license              MIT
// ==/UserScript==

(function() {
    'use strict';
    let insertID = setInterval(function () {
        let url = location.href;

        if (url.match(/youtube\.com\/watch/) != null) {
            inserted = true;
            addStyleLink("https://use.fontawesome.com/releases/v5.7.0/css/all.css");
            addStyle(css, ".ytp-chrome-controls");

            const target = '.ytp-chrome-controls';
            const html = html_main;

            const container = document.querySelector(target);
            const lastChild = document.querySelector(".ytp-right-controls");
            const newElement = document.createElement('div');
            newElement.innerHTML = html;
        }

        if (inserted) {
            clearInterval(insertID);
        }
    }, 200);
    // Your code here...
})();