import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { CONFIG } from "./config";
import { loadSeen, saveSeen, normalizeUrl } from "./dedupe";
import { mdToEmailHtml } from "./render";
import { getMailer } from "./mailer";
import { extractH1, extractLinks, todayISO } from "./util";

function latestDraft(): string | null {
  try {
    const files = fs
      .readdirSync(CONFIG.paths.drafts)
      .filter((f) => f.endsWith(".md"))
      .sort();
    return files.length ? path.join(CONFIG.paths.drafts, files[files.length - 1]) : null;
  } catch {
    return null;
  }
}

function loadSeedList(): string[] {
  try {
    return JSON.parse(fs.readFileSync(CONFIG.paths.seedList, "utf8")) as string[];
  } catch {
    return [];
  }
}

async function main() {
  // Optional CLI arg: path to a specific draft; otherwise use the newest one.
  const draftPath = process.argv[2] ?? latestDraft();
  if (!draftPath || !fs.existsSync(draftPath)) {
    throw new Error("No draft found. Run `npm run generate` first, or pass a draft path.");
  }

  const md = fs.readFileSync(draftPath, "utf8");
  const subject = extractH1(md) ?? `AI for Marketers — ${todayISO()}`;
  const html = mdToEmailHtml(md, subject);

  const to = loadSeedList();
  if (to.length === 0) {
    throw new Error(
      `No recipients. Create ${CONFIG.paths.seedList} (copy data/seed-list.example.json).`,
    );
  }

  console.log(`→ Sending "${subject}" to ${to.length} recipient(s)...`);
  await getMailer().send({ subject, html, to });

  // Mark URLs as seen ONLY after a successful send (so a discarded/failed draft
  // never burns candidates).
  const seen = loadSeen(CONFIG.paths.seen);
  for (const u of extractLinks(md)) seen.add(normalizeUrl(u));
  saveSeen(CONFIG.paths.seen, seen);

  console.log(`✓ Done. Marked ${extractLinks(md).length} link(s) as seen.`);
}

main().catch((e) => {
  console.error("✗", (e as Error).message);
  process.exit(1);
});
