import fs from "node:fs";
import path from "node:path";
import { CONFIG } from "./config";
import { todayISO } from "./util";

export interface Mailer {
  send(opts: { subject: string; html: string; to: string[] }): Promise<void>;
}

/** Default when RESEND_API_KEY is unset: writes an HTML preview, emails no one. */
export class FileMailer implements Mailer {
  async send({ subject, html, to }: { subject: string; html: string; to: string[] }) {
    fs.mkdirSync(CONFIG.paths.drafts, { recursive: true });
    const out = path.join(CONFIG.paths.drafts, `sent-${todayISO()}.html`);
    fs.writeFileSync(out, html);
    console.log(`  [preview] No RESEND_API_KEY — wrote HTML preview to ${out}`);
    console.log(`  [preview] Would have emailed: ${to.join(", ")}`);
    console.log(`  [preview] Subject: ${subject}`);
  }
}

/** Sends via Resend's REST API (no SDK dependency). */
export class ResendMailer implements Mailer {
  async send({ subject, html, to }: { subject: string; html: string; to: string[] }) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${CONFIG.resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from: CONFIG.from, to, subject, html }),
    });
    if (!res.ok) {
      throw new Error(`Resend failed (${res.status}): ${await res.text()}`);
    }
    console.log(`  [resend] Sent to ${to.length} recipient(s).`);
  }
}

export function getMailer(): Mailer {
  return CONFIG.resendKey ? new ResendMailer() : new FileMailer();
}
