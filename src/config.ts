import "dotenv/config";
import path from "node:path";

const root = process.cwd();

export const CONFIG = {
  /** Spec-approved model for rank + draft. */
  model: "claude-sonnet-4-6",
  maxAgeDays: Number(process.env.MAX_AGE_DAYS ?? 10),
  itemTarget: Number(process.env.ITEM_TARGET ?? 9),
  paths: {
    seen: path.join(root, "data", "seen.json"),
    seedList: path.join(root, "data", "seed-list.json"),
    drafts: path.join(root, "drafts"),
  },
  from: process.env.NEWSLETTER_FROM ?? "AI for Marketers <onboarding@resend.dev>",
  anthropicKey: process.env.ANTHROPIC_API_KEY,
  resendKey: process.env.RESEND_API_KEY,
} as const;
