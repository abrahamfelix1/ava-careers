import nodemailer from 'nodemailer';
import Busboy from 'busboy';

export const config = { path: '/.netlify/functions/sendApplication' };

export default async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  try {
    const busboy = Busboy({ headers: req.headers });
    const data = {};
    let resumeBuffer = null; let resumeFilename = 'resume';

    await new Promise((resolve, reject) => {
      busboy.on('file', (name, file, info) => {
        resumeFilename = info?.filename || 'resume';
        const chunks = []; file.on('data', d => chunks.push(d));
        file.on('end', () => { resumeBuffer = Buffer.concat(chunks); });
      });
      busboy.on('field', (name, val) => { data[name] = val; });
      busboy.on('error', reject); busboy.on('finish', resolve);
      req.pipe(busboy);
    });

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
    });

    const to = 'projectsavahq@gmail.com';
    const subject = `AVA Application — ${data.role || 'Unknown role'} — ${data.fullName || 'Unnamed'}`;
    const html = `
      <h2>New AVA Application</h2>
      <p><b>Role:</b> ${data.role || ''}</p>
      <p><b>Name:</b> ${data.fullName || ''}</p>
      <p><b>Email:</b> ${data.email || ''}</p>
      <p><b>Phone:</b> ${data.phone || ''}</p>
      <p><b>LinkedIn:</b> ${data.linkedin || ''}</p>
      <p><b>Portfolio:</b> ${data.portfolio || ''}</p>
      <p><b>Cover letter:</b></p>
      <pre style="white-space:pre-wrap">${(data.cover || '').replace(/[<>&]/g, s => ({'<':'&lt;','>':'&gt;','&':'&amp;'}[s]))}</pre>
    `;

    const attachments = resumeBuffer ? [{ filename: resumeFilename, content: resumeBuffer }] : [];
    await transporter.sendMail({
      from: `AVA Careers <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to, subject, html, attachments
    });
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Failed to send application' });
  }
};