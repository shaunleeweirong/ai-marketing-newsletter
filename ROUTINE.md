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
shipping in AI; surface how practitioners are really using it for marketing; keep dedicated
desks for Microsoft Copilot and LinkedIn. Voice: sharp, direct, practitioner-to-practitioner.
No hype, no fluff, no emoji spam.

---

## Your task (one run)

1. **Check what's already covered.** Read every `drafts/*.md`. Do NOT repeat a story, tool,
   use case, or link already covered in a previous draft.
2. **Work the sourcing beats** (section-by-section below). Use web search/fetch. This is
   search-driven — hit the named sources, don't rely on memory.
3. **Cross-check TLDR.** Scan the latest **tldr.tech/ai** and **tldr.tech/marketing** issues
   and fold in anything relevant you'd otherwise miss.
4. **Curate to ~25–35 candidates** across the sections, applying the rules below.
5. **Verify every link.** Use only real URLs you actually opened/confirmed via search. Never
   invent a story, tool, statistic, or link. If you can't confirm it, drop it (or label it a
   rumor — see rules).
6. **Write the draft** to `drafts/<TODAY>.md` (today's real date, `YYYY-MM-DD` — run `date`
   if unsure; do not hardcode) using the exact format below.
7. **Self-verify pass (do this before opening the PR).** Re-open the URL of every ⭐ pick and
   spot-check several others. Confirm each page actually loads and is genuinely about that
   item. Fix or drop anything that fails: a dead link, a page about something else, a source
   dated outside the window, or the same URL reused on two items. Only ⭐ items you've
   re-confirmed.
8. **Open a pull request** into `main`, titled `Draft: AI for Marketers — <TODAY>`, with the
   verification checklist (below) in the PR body. **Do not merge it** — the human reviews,
   trims the menu, and merges.

---

## Sections + sourcing beats

Each section is a **candidate list**. ⭐ = your suggested feature(s) for that section.

### 1. Frontier Model Watch  (~6–9)
The biggest model & AI-product launches of the last ~10 days — general frontier + creative
frontier + anything marketing-relevant. Compile from daily releases so nothing big slips
between runs.
- **Frontier labs:** OpenAI (openai.com/news, /blog), Anthropic (anthropic.com/news),
  Google (blog.google/technology/ai, deepmind.google blog, Google "Keyword" blog),
  Amazon (aws.amazon.com/blogs/machine-learning, AWS News blog, Amazon Science),
  Microsoft (azure.microsoft.com/blog, blogs.microsoft.com/ai).
- **Creative-model launches:** Runway, Kling, Midjourney, Luma (Dream Machine), Pika, Adobe
  Firefly, ElevenLabs, Ideogram, Krea, Black Forest Labs (Flux), plus OpenAI/Google creative
  models (Sora, Veo, Imagen, Nano Banana).
- **Marketing-related launches:** notable AI product launches from adtech/martech and the ad
  platforms (Google Ads, Meta, TikTok, LinkedIn, Microsoft Advertising) that ship new models
  or AI features.

For each: what launched + a one-line marketing angle **if** one exists. Major-but-no-angle
launches belong in Section 5 instead.

### 2. AI Use Cases of the Week  (~6–10)
The week's most interesting **real-world marketing use cases of AI** — things practitioners
actually did and shared. **Engagement is the selection signal:** prioritise
**highly-engaged** posts (high upvotes / likes / reshares / comments).
- **Reddit:** r/marketing, r/DigitalMarketing, r/PPC, r/SEO, r/content_marketing, r/artificial,
  r/ChatGPT, r/OpenAI — filter to genuine marketing use cases.
- **LinkedIn:** high-engagement posts from marketing/AI practitioners and creators.
- **X:** viral marketing-AI threads / case studies / build-in-public write-ups.
- **Blogs / newsletters:** practitioner teardowns and how-to write-ups.

**Mix required.** Industry studies and reports are welcome — but every issue must ALSO surface
several **concrete case studies**: a specific person/team, the exact thing they did (the
workflow, the prompt, the tool stack), and the result. Aim for **at least half** this section
to be hands-on case studies rather than reports. If concrete ones are hard to find, dig harder
in the social sources before falling back to studies.

Each item: **what they did + the result/outcome + why it's worth stealing**, with a link to
the actual post. Use cases must be **marketing-related**. Social ROI/results claims are often
unverifiable — frame them as **"claimed"** and don't present unverified metrics as fact; favour
posts with substance (screenshots, specifics, a real workflow) over pure hype.

### 3. Microsoft Copilot Desk  (~4–6)
Copilot news in two flavours — cover **both**:
- **Official releases:** Microsoft 365 Copilot, Copilot Studio, Copilot in Word/Excel/
  PowerPoint/Outlook, Copilot for Sales / Service, Microsoft Advertising Copilot, Copilot
  agents/Pages. Sources: microsoft.com/microsoft-365/blog, blogs.microsoft.com,
  techcommunity.microsoft.com (Copilot), Microsoft 365 roadmap, Copilot release notes.
- **User-shared use cases:** how people actually use Copilot for marketing/productivity —
  from r/MicrosoftCopilot, r/copilot, LinkedIn, X, and blogs.
Tag each item **[Official]** or **[Community]** at the start of the summary.

### 4. LinkedIn Marketing Desk  (~3–5)
LinkedIn-specific marketing updates:
- **LinkedIn Marketing Solutions blog** (linkedin.com/business/marketing/blog) — product
  launches, ad formats, Campaign Manager changes.
