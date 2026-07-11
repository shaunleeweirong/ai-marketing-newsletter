# AI for Marketers — Newsletter Engine (Phase 1)

An automated, **human-approved** weekly newsletter engine, TLDR-style, in the niche
_AI for Marketers_. The pipeline does the research and drafting; you review, edit, and send.

> Full design & rationale: [`docs/superpowers/specs/2026-07-11-ai-for-marketers-newsletter-design.md`](docs/superpowers/specs/2026-07-11-ai-for-marketers-newsletter-design.md)

## How it works

```
npm run generate    fetch RSS → dedupe → Claude ranks against the rubric
                    → Claude drafts summaries + verdicts → writes drafts/<date>.md
   (you)            open drafts/<date>.md, approve as-is or edit
npm run send        render → email your seed list → mark those links "seen"
```

The moat is **taste**: automation drafts, you apply the "would I forward this?" filter.
Most weeks the draft is one-click; when it isn't, edit the markdown freely before sending.

## Setup

```bash
npm install
cp .env.example .env          # add ANTHROPIC_API_KEY
cp data/seed-list.example.json data/seed-list.json   # add your + a few friends' emails
```

Only `ANTHROPIC_API_KEY` is required to generate a draft. Email sending is optional:

- **No `RESEND_API_KEY`** → `send` writes an HTML preview to `drafts/` and emails no one
  (perfect for validating the format first).
- **With `RESEND_API_KEY`** (+ a verified `NEWSLETTER_FROM` domain) → `send` emails your
  seed list via Resend.

## Run

```bash
npm run generate      # produces drafts/YYYY-MM-DD.md
# ...edit the draft...
npm run send          # sends the newest draft (or: npm run send drafts/2026-07-11.md)
```

## Tuning

- **Sources:** edit `FEEDS` in `src/sources.ts` (per-feed failures are isolated).
- **The rubric (your taste):** edit the system prompt in `src/rank.ts`.
- **Format / sections:** edit `src/draft.ts` and `src/render.ts`.
- **Cadence / item count:** `MAX_AGE_DAYS`, `ITEM_TARGET` in `.env`.

## What's deliberately NOT here (Phase 2)

Public signup page, referral loop, scheduling/cron, and the full bulk-send compliance
stack (one-click `List-Unsubscribe`, SPF/DKIM/DMARC, bounce suppression, POST-only
approval links). These become mandatory before any public launch — see the spec.

## Cost

LLM cost is negligible (~$0.05–0.30/issue). Email is the whole cost curve; a free ESP
tier (~3k emails/month) caps a weekly newsletter around ~700 subscribers.
