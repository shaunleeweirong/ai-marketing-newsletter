# Routine brief — "AI for Marketers" (AI-updates-led, twice-weekly candidate menu)

This file is the **single source of truth** for the scheduled Claude Code routine that
drafts each issue. Editing this file changes what gets covered and how — no code changes
needed. The routine runs on the Claude subscription (no API key), twice a week (Mon + Thu).

**What you're producing:** not a finished issue — a **curated candidate MENU** the human
trims. Surface **~25–35 verified candidates** across the sections below so they have plenty
to choose from. ⭐-mark your top pick(s) in each section. Volume must come from **thorough
sourcing, never from padding.**

---

## Positioning

An **AI-updates-led** newsletter **for working marketers**. Lead with what's actually
shipping in AI; connect it to marketing where a real use case exists; keep dedicated desks
for creatives and LinkedIn. Voice: sharp, direct, practitioner-to-practitioner. No hype, no
fluff, no emoji spam.

---

## Your task (one run)

1. **Check what's already covered.** Read every `drafts/*.md`. Do NOT repeat a story, tool,
   or link already covered in a previous draft.
2. **Work the sourcing beats** (Section-by-section list below). Use web search/fetch. This is
   search-driven — hit the named sources, don't rely on memory.
3. **Cross-check TLDR.** Scan the latest **tldr.tech/ai** and **tldr.tech/marketing** issues
   and fold in anything relevant you'd otherwise miss.
4. **Curate to ~25–35 candidates** across the six sections, applying the rules below.
5. **Verify every link.** Use only real URLs you actually opened/confirmed via search. Never
   invent a story, tool, statistic, or link. If you can't confirm it, drop it (or label it a
   rumor — see rules).
6. **Write the draft** to `drafts/<TODAY>.md` (today's real date, `YYYY-MM-DD` — run `date`
   if unsure; do not hardcode) using the exact format below.
7. **Open a pull request** into `main`, titled `Draft: AI for Marketers — <TODAY>`, with the
   verification checklist (below) in the PR body. **Do not merge it** — the human reviews,
   trims the menu, and merges.

---

## Sections + sourcing beats

Each section is a **candidate list**. ⭐ = your suggested feature(s) for that section.

### 1. Frontier Model Watch  (~5–8)
The biggest model / AI-product launches of the last ~10 days from the five majors. Compile
from their daily releases so nothing big slips between runs.
- **OpenAI** — openai.com/news, openai.com/blog
- **Anthropic** — anthropic.com/news
- **Google** — blog.google/technology/ai, deepmind.google (blog), Google "Keyword" blog
- **Amazon** — aws.amazon.com/blogs/machine-learning, AWS News blog, Amazon Science
- **Microsoft** — azure.microsoft.com/blog, blogs.microsoft.com/ai, Microsoft Copilot blog

For each: what launched + a one-line marketing angle **if** one exists. If a launch is major
but has no marketing angle, it belongs in Section 3 instead.

### 2. Put It To Work  (~6–10)
AI updates with a **specific, concrete marketing use case** — tools marketers can use today,
tactics/plays, and platform/algorithm changes (SEO, paid, social, email, GEO / AI-search).
Sources: marketing trade press (Search Engine Land, Search Engine Journal, Marketing Brew,
Content Marketing Institute), product blogs, plus anything surfaced in TLDR Marketing.

### 3. Big Updates, No Marketing Angle (Yet)  (~4–6)
Important AI news a marketer should know about but with **no direct marketing use case** —
major model/research/infra/policy moves. Keep these short and factual.

### 4. AI for Creatives  (~4–6)
Creative-AI launches — video / image / audio generation and editing.
- **Companies:** Higgsfield, Runway, Midjourney, Luma (Dream Machine), Kling, Pika, Adobe
  Firefly, ElevenLabs, Ideogram, Krea, Black Forest Labs (Flux), plus OpenAI/Google creative
  tools (Sora, etc.).
- **Community signal:** X (official lab/tool accounts) and Reddit (r/StableDiffusion,
  r/aivideo, r/midjourney, r/OpenAI). Treat community posts as leads — see the rumor rule.

### 5. LinkedIn Marketing Desk  (~3–5)
LinkedIn-specific marketing updates:
- **LinkedIn Marketing Solutions blog** (linkedin.com/business/marketing/blog) — product
  launches, ad formats, Campaign Manager changes.
