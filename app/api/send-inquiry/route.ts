import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// ------------------------------------------------------------------
// Product data — MUST match the form exactly
// ------------------------------------------------------------------
const products: Record<string, Record<string, number>> = {
  catalogues: {
    "cat-starting": 10000,
  },
  editorial: {
    "edit-starting": 4500,
  },
  campaign: {
    "camp-starting": 4500,
  },
  "high-fashion": {
    "hf-starting": 25000,
  },
  monthly: {
    "monthly-starting": 25000,
  },
};

// ------------------------------------------------------------------
// Add-on services — MUST match the form exactly
// ------------------------------------------------------------------
const services: Record<string, number> = {
  "social-media": 15000,
  model: 3000,
  makeup: 3000,
};

// ------------------------------------------------------------------
// Labels (for nice emails)
// ------------------------------------------------------------------
const serviceLabels: Record<string, string> = {
  catalogues: "Catalogues Shoot",
  editorial: "Editorial Shoot",
  campaign: "Campaign Shoot",
  "high-fashion": "High-Fashion Shoot",
  monthly: "Monthly Package",

  "cat-starting": "Starting from",
  "edit-starting": "Starting from",
  "camp-starting": "Starting from",
  "hf-starting": "Starting from",
  "monthly-starting":
    "Starting from — Includes: 5 Dress Catalogues + 1 Campaign + 1 Editorial + Social Media Handling",

  "social-media": "Social Media Handling",
  model: "Model",
  makeup: "Makeup",
};

// ------------------------------------------------------------------
// Types
// ------------------------------------------------------------------
interface FormData {
  name: string;
  email: string;
  address: string;
  phone: string;
  shootType: string;
  selectedProduct: string;
  lookingFor: string;
  budget?: string;
  services: string[];
}

interface SendResult {
  ok: boolean;
  error?: string;
}

// ------------------------------------------------------------------
// Config
// ------------------------------------------------------------------
const BUSINESS_NAME = process.env.BUSINESS_NAME || "Maestro Films";

const has = (obj: object, key: string) =>
  Object.prototype.hasOwnProperty.call(obj, key);

const money = (amount: number) =>
  `₹${amount.toLocaleString("en-IN")}`;

const frequencyLabel = (data: FormData) =>
  data.lookingFor === "single-shoot" ? "Single Shoot" : "Monthly Shoot";

// ------------------------------------------------------------------
// Security helpers
// ------------------------------------------------------------------
function escapeHtml(value: string): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const singleLine = (value: string) =>
  String(value ?? "")
    .replace(/[\r\n]+/g, " ")
    .trim();

// ------------------------------------------------------------------
// Calculate total
// ------------------------------------------------------------------
function calculateTotalCost(data: FormData): number {
  let total = 0;

  total += products[data.shootType]?.[data.selectedProduct] || 0;

  data.services.forEach((service) => {
    total += services[service] || 0;
  });

  return total;
}

// ------------------------------------------------------------------
// SMTP Transporter (cached)
// ------------------------------------------------------------------
let cachedTransporter: ReturnType<typeof nodemailer.createTransport> | null =
  null;

