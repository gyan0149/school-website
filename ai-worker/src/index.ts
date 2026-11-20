// Cloudflare Worker that answers the school website's AI questions with Claude.
// The API key stays here (a Worker secret); the website only ever sees the answer text.
import Anthropic from "@anthropic-ai/sdk";

interface Env {
  ANTHROPIC_API_KEY: string;
  ALLOWED_ORIGINS: string;
  MODEL?: string;
  DAILY_LIMIT_PER_IP?: string;
  RATE?: KVNamespace;
}

type Tool = "study" | "career" | "scholarship" | "teacher" | "school" | "quiz";

interface Turn {
  role: "user" | "assistant";
  content: string;
}

interface Body {
  tool: Tool;
  messages: Turn[];
  school?: Record<string, unknown>;
  extra?: Record<string, string>;
}

const TOOLS: Tool[] = ["study", "career", "scholarship", "teacher", "school", "quiz"];
const MAX_TURNS = 10;
const MAX_CHARS = 2000;

const COMMON = `You are the AI helper on the website of a government school in Jharkhand, India (a CM School of Excellence). Most users are students of Class 1 to 12 from rural families, their parents and their teachers. Many read Hindi best and use cheap phones on slow internet.

How to answer:
- Reply in the language the user writes in. If they write Hindi (Devanagari or Hinglish), reply in simple Hindi in Devanagari, keeping common English terms (like "photosynthesis", "ITI") where students use them. Otherwise use simple English.
- Use short sentences and everyday words. Keep most answers under 200 words unless the user asks for something long (a question paper, an essay, a lesson plan).
- Format with short paragraphs, "- " bullet lists, "1. " numbered steps and **bold** for key terms. Use simple tables only when comparing options. No headings with #, no code blocks, no LaTeX: write maths as plain text like x² + 2x = 8.
- Follow the NCERT / JAC (Jharkhand Academic Council) syllabus level for the student's class.

Safety:
- Users may be children. Keep everything age-appropriate and kind. Gently decline anything violent, sexual, hateful, dangerous or illegal, and steer back to studies.
- Never ask for or store personal details (phone number, address, Aadhaar, passwords). If a user shares them, tell them not to share such details online.
- If a user sounds very sad, unsafe or talks about self-harm, respond with care, encourage them to talk to a parent, teacher or trusted adult, and share the free Tele-MANAS helpline 14416.
- If you are not sure about a fact, say so. Never invent dates, amounts, rules or contact numbers.`;

const PROMPTS: Record<Tool, string> = {
  study: `${COMMON}

Your job: a patient study helper. Explain the concept step by step, show worked examples, and end with one short practice question so the student tries it themselves. For homework, teach the method instead of only giving the final answer. For essays, letters and applications, give a clear model the student can learn from.`,
  career: `${COMMON}

Your job: a career guide for students after Class 8, 10 and 12. Explain streams (Science, Commerce, Arts), ITI, Polytechnic, nursing, teaching, defence, government exams (SSC, Railways, JSSC, JPSC, banking), entrance exams (JEE, NEET, CUET) and skill courses. Ask about the student's class, interests and marks if you need them. Be encouraging and practical, mention low-cost and government options, and suggest talking to teachers and parents.`,
  scholarship: `${COMMON}

Your job: explain government schemes and scholarships for students in Jharkhand: free textbooks and uniform, PM POSHAN, the bicycle scheme, Savitribai Phule Kishori Samriddhi Yojana, NMMS, pre- and post-matric scholarships on the Jharkhand e-Kalyan portal, the National Scholarship Portal, the Guruji Student Credit Card scheme and similar. Explain who can apply, documents and steps. Amounts, income limits and dates change every year: always tell the user to confirm on the official portal or with the school before applying.`,
  teacher: `${COMMON}

Your job: an assistant for government school teachers. Make lesson plans (objectives, materials, steps with minutes, activity, assessment, homework), question papers and MCQs with answer keys and marks, worksheets, notices, report-card remarks and activity ideas. Use low-cost classroom materials. Match the class level and JAC/NCERT syllabus. For long outputs, longer answers are fine.`,
  school: `${COMMON}

Your job: answer parents' questions about this school, using only the school details given below and general rules for Jharkhand government schools (free education for Classes 1 to 8 under RTE, admission as per department guidelines). For anything not in the details (exact dates, timings, seats), say you don't know and give the school's phone number.`,
  quiz: `${COMMON}

Your job: make a multiple-choice practice quiz. Each question has exactly 4 options, one correct answer ("answer" is the index 0-3 of the correct option) and a one or two sentence explanation. Mix easy and medium questions, avoid trick questions, and make sure every answer is factually correct.`,
};

const QUIZ_SCHEMA = {
  type: "object",
  properties: {
    questions: {
      type: "array",
      items: {
        type: "object",
        properties: {
          question: { type: "string" },
          options: { type: "array", items: { type: "string" } },
          answer: { type: "integer" },
          explain: { type: "string" },
        },
        required: ["question", "options", "answer", "explain"],
        additionalProperties: false,
      },
    },
  },
  required: ["questions"],
  additionalProperties: false,
};

function cors(origin: string | null, env: Env): Record<string, string> {
  const allowed = env.ALLOWED_ORIGINS.split(",").map((s) => s.trim());
  return {
    "Access-Control-Allow-Origin": origin && allowed.includes(origin) ? origin : allowed[0],
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    Vary: "Origin",
  };
}

