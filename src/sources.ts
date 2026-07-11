import Parser from "rss-parser";
import { CONFIG } from "./config";
import type { Candidate } from "./types";

/**
 * Feed list — tune freely. Mix of marketing-specific and AI sources.
 * If a feed breaks, it's isolated per-feed below (one dead feed won't kill the run).
 */
export const FEEDS: { name: string; url: string }[] = [
  { name: "Search Engine Land", url: "https://searchengineland.com/feed" },
  { name: "Search Engine Journal", url: "https://www.searchenginejournal.com/feed/" },
  { name: "Content Marketing Institute", url: "https://contentmarketinginstitute.com/feed/" },
  { name: "TechCrunch AI", url: "https://techcrunch.com/category/artificial-intelligence/feed/" },
  { name: "The Verge AI", url: "https://www.theverge.com/rss/ai-artificial-intelligence/index.xml" },
  { name: "VentureBeat AI", url: "https://venturebeat.com/category/ai/feed/" },
  { name: "Hacker News (AI marketing)", url: "https://hnrss.org/newest?q=AI+marketing&count=30" },
];

const parser = new Parser({ timeout: 15000 });

function toPlain(s: string | undefined, max = 600): string {
  if (!s) return "";
  return s
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

export async function fetchAllCandidates(): Promise<Candidate[]> {
  const cutoff = Date.now() - CONFIG.maxAgeDays * 24 * 60 * 60 * 1000;
  const out: Candidate[] = [];

  for (const feed of FEEDS) {
    try {
      const parsed = await parser.parseURL(feed.url);
      let kept = 0;
      for (const item of parsed.items ?? []) {
        const url = item.link?.trim();
        const title = item.title?.trim();
        if (!url || !title) continue;

        const iso =
          item.isoDate ?? (item.pubDate ? new Date(item.pubDate).toISOString() : null);
        if (iso && new Date(iso).getTime() < cutoff) continue;

        out.push({
          title,
          url,
          source: feed.name,
          publishedAt: iso,
          snippet: toPlain(item.contentSnippet ?? (item as { content?: string }).content),
        });
        kept++;
      }
      console.log(`  [feed] ${feed.name}: ${kept}`);
    } catch (err) {
      console.warn(`  [feed] ${feed.name}: FAILED — ${(err as Error).message}`);
    }
  }
  return out;
}