function getEmailTransporter() {
  if (!cachedTransporter) {
    cachedTransporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  return cachedTransporter;
}

// ------------------------------------------------------------------
// Build HTML / Text summaries
// ------------------------------------------------------------------
function buildSummaryHTML(data: FormData, total: number): string {
  const packageCost =
    products[data.shootType]?.[data.selectedProduct] || 0;

  const addOns = data.services
    .map(
      (s) =>
        `<li style="margin: 6px 0;">
          ${escapeHtml(serviceLabels[s] || s)}
          &ndash;
          ${money(services[s] || 0)}
        </li>`
    )
    .join("");

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
        <a href="tel:${escapeHtml(data.phone)}" style="color: #b8975a; text-decoration: none;">
          ${escapeHtml(data.phone)}
        </a>
      </div>
      <div class="label">Location</div>
      <div class="value">${escapeHtml(data.address)}</div>
    </div>

    <div class="section">
      <div class="section-title">Service Selection</div>
      <div class="label">Service Type</div>
      <div class="value">${escapeHtml(serviceLabels[data.shootType] || data.shootType)}</div>
      <div class="label">Package</div>
      <div class="value">
        ${escapeHtml(serviceLabels[data.selectedProduct] || data.selectedProduct)}
        &ndash;
        ${money(packageCost)}
      </div>
      <div class="label">Frequency</div>
      <div class="value">${escapeHtml(frequencyLabel(data))}</div>
      ${
        data.budget
          ? `
        <div class="label">Budget</div>
        <div class="value">${escapeHtml(data.budget)}</div>
      `
          : ""
      }
    </div>

    ${
      addOns
        ? `
      <div class="section">
        <div class="section-title">Add-on Services</div>
        <ul style="margin: 0; padding-left: 20px;" class="value">
          ${addOns}
        </ul>
      </div>
      `
        : ""
    }

    <div class="total">
      Total Estimated Cost: ${money(total)}
    </div>
  `;
}

function buildSummaryText(data: FormData, total: number): string {
  const packageCost =
    products[data.shootType]?.[data.selectedProduct] || 0;

  const lines = [
    "CONTACT INFORMATION",
    `Name: ${singleLine(data.name)}`,
    `Email: ${singleLine(data.email)}`,
    `Phone: ${singleLine(data.phone)}`,
    `Location: ${singleLine(data.address)}`,
    "",
    "SERVICE SELECTION",
    `Service Type: ${serviceLabels[data.shootType] || data.shootType}`,
    `Package: ${serviceLabels[data.selectedProduct] || data.selectedProduct} - ${money(packageCost)}`,
    `Frequency: ${frequencyLabel(data)}`,
  ];

  if (data.budget) {
    lines.push(`Budget: ${singleLine(data.budget)}`);
  }

  if (data.services.length > 0) {
    lines.push("", "ADD-ON SERVICES");
    data.services.forEach((s) => {
      lines.push(
        `- ${serviceLabels[s] || s} - ${money(services[s] || 0)}`
      );
    });
  }

  lines.push("", `TOTAL ESTIMATED COST: ${money(total)}`);
  return lines.join("\n");
}

// ------------------------------------------------------------------
// Email HTML wrapper
// ------------------------------------------------------------------
function wrapEmailHTML(opts: {
  title: string;
  subtitle: string;
  intro?: string;
  body: string;
  footer: string;
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
    .total {
      background: #c9a86c;
      color: #ffffff;
      padding: 15px;
      border-radius: 8px;
      margin-top: 20px;
      font-size: 18px;
      font-weight: bold;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0; font-size: 24px;">${opts.title}</h1>
      <p style="margin: 8px 0 0 0; opacity: 0.9;">${opts.subtitle}</p>
    </div>
    ${opts.intro ? `<p class="intro">${opts.intro}</p>` : ""}
    ${opts.body}
    <p style="color: #a68b6a; font-size: 12px; margin-top: 20px; text-align: center; line-height: 1.6;">
      ${opts.footer}
    </p>
  </div>
</body>
</html>
  `;
}

// ------------------------------------------------------------------
// Business + Client emails
// ------------------------------------------------------------------
function generateBusinessEmail(data: FormData, total: number) {
  return {
    subject: `New Photography Inquiry from ${singleLine(data.name)}`,
    html: wrapEmailHTML({
      title: "New Inquiry Received",
      subtitle: "Photography Service Request",
      body: buildSummaryHTML(data, total),
      footer:
        "This is an automated message. Reply to this email to respond to the client directly.",
    }),
    text: `NEW INQUIRY RECEIVED\n\n` + buildSummaryText(data, total),
  };
}

function generateClientEmail(data: FormData, total: number) {
  const firstName = singleLine(data.name).split(" ")[0] || "there";

  return {
    subject: "We received your photography inquiry! ✓",
    html: wrapEmailHTML({
      title: `Thank you, ${escapeHtml(firstName)}!`,
      subtitle: "We've received your inquiry",
      intro:
        "Here is a copy of the details you submitted. Our team will get back to you shortly. If anything looks wrong, just reply to this email.",
      body: buildSummaryHTML(data, total),
      footer: `Best regards,<br>${escapeHtml(BUSINESS_NAME)}`,
    }),
    text:
      `Thank you, ${firstName}!\n\n` +
      `We've received your inquiry. Here is a copy of the details you submitted:\n\n` +
      buildSummaryText(data, total) +
      `\n\nWe'll get back to you shortly.\n\nBest regards,\n${BUSINESS_NAME}`,
  };
}

// ------------------------------------------------------------------
// Send email via SMTP
// ------------------------------------------------------------------
async function sendEmailViaSMTP(opts: {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}): Promise<SendResult> {
  if (
    !process.env.SMTP_HOST ||
    !process.env.SMTP_USER ||
    !process.env.SMTP_PASS
  ) {
    return {
      ok: false,
      error: "SMTP_HOST, SMTP_USER or SMTP_PASS is not set",
    };
  }

  try {
    const transporter = getEmailTransporter();

    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: opts.to,
      subject: opts.subject,
      html: opts.html,
      text: opts.text,
      replyTo: opts.replyTo,
    });

    console.log("Email sent:", info.messageId);
    return { ok: true };
  } catch (error) {
    console.error("SMTP email error:", error);
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Email send failed",
    };
  }
}

// ------------------------------------------------------------------
// POST /api/send-inquiry
// ------------------------------------------------------------------
export async function POST(request: NextRequest) {
  try {
    const data: FormData = await request.json();

    // Required fields
    if (!data.email || !data.phone || !data.name) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Validate package — now matches the form
    if (
      !has(products, data.shootType) ||
      !has(products[data.shootType], data.selectedProduct)
    ) {
      return NextResponse.json(
        { error: "Invalid package selection" },
        { status: 400 }
      );
    }

    // Clean add-ons
    data.services = Array.isArray(data.services)
      ? data.services.filter((s) => has(services, s))
      : [];

    const total = calculateTotalCost(data);

    // Business email
    const businessMail = generateBusinessEmail(data, total);

    const businessEmailPromise: Promise<SendResult> = process.env
      .BUSINESS_EMAIL
      ? sendEmailViaSMTP({
          to: process.env.BUSINESS_EMAIL,
          ...businessMail,
          replyTo: data.email,
        })
      : Promise.resolve({
          ok: false,
          error: "BUSINESS_EMAIL is not set",
        });

    // Client confirmation email
    const clientMail = generateClientEmail(data, total);

    const clientEmailPromise = sendEmailViaSMTP({
      to: data.email,
      ...clientMail,
      replyTo: process.env.BUSINESS_EMAIL || process.env.SMTP_USER,
    });

    // Send both in parallel (no WhatsApp)
    const [businessEmail, clientEmail] = await Promise.all([
      businessEmailPromise,
      clientEmailPromise,
    ]);

    return NextResponse.json(
      {
        success: true,
        message: "Inquiry submitted successfully",
        sent: {
          businessEmail: businessEmail.ok,
          clientEmail: clientEmail.ok,
          whatsapp: false, // permanently disabled
        },
        errors: {
          businessEmail: businessEmail.error ?? null,
          clientEmail: clientEmail.error ?? null,
          whatsapp: null,
        },
        total,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Failed to process inquiry" },
      { status: 500 }
    );
  }
}