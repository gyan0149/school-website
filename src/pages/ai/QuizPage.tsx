import { useState } from "react";
import { Link } from "react-router-dom";
import { DemoBadge } from "../../ai/ChatBox";
import { AI_LIVE, AiError, askAI } from "../../ai/client";
import { QUIZ_BANK, QUIZ_SUBJECTS, type QuizQuestion, type QuizSubject } from "../../ai/quizBank";
import { SchoolPageHeader } from "../../components/SchoolPageHeader";
import { PageBody } from "../../components/ui";
import { useLang } from "../../i18n";
import { useSchool, useSchoolPath } from "../../schoolContext";

// The AI service returns questions in one language; the same text is used for both.
function fromLive(json: string): QuizQuestion[] {
  const data = JSON.parse(json) as { questions: { question: string; options: string[]; answer: number; explain: string }[] };
  return data.questions
    .filter((q) => q.options.length === 4 && q.answer >= 0 && q.answer < 4)
    .map((q) => ({
      question: { en: q.question, hi: q.question },
      options: q.options.map((o) => ({ en: o, hi: o })),
      answer: q.answer,
      explain: { en: q.explain, hi: q.explain },
    }));
}

function shuffle<T>(items: T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

export function QuizPage() {
  const school = useSchool();
  const to = useSchoolPath();
  const { t, lang } = useLang();
  const [subject, setSubject] = useState<QuizSubject>("science");
  const [topic, setTopic] = useState("");
  const [cls, setCls] = useState(String(Math.min(Math.max(school.classFrom, 8), school.classTo)));
  const [questions, setQuestions] = useState<QuizQuestion[] | null>(null);
  const [picked, setPicked] = useState<(number | null)[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function start() {
    setError("");
    setBusy(true);
    try {
      let qs: QuizQuestion[];
      if (AI_LIVE) {
        const name = QUIZ_SUBJECTS.find((s) => s.id === subject)!.name;
        const text = await askAI("quiz", [{ role: "user", content: "quiz" }], school, {
          lang,
          class: cls,
          subject: name.en,
          topic: topic.trim(),
          count: "5",
        });
        qs = fromLive(text);
        if (!qs.length) throw new AiError(t("Could not make a quiz. Please try again.", "क्विज़ नहीं बन पाया। फिर से कोशिश करें।"));
      } else {
        await new Promise((r) => setTimeout(r, 400));
        qs = shuffle(QUIZ_BANK[subject]);
      }
      setQuestions(qs);
      setPicked(qs.map(() => null));
    } catch (e) {
      setError(e instanceof AiError ? e.message : t("Could not make a quiz. Please try again.", "क्विज़ नहीं बन पाया। फिर से कोशिश करें।"));
    } finally {
      setBusy(false);
    }
  }

  const answered = picked.filter((p) => p !== null).length;
  const score = questions ? picked.filter((p, i) => p === questions[i].answer).length : 0;
  const done = questions !== null && answered === questions.length;
  const select = "w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-base focus:border-brand-600 focus:outline-none";

  return (
    <>
      <SchoolPageHeader title={`📝 ${t("Practice Quiz", "क्विज़ अभ्यास")}`} subtitle={t("Test yourself and learn from every answer", "खुद को परखें और हर उत्तर से सीखें")} />
      <PageBody>
        <Link to={to("ai")} className="text-sm font-medium text-brand-600 hover:underline">
          ← {t("All AI tools", "सभी AI टूल")}
        </Link>
        <DemoBadge />
        <div className="grid gap-4 rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:grid-cols-4 sm:items-end">
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">{t("Subject", "विषय")}</span>
            <select value={subject} onChange={(e) => setSubject(e.target.value as QuizSubject)} className={select}>
              {QUIZ_SUBJECTS.map((s) => (
                <option key={s.id} value={s.id}>
                  {t(s.name.en, s.name.hi)}
                </option>
              ))}
            </select>
          </label>
          {AI_LIVE && (
            <>
              <label className="block">
                <span className="mb-1 block text-sm font-medium text-slate-700">{t("Class", "कक्षा")}</span>
                <select value={cls} onChange={(e) => setCls(e.target.value)} className={select}>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="mb-1 block text-sm font-medium text-slate-700">{t("Chapter / topic (optional)", "पाठ / टॉपिक (वैकल्पिक)")}</span>
                <input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder={t("e.g. Fractions", "जैसे: भिन्न")} className={select} />
              </label>
            </>
          )}
          <button type="button" onClick={() => void start()} disabled={busy} className="rounded-md bg-brand-700 px-5 py-3 font-semibold text-white hover:bg-brand-800 disabled:opacity-60 sm:col-start-4">
            {busy ? t("Making quiz…", "क्विज़ बन रहा है…") : questions ? t("New quiz ↻", "नया क्विज़ ↻") : t("Start quiz ›", "क्विज़ शुरू करें ›")}
          </button>
        </div>
        {error && <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

        {questions && (
          <ol className="space-y-4">
            {questions.map((q, qi) => {
              const choice = picked[qi];
              return (
                <li key={qi} className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
                  <p className="font-semibold text-slate-900">
                    {qi + 1}. {t(q.question.en, q.question.hi)}
                  </p>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {q.options.map((o, oi) => {
                      const isRight = oi === q.answer;
                      const state =
                        choice === null ? "bg-white ring-slate-300 hover:ring-brand-600" : isRight ? "bg-green-50 ring-green-600 text-green-900" : choice === oi ? "bg-red-50 ring-red-500 text-red-800" : "bg-white ring-slate-200 opacity-60";
                      return (
                        <button
                          key={oi}
                          type="button"
                          disabled={choice !== null}
                          onClick={() => setPicked((p) => p.map((v, i) => (i === qi ? oi : v)))}
                          className={`rounded-lg px-3 py-2.5 text-left ring-1 transition ${state}`}
                        >
                          <span className="mr-2 font-semibold">{String.fromCharCode(65 + oi)}.</span>
                          {t(o.en, o.hi)}
                          {choice !== null && isRight && " ✓"}
                          {choice === oi && !isRight && " ✗"}
                        </button>
                      );
                    })}
                  </div>
                  {choice !== null && (
                    <p className={`mt-3 rounded-md px-3 py-2 text-sm ${choice === q.answer ? "bg-green-50 text-green-800" : "bg-amber-50 text-amber-900"}`}>
                      <strong>{choice === q.answer ? t("Correct! ", "सही! ") : t("Not quite. ", "सही उत्तर देखें। ")}</strong>
                      {t(q.explain.en, q.explain.hi)}
                    </p>
                  )}
                </li>
              );
            })}
          </ol>
        )}

        {done && questions && (
          <div className="rounded-xl bg-brand-700 p-5 text-center text-white">
            <p className="text-3xl font-bold">
              {score} / {questions.length}
            </p>
            <p className="mt-1">
              {score === questions.length
                ? t("Excellent! All correct 🎉", "शानदार! सभी सही 🎉")
                : score >= questions.length / 2
                  ? t("Good work! Read the explanations and try again.", "अच्छा! व्याख्याएँ पढ़ें और फिर से कोशिश करें।")
                  : t("Keep practising, you will improve!", "अभ्यास करते रहें, आप ज़रूर बेहतर करेंगे!")}
            </p>
            <button type="button" onClick={() => void start()} className="mt-4 rounded-md bg-accent-500 px-5 py-2.5 font-semibold text-brand-900 hover:bg-accent-400">
              {t("Try another quiz ↻", "दूसरा क्विज़ ↻")}
            </button>
          </div>
        )}
      </PageBody>
    </>
  );
}
