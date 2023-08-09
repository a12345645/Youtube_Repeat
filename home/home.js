const { pathname, host } = location;
const IS_PAGE_HOME = /^\/$/.test(pathname);

const initHomePage = () => {
    var interval = setInterval(function () {
        //             var contents = document.querySelector("div#contents.style-scope.ytd-rich-grid-renderer");
        //             if (contents) {
        //                 clearInterval(interval);
        //                 var divElement = document.createElement('div');
        //                 // 添加 div 元素的內容或屬性
        //                 divElement.textContent = 'Hello, world!';

        //                 // 在 targetElement 的第一個子元素之前插入 div 元素
        //                 contents.insertBefore(divElement, contents.firstChild);

        //                 console.log(contents);
        //                 console.log(contents.firstChild);
        //             }
        var items = document.querySelector('div#items.style-scope.ytd-guide-section-renderer');
        if (items) {
            clearInterval(interval);

            var entry = document.createElement('div');
            var entry_html = `
<a id="endpoint" class="yt-simple-endpoint style-scope ytd-guide-entry-renderer" tabindex="-1" role="" title="儲存片段">
    <tp-yt-paper-item class="style-scope ytd-guide-entry-renderer" role="link" style-target="host" tabindex="0"
        aria-disabled="false" aria-selected="false"><!--css-build:shady-->
        <div class="yt-icon-container yt-icon guide-icon style-scope ytd-guide-entry-renderer">
            <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope yt-icon"
                style="pointer-events: none; display: block; width: 100%; height: 100%;">
                <g>
                    <path
                        d="M7 21C8.65685 21 10 19.6569 10 18C10 16.3431 8.65685 15 7 15C5.34315 15 4 16.3431 4 18C4 19.6569 5.34315 21 7 21Z"
                        stroke="currentColor" fill="none" stroke-width="1.5"></path>
                    <path
                        d="M17 21C18.6569 21 20 19.6569 20 18C20 16.3431 18.6569 15 17 15C15.3431 15 14 16.3431 14 18C14 19.6569 15.3431 21 17 21Z"
                        stroke="currentColor" fill="none" stroke-width="1.5"></path>
                    <path d="M16.0001 3L8.66479 15.2255" stroke="currentColor" fill="none" stroke-width="1.5"
                        stroke-linecap="round" stroke-linejoin="round"></path>
                    <path d="M8.00007 3L15.3066 15.1776" stroke="currentColor" fill="none" stroke-width="1.5"
                        stroke-linecap="round" stroke-linejoin="round"></path>
                </g>
            </svg><!--css-build:shady--><!--css-build:shady-->
        </div>
        <p class="title style-scope ytd-guide-entry-renderer">儲存片段</p>
    </tp-yt-paper-item>
</a>
        `
            entry.setAttribute('class', 'style-scope ytd-guide-section-renderer');
            entry.setAttribute('is-primary', '');
            entry.setAttribute('line-end-style', 'none');
            entry.innerHTML = entry_html;

            var targetChildElement = items.querySelector('ytd-guide-collapsible-section-entry-renderer.style-scope.ytd-guide-section-renderer');

            items.insertBefore(entry, targetChildElement);
        }
    }, 200);

}
const initPage = () => {
    if (IS_PAGE_HOME) {
        initHomePage();
    }
    messageBlockinit();
};

initPage();