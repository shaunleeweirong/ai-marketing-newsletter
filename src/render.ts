import { marked } from "marked";
import type { Issue, Section } from "./types";
import { escapeHtml } from "./util";

const ORDER: Section[] = ["The Signal", "Tool of the Week", "Steal This Workflow"];

/** The editable review surface: a plain-markdown draft the operator tweaks then sends. */
export function renderMarkdown(issue: Issue): string {
  let md = `# ${issue.title}\n\n`;
  if (issue.intro) md += `${issue.intro}\n\n`;

  for (const section of ORDER) {
    const items = issue.items.filter((i) => i.section === section);
    if (!items.length) continue;
    md += `## ${section}\n\n`;
    for (const i of items) {
      md += `### [${i.title}](${i.url})\n`;
      md += `${i.summary}\n`;
      if (i.verdict?.trim()) md += `\n**Verdict:** ${i.verdict}\n`;
      if (i.source) md += `\n_Source: ${i.source}_\n`;
      md += `\n`;
    }
  }

  md += `---\n\n_Edit anything above, then run \`npm run send\` to email it to your seed list._\n`;
  return md;
}

/** Wrap rendered markdown in a clean, image-light HTML email shell (TLDR aesthetic). */
export function mdToEmailHtml(md: string, subject: string): string {
  const body = marked.parse(md) as string;
  return `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f5;">
<div style="max-width:600px;margin:0 auto;padding:28px 24px;background:#ffffff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#18181b;line-height:1.55;font-size:16px;">
${body}
</div>
</body>
</html>`;
}
