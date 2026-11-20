// Talks to the AI service. With VITE_AI_URL set, questions go to the Cloudflare Worker in ai-worker/
// (which holds the API key); without it the site runs in demo mode with built-in sample answers.
import type { School } from "../types/school";
import { demoAnswer } from "./demo";

export type AiTool = "study" | "career" | "scholarship" | "teacher" | "school" | "quiz";

export interface ChatTurn {
  role: "user" | "assistant";
  content: string;
}

const AI_URL = import.meta.env.VITE_AI_URL as string | undefined;

export const AI_LIVE = Boolean(AI_URL);

// Only what the AI needs to answer school questions; no phone numbers of other people.
function schoolContext(s: School) {
  return {
    name: s.name,
    udise: s.udise,
    district: s.district,
    block: s.block,
    classes: `${s.classFrom}-${s.classTo}`,
    hm: s.hmName ?? undefined,
    phone: s.hmPhone,
    village: s.village,
    established: s.established,
  };
}

export class AiError extends Error {}

export async function askAI(tool: AiTool, messages: ChatTurn[], school: School, extra?: Record<string, string>): Promise<string> {
  if (!AI_URL) return demoAnswer(tool, messages, school, extra);
  let res: Response;
  try {
    res = await fetch(AI_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tool, messages: messages.slice(-10), school: schoolContext(school), extra }),
    });
  } catch {
    throw new AiError("इंटरनेट से जुड़ नहीं पाए। नेटवर्क देखकर फिर से कोशिश करें।");
  }
  const data = (await res.json().catch(() => ({}))) as { text?: string; error?: string };
  if (!res.ok || !data.text) throw new AiError(data.error ?? "AI अभी जवाब नहीं दे पाया। थोड़ी देर बाद फिर से कोशिश करें।");
  return data.text;
}
