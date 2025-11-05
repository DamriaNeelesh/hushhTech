import { google } from 'googleapis';

// Vercel Serverless Function for Career Application Excel Integration
// This endpoint receives application data and saves it to Google Sheets

export default async function handler(request, response) {
  // Only allow POST requests
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const applicationData = typeof request.body === 'string' ? JSON.parse(request.body) : request.body;

    if (!process.env.GOOGLE_SHEETS_CREDENTIALS) {
      throw new Error('Missing Google Sheets credentials');
    }

    if (!process.env.GOOGLE_SHEET_ID) {
      throw new Error('Missing Google Sheet ID');
    }

    // Validate required fields
    if (!applicationData.firstName || !applicationData.lastName || !applicationData.email) {
      return response.status(400).json({ error: 'Missing required fields' });
    }

    // Google Sheets integration using service account credentials
    const credentials = JSON.parse(process.env.GOOGLE_SHEETS_CREDENTIALS);

    if (credentials.private_key) {
      credentials.private_key = credentials.private_key.replace(/\\n/g, '\n');
    }

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });

    const sheets = google.sheets({ version: 'v4', auth });

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Sheet1!A:K',
      valueInputOption: 'RAW',
      requestBody: {
        values: [[
          applicationData.submittedAt || new Date().toISOString(),
          applicationData.firstName,
          applicationData.lastName,
          applicationData.email,
          applicationData.collegeEmail || '',
          applicationData.officialEmail || '',
          applicationData.phone || '',
          applicationData.college || '',
          applicationData.jobTitle || '',
          applicationData.jobLocation || '',
          applicationData.resumeLink || ''
        ]]
      }
    });
    

    // Option 2: Supabase Integration (Already in your dependencies)
    // Uncomment if you want to use Supabase
    /*
    const { createClient } = require('@supabase/supabase-js');
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_ANON_KEY
    );
    
    const { data, error } = await supabase
      .from('career_applications')
      .insert([applicationData]);
    
    if (error) throw error;
    */

    // Option 3: Webhook Integration (Zapier, Make.com, etc.)
    // Uncomment if you want to use a webhook
    /*
    if (process.env.WEBHOOK_URL) {
      await fetch(process.env.WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(applicationData)
      });
    }
    */

    // Log the submission for traceability
    console.log('Application received:', JSON.stringify(applicationData, null, 2));

    return response.status(200).json({
      success: true,
      message: 'Application received and saved',
      data: applicationData
    });

  } catch (error) {
    console.error('Error processing application:', error);
    return response.status(500).json({
      error: 'Internal server error',
      message: error.message || 'Unknown error'
    });
  }
}

/*
SETUP INSTRUCTIONS:

===================
Option 1: Google Sheets (Recommended for Excel-like functionality)
===================
1. Install dependencies:
   npm install googleapis

2. Set up Google Cloud Console:
   - Go to https://console.cloud.google.com/
   - Create a new project or select existing
   - Enable "Google Sheets API"
   - Go to "Credentials" → "Create Credentials" → "Service Account"
   - Create service account and download JSON key file
   - Open the JSON file and copy its contents

3. Share your Google Sheet with the service account email:
   - Open your Google Sheet
   - Click "Share" button
   - Add the service account email (from the JSON file)
   - Give it "Editor" permissions

4. Set environment variables in Vercel:
   - GOOGLE_SHEETS_CREDENTIALS: Paste the entire JSON content as a string
   - GOOGLE_SHEET_ID: Your Google Sheet ID (from the URL: https://docs.google.com/spreadsheets/d/SHEET_ID/edit)

5. Ensure the Google Sheets integration in this file remains enabled

6. Create headers row in your Google Sheet (first row):
   Submitted At | First Name | Last Name | Email | College Email | Official Email | Phone | College | Job Title | Job Location | Resume Link

===================
Option 2: Supabase (Already in your dependencies)
===================
1. Create a table in Supabase:
   CREATE TABLE career_applications (
     id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
     first_name TEXT NOT NULL,
     last_name TEXT NOT NULL,
     email TEXT NOT NULL,
     college_email TEXT,
     official_email TEXT,
     phone TEXT,
     resume_link TEXT NOT NULL,
     college TEXT,
     job_title TEXT,
     job_location TEXT,
     submitted_at TIMESTAMP DEFAULT NOW()
   );

2. Set environment variables in Vercel:
   - SUPABASE_URL: Your Supabase project URL
   - SUPABASE_ANON_KEY: Your Supabase anon key

3. Uncomment the Supabase code in this file

4. Export to Excel: You can export Supabase data to Excel using:
   - Supabase dashboard → Table → Export
   - Or use a scheduled job to export periodically

===================
Option 3: Webhook (Zapier, Make.com, etc.)
===================
1. Create a webhook in Zapier/Make.com
2. Set environment variable in Vercel:
   - WEBHOOK_URL: Your webhook URL
3. Uncomment the webhook code in this file
4. Configure Zapier/Make.com to save to Google Sheets or Excel

*/

