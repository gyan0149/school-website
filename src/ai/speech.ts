// Voice input (speech-to-text) and read-aloud using the browser's built-in speech features.

interface RecognitionResultEvent {
  results: ArrayLike<ArrayLike<{ transcript: string }>>;
}

interface Recognition {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  onresult: ((e: RecognitionResultEvent) => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
}

type RecognitionCtor = new () => Recognition;

function recognitionCtor(): RecognitionCtor | undefined {
  const w = window as unknown as { SpeechRecognition?: RecognitionCtor; webkitSpeechRecognition?: RecognitionCtor };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition;
}

export const canListen = typeof window !== "undefined" && Boolean(recognitionCtor());
export const canSpeak = typeof window !== "undefined" && "speechSynthesis" in window;

let current: Recognition | null = null;

// Listens once and resolves with what was said ("" if nothing was heard).
export function listen(lang: "hi-IN" | "en-IN"): Promise<string> {
  const Ctor = recognitionCtor();
  if (!Ctor) return Promise.reject(new Error("unsupported"));
  current?.stop();
  return new Promise((resolve, reject) => {
    const r = new Ctor();
    current = r;
    r.lang = lang;
    r.interimResults = false;
    r.maxAlternatives = 1;
    let text = "";
    r.onresult = (e) => {
      text = Array.from(e.results)
        .map((res) => res[0]?.transcript ?? "")
        .join(" ");
    };
    r.onerror = (e) => (e.error === "no-speech" || e.error === "aborted" ? resolve("") : reject(new Error(e.error)));
    r.onend = () => {
      current = null;
      resolve(text.trim());
    };
    r.start();
  });
}

export function stopListening() {
  current?.stop();
}

function plain(text: string): string {
  return text
    .replace(/\*\*/g, "")
    .replace(/^\s*[-•*|]\s?/gm, "")
    .replace(/\|/g, " ")
    .replace(/[#✦👉📢✨🌳]/gu, "");
}

export function speak(text: string, lang: "hi-IN" | "en-IN", rate = 0.95) {
  if (!canSpeak) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(plain(text));
  u.lang = lang;
  u.rate = rate;
  const voice = window.speechSynthesis.getVoices().find((v) => v.lang.replace("_", "-").startsWith(lang.slice(0, 2)));
  if (voice) u.voice = voice;
  window.speechSynthesis.speak(u);
}

export function stopSpeaking() {
  if (canSpeak) window.speechSynthesis.cancel();
}

// Hindi if the text has Devanagari letters, otherwise Indian English.
export function guessLang(text: string): "hi-IN" | "en-IN" {
  return /[ऀ-ॿ]/.test(text) ? "hi-IN" : "en-IN";
}