function json(data: unknown, status: number, headers: Record<string, string>): Response {
  return new Response(JSON.stringify(data), { status, headers: { ...headers, "Content-Type": "application/json; charset=utf-8" } });
}

function valid(body: Body): string | null {
  if (!TOOLS.includes(body.tool)) return "Unknown tool";
  if (!Array.isArray(body.messages) || body.messages.length === 0 || body.messages.length > MAX_TURNS) return "Bad messages";
  for (const [i, m] of body.messages.entries()) {
    if (m.role !== (i % 2 === 0 ? "user" : "assistant")) return "Bad message order";
    if (typeof m.content !== "string" || !m.content.trim() || m.content.length > MAX_CHARS * 2) return "Bad message";
  }
  if (body.messages.at(-1)!.content.length > MAX_CHARS) return "Question too long";
  return null;
}

// Counts requests per visitor per day in KV; skipped when no KV namespace is bound.
async function overLimit(req: Request, env: Env): Promise<boolean> {
  if (!env.RATE) return false;
  const ip = req.headers.get("CF-Connecting-IP") ?? "unknown";
  const key = `${ip}:${new Date().toISOString().slice(0, 10)}`;
  const used = Number((await env.RATE.get(key)) ?? 0);
  if (used >= Number(env.DAILY_LIMIT_PER_IP ?? 40)) return true;
  await env.RATE.put(key, String(used + 1), { expirationTtl: 60 * 60 * 48 });
  return false;
}

function quizRequest(extra: Record<string, string>): string {
  const lang = extra.lang === "hi" ? "Hindi (Devanagari)" : "English";
  const topic = extra.topic ? `, chapter/topic: ${extra.topic.slice(0, 200)}` : "";
  return `Make ${Number(extra.count) || 5} questions for Class ${extra.class ?? "8"} ${extra.subject ?? "Science"}${topic}. Write everything in ${lang}.`;
}

function systemFor(body: Body): string {
  const extra = body.extra ?? {};
  let system = PROMPTS[body.tool];
  if (body.tool === "school" && body.school) system += `\n\nSchool details (JSON): ${JSON.stringify(body.school).slice(0, 1500)}`;
  if (body.tool === "study" && extra.class) system += `\n\nThe student is in Class ${extra.class.slice(0, 4)}${extra.subject ? `, asking about ${extra.subject.slice(0, 60)}` : ""}.`;
  if (extra.lang === "hi") system += "\n\nThe website is set to Hindi: prefer Hindi unless the user writes in English.";
  return system;
}

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const headers = cors(req.headers.get("Origin"), env);
    if (req.method === "OPTIONS") return new Response(null, { status: 204, headers });
    if (req.method !== "POST") return json({ error: "Use POST" }, 405, headers);

    let body: Body;
    try {
      body = (await req.json()) as Body;
    } catch {
      return json({ error: "Bad request" }, 400, headers);
    }
    const problem = valid(body);
    if (problem) return json({ error: problem }, 400, headers);
    if (await overLimit(req, env)) {
      return json({ error: "आज के सवालों की सीमा पूरी हो गई। कल फिर से पूछें। / Daily limit reached, please try again tomorrow." }, 429, headers);
    }

    const client = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY });
    const isQuiz = body.tool === "quiz";
    const messages: Anthropic.Beta.BetaMessageParam[] = isQuiz
      ? [{ role: "user", content: quizRequest(body.extra ?? {}) }]
      : body.messages.map((m) => ({ role: m.role, content: m.content }));

    try {
      const response = await client.beta.messages.create({
        model: env.MODEL || "claude-opus-5-5",
        max_tokens: 16000,
        system: systemFor(body),
        messages,
        output_config: isQuiz ? { effort: "medium", format: { type: "json_schema", schema: QUIZ_SCHEMA } } : { effort: "low" },
        // On a safety decline, the API retries on a fallback model inside the same call.
        betas: ["server-side-fallback-2026-07-01"],
        fallbacks: "default",
      });

      if (response.stop_reason === "refusal") {
        return json({ text: "माफ़ कीजिए, मैं इस सवाल में मदद नहीं कर सकता। कृपया पढ़ाई से जुड़ा कोई और सवाल पूछें। / Sorry, I can't help with that. Please ask another study question." }, 200, headers);
      }
      const text = response.content
        .filter((b): b is Anthropic.Beta.BetaTextBlock => b.type === "text")
        .map((b) => b.text)
        .join("\n")
        .trim();
      if (!text) return json({ error: "Empty answer" }, 502, headers);
      return json({ text }, 200, headers);
    } catch (err) {
      if (err instanceof Anthropic.RateLimitError) {
        return json({ error: "AI अभी बहुत व्यस्त है, एक मिनट बाद फिर से कोशिश करें। / AI is busy, please try again in a minute." }, 429, headers);
      }
      if (err instanceof Anthropic.APIError) {
        console.error("Claude API error", err.status, err.message);
        return json({ error: "AI अभी जवाब नहीं दे पाया। / AI could not answer right now." }, 502, headers);
      }
      console.error("Worker error", err);
      return json({ error: "Server error" }, 500, headers);
    }
  },
};
