import { useEffect, useRef, useState, type FormEvent } from "react";
import { useLang } from "../i18n";
import { useSchool } from "../schoolContext";
import { AI_LIVE, AiError, askAI, type AiTool, type ChatTurn } from "./client";
import { Markdown } from "./Markdown";
import { canListen, canSpeak, guessLang, listen, speak, stopListening, stopSpeaking } from "./speech";

export function DemoBadge() {
  const { t } = useLang();
  if (AI_LIVE) return null;
  return (
    <p className="rounded-md bg-amber-50 px-3 py-2 text-sm text-amber-900 ring-1 ring-amber-200">
      <strong>{t("Demo:", "डेमो:")}</strong>{" "}
      {t(
        "AI answers here are samples for a few questions. On the final website the AI answers every question.",
        "यहाँ कुछ सवालों के नमूना जवाब हैं। फ़ाइनल वेबसाइट में AI हर सवाल का जवाब देगा।",
      )}
    </p>
  );
}

export function ChatBox({
  tool,
  intro,
  samples,
  extra,
  placeholder,
}: {
  tool: AiTool;
  intro: string;
  samples: string[];
  extra?: Record<string, string>;
  placeholder?: string;
}) {
  const school = useSchool();
  const { t, lang } = useLang();
  const [turns, setTurns] = useState<ChatTurn[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [listening, setListening] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (turns.length) endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [turns, busy]);

  useEffect(() => () => stopSpeaking(), []);

  async function send(text: string) {
    const q = text.trim();
    if (!q || busy) return;
    const next: ChatTurn[] = [...turns, { role: "user", content: q }];
    setTurns(next);
    setInput("");
    setError("");
    setBusy(true);
    try {
      const answer = await askAI(tool, next, school, extra);
      setTurns([...next, { role: "assistant", content: answer }]);
    } catch (e) {
      setError(e instanceof AiError ? e.message : t("Something went wrong. Please try again.", "कुछ गड़बड़ हो गई। कृपया फिर से कोशिश करें।"));
      setTurns(turns);
      setInput(q);
    } finally {
      setBusy(false);
    }
  }

  async function mic() {
    if (listening) {
      stopListening();
      return;
    }
    setListening(true);
    try {
      const said = await listen(lang === "hi" ? "hi-IN" : "en-IN");
      if (said) setInput((v) => (v ? `${v} ${said}` : said));
    } catch {
      setError(t("Could not use the microphone. Please allow mic access or type instead.", "माइक नहीं चल पाया। माइक की अनुमति दें या लिखकर पूछें।"));
    } finally {
      setListening(false);
    }
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    void send(input);
  }

  const lastIsDemoMiss = !AI_LIVE && turns.at(-1)?.content.startsWith("**यह डेमो है।**");

  return (
    <div className="flex flex-col rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="max-h-[60vh] min-h-56 space-y-4 overflow-y-auto p-4" aria-live="polite">
        <Bubble role="assistant" text={intro} />
        {turns.map((m, i) => (
          <Bubble key={i} role={m.role} text={m.content} />
        ))}
        {busy && (
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span className="flex gap-1" aria-hidden>
              <span className="h-2 w-2 animate-bounce rounded-full bg-brand-600" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-brand-600 [animation-delay:120ms]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-brand-600 [animation-delay:240ms]" />
            </span>
            {t("Thinking…", "सोच रहा हूँ…")}
          </div>
        )}
        <div ref={endRef} />
      </div>

      {(turns.length === 0 || lastIsDemoMiss) && samples.length > 0 && (
        <div className="border-t border-slate-100 px-4 py-3">
          <p className="mb-2 text-xs font-medium text-slate-500">{t("Try asking:", "ऐसे पूछें:")}</p>
          <div className="flex flex-wrap gap-2">
            {samples.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => void send(s)}
                disabled={busy}
                className="rounded-full bg-brand-50 px-3 py-1.5 text-left text-sm text-brand-800 ring-1 ring-brand-100 hover:ring-brand-600 disabled:opacity-50"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {error && <p className="mx-4 mb-2 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

      <form onSubmit={submit} className="flex items-end gap-2 border-t border-slate-200 p-3">
        {canListen && (
          <button
            type="button"
            onClick={() => void mic()}
            aria-label={listening ? t("Stop listening", "सुनना बंद करें") : t("Speak your question", "बोलकर पूछें")}
            title={listening ? t("Stop listening", "सुनना बंद करें") : t("Speak your question", "बोलकर पूछें")}
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-lg ring-1 ${listening ? "animate-pulse bg-red-600 text-white ring-red-600" : "bg-white text-brand-700 ring-slate-300 hover:ring-brand-600"}`}
          >
            🎤
          </button>
        )}
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              void send(input);
            }
          }}
          rows={1}
          placeholder={placeholder ?? t("Type your question in Hindi or English…", "अपना सवाल हिंदी या अंग्रेज़ी में लिखें…")}
          className="max-h-32 min-h-11 flex-1 resize-y rounded-lg border border-slate-300 px-3 py-2.5 text-base focus:border-brand-600 focus:ring-2 focus:ring-brand-100 focus:outline-none"
          aria-label={t("Your question", "आपका सवाल")}
        />
        <button type="submit" disabled={busy || !input.trim()} className="h-11 shrink-0 rounded-lg bg-brand-700 px-4 font-semibold text-white hover:bg-brand-800 disabled:opacity-50">
          {t("Ask", "पूछें")}
        </button>
      </form>
      <p className="px-4 pb-3 text-xs text-slate-500">
        {t("AI can make mistakes. Check important answers with your teacher.", "AI से गलती हो सकती है। ज़रूरी जवाब अपने शिक्षक से ज़रूर जाँचें।")}
      </p>
    </div>
  );
}

function Bubble({ role, text }: { role: "user" | "assistant"; text: string }) {
  const { t } = useLang();
  if (role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-brand-700 px-4 py-2.5 whitespace-pre-wrap text-white">{text}</div>
      </div>
    );
  }
  return (
    <div className="flex gap-2">
      <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-500 text-base" aria-hidden>
        ✨
      </span>
      <div className="max-w-[90%] min-w-0 rounded-2xl rounded-tl-sm bg-slate-50 px-4 py-3 text-slate-800 ring-1 ring-slate-200">
        <Markdown text={text} />
        {canSpeak && (
          <button type="button" onClick={() => speak(text, guessLang(text))} className="mt-2 text-xs font-medium text-brand-600 hover:underline">
            🔊 {t("Read aloud", "सुनें")}
          </button>
        )}
      </div>
    </div>
  );
}
