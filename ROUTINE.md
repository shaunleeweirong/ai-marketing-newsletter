# Routine brief — "AI for Marketers" weekly draft

This file is the **single source of truth** for the scheduled Claude Code routine that
drafts each week's issue. Editing this file changes the newsletter's taste and format —
no code changes needed. The routine runs on your Claude subscription (no API key).

## Your task (one run)

1. **Check what's already been covered.** Read every file in `drafts/` (`drafts/*.md`).
   Do NOT re-cover a story, tool, or link that already appears in a previous draft.
2. **Find this week's stories.** Use web search to find the most important, genuinely
   useful AI developments for *working marketers and growth practitioners* from roughly
   the last 7 days. Prefer original sources (publications, company blogs, product pages).
3. **Curate hard — the bar.** Include ONLY what a sharp marketer would forward to a
   colleague in Slack:
   - **INCLUDE:** AI tools marketers can actually use; concrete tactics/plays; platform or
     algorithm changes (SEO / paid / social / email / GEO / AI-search); notable model
     releases with clear marketing relevance.
   - **EXCLUDE:** pure funding/M&A news, thought-leadership fluff, beginner explainers,
     anything not useful to a practicing marketer.
   - Prefer concrete and actionable over abstract or hype.
   - **Quality over quantity:** at most ~9 items. Fewer is fine on a slow week — NEVER pad
     with filler. If almost nothing qualifies, draft a short issue and say so in the intro.
4. **Verify every link.** Use only real URLs you actually found via search. Never invent a
   story, tool, statistic, or link. If you can't confirm something, drop it.
5. **Write the draft** to `drafts/<TODAY>.md` (today's date, `YYYY-MM-DD`) using the exact
   format below.
6. **Open a pull request** into `main`, titled `Draft: AI for Marketers — <TODAY>`, with a
   one-line description. **Do not merge it** — the human reviews, edits, and merges.

## Exact draft format

This matches the local renderer so `npm run send` emails it unchanged.

    # AI for Marketers — <TODAY>

    <one-sentence intro>

    ## The Signal

    ### [<headline>](<url>)
    <2-3 sentence summary — sharp, practical, no hype>

    _Source: <publication>_

    <3-5 items total in The Signal>

    ## Tool of the Week

    ### [<tool name>](<url>)
    <2-3 sentences: what it does and who it's for>

    **Verdict:** Worth it — <why>   (or)   Skip — <why>

    _Source: <publication>_

    ## Steal This Workflow

    ### [<title>](<url>)
    <a concrete AI play a marketer can run today, in 2-3 sentences>

    _Source: <publication>_

Rules: a section may be omitted if the week doesn't support it, but always try to fill
**The Signal**. Only the **Tool of the Week** item gets a `**Verdict:**` line.

## Voice

Direct, practitioner-to-practitioner. No hype, no fluff, no emoji spam. Assume a busy
marketer who wants signal in a 5-minute read.
