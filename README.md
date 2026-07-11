# AI for Marketers — Newsletter Engine

An automated, **human-approved** weekly newsletter, TLDR-style, in the niche
_AI for Marketers_. Claude does the research and drafting; you review, edit, and send.

> Full design & rationale: [`docs/superpowers/specs/2026-07-11-ai-for-marketers-newsletter-design.md`](docs/superpowers/specs/2026-07-11-ai-for-marketers-newsletter-design.md)

There are two ways to run it. **Routine mode is the default** — it runs on your Claude
subscription with no separate API key.

---

## Mode A — Routine mode (recommended · no API key)

A scheduled [Claude Code Routine](https://code.claude.com/docs/en/routines) runs weekly in
the cloud, on your Claude subscription. It reads [`ROUTINE.md`](ROUTINE.md), web-searches
this week's stories, drafts the issue, and **opens a pull request** with `drafts/<date>.md`
for you to review.

```
Weekly routine (Claude, your subscription)
  → web-searches this week's AI-marketing stories
  → applies the rubric in ROUTINE.md + drafts the issue
  → opens a PR:  "Draft: AI for Marketers — <date>"   (in THIS repo, on a side-branch)
        ↓
  You review/edit the draft in the PR on GitHub → Merge to approve (or close to skip)
        ↓
  Send it (Mode B `npm run send`, run locally when you're ready to email a list)
```

**The PR is your edit-gate:** good week → one click (Merge); off week → edit the markdown
in GitHub's browser editor, then merge; bad week → close it, nothing ships.

**The rubric and format live in [`ROUTINE.md`](ROUTINE.md)** — edit that file to change the
newsletter's taste or structure. Past drafts in `drafts/` are the routine's "already
covered" memory, so it won't repeat stories.

### Set up the routine (one time)

1. Connect GitHub to your Claude account (in Claude Code, run `/web-setup` if prompted).
2. Create the routine — either:
   - **Web:** [claude.ai/code/routines](https://claude.ai/code/routines) → **+ New routine**, or
   - **CLI:** `/schedule` in Claude Code.
3. Configure it:
   - **Repository:** `shaunleeweirong/ai-marketing-newsletter`
   - **Schedule:** weekly (e.g. Monday morning)
   - **Prompt:** _"Follow the instructions in `ROUTINE.md`: find this week's AI-for-marketers
     stories, draft the issue to `drafts/<today>.md`, and open a PR into main. Do not merge."_
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