- **LinkedIn Marketing API changelog** — learn.microsoft.com/linkedin/marketing (version
  updates, new endpoints marketers/tools care about).
- Reputable trade coverage of LinkedIn marketing (Social Media Today, Search Engine Journal).
Include notable LinkedIn marketing product launches and any API changes that affect tooling.

### 6. Featured picks
- **Tool of the Week** — exactly ONE AI tool, with a blunt `**Verdict:**` ("Worth it — …"
  or "Skip — …").
- **Steal This Workflow** — ONE concrete AI play a marketer can run today.

---

## Curation & quality rules

- **Menu, not padding.** Aim for ~25–35 candidates, but every one must be a real, verified
  item with a concrete takeaway. If a section is thin this run, list fewer — never invent
  filler to hit a number.
- **Source-quality hierarchy.** Prefer **primary/official** (lab newsrooms, official product
  blogs, API changelogs) > reputable trade press > personal blogs / press-release reposts.
  Link the primary source when one exists.
- **Rumor rule (X / Reddit / unconfirmed).** If a claim isn't backed by a primary or
  reputable source, either corroborate it or clearly label it **"⚠️ Unconfirmed"** in the
  summary. Never present rumor as fact.
- **Signal over hype.** Every item needs a "so what" — never just "X announced Y." Cut hype.
- **Relevance tag** on every item: `Direct` (clear marketing use case) / `Indirect` (matters
  to marketers, no direct play) / `FYI` (context).
- **Dedup** against all prior `drafts/*.md`.

---

## Exact draft format

    # AI for Marketers — <TODAY>

    <one-sentence intro on the week's theme>

    ## Frontier Model Watch

    ### ⭐ [<headline>](<url>)
    <1-2 sentence summary of what launched.> **Why it matters:** <marketing angle, or "FYI">
    _Source: <publisher> · Relevance: Direct/Indirect/FYI_

    <more Frontier items...>

    ## Put It To Work

    ### ⭐ [<headline>](<url>)
    <1-2 sentences.> **Why it matters:** <the concrete marketing use case>
    _Source: <publisher> · Relevance: Direct_

    <more items...>

    ## Big Updates, No Marketing Angle (Yet)

    ### [<headline>](<url>)
    <1-2 sentences.> **Why it matters:** <why a marketer should still know>
    _Source: <publisher> · Relevance: Indirect/FYI_

    ## AI for Creatives

    ### ⭐ [<headline>](<url>)
    <1-2 sentences.> **Why it matters:** <creative/marketing use>
    _Source: <publisher> · Relevance: Direct/Indirect_

    ## LinkedIn Marketing Desk

    ### ⭐ [<headline>](<url>)
    <1-2 sentences.> **Why it matters:** <impact for LinkedIn marketers>
    _Source: <publisher> · Relevance: Direct/Indirect_

    ## Tool of the Week

    ### [<tool name>](<url>)
    <2-3 sentences: what it does and who it's for>
    **Verdict:** Worth it — <why>   (or)   Skip — <why>
    _Source: <publisher> · Relevance: Direct_

    ## Steal This Workflow

    ### [<title>](<url>)
    <a concrete AI play a marketer can run today, in 2-3 sentences>
    _Source: <publisher> · Relevance: Direct_

Rules: ⭐ marks your suggested feature(s) per section; the human keeps/cuts freely. A section
may be omitted only if the window genuinely has nothing — but always try to fill Frontier
Model Watch, Put It To Work, and the LinkedIn desk. Only Tool of the Week gets a `**Verdict:**`.

---

## PR body — include this checklist

    ## Draft: AI for Marketers — <TODAY>
    Candidate menu (~25–35 items) across 6 sections. ⭐ = suggested feature. Trim to taste.

    **Before publishing, verify:**
    - [ ] Spot-check 3-5 links actually resolve to the claimed story
    - [ ] Any "⚠️ Unconfirmed" items are OK to keep or should be cut
    - [ ] No duplicate of a story from a previous issue
    - [ ] Featured (⭐) picks are the ones you'd actually lead with

---

## Voice

Direct, practitioner-to-practitioner. Assume a busy marketer who wants signal in a 5-minute
read. Lead with substance; skip the hype.
