import fs from "node:fs";
import path from "node:path";
import type { Candidate } from "./types";

const TRACKING = /^(utm_|ref$|ref_|fbclid$|gclid$|mc_|igshid$|source$|cmpid$)/i;

/** Canonicalize a URL for dedupe: drop tracking params, hash, www, trailing slash. */
export function normalizeUrl(raw: string): string {
  try {
    const u = new URL(raw);
    u.hash = "";
    const keep: [string, string][] = [];
    u.searchParams.forEach((v, k) => {
      if (!TRACKING.test(k)) keep.push([k, v]);
    });
    u.search = "";
    keep
      .sort(([a], [b]) => a.localeCompare(b))
      .forEach(([k, v]) => u.searchParams.append(k, v));
    u.hostname = u.hostname.toLowerCase().replace(/^www\./, "");
    if (u.pathname !== "/") u.pathname = u.pathname.replace(/\/+$/, "");
    return u.toString().replace(/\/$/, "");
  } catch {
    return raw.trim();
  }
}

export function loadSeen(p: string): Set<string> {
  try {
    return new Set(JSON.parse(fs.readFileSync(p, "utf8")) as string[]);
  } catch {
    return new Set();
  }
}

export function saveSeen(p: string, seen: Set<string>): void {
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, JSON.stringify([...seen], null, 2));
}

/** Drop candidates already seen (from prior sends) or duplicated within this batch. */
export function dedupeCandidates(cands: Candidate[], seen: Set<string>): Candidate[] {
  const out: Candidate[] = [];
  const batch = new Set<string>();
  for (const c of cands) {
    const key = normalizeUrl(c.url);
    if (seen.has(key) || batch.has(key)) continue;
    batch.add(key);
    out.push(c);
  }
  return out;
}
