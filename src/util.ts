export function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

/** First `# H1` line of a markdown document, if present. */
export function extractH1(md: string): string | null {
  const m = md.match(/^#\s+(.+)$/m);
  return m ? m[1].trim() : null;
}

/** All `](http...)` link targets in a markdown document. */
export function extractLinks(md: string): string[] {
  const re = /\]\((https?:\/\/[^)\s]+)\)/g;
  const urls: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(md))) urls.push(m[1]);
  return urls;
}

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
