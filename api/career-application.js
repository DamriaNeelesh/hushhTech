import { google } from 'googleapis';

const REQUIRED_FIELDS = [
  'firstName',
  'lastName',
  'email',
  'collegeEmail',
  'officialEmail',
  'phone',
  'resumeLink',
  'college',
];

const SHEETS_SCOPE = ['https://www.googleapis.com/auth/spreadsheets'];
const ALLOWED_COLLEGES = new Set(['LPU', 'MIT']);

const sanitizeString = (value) => (typeof value === 'string' ? value.trim() : '');

const parseRequestBody = (body) => {
  if (!body) {
    return {};
  }

  if (typeof body === 'string') {
    try {
      return JSON.parse(body);
    } catch (error) {
      throw new Error('Invalid JSON payload');
    }
  }

  return body;
};

const normalizeCredentials = (rawCredentials) => {
  if (!rawCredentials) {
    throw new Error('Missing GOOGLE_SHEETS_CREDENTIALS');
  }

  let parsed;
  try {
    parsed = JSON.parse(rawCredentials);
  } catch (error) {
    throw new Error('GOOGLE_SHEETS_CREDENTIALS must be valid JSON');
  }

  if (parsed.private_key) {
    parsed.private_key = parsed.private_key.replace(/\\n/g, '\n');
  }

  return parsed;
};

const isValidUrl = (value) => {
  try {
    const parsed = new URL(value);
    return Boolean(parsed.protocol && parsed.host);
  } catch (error) {
    return false;
  }
};

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const payload = parseRequestBody(request.body);
    const sanitized = {
      firstName: sanitizeString(payload.firstName),
      lastName: sanitizeString(payload.lastName),
      email: sanitizeString(payload.email),
      collegeEmail: sanitizeString(payload.collegeEmail),
      officialEmail: sanitizeString(payload.officialEmail),
      phone: sanitizeString(payload.phone),
      resumeLink: sanitizeString(payload.resumeLink),
      college: sanitizeString(payload.college),
      collegeValue: sanitizeString(payload.collegeValue || payload.college),
      jobTitle: sanitizeString(payload.jobTitle),
      jobLocation: sanitizeString(payload.jobLocation),
      submittedAt: sanitizeString(payload.submittedAt),
    };

    const missingField = REQUIRED_FIELDS.find((field) => !sanitized[field]);
    if (missingField) {
      return response.status(400).json({ error: `Missing required field: ${missingField}` });
    }

    if (!ALLOWED_COLLEGES.has(sanitized.collegeValue)) {
      return response.status(400).json({ error: 'Invalid college selection' });
    }

    if (!isValidUrl(sanitized.resumeLink)) {
      return response.status(400).json({ error: 'Invalid resume link' });
    }

    const credentials = normalizeCredentials(process.env.GOOGLE_SHEETS_CREDENTIALS);
    const sheetId = sanitizeString(process.env.GOOGLE_SHEET_ID);

    if (!sheetId) {
      throw new Error('Missing GOOGLE_SHEET_ID');
    }

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: SHEETS_SCOPE,
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const submittedAt = sanitized.submittedAt || new Date().toISOString();

    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: 'Sheet1!A:K',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[
          submittedAt,
          sanitized.firstName,
          sanitized.lastName,
          sanitized.email,
          sanitized.collegeEmail,
          sanitized.officialEmail,
          sanitized.phone,
          sanitized.college,
          sanitized.jobTitle,
          sanitized.jobLocation,
          sanitized.resumeLink,
        ]],
      },
    });

    return response.status(200).json({
      success: true,
      message: 'Application received and saved',
      data: {
        ...sanitized,
        submittedAt,
      },
    });
  } catch (error) {
    console.error('Error processing application:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return response.status(500).json({
      error: 'Internal server error',
      message,
    });
  }
}