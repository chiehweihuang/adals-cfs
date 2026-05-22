/**
 * ADALS 2026 — Call for Speakers — form backend
 * =============================================================
 * Receives POST submissions from index.html and appends each one
 * as a row in this spreadsheet.
 *
 * ONE-TIME SETUP
 *  1. Create a new Google Sheet — it will hold the submissions.
 *  2. In that Sheet:  Extensions  ->  Apps Script.
 *     Delete the sample code, paste THIS whole file in, click Save.
 *  3. Click  Deploy  ->  New deployment.
 *       - Select type     : Web app
 *       - Description      : ADALS CFS form
 *       - Execute as       : Me
 *       - Who has access   : Anyone
 *     Click Deploy. Authorise when Google prompts.
 *  4. Copy the Web app URL — it ends with  /exec
 *  5. Put that URL into index.html: the <form action="..."> ,
 *     replacing PASTE_APPS_SCRIPT_EXEC_URL.
 *
 * AFTER ANY EDIT to this script:  Deploy -> Manage deployments ->
 * edit -> Version: New version -> Deploy.  Otherwise the live form
 * keeps running the old code.
 * =============================================================
 */

// Form field names, in the order columns appear in the sheet.
// Must match the name="" attributes in index.html.
var FIELDS = [
  'name', 'email', 'country', 'organization', 'role', 'link',
  'theme', 'title', 'description', 'format', 'attendance',
  'timezone', 'other_languages', 'captions', 'access_needs',
  'consent_english', 'consent_data', 'consent_publish', 'notes'
];

// Honeypot field — must match the hidden input's name in index.html.
var HONEYPOT = 'hp_company';

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);  // stop two submissions colliding on one row

    var params = (e && e.parameter) ? e.parameter : {};

    // Spam: if the honeypot has any value a bot filled it. Return a
    // normal-looking response but write nothing.
    if (params[HONEYPOT]) {
      return thankYouPage_();
    }

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

    // First submission: lay down a header row.
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['submitted_at'].concat(FIELDS));
    }

    var row = [new Date()];
    for (var i = 0; i < FIELDS.length; i++) {
      row.push(params[FIELDS[i]] || '');
    }
    sheet.appendRow(row);

    return thankYouPage_();
  } catch (err) {
    return HtmlService.createHtmlOutput(
      '<p>Sorry — something went wrong saving your sign-up. ' +
      'Please contact the organising team. Error: ' + err + '</p>'
    );
  } finally {
    try { lock.releaseLock(); } catch (ignore) {}
  }
}

function doGet() {
  return HtmlService.createHtmlOutput(
    '<p>ADALS 2026 Call for Speakers — form endpoint. ' +
    'Please use the sign-up form to submit.</p>'
  );
}

function thankYouPage_() {
  return HtmlService.createHtmlOutput(
    '<!doctype html><html lang="en"><head><meta charset="utf-8">' +
    '<meta name="viewport" content="width=device-width, initial-scale=1">' +
    '<title>Thank you — ADALS 2026</title></head>' +
    '<body style="font-family:system-ui,sans-serif;max-width:34rem;' +
    'margin:3rem auto;padding:0 1.5rem;line-height:1.6;color:#1c1d23">' +
    '<h1 style="font-size:1.4rem">Thank you</h1>' +
    '<p>Your speaker sign-up for ADALS 2026 has been received. ' +
    'The organising team will be in touch.</p></body></html>'
  );
}
