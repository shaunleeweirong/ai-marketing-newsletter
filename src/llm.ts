import Anthropic from "@anthropic-ai/sdk";
import { CONFIG } from "./config";

let client: Anthropic | null = null;

function getClient(): Anthropic {
  if (!CONFIG.anthropicKey) {
    throw new Error("ANTHROPIC_API_KEY is not set. Copy .env.example to .env and add your key.");
  }
  if (!client) client = new Anthropic({ apiKey: CONFIG.anthropicKey });
  return client;
}

/**
 * Single structured-output call. `output_config.format` guarantees the first text
 * block is valid JSON matching `schema`. Cast to `any` on params so the code stays
 * robust across @anthropic-ai/sdk versions that may not yet type `output_config`.
 */
export async function jsonCall<T>(args: {
  system: string;
  user: string;
  schema: object;
  maxTokens: number;
}): Promise<T> {
  const res = await getClient().messages.create({
    model: CONFIG.model,
    max_tokens: args.maxTokens,
    system: args.system,
    messages: [{ role: "user", content: args.user }],
    output_config: { format: { type: "json_schema", schema: args.schema } },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any);

  const block = res.content.find((b: { type: string }) => b.type === "text") as
    | { type: "text"; text: string }
    | undefined;
  if (!block) throw new Error("Claude returned no text block");
  return JSON.parse(block.text) as T;
}
