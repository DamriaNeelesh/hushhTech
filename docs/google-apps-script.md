# Google Apps Script for Career Applications

Deploy the following Google Apps Script as a Web App connected to the target spreadsheet. It expects JSON data from the frontend and appends each submission as a new row.

```javascript
const SHEET_NAME = 'Sheet1';
const REQUIRED_FIELDS = [
  'firstName',
  'lastName',
  'email',
  'collegeEmail',
  'officialEmail',
  'phone',
  'resumeLink',
  'college',
  'collegeValue',
  'jobTitle',
  'jobLocation',
  'submittedAt',
];

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return createResponse(400, { success: false, error: 'Missing request body' });
    }

    const payload = JSON.parse(e.postData.contents);
    const missingField = REQUIRED_FIELDS.find((field) => !payload[field]);

    if (missingField) {
      return createResponse(400, {
        success: false,
        error: `Missing required field: ${missingField}`,
      });
    }

    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);

    const submittedAt = payload.submittedAt || new Date().toISOString();

    sheet.appendRow([
      submittedAt,
      payload.firstName,
      payload.lastName,
      payload.email,
      payload.collegeEmail,
      payload.officialEmail,
      payload.phone,
      payload.college,
      payload.jobTitle,
      payload.jobLocation,
      payload.resumeLink,
    ]);

    return createResponse(200, {
      success: true,
      message: 'Row appended successfully',
      submittedAt,
    });
  } catch (error) {
    return createResponse(500, {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

function createResponse(statusCode, body) {
  const output = ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON);

  if (typeof output.setResponseCode === 'function') {
    output.setResponseCode(statusCode);
  }

  if (typeof output.setHeader === 'function') {
    output.setHeader('Access-Control-Allow-Origin', '*');
    output.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    output.setHeader('Access-Control-Allow-Methods', 'POST');
  }

  return output;
}
```

> **Tip:** After saving the script, deploy it as a *Web App*, set *Execute as* to "Me", and grant access to "Anyone" (or the appropriate audience). The deployment URL becomes the `GOOGLE_APPS_SCRIPT_URL` environment variable used by the API.
