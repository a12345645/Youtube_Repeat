# Youtube_Repeat

## Tools Used
- Google Apps Script
https://www.google.com/script/start/
- Tampermonkey
https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo/related?hl=zh-TW

## Installation

### Set Up Database
1. Create a Google Sheet in Google Drive.
2. Create a Google Apps Script by clicking on "Apps Script" under the "Extensions" menu.
3. Copy the `code.gs` in code.gs and modify SPEADSHEETID and SHEETNAME.SPEADSHEETID can be found in the URL `https://docs.google.com/spreadsheets/d/<SPEADSHEETID>/edit#gid=0`
4. Deploy as a web app to get the API URL.

### Set Up Script
1. Install the Tampermonkey extension.
2. Add a new script and copy the content of `tampermonkey.js`.
3. Update the `API` variable with the API URL.
4. Save and you're done.

## References
- Modified from this article (in Chinese)
https://home.gamer.com.tw/creationDetail.php?sn=4275263
- Original script
https://greasyfork.org/zh-TW/scripts/402133-toolbox/code
- Apps Script Quotas
https://developers.google.com/apps-script/guides/services/quotas?hl=zh-tw
- ADs blocker
https://greasyfork.org/en/scripts/27199-remove-youtube-ads-works