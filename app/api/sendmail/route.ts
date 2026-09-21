import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// ------------------------------------------------------------------
// Types matching the contact form
// ------------------------------------------------------------------
interface FormData {
  name: string
  email: string
  contact: string
  projectType: string
  message: string
}

interface SendResult {
  ok: boolean
  error?: string
}

// ------------------------------------------------------------------
// Config
// ------------------------------------------------------------------
const BUSINESS_NAME = process.env.BUSINESS_NAME || 'Maestro Films'
const BUSINESS_EMAIL = process.env.BUSINESS_EMAIL // where you receive inquiries

// ------------------------------------------------------------------
// Security helpers
// ------------------------------------------------------------------
function escapeHtml(value: string): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

// Prevent header injection
const singleLine = (value: string) =>
  String(value ?? '')
    .replace(/[\r\n]+/g, ' ')
    .trim()

// ------------------------------------------------------------------
// SMTP Transporter (cached)
// ------------------------------------------------------------------
let cachedTransporter: ReturnType<typeof nodemailer.createTransport> | null = null

function getEmailTransporter() {
  if (!cachedTransporter) {
    cachedTransporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })
  }
  return cachedTransporter
}

// ------------------------------------------------------------------
// Email HTML wrapper (same visual style you already had)
// ------------------------------------------------------------------
function wrapEmailHTML(opts: {
  title: string
  subtitle: string
  intro?: string
  body: string
  footer: string
}): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif;
      color: #3d3d3a;
      margin: 0;
      padding: 0;
      background: #f5f1ed;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background: #f5f1ed;
    }
    .header {
      background: linear-gradient(to right, #c9a86c, #b8975a);
      color: #ffffff;
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 20px;
    }
    .intro {
      font-size: 14px;
      line-height: 1.6;
      margin: 0 0 8px 0;
    }
    .section {
      background: #ffffff;
      padding: 15px;
      margin: 15px 0;
      border-radius: 8px;
      border-left: 4px solid #c9a86c;
    }
    .section-title {
      color: #b8975a;
      font-size: 12px;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      margin-bottom: 6px;
    }
    .label {
      color: #a68b6a;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-top: 12px;
      margin-bottom: 3px;
    }
    .value {
      color: #3d3d3a;
      font-size: 14px;
      font-weight: 500;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0; font-size: 24px;">${opts.title}</h1>
      <p style="margin: 8px 0 0 0; opacity: 0.9;">${opts.subtitle}</p>
    </div>
    ${opts.intro ? `<p class="intro">${opts.intro}</p>` : ''}
    ${opts.body}
    <p style="color: #a68b6a; font-size: 12px; margin-top: 20px; text-align: center; line-height: 1.6;">
      ${opts.footer}
    </p>
  </div>
</body>
</html>
  `
}

// ------------------------------------------------------------------
// Build HTML body for the inquiry
// ------------------------------------------------------------------
function buildInquiryHTML(data: FormData): string {
  return `
    <div class="section">
      <div class="section-title">Contact Information</div>

      <div class="label">Name</div>
      <div class="value">${escapeHtml(data.name)}</div>

      <div class="label">Email</div>
      <div class="value">
        <a href="mailto:${escapeHtml(data.email)}" style="color: #b8975a; text-decoration: none;">
          ${escapeHtml(data.email)}
        </a>
      </div>

      <div class="label">Phone</div>
      <div class="value">
        <a href="tel:${escapeHtml(data.contact)}" style="color: #b8975a; text-decoration: none;">
          ${escapeHtml(data.contact || 'Not provided')}
        </a>
      </div>
    </div>

    <div class="section">
      <div class="section-title">Project Details</div>

      <div class="label">Project Type</div>
      <div class="value">${escapeHtml(data.projectType)}</div>

      <div class="label">Project Brief</div>
      <div class="value" style="white-space: pre-wrap;">${escapeHtml(data.message)}</div>
    </div>
  `
}

function buildInquiryText(data: FormData): string {
  return [
    'CONTACT INFORMATION',
    `Name: ${singleLine(data.name)}`,
    `Email: ${singleLine(data.email)}`,
    `Phone: ${singleLine(data.contact || 'Not provided')}`,
    '',
    'PROJECT DETAILS',
    `Project Type: ${singleLine(data.projectType)}`,
    '',
    'Project Brief:',
    singleLine(data.message),
  ].join('\n')
}

// ------------------------------------------------------------------
// Send via SMTP
// ------------------------------------------------------------------
async function sendEmailViaSMTP(opts: {
  to: string
  subject: string
  html: string
  text: string
  replyTo?: string
}): Promise<SendResult> {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return {
      ok: false,
      error: 'SMTP_HOST, SMTP_USER or SMTP_PASS is not set',
    }
  }

  try {
    const transporter = getEmailTransporter()

    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: opts.to,
      subject: opts.subject,
      html: opts.html,
      text: opts.text,
      replyTo: opts.replyTo,
    })

    console.log('Email sent:', info.messageId)
    return { ok: true }
  } catch (error) {
    console.error('SMTP email error:', error)
    return {
      ok: false,
      error: error instanceof Error ? error.message : 'Email send failed',
    }
  }
}

// ------------------------------------------------------------------
// POST handler
// ------------------------------------------------------------------
export async function POST(request: NextRequest) {
  try {
    const data: FormData = await request.json()

    // Required fields
    if (!data.name?.trim() || !data.email?.trim() || !data.projectType?.trim() || !data.message?.trim()) {
      return NextResponse.json(
        { error: 'Please fill in all required fields' },
        { status: 400 }
      )
    }

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // ---- Business notification email ----
    const businessHtml = wrapEmailHTML({
      title: 'New Inquiry Received',
      subtitle: 'Photography / Film Service Request',
      body: buildInquiryHTML(data),
      footer: 'This is an automated message. Reply to this email to respond to the client directly.',
    })

    const businessText =
      `NEW INQUIRY RECEIVED\n\n` + buildInquiryText(data)

    const businessPromise: Promise<SendResult> = BUSINESS_EMAIL
      ? sendEmailViaSMTP({
          to: BUSINESS_EMAIL,
          subject: `New Photography Inquiry from ${singleLine(data.name)}`,
          html: businessHtml,
          text: businessText,
          replyTo: data.email,
        })
      : Promise.resolve({
          ok: false,
          error: 'BUSINESS_EMAIL is not set',
        })

    // ---- Client confirmation email ----
    const firstName = singleLine(data.name).split(' ')[0] || 'there'

    const clientHtml = wrapEmailHTML({
      title: `Thank you, ${escapeHtml(firstName)}!`,
      subtitle: "We've received your inquiry",
      intro:
        'Here is a copy of the details you submitted. Our team will get back to you shortly. If anything looks wrong, just reply to this email.',
      body: buildInquiryHTML(data),
      footer: `Best regards,<br>${escapeHtml(BUSINESS_NAME)}`,
    })

    const clientText =
      `Thank you, ${firstName}!\n\n` +
      `We've received your inquiry. Here is a copy of the details you submitted:\n\n` +
      buildInquiryText(data) +
      `\n\nWe'll get back to you shortly.\n\nBest regards,\n${BUSINESS_NAME}`

    const clientPromise = sendEmailViaSMTP({
      to: data.email,
      subject: 'We received your photography inquiry! ✓',
      html: clientHtml,
      text: clientText,
      replyTo: BUSINESS_EMAIL || process.env.SMTP_USER,
    })

    // Send both in parallel
    const [businessResult, clientResult] = await Promise.all([
      businessPromise,
      clientPromise,
    ])

    // We consider the request successful if at least the business email went out
    if (!businessResult.ok) {
      console.error('Business email failed:', businessResult.error)
      return NextResponse.json(
        {
          error: 'Failed to send inquiry. Please try again later.',
          details: businessResult.error,
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Inquiry submitted successfully',
      sent: {
        businessEmail: businessResult.ok,
        clientEmail: clientResult.ok,
      },
      errors: {
        businessEmail: businessResult.error ?? null,
        clientEmail: clientResult.error ?? null,
      },
    })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Failed to process inquiry' },
      { status: 500 }
    )
  }
}