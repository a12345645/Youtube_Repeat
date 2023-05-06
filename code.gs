var SPEADSHEETID = "<google sheet id>";
var SHEETNAME = "Sheet1";

function doGet(request) {
  var params = request.parameter;
  var callback = params.callback;
  var action = params.action;
  switch (action) {
    case "new": {
      let name = params.name;
      let url = params.url;
      let start = params.start;
      let end = params.end;

      addRowToSheet(name, url, start, end)
      return returnMsg(callback, "success")
    } break;
    case "search": {
      let url = params.url;
      return returnMsg(callback, searchSheet(url))
    } break;
    default:
      return returnMsg(callback, "failed");
  }
}

function returnMsg(callback, msg) {
  var data = {
    'message': msg
  };
  var json = JSON.stringify(data);
  var output = callback + '(' + json + ')';
  return ContentService.createTextOutput(output).setMimeType(ContentService.MimeType.JAVASCRIPT);
}

function addRowToSheet(name, url, start, end) {
  var sheet = SpreadsheetApp.openById(SPEADSHEETID);
  var data = sheet.getDataRange().getValues();
  var lastRow = sheet.getLastRow();

  for (var i = 0; i < data.length; i++) {
    if (data[i][0] == name && data[i][1] == url && data[i][2] == start && data[i][3] == end) {
      return;
    }
  }

  sheet.getSheetByName(SHEETNAME).getRange(lastRow + 1, 1, 1, 4).setValues([[name, url, start, end]]);
}

function searchSheet(url) {
  var sheet = SpreadsheetApp.openById(SPEADSHEETID);
  var data = sheet.getDataRange().getValues();

  var result = [];
  for (var i = 0; i < data.length; i++) {
    if (data[i][1] == url) {
      result.push([data[i][0], data[i][1], data[i][2], data[i][3]]);
    }
  }
  return result;
}