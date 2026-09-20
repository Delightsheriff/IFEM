export interface ContactEmailRecord {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>'"]/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;",
    };
    return entities[character];
  });
}

function field(label: string, value: string): string {
  return `<tr><td style="padding:10px 0;color:#686868;font-size:13px;font-weight:600;width:140px;vertical-align:top">${label}</td><td style="padding:10px 0;color:#111111;font-size:14px;vertical-align:top">${escapeHtml(value)}</td></tr>`;
}

export function buildContactEmail(
  record: ContactEmailRecord,
  submittedAt: Date = new Date(),
): { text: string; html: string } {
  const phone = record.phone || "Not provided";
  const timestamp = submittedAt.toISOString();
  const text = [
    "New IFEM Education contact enquiry",
    "",
    `Name: ${record.name}`,
    `Email: ${record.email}`,
    `Phone: ${phone}`,
    `Subject: ${record.subject}`,
    `Submitted: ${timestamp}`,
    "",
    "Message:",
    record.message,
    "",
    "Reply directly to this email to respond to the enquirer.",
  ].join("\n");

  return {
    text,
    html: `<!doctype html><html lang="en"><body style="margin:0;background:#fafaf7;color:#111111;font-family:Arial,sans-serif"><div style="max-width:680px;margin:0 auto;padding:32px 20px"><div style="border-top:4px solid #1a5c34;background:#ffffff;padding:28px 30px;box-shadow:0 1px 4px rgba(0,0,0,.08)"><p style="margin:0 0 8px;color:#a8824f;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase">IFEM Education</p><h1 style="margin:0 0 24px;color:#1a5c34;font-size:25px;line-height:1.2">New contact enquiry</h1><table role="presentation" style="width:100%;border-collapse:collapse">${field("Name", record.name)}${field("Email", record.email)}${field("Phone", phone)}${field("Subject", record.subject)}${field("Submitted", timestamp)}</table><div style="margin-top:24px;border-top:1px solid #e2e2de;padding-top:20px"><h2 style="margin:0 0 10px;color:#111111;font-size:16px">Message</h2><p style="margin:0;color:#333333;font-size:15px;line-height:1.7;white-space:pre-wrap">${escapeHtml(record.message)}</p></div><p style="margin:28px 0 0;color:#686868;font-size:12px;line-height:1.5">Reply directly to this email to respond to the enquirer.</p></div><p style="margin:16px 0 0;color:#686868;font-size:11px;text-align:center">This notification was sent from the IFEM Education contact form.</p></div></body></html>`,
  };
}
