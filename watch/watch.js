let locale = {};
if (GM_getValue("lang")) {
    let code = GM_getValue("lang");
    let selectLang = codeTable[code];
    locale = LOCALE[selectLang];
} else {
    chooseLang();
    locale = LOCALE.en;
}

let debug_mode = false;

let tm_video_start_time = new URL(location.href).searchParams.get("start");
let tm_video_end_time = new URL(location.href).searchParams.get("end");
let tm_repeat_time_check_period = 33;

let css_main = `
//@css_main.css
`;

let html_main = `
//@html_main.html
`;

let js_main = `
//@js_main.js
`;
GM_registerMenuCommand("Set Language", chooseLang);

let inserted = false;

let insertID = setInterval(function () {
    let url = location.href;

    if (url.match(/youtube\.com\/watch/) != null) {
        inserted = true;
        addStyleLink("https://use.fontawesome.com/releases/v5.7.0/css/all.css");
        addStyle(css_main, ".ytp-chrome-controls");

        const target = '.ytp-chrome-controls';
        const html = html_main;
        const type = 'beforeend';

        const container = document.querySelector(target);
        const lastChild = document.querySelector(".ytp-right-controls");
        const newElement = document.createElement('div');
        newElement.innerHTML = html;

        container.insertBefore(newElement, lastChild);
        addScript(js_main, ".ytp-chrome-controls");
    }

    if (inserted) {
        clearInterval(insertID);
    }
}, 200);

function chooseLang() {
    let input = 0;

    while (input <= 0 || input >= 3) {
        input = prompt("（變更語言）請輸入語言代號\n(Change Language) Please input language code.\n(中文: 1, English: 2)", "");
    }

    alert("語言已變更。重整頁面後才會生效。\nLanguage changed. Page refresh required.");
    GM_setValue("lang", input);
}


// /* advideo */
// var advideo = false;

// setTimeout(function () {
//     console.log("Removing All YouTube Ads!!");
// }, 4000);

// function removead() {
//     var videoStream = document.querySelector(".video-stream");
//     if (videoStream) {
//         videoStream.removeAttribute("src");
//     }
// }

// (function () {
//     if (document.querySelector(".videoAdUiRedesign")) {
//         advideo = true;
//     } else {
//         advideo = false;
//     }
//     var playerAds = document.getElementById("player-ads");
//     if (playerAds) {
//         playerAds.remove();
//     }
//     var mastheadAd = document.getElementById("masthead-ad");
//     if (mastheadAd) {
//         mastheadAd.remove();
//     }
//     var offerModule = document.getElementById("offer-module");
//     if (offerModule) {
//         offerModule.remove();
//     }
//     var videoAds = document.querySelector(".video-ads");
//     if (videoAds) {
//         videoAds.remove();
//     }
//     var relatedDestUrl = document.getElementById("pyv-watch-related-dest-url");
//     if (relatedDestUrl) {
//         relatedDestUrl.remove();
//     }

//     if (advideo == true) {
//         removead();
//     }
//     setTimeout(arguments.callee, 1000);
// })(1000);
