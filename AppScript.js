// This is the Google App Script code that will be used to handle the POST request from the form.

// ADD THIS CODE to Appscript project and deploy and delete this file from here
var sheetName = 'Sheet1';
var scriptProp = PropertiesService.getScriptProperties();

function intialSetup() {
  var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  scriptProp.setProperty('key', activeSpreadsheet.getId());
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var doc = SpreadsheetApp.openById(scriptProp.getProperty('key'));
    var sheet = doc.getSheetByName(sheetName);

    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var nextRow = sheet.getLastRow() + 1;

    var newRow = headers.map(function(header) {
      if (header === 'timestamp') {
        return Utilities.formatDate(new Date(), Session.getScriptTimeZone(),"yyyy-MM-dd HH:mm:ss"); 
      } else if (header === 'ip_address') {
        return e.parameter['ip_address'];
      } else if (header === 'team_members') {
        return JSON.stringify(e.parameter[header]);
      } else if (header === 'number_of_team_members') {
        return e.parameter['number_of_team_members'];
      } else {
        return e.parameter[header];
      }
    });

    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);

    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': error }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}