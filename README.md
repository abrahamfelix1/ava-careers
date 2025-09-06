# AVA Careers — One‑Page Recruitment Site

Futuristic React + Tailwind site with animated job cards and an ATS-style application form.
Submissions are emailed to **projectsavahq@gmail.com** via a Netlify Function (SMTP/Nodemailer).

## Quick Start
```bash
npm i
npm run dev
```

## Deploy (Netlify)
1) Create a new site from this folder.
2) In **Site settings → Environment variables**, set:
   - `SMTP_HOST` (e.g., smtp.gmail.com)
   - `SMTP_PORT` (587)
   - `SMTP_USER` (SMTP username)
   - `SMTP_PASS` (SMTP password or Gmail App Password)
   - `SMTP_FROM` (e.g., careers@ava.ai)
3) Deploy. The function will live at `/.netlify/functions/sendApplication`.

## Notes
- The logo is in `src/assets/ava-logo.png`.
- To use Vercel instead, convert the function to their API format and update the fetch URL.
