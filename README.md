# AI for Marketers — Newsletter Engine

An automated, **human-approved** weekly newsletter, TLDR-style, in the niche
_AI for Marketers_. Claude does the research and drafting; you review, edit, and send.

> Full design & rationale: [`docs/superpowers/specs/2026-07-11-ai-for-marketers-newsletter-design.md`](docs/superpowers/specs/2026-07-11-ai-for-marketers-newsletter-design.md)

There are two ways to run it. **Routine mode is the default** — it runs on your Claude
subscription with no separate API key.

---

## Mode A — Routine mode (recommended · no API key)

A scheduled [Claude Code Routine](https://code.claude.com/docs/en/routines) runs **twice a
week (Mon + Thu)** in the cloud, on your Claude subscription. It reads [`ROUTINE.md`](ROUTINE.md),
web-searches the latest AI updates, drafts a **candidate menu**, and **opens a pull request**
with `drafts/<date>.md` for you to review.

```
Routine (Claude, your subscription) — Mon + Thu
  → works the sourcing beats (frontier labs, TLDR AI/Marketing, creative AI, LinkedIn)
  → produces a MENU of ~25–35 verified candidates across 6 sections, ⭐ = suggested feature
  → opens a PR:  "Draft: AI for Marketers — <date>"   (in THIS repo, on a side-branch)
        ↓
  You review the PR on GitHub → trim the menu to the issue you want → Merge (or close to skip)
        ↓
  Send it (Mode B `npm run send`, run locally when you're ready to email a list)
```

It's an **AI-updates-led newsletter for marketers**, in six sections: **Frontier Model Watch**,
**Put It To Work** (updates with a marketing use case), **Big Updates, No Marketing Angle
(Yet)**, **AI for Creatives**, **LinkedIn Marketing Desk**, and **Tool of the Week / Steal
This Workflow**. Each draft is a menu — the routine ⭐-marks its picks and you trim.

**The PR is your edit-gate:** the draft over-delivers on purpose; you delete what you don't
want, tweak what you keep, then Merge. Close it to skip a run.

**The rubric, sections, and sourcing live in [`ROUTINE.md`](ROUTINE.md)** — edit that one file
to change what gets covered or how. Past drafts in `drafts/` are the routine's "already
covered" memory, so it won't repeat stories.

### Set up the routine (one time)

1. Connect GitHub to your Claude account (in Claude Code, run `/web-setup` if prompted).
2. Create the routine — either:
   - **Web:** [claude.ai/code/routines](https://claude.ai/code/routines) → **+ New routine**, or
   - **CLI:** `/schedule` in Claude Code.
3. Configure it:
   - **Repository:** `shaunleeweirong/ai-marketing-newsletter`
   - **Schedule:** twice weekly — Mon + Thu (cron `0 0 * * 1,4` = 8:00 AM SGT)
   - **Prompt:** _"Follow `ROUTINE.md`: work the sourcing beats, produce a candidate menu of
     ~25–35 verified AI updates across the six sections (⭐-mark suggested features), write it
     to `drafts/<today>.md`, and open a PR into main. Do not merge."_
   - No secrets or custom network access needed (web search routes through Anthropic).

---

## Mode B — Local mode (optional · your machine)

Runs the whole pipeline on your Mac. Used to **send** an approved draft, and available as a
fully-local fallback (this mode uses the Anthropic API and needs `ANTHROPIC_API_KEY`).

```bash
npm install
cp .env.example .env          # ANTHROPIC_API_KEY (only for local generate); RESEND_API_KEY (only to email)
cp data/seed-list.example.json data/seed-list.json   # your + a few friends' emails
```

- **`npm run send`** — render the newest `drafts/*.md` and email it to your seed list.
  Without `RESEND_API_KEY` it writes an HTML preview to `drafts/` and emails no one
  (great for checking the format first). Run this after merging a routine's PR and
  pulling `main`.
- **`npm run generate`** — the local, API-key version of the routine (RSS → dedupe →
  Claude ranks + drafts → `drafts/<date>.md`). Optional; the routine replaces it.

---

## Tuning

- **The rubric + format (routine):** edit [`ROUTINE.md`](ROUTINE.md).
- **Local RSS sources / rubric (Mode B):** `src/sources.ts`, `src/rank.ts`, `src/draft.ts`.
- **Email look:** `src/render.ts`.

## What's deliberately NOT here yet (Phase 2)

Public signup page, referral loop, and the full bulk-send compliance stack (one-click
`List-Unsubscribe`, SPF/DKIM/DMARC, bounce suppression). Mandatory before any public
launch — see the spec.

## Cost

Routine mode uses your Claude subscription (no per-token API bill). Email is the only real
cost later; a free ESP tier (~3k emails/month) caps a weekly newsletter around ~700 subs.
