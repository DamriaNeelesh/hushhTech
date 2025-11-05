# Career Application Form - Setup Guide

## ✅ What's Been Updated

### Form Fields
The application form now includes the following fields:
- ✅ First Name (required)
- ✅ Last Name (required)
- ✅ Email (required)
- ✅ College Email (required)
- ✅ Official Email (required)
- ✅ Phone Number (required)
- ✅ College Dropdown (required)
  - LPU option
  - Other option (shows text input when selected)
- ✅ Resume Link (required)

### Integration Methods
1. **EmailJS Integration** ✅ (Already working)
   - Sends email notification with all form data
   - Uses existing EmailJS service configuration

2. **Excel/Google Sheets Integration** ✅ (Needs setup)
   - API endpoint created at `/api/career-application`
   - Ready for Google Sheets, Supabase, or Webhook integration

## 📋 Setup Instructions

### Step 1: Choose Your Excel Integration Method

You have three options:

#### Option 1: Google Sheets (Recommended for Excel-like functionality)
This is the most straightforward option for Excel-like functionality.

1. **Install dependencies:**
   ```bash
   npm install googleapis
   ```

2. **Set up Google Cloud Console:**
   - Go to https://console.cloud.google.com/
   - Create a new project or select existing
   - Enable "Google Sheets API"
   - Go to "Credentials" → "Create Credentials" → "Service Account"
   - Create service account and download JSON key file
   - Open the JSON file and copy its contents

3. **Create a Google Sheet:**
   - Create a new Google Sheet
   - Add headers in the first row:
     ```
     Submitted At | First Name | Last Name | Email | College Email | Official Email | Phone | College | Job Title | Job Location | Resume Link
     ```
   - Copy the Sheet ID from the URL:
     `https://docs.google.com/spreadsheets/d/1xxgHh13mAuPsdIBgCtbrYvQr_dd-7y6dFIqb5qdUSw8/edit`
   - Open the JSON key file you downloaded for your Google service account.  
   - Locate the `"client_email"` field in the JSON (it will look something like `your-service-account-name@your-project-id.iam.gserviceaccount.com`).  
   - Go to your Google Sheet and click the "Share" button in the upper-right corner.
   - In the "Add people and groups" field, paste the service account email you copied from the JSON file.
   - Set the permission level to "Editor" (so the API can write to your sheet).
   - Click "Send" or "Share" to confirm.  
   - This step is essential, as your app backend (running as the service account) will only be able to access and write data to your sheet if you share it with the exact service account email with Editor permissions.

4. **Set environment variables in Vercel:**
   - `GOOGLE_SHEETS_CREDENTIALS`: Paste the entire JSON content as a string
   - `GOOGLE_SHEET_ID`: Your Google Sheet ID

5. **Update the API file:**
   - Open `api/career-application.js`
   - Uncomment the Google Sheets code (lines 20-49)
   - Comment out or remove the console.log placeholder

#### Option 2: Supabase (Already in your dependencies)
Great if you want to store data in a database and export to Excel later.

1. **Create a table in Supabase:**
   ```sql
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
   ```

2. **Set environment variables in Vercel:**
   - `SUPABASE_URL`: Your Supabase project URL
   - `SUPABASE_ANON_KEY`: Your Supabase anon key

3. **Update the API file:**
   - Open `api/career-application.js`
   - Uncomment the Supabase code (lines 51-65)
   - Comment out or remove the console.log placeholder

4. **Export to Excel:**
   - Use Supabase dashboard → Table → Export
   - Or set up a scheduled job to export periodically

#### Option 3: Webhook (Zapier, Make.com, etc.)
Useful if you want to use automation tools.

1. **Create a webhook in Zapier/Make.com**
2. **Set environment variable in Vercel:**
   - `WEBHOOK_URL`: Your webhook URL
3. **Update the API file:**
   - Open `api/career-application.js`
   - Uncomment the webhook code (lines 67-77)
   - Comment out or remove the console.log placeholder
4. **Configure Zapier/Make.com** to save to Google Sheets or Excel

### Step 2: Deploy to Vercel

1. **Commit your changes:**
   ```bash
   git add .
   git commit -m "Update career application form with new fields and Excel integration"
   git push
   ```

2. **Set environment variables in Vercel:**
   - Go to your Vercel project settings
   - Navigate to "Environment Variables"
   - Add the required variables based on your chosen integration method

3. **Deploy:**
   - Vercel will automatically deploy on push
   - Or manually trigger a deployment

### Step 3: Test the Integration

1. **Fill out the form** on your career page
2. **Submit the application**
3. **Check:**
   - Email notification (EmailJS)
   - Excel/Google Sheets entry (your chosen method)
   - Vercel function logs (if using Google Sheets/Supabase)

## 📝 Notes

- The form currently sends data to both EmailJS and the Excel API endpoint
- If the Excel API fails, it won't block the form submission (EmailJS will still work)
- The API endpoint is located at `/api/career-application`
- All form fields are validated before submission
- The college dropdown shows a text input when "Other" is selected

## 🔧 Troubleshooting

### API endpoint not working?
- Check Vercel function logs
- Verify environment variables are set correctly
- Ensure the API endpoint code is uncommented and configured

### Google Sheets not updating?
- Verify the service account email has access to the sheet
- Check that `GOOGLE_SHEET_ID` is correct
- Verify `GOOGLE_SHEETS_CREDENTIALS` is a valid JSON string

### Supabase not saving?
- Check that the table exists with the correct schema
- Verify `SUPABASE_URL` and `SUPABASE_ANON_KEY` are correct
- Check Supabase RLS (Row Level Security) policies

## 📞 Support

If you encounter any issues, check:
1. Browser console for frontend errors
2. Vercel function logs for backend errors
3. EmailJS dashboard for email delivery status
4. Google Sheets/Supabase for data entry confirmation

