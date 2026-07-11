export interface Candidate {
  title: string;
  url: string;
  source: string;
  publishedAt: string | null;
  snippet: string;
}

export type Section = "The Signal" | "Tool of the Week" | "Steal This Workflow";

export interface DraftItem {
  section: Section;
  title: string;
  url: string;
  summary: string;
  /** Only populated for the "Tool of the Week" item; "" otherwise. */
  verdict: string;
  /** Feed name, enriched from the source candidate (not model-generated). */
  source?: string;
}

export interface Issue {
  date: string;
  title: string;
  intro: string;
  items: DraftItem[];
}
