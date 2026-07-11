# AI for Marketers — Automated Newsletter Engine (Design Spec)

**Date:** 2026-07-11
**Owner:** Shaun Lee
**Status:** Approved design → ready for implementation planning

---

## Context

A TLDR-style weekly email newsletter in the niche **"AI for Marketers."** The owner is a marketer who wants the research, curation, and drafting **fully automated**, with a single human step: reviewing/editing the draft before it sends. End goals, in order: (1) grow a large free-subscriber audience to later monetize via **sponsors** (the TLDR model), and (2) stay current on AI-in-marketing news personally.

This design was shaped by a deep-research pass on TLDR and an independent adversarial architecture review. Two findings drive it:

1. **Taste is the moat.** TLDR's edge is human curation judgment ("would I forward this to a colleague?"), not automation. Fully-automated rubber-stamping produces a commodity. → The human step must be an **edit gate**, not a binary button.
2. **AI hallucination is a real, demonstrated risk** (Bloomberg issued dozens of corrections to auto-published AI summaries). → A human review/edit before send is mandatory, and fetched content must be treated as untrusted.

## Goals

- Automate fetch → dedupe → rank → draft into a TLDR-style issue with near-zero effort.
- Human approval = **editable draft**: one-click when good; cut/reorder/tweak in seconds when not.
- Keep it cheap (near $0 to run) and simple to iterate.
- **Prove the format and taste on a small seed list before building any growth/infra.**

## Non-Goals (Phase 1)

- Public signup page, referral loop, subscriber management → **Phase 2**.
- Automated scheduling (cron), hosted infra (Vercel/Supabase) → **Phase 2**.
- Full bulk-send compliance/deliverability stack → **Phase 2** (mandatory before public launch).
- Choosing the growth/send platform (Resend vs beehiiv) → **deferred to Phase 2**.

## Positioning

- **Identity:** "AI for Marketers" — the AI tools, tactics, and news marketers actually need.
- **Differentiator:** sharp practitioner POV — no hype, each tool gets a **"worth it / skip"** verdict, plus a **"Steal This Workflow"** actionable each issue.
- **Cadence:** weekly to start (sustainable solo; every issue excellent).
- **Optional launch wedge:** lead the first ~10 issues on GEO / AI-search for marketers to stand out, then broaden.

---

## Phase 1 — The Engine (build now)

A local TypeScript script the owner runs manually. **No cloud infra yet.**

### Data flow
```
npm run generate:
  fetch RSS (per-feed try/catch)  →  normalize URLs + dedupe vs. seen store
    →  ONE batched Claude call: rank candidates against the "AI-for-Marketers" rubric
       (may return FEWER than 8 if the week is thin — never pad with filler)
    →  Claude drafts summary + "worth it/skip" verdict per item, as STRUCTURED JSON
    →  render to an editable local draft file (Markdown)

[human] open draft.md → approve as-is OR cut/reorder/rewrite a line

npm run send:
  read edited draft  →  render HTML  →  send to small SEED LIST  →  mark those URLs "seen"
```

### Key components (each independently testable)
- **`sources`** — curated feed list. Include **marketing-specific** sources (Marketing Brew, Search Engine Land, marketing-AI blogs), not just broad AI (TechCrunch/Verge AI, HN). Per-feed error isolation; log per-feed counts; warn if total candidates < threshold.
- **`dedupe`** — normalize URLs (strip UTM/query, canonicalize) before hashing; store seen URLs in a local JSON file. **Mark "seen" only on send**, not on fetch (so a discarded-but-improved story isn't lost, and a failed send doesn't burn the batch).
- **`rank`** — one Claude call scoring all candidates against a rubric prompt that encodes the forward-test / marketer relevance. Returns top ~8–10 (or fewer). Fetched article text passed as **delimited, untrusted data-only** (prompt-injection safe).
- **`draft`** — Claude writes 2–3 sentence summaries + verdict, organized into sections (**The Signal / Tool of the Week / Steal This Workflow**). Output = structured JSON → rendered to editable Markdown.
- **`render`** — JSON/Markdown → clean, image-light HTML email (TLDR aesthetic).
- **`mailer`** — a thin `send(html, recipients)` **interface** with a simple implementation for the seed send. Interface keeps Phase 2 platform choice (Resend/beehiiv) a swap, not a rewrite.

### Review surface note
Phase 1 is run manually, so the **editable draft is a local file** (`draft.md`) — simpler than round-tripping edits through email. The "email-to-yourself" approve flow arrives in **Phase 2** with automation.

### Stack
- **TypeScript / Node.**
- **`rss-parser`** for feeds.
- **Anthropic SDK**, **Claude Sonnet 4.6** (`claude-sonnet-4-6`) for rank + draft. *(Consult the `claude-api` skill when writing the actual API calls.)*
- Local JSON files for state (seen URLs, seed list). No DB.

---

## Phase 2 — Growth & Hardening (deferred; documented so we don't build on sand)

Triggered once the engine reliably produces issues worth sending publicly.

- **Growth platform decision:** Resend (code-first; we build referral + compliance) **vs beehiiv** (turnkey signup + built-in referral + deliverability + sponsor tooling). Reviewer leans beehiiv for the big-audience→sponsors goal. Engine stays provider-agnostic via the `mailer` interface.
- **Scheduling & hosting:** move to scheduled runs; decouple fetch (fast) from LLM work (batched) to avoid serverless timeouts; make the run **idempotent per ISO week**.
- **Send-link security:** approval fires from a **POST behind a confirmation page**, never on GET (email scanners prefetch links); **single-use, short-TTL token bound to the draft id**; `noindex`.
- **Email compliance / deliverability (mandatory before bulk):** RFC 8058 one-click `List-Unsubscribe` (Gmail/Yahoo require it), physical address in footer, **SPF/DKIM/DMARC on a sending subdomain**, gradual reputation warm-up.
- **Suppression:** consume bounce/complaint webhooks → suppression table; never re-mail hard bounces/complaints.
- **Public signup:** double opt-in + rate-limit/captcha (referral incentives attract fake signups).
- **Observability:** failure email / Sentry when a run breaks; alert if candidate count is too low.
- **Analytics:** open/click tracking (needed to prove value to future sponsors).
- **GDPR:** privacy policy + consent/deletion if EU subscribers.

## Cost reality

- **LLM is negligible** at every scale (~$0.05–0.30/issue).
- **Email is the entire cost curve.** Free-tier sending (e.g. Resend 3k/month) caps a *weekly* newsletter around **~700 subscribers** — the first real bill, arriving earlier than a naive read suggests. Budget for a paid ESP/platform once real signups start.

## Verification

- **Phase 1 end-to-end:** run `npm run generate` against live feeds → confirm it produces a sensible ranked, de-duplicated `draft.md` with summaries + verdicts and no filler; edit it; run `npm run send` to a seed list of 2–3 addresses (owner + a friend); confirm the received email renders cleanly and the sent URLs are now marked "seen" (re-running doesn't resurface them).
- **Unit-level:** URL normalization/dedupe correctness; per-feed failure isolation (kill one feed → run still succeeds); rank step returns fewer items on a thin week rather than padding; injected-instruction test string in a feed item does not alter ranking/output.

## Open items (deferred, not blocking Phase 1)

- Final newsletter name (candidates: MarketerAI, The AI Marketer, Prompt & Post, Growth Signal).
- Whether to launch on the GEO/AI-search wedge first.
- Resend vs beehiiv (Phase 2).
