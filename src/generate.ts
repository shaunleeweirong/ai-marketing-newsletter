import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { CONFIG } from "./config";
import { fetchAllCandidates } from "./sources";
import { loadSeen, dedupeCandidates } from "./dedupe";
import { rankCandidates } from "./rank";
import { draftIssue } from "./draft";
import { renderMarkdown } from "./render";
import { todayISO } from "./util";

async function main() {
  console.log("→ Fetching feeds...");
  const all = await fetchAllCandidates();
  console.log(`  ${all.length} total candidates`);
  if (all.length === 0) {
    console.log("No candidates fetched (feeds down?). Exiting.");
    return;
  }

  const seen = loadSeen(CONFIG.paths.seen);
  const fresh = dedupeCandidates(all, seen);
  console.log(`  ${fresh.length} after dedupe`);
  if (fresh.length === 0) {
    console.log("Nothing new since last send. Exiting.");
    return;
  }

  console.log("→ Ranking against the AI-for-Marketers rubric (Claude)...");
  const ranked = await rankCandidates(fresh);
  console.log(`  selected ${ranked.length}`);
  if (ranked.length === 0) {
    console.log("Nothing cleared the bar this week — no draft written.");
    return;
  }

  const byUrl = new Map(fresh.map((c) => [c.url, c]));
  const selected = ranked.map((r) => byUrl.get(r.url)).filter((c): c is NonNullable<typeof c> => !!c);

  console.log("→ Drafting the issue (Claude)...");
  const issue = await draftIssue(selected);
  console.log(`  ${issue.items.length} items drafted`);

  fs.mkdirSync(CONFIG.paths.drafts, { recursive: true });
  const out = path.join(CONFIG.paths.drafts, `${todayISO()}.md`);
  fs.writeFileSync(out, renderMarkdown(issue));

  console.log(`\n✓ Draft written: ${out}`);
  console.log("  Review / edit it, then run:  npm run send");
}

main().catch((e) => {
  console.error("✗", (e as Error).message);
  process.exit(1);
});
