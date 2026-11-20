import { useState } from "react";
import { Link } from "react-router-dom";
import { canListen, canSpeak, listen, speak, stopListening } from "../../ai/speech";
import { SchoolPageHeader } from "../../components/SchoolPageHeader";
import { PageBody } from "../../components/ui";
import { useLang } from "../../i18n";
import { useSchoolPath } from "../../schoolContext";

const PASSAGES = [
  {
    level: { en: "Easy", hi: "आसान" },
    text: "My school is very big. It has a green playground. I come to school by bicycle. My teachers are kind. I love to read books in the library.",
  },
  {
    level: { en: "Medium", hi: "मध्यम" },
    text: "Jharkhand is known for its forests, waterfalls and minerals. Many tourists visit Hundru Falls near Ranchi every year. People celebrate festivals like Sarhul and Karma with songs and dances.",
  },
  {
    level: { en: "Hard", hi: "कठिन" },
    text: "Education gives us the power to change our lives. When we read regularly, we learn new words and new ideas. Practising a little every day is better than studying for many hours once a week.",
  },
];

const WORDS = [
  { word: "Confident", hi: "आत्मविश्वासी", use: "She is confident about her exam." },
  { word: "Improve", hi: "सुधारना", use: "Reading every day will improve your English." },
  { word: "Curious", hi: "जिज्ञासु", use: "A curious student asks many questions." },
  { word: "Achieve", hi: "हासिल करना", use: "Work hard to achieve your goals." },
  { word: "Environment", hi: "पर्यावरण", use: "We must keep our environment clean." },
];

const norm = (w: string) => w.toLowerCase().replace(/[^a-z']/g, "");

// Marks which passage words were heard, in order (longest common subsequence).
function matchWords(passage: string[], spoken: string[]): boolean[] {
  const a = passage.map(norm);
  const b = spoken.map(norm);
  const dp = Array.from({ length: a.length + 1 }, () => new Array<number>(b.length + 1).fill(0));
  for (let i = a.length - 1; i >= 0; i--)
    for (let j = b.length - 1; j >= 0; j--) dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
  const hit = new Array<boolean>(a.length).fill(false);
  let i = 0;
  let j = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) {
      hit[i] = true;
      i++;
      j++;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) i++;
    else j++;
  }
  return hit;
}

export function EnglishPage() {
  const to = useSchoolPath();
  const { t } = useLang();
  const [p, setP] = useState(0);
  const [listening, setListening] = useState(false);
  const [heard, setHeard] = useState("");
  const [error, setError] = useState("");
  const words = PASSAGES[p].text.split(/\s+/);
  const hits = heard ? matchWords(words, heard.split(/\s+/)) : null;
  const score = hits ? Math.round((hits.filter(Boolean).length / words.length) * 100) : 0;

  async function record() {
    if (listening) {
      stopListening();
      return;
    }
    setError("");
    setHeard("");
    setListening(true);
    try {
      const said = await listen("en-IN");
      if (!said) setError(t("We could not hear you. Speak a little louder and try again.", "आवाज़ नहीं सुनाई दी। थोड़ा ज़ोर से बोलकर फिर से कोशिश करें।"));
      setHeard(said);
    } catch {
      setError(t("Could not use the microphone. Please allow mic access.", "माइक नहीं चल पाया। कृपया माइक की अनुमति दें।"));
    } finally {
      setListening(false);
    }
  }

  return (
    <>
      <SchoolPageHeader title={`🗣 ${t("English Speaking Practice", "अंग्रेज़ी बोलने का अभ्यास")}`} subtitle={t("Listen, read aloud and check your pronunciation", "सुनें, ज़ोर से पढ़ें और उच्चारण जाँचें")} />
      <PageBody>
        <Link to={to("ai")} className="text-sm font-medium text-brand-600 hover:underline">
          ← {t("All AI tools", "सभी AI टूल")}
        </Link>

        <div className="flex flex-wrap gap-2">
          {PASSAGES.map((x, i) => (
            <button
              key={x.level.en}
              type="button"
              aria-pressed={p === i}
              onClick={() => {
                setP(i);
                setHeard("");
              }}
              className={`rounded-full px-4 py-1.5 text-sm font-medium ring-1 ${p === i ? "bg-brand-700 text-white ring-brand-700" : "bg-white text-slate-700 ring-slate-300"}`}
            >
              {t(x.level.en, x.level.hi)}
            </button>
          ))}
        </div>

        <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <p className="text-xl leading-relaxed">
            {words.map((w, i) => (
              <span key={i} className={hits ? (hits[i] ? "text-green-700" : "rounded bg-red-100 text-red-700") : "text-slate-900"}>
                {w}{" "}
              </span>
            ))}
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            {canSpeak && (
              <button type="button" onClick={() => speak(PASSAGES[p].text, "en-IN", 0.85)} className="rounded-md px-4 py-2.5 font-semibold text-brand-700 ring-1 ring-brand-600 hover:bg-brand-50">
                🔊 {t("1. Listen", "1. सुनें")}
              </button>
            )}
            {canListen ? (
              <button
                type="button"
                onClick={() => void record()}
                className={`rounded-md px-4 py-2.5 font-semibold text-white ${listening ? "animate-pulse bg-red-600" : "bg-brand-700 hover:bg-brand-800"}`}
              >
                🎤 {listening ? t("Listening… tap to stop", "सुन रहा हूँ… रोकने के लिए दबाएँ") : t("2. Read aloud", "2. ज़ोर से पढ़ें")}
              </button>
            ) : (
              <p className="text-sm text-slate-600">{t("Voice checking works in Google Chrome on Android phones.", "आवाज़ जाँच Android फ़ोन के Google Chrome में चलती है।")}</p>
            )}
          </div>
          {error && <p className="mt-3 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
          {hits && (
            <div className={`mt-4 rounded-lg p-4 ${score >= 80 ? "bg-green-50 text-green-900" : score >= 50 ? "bg-amber-50 text-amber-900" : "bg-red-50 text-red-900"}`}>
              <p className="text-2xl font-bold">{score}%</p>
              <p className="text-sm">
                {score >= 80
                  ? t("Very good! Your reading was clear.", "बहुत अच्छा! आपका पढ़ना साफ़ था।")
                  : t("Words in red were not clear. Listen to them again and practise.", "लाल शब्द साफ़ नहीं सुनाई दिए। उन्हें फिर से सुनकर अभ्यास करें।")}
              </p>
              <p className="mt-2 text-xs opacity-80">
                {t("We heard:", "हमने सुना:")} “{heard}”
              </p>
            </div>
          )}
        </div>

        <section className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <h2 className="font-semibold text-brand-800">{t("Words to learn", "सीखने के शब्द")}</h2>
          <ul className="mt-3 divide-y divide-slate-100">
            {WORDS.map((w) => (
              <li key={w.word} className="flex flex-wrap items-center gap-x-3 gap-y-1 py-2.5">
                <span className="font-semibold text-slate-900">{w.word}</span>
                <span className="text-sm text-slate-500">({w.hi})</span>
                <span className="w-full text-sm text-slate-700 sm:w-auto sm:flex-1">“{w.use}”</span>
                {canSpeak && (
                  <button type="button" onClick={() => speak(`${w.word}. ${w.use}`, "en-IN", 0.85)} className="text-sm text-brand-600 hover:underline" aria-label={`${t("Listen", "सुनें")}: ${w.word}`}>
                    🔊
                  </button>
                )}
              </li>
            ))}
          </ul>
        </section>
      </PageBody>
    </>
  );
}
