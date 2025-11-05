# EmailJS Template Update Guide

## How to Update Your EmailJS Template

1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Navigate to **Email Templates**
3. Find your template with ID: `template_fx7ipta`
4. Click **Edit** on the template
5. Replace the entire template content with the code below
6. Click **Save**

---

## Beautiful HTML Email Template (Recommended - Copy & Paste)

Copy the entire template below and paste it into your EmailJS template editor. This template includes all your fields with a modern, professional design:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Job Application - {{position}}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
            background-color: #f4f4f4;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        .email-header {
            background: linear-gradient(135deg, #0BC5EA 0%, #00B5D8 100%);
            color: #ffffff;
            padding: 30px 20px;
            text-align: center;
        }
        .email-header h1 {
            font-size: 24px;
            font-weight: 600;
            margin: 0;
            letter-spacing: 0.5px;
        }
        .email-body {
            padding: 30px 25px;
        }
        .info-section {
            background-color: #f8f9fa;
            border-left: 4px solid #0BC5EA;
            padding: 20px;
            margin: 20px 0;
            border-radius: 4px;
        }
        .info-row {
            display: flex;
            margin-bottom: 12px;
            align-items: flex-start;
        }
        .info-row:last-child {
            margin-bottom: 0;
        }
        .info-label {
            font-weight: 600;
            color: #4a5568;
            min-width: 120px;
            font-size: 14px;
        }
        .info-value {
            color: #2d3748;
            flex: 1;
            font-size: 14px;
            word-break: break-word;
        }
        .info-value a {
            color: #0BC5EA;
            text-decoration: none;
            font-weight: 500;
        }
        .info-value a:hover {
            text-decoration: underline;
        }
        .section-title {
            font-size: 18px;
            font-weight: 600;
            color: #2d3748;
            margin: 25px 0 15px 0;
            padding-bottom: 10px;
            border-bottom: 2px solid #e2e8f0;
        }
        .section-title:first-child {
            margin-top: 0;
        }
        .links-section {
            background-color: #f0fdfa;
            border: 1px solid #0BC5EA;
            border-radius: 6px;
            padding: 20px;
            margin: 20px 0;
        }
        .link-item {
            margin-bottom: 15px;
        }
        .link-item:last-child {
            margin-bottom: 0;
        }
        .link-label {
            font-weight: 600;
            color: #2d3748;
            margin-bottom: 5px;
            font-size: 14px;
        }
        .link-value {
            font-size: 14px;
        }
        .link-value a {
            color: #0BC5EA;
            text-decoration: none;
            word-break: break-all;
            display: inline-block;
            padding: 8px 12px;
            background-color: #ffffff;
            border-radius: 4px;
            border: 1px solid #0BC5EA;
            transition: all 0.3s ease;
        }
        .link-value a:hover {
            background-color: #0BC5EA;
            color: #ffffff;
        }
        .message-box {
            background-color: #edf2f7;
            border-radius: 6px;
            padding: 20px;
            margin: 20px 0;
            font-size: 14px;
            color: #4a5568;
            line-height: 1.8;
        }
        .email-footer {
            background-color: #f8f9fa;
            padding: 20px;
            text-align: center;
            border-top: 1px solid #e2e8f0;
            font-size: 12px;
            color: #718096;
        }
        .divider {
            height: 1px;
            background-color: #e2e8f0;
            margin: 20px 0;
        }
        @media only screen and (max-width: 600px) {
            .email-container {
                width: 100% !important;
                border-radius: 0;
            }
            .email-body {
                padding: 20px 15px;
            }
            .info-row {
                flex-direction: column;
            }
            .info-label {
                margin-bottom: 5px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header -->
        <div class="email-header">
            <h1>📧 New Job Application</h1>
        </div>

        <!-- Body -->
        <div class="email-body">
            <!-- Basic Information -->
            <div class="section-title">Application Information</div>
            <div class="info-section">
                <div class="info-row">
                    <span class="info-label">To:</span>
                    <span class="info-value">{{to_name}}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">From:</span>
                    <span class="info-value">{{from_name}} ({{from_email}})</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Phone:</span>
                    <span class="info-value">{{phone}}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Position:</span>
                    <span class="info-value"><strong>{{position}}</strong></span>
                </div>
                {{#if location}}
                <div class="info-row">
                    <span class="info-label">Location:</span>
                    <span class="info-value">{{location}}</span>
                </div>
                {{/if}}
            </div>

            <!-- Application Links -->
            <div class="section-title">Application Links</div>
            <div class="links-section">
                <div class="link-item">
                    <div class="link-label">Resume:</div>
                    <div class="link-value">
                        <a href="{{resume_link}}" target="_blank">{{resume_link}}</a>
                    </div>
                </div>
                {{#if cover_letter_link}}
                <div class="link-item">
                    <div class="link-label">Cover Letter:</div>
                    <div class="link-value">
                        <a href="{{cover_letter_link}}" target="_blank">{{cover_letter_link}}</a>
                    </div>
                </div>
                {{/if}}
            </div>

            <!-- Applicant Details -->
            <div class="section-title">Applicant Details</div>
            <div class="info-section">
                <div class="info-row">
                    <span class="info-label">Name:</span>
                    <span class="info-value">{{from_name}}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Email:</span>
                    <span class="info-value"><a href="mailto:{{from_email}}">{{from_email}}</a></span>
                </div>
                {{#if college_email}}
                <div class="info-row">
                    <span class="info-label">College Email:</span>
                    <span class="info-value"><a href="mailto:{{college_email}}">{{college_email}}</a></span>
                </div>
                {{/if}}
                {{#if official_email}}
                <div class="info-row">
                    <span class="info-label">Official Email:</span>
                    <span class="info-value"><a href="mailto:{{official_email}}">{{official_email}}</a></span>
                </div>
                {{/if}}
                <div class="info-row">
                    <span class="info-label">Phone:</span>
                    <span class="info-value"><a href="tel:{{phone}}">{{phone}}</a></span>
                </div>
                {{#if college}}
                <div class="info-row">
                    <span class="info-label">College:</span>
                    <span class="info-value">{{college}}</span>
                </div>
                {{/if}}
            </div>

            <!-- Message -->
            <div class="message-box">
                <p><strong>Application Message:</strong></p>
                <p>This is a job application submission for the position of <strong>{{position}}</strong>.</p>
                <p style="margin-top: 15px;">Please review the attached resume{{#if cover_letter_link}} and cover letter{{/if}} links.</p>
            </div>
        </div>

        <!-- Footer -->
        <div class="email-footer">
            <p>This email was sent from <strong>Hushh Career Portal</strong></p>
            <p style="margin-top: 5px;">Please do not reply to this email.</p>
        </div>
    </div>
</body>
</html>
```

---


## Alternative: Simple HTML Template (Based on Your Original Format)

If you prefer a simpler version that matches your original structure more closely:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f4f4f4;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .header {
            background-color: #0BC5EA;
            color: white;
            padding: 20px;
            margin: -30px -30px 30px -30px;
            border-radius: 8px 8px 0 0;
            text-align: center;
        }
        .info-block {
            background-color: #f8f9fa;
            padding: 15px;
            margin: 15px 0;
            border-left: 4px solid #0BC5EA;
            border-radius: 4px;
        }
        .links-block {
            background-color: #f0fdfa;
            padding: 15px;
            margin: 15px 0;
            border: 1px solid #0BC5EA;
            border-radius: 4px;
        }
        a {
            color: #0BC5EA;
            text-decoration: none;
            word-break: break-all;
        }
        a:hover {
            text-decoration: underline;
        }
        strong {
            color: #2d3748;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>New Job Application</h2>
        </div>

        <div class="info-block">
            <p><strong>To:</strong> {{to_name}}<br>
            <strong>From:</strong> {{from_name}} ({{from_email}})<br>
            <strong>Phone:</strong> {{phone}}<br>
            <strong>Position:</strong> {{position}}</p>
        </div>

        <div class="links-block">
            <p><strong>Application Links:</strong><br>
            <strong>Resume:</strong> <a href="{{resume_link}}" target="_blank">{{resume_link}}</a><br>
            {{#if cover_letter_link}}
            <strong>Cover Letter:</strong> <a href="{{cover_letter_link}}" target="_blank">{{cover_letter_link}}</a>
            {{/if}}
            </p>
        </div>

        <p>This is a job application submission for the position of <strong>{{position}}</strong>.</p>

        <div class="info-block">
            <p><strong>Applicant Details:</strong><br>
            - <strong>Name:</strong> {{from_name}}<br>
            - <strong>Email:</strong> {{from_email}}<br>
            {{#if college_email}}
            - <strong>College Email:</strong> {{college_email}}<br>
            {{/if}}
            {{#if official_email}}
            - <strong>Official Email:</strong> {{official_email}}<br>
            {{/if}}
            - <strong>Phone:</strong> {{phone}}<br>
            {{#if college}}
            - <strong>College:</strong> {{college}}<br>
            {{/if}}
            </p>
        </div>

        <p>Please review the attached resume{{#if cover_letter_link}} and cover letter{{/if}} links.</p>
    </div>
</body>
</html>
```

---

## Template Variables Reference

All available variables that can be used in the template:

- `{{to_name}}` - Hiring Manager (static)
- `{{from_name}}` - Applicant's full name (First Name + Last Name)
- `{{first_name}}` - Applicant's first name
- `{{last_name}}` - Applicant's last name
- `{{from_email}}` - Applicant's email address
- `{{college_email}}` - Applicant's college email address (optional)
- `{{official_email}}` - Applicant's official email address (optional)
- `{{phone}}` - Applicant's phone number
- `{{college}}` - College name (LPU, MIT, or custom college name)
- `{{position}}` - Job title/position applied for
- `{{location}}` - Job location
- `{{resume_link}}` - Resume link URL
- `{{cover_letter_link}}` - Cover letter link URL (optional, if provided)

---

## Quick Setup Steps

1. **Login to EmailJS**: Go to https://dashboard.emailjs.com/
2. **Select Template**: Click on "Email Templates" → Find `template_fx7ipta`
3. **Edit Template**: Click the "Edit" button
4. **Set Template Type**: Make sure "HTML" is selected as the template format
5. **Replace Content**: Delete existing content and paste one of the HTML templates above
6. **Set Subject**: Enter `New Job Application - {{position}}` in the Subject field
7. **Save**: Click "Save" button
8. **Test**: Submit a test application to verify the email format

---

## Notes

- The templates use conditional rendering (`{{#if variable}}`) for optional fields like `cover_letter_link`, `college_email`, `official_email`, and `college`
- All email addresses are clickable (mailto links)
- All phone numbers are clickable (tel links)
- All resume/cover letter links are clickable and open in a new tab
- The templates are responsive and will look good on mobile devices
- The first template (Beautiful HTML) has a more modern, professional design
- The second template (Simple HTML) is closer to your original format

---

## Current Service Configuration

- **Service ID**: `service_tsuapx9`
- **Template ID**: `template_fx7ipta`
- **Public Key**: `DtG13YmoZDccI-GgA`

These are already configured in the code, so you only need to update the template content in EmailJS dashboard.