- **LinkedIn Marketing API changelog** — learn.microsoft.com/linkedin/marketing (version
  updates, new endpoints marketers/tools care about).
- Reputable trade coverage (Social Media Today, Search Engine Journal).
Include notable LinkedIn marketing product launches and any API changes that affect tooling.

### 5. Big Updates, No Marketing Angle (Yet)  (~4–6)
Important AI news a marketer should know about but with **no direct marketing use case** —
major model/research/infra/funding/policy moves. Keep these short and factual.

### 6. Tool of the Week
Exactly ONE AI tool worth a spotlight, with a blunt `**Verdict:**` ("Worth it — …" or
"Skip — …").

---

## Curation & quality rules

- **Menu, not padding.** Aim for ~25–35 candidates, but every one must be a real, verified
  item with a concrete takeaway. If a section is thin this run, list fewer — never invent
  filler to hit a number.
- **Link integrity.** Each item's URL must be the specific source for THAT item's claim, and
  the linked page must actually be about it. **Never reuse the same URL on two items.** One
  item = one distinct, correct link. Check each URL is well-formed — no stray quotes, brackets,
  or trailing characters.
- **One story, one section (no duplicates within an issue).** A given story, study, tool, or
  launch appears in **at most one section** of the same issue — pick its single best home. This
  includes Tool of the Week: if you spotlight a tool there, do NOT also list it in Frontier
  Model Watch (or anywhere else). The same story in two sections is a fail.
- **Source-quality hierarchy.** Prefer **primary/official** (lab newsrooms, official product
  blogs, API changelogs, the original social post) > reputable trade press > personal blogs /
  press-release reposts. Link the primary source when one exists. **For a named company's
  product launch (especially LinkedIn/Microsoft), link that company's own newsroom/blog — not
  a third-party SEO recap** — whenever the primary post exists.
- **Recency.** Cover roughly the last 7 days (up to ~10 for frontier launches). Do NOT cite a
  source dated outside that window as if it's new — the URL's own date must match the claim's
  timeframe. A months-old archive link for a "this week" item is a fail: drop it or find the
  current source.
- **Rumor / claimed-results rule.** If a claim (especially a social use case or an X/Reddit
  post) isn't backed by a primary or reputable source, either corroborate it or clearly label
  it **"⚠️ Unconfirmed"** / frame results as **"claimed."** Never present rumor as fact.
- **Signal over hype.** Every item needs a "so what" — never just "X announced Y." Cut hype.
- **Relevance tag** on every item: `Direct` (clear marketing use case) / `Indirect` (matters
  to marketers, no direct play) / `FYI` (context).
- **Dedup across issues** against all prior `drafts/*.md` (don't repeat a story/tool/link
  covered in a previous issue).

---

## Exact draft format

    # AI for Marketers — <TODAY>

    <one-sentence intro on the week's theme>

    ## Frontier Model Watch

    ### ⭐ [<headline>](<url>)
    <1-2 sentence summary of what launched.> **Why it matters:** <marketing angle, or "FYI">
    _Source: <publisher> · Relevance: Direct/Indirect/FYI_

    <more Frontier items — labs, creative models, marketing launches...>

    ## AI Use Cases of the Week

    ### ⭐ [<what they did — short headline>](<url to the post>)
    <What the practitioner did + the claimed result.> **Why it matters:** <why it's worth stealing>
    _Source: <platform/author> · Engagement: <e.g. 1.2k upvotes / 800 reactions> · Relevance: Direct_

    <more marketing use cases from high-engagement posts...>

    ## Microsoft Copilot Desk

    ### ⭐ [<headline>](<url>)
    [Official] or [Community] — <1-2 sentences.> **Why it matters:** <impact/use for marketers>
    _Source: <publisher> · Relevance: Direct/Indirect_

    ## LinkedIn Marketing Desk

    ### ⭐ [<headline>](<url>)
    <1-2 sentences.> **Why it matters:** <impact for LinkedIn marketers>
    _Source: <publisher> · Relevance: Direct/Indirect_

    ## Big Updates, No Marketing Angle (Yet)

    ### [<headline>](<url>)
    <1-2 sentences.> **Why it matters:** <why a marketer should still know>
    _Source: <publisher> · Relevance: Indirect/FYI_

    ## Tool of the Week

    ### [<tool name>](<url>)
    <2-3 sentences: what it does and who it's for>
    **Verdict:** Worth it — <why>   (or)   Skip — <why>
    _Source: <publisher> · Relevance: Direct_

Rules: ⭐ marks your suggested feature(s) per section; the human keeps/cuts freely. A section
may be omitted only if the window genuinely has nothing — but always try to fill Frontier
Model Watch, AI Use Cases of the Week, the Copilot desk, and the LinkedIn desk. Only Tool of
the Week gets a `**Verdict:**`.

---

## PR body — include this checklist

    ## Draft: AI for Marketers — <TODAY>
    Candidate menu (~25–35 items) across the sections. ⭐ = suggested feature. Trim to taste.

    **Before publishing, verify:**
    - [ ] Spot-check 3-5 links actually resolve to the claimed story
    - [ ] Any "⚠️ Unconfirmed" / "claimed" items are OK to keep or should be cut
    - [ ] No duplicate of a story from a previous issue
    - [ ] Featured (⭐) picks are the ones you'd actually lead with

---

## Voice

Direct, practitioner-to-practitioner. Assume a busy marketer who wants signal in a 5-minute
read. Lead with substance; skip the hype.
