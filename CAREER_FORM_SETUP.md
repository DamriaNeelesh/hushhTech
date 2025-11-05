# Career Application Form - Setup Guide

## ✅ Form Fields & Validation
The application modal located at `src/pages/career/ApplicationForm.tsx` collects the following required fields before it will submit:

- First Name
- Last Name
- Personal Email
- College Email
- Official Email
- Phone Number (international format)
- College selector (`LPU` or `MIT` only)
- Resume Link (must be a valid, shareable URL)

The form blocks submission until every field is populated, the resume link is a valid URL, and either LPU or MIT is selected. After a successful submission the form resets and closes automatically.

## ✉️ EmailJS Workflow (Frontend)
The UI keeps the existing EmailJS configuration. When a submission is accepted it sends the data with the template `template_fx7ipta` under the service `service_tsuapx9` using the public key `DtG13YmoZDccI-GgA`. No additional setup is required on Vercel beyond ensuring the EmailJS credentials remain active.

## 📊 Google Sheets Workflow (Serverless API)
The API route at `api/career-application.js` appends each submission to Google Sheets. Make sure the following environment variables are configured in Vercel (Project Settings → Environment Variables) before deploying:

- `GOOGLE_SHEETS_CREDENTIALS` – Paste the full JSON for the Google service account (all newlines escaped with `\n`).
- `GOOGLE_SHEET_ID` – The target spreadsheet ID (the characters between `/d/` and `/edit` in the sheet URL).

The service account **must** have Editor access to the spreadsheet. Share the sheet with `hushh-tech-career@hushh-tech-career-page-form.iam.gserviceaccount.com` (or the email inside your JSON credentials).

The handler already normalizes credentials, validates every field, and appends data to `Sheet1!A:K`. If you need a different tab or header order, adjust the `range` and `values` inside the `sheets.spreadsheets.values.append` call.

## 🚀 Deploying to Vercel (Step-by-Step)
Follow these exact steps, which line up with the screenshot the team provided:

1. **Framework Preset** – Choose **Vite**.
2. **Build Command** – `npm run build`.
3. **Install Command** – `npm install --legacy-peer-deps` (this avoids the npm peer-dependency conflict Vercel reported with `vite-plugin-mdx`).
4. **Output Directory** – `dist`.
5. **Development Command** – `vite` (Vercel ignores this during production builds but it matches the local setup).
6. **Environment Variables** – Add the Google Sheets credentials and sheet ID listed above (plus any EmailJS keys if you move them out of the component).
7. **Save & Redeploy** – Trigger a new deployment after the configuration is saved.

The repository also contains a `vercel.json` file that mirrors the settings above. Vercel will respect the JSON file in addition to the dashboard settings, so keeping them aligned prevents configuration drift. The file now pins the install command to `npm install --legacy-peer-deps`, runs `npm run build`, sets the Node runtime for the API routes to 18.x, and rewrites all SPA routes back to `index.html` so direct navigation works after deployment.

## 🧪 Testing Checklist
After deploying, run through this quick smoke test:

1. Open the career page and submit the form with test data.
2. Confirm you see the success toast and the modal closes.
3. Verify the EmailJS dashboard shows a delivered email.
4. Open the Google Sheet and confirm a new row was appended with the submission details.
5. Review the Vercel function logs for `/api/career-application` to ensure no warnings were logged.

If any step fails, inspect the browser console (frontend) or Vercel logs (backend) for detailed error messages.
