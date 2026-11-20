import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { SchoolPageHeader } from "../../components/SchoolPageHeader";
import { PageBody } from "../../components/ui";
import { subjectGroups } from "../../data/common";
import { todayIso } from "../../data/uploads";
import { useLang } from "../../i18n";
import { useSchool, useSchoolPath } from "../../schoolContext";

const SUBJECTS_11_12 = ["Physics", "Chemistry", "Mathematics", "Biology", "Accountancy", "Business Studies", "Economics", "History", "Political Science", "Geography", "Hindi", "English"];

interface PlanDay {
  date: Date;
  slots: string[];
  kind: "study" | "revision" | "final";
}

function addDays(d: Date, n: number): Date {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}

function parseIso(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

// Spreads subjects over the days left; weak subjects get twice the slots, every 7th day is revision.
function makePlan(start: Date, exam: Date, subjects: string[], weak: string[], hours: number): PlanDay[] {
  const days = Math.round((exam.getTime() - start.getTime()) / 86400000);
  if (days < 1 || !subjects.length) return [];
  const pool = subjects.flatMap((s) => (weak.includes(s) ? [s, s] : [s]));
  const plan: PlanDay[] = [];
  let next = 0;
  for (let i = 0; i < Math.min(days, 120); i++) {
    const date = addDays(start, i);
    const left = days - i;
    if (left <= 2 && days >= 6) {
      plan.push({ date, slots: [], kind: "final" });
    } else if ((i + 1) % 7 === 0) {
      plan.push({ date, slots: [], kind: "revision" });
    } else {
      const slots: string[] = [];
      for (let h = 0; h < hours; h++) {
        let s = pool[next % pool.length];
        // Avoid the same subject twice in a row on one day when there is a choice.
        if (slots.at(-1) === s && subjects.length > 1) s = pool[++next % pool.length];
        slots.push(s);
        next++;
      }
      plan.push({ date, slots, kind: "study" });
    }
  }
  return plan;
}

export function PlannerPage() {
  const school = useSchool();
  const to = useSchoolPath();
  const { t, lang } = useLang();
  const classes = Array.from({ length: school.classTo - school.classFrom + 1 }, (_, i) => school.classFrom + i);
  const [cls, setCls] = useState(classes.includes(10) ? 10 : classes.at(-1)!);
  const subjectsFor = (c: number) => (c >= 11 ? SUBJECTS_11_12 : subjectGroups.find((g) => c >= g.from && c <= g.to)?.subjects ?? []);
  const [chosen, setChosen] = useState<string[]>(() => subjectsFor(cls).slice(0, 5));
  const [weak, setWeak] = useState<string[]>([]);
  const [hours, setHours] = useState(3);
  const [exam, setExam] = useState(() => {
    const d = addDays(new Date(), 30);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  });
  const [shown, setShown] = useState(false);

  const plan = useMemo(() => makePlan(parseIso(todayIso()), parseIso(exam), chosen, weak, hours), [exam, chosen, weak, hours]);
  const toggle = (list: string[], set: (v: string[]) => void, s: string) => set(list.includes(s) ? list.filter((x) => x !== s) : [...list, s]);
  const fmt = (d: Date) => d.toLocaleDateString(lang === "hi" ? "hi-IN" : "en-IN", { weekday: "short", day: "numeric", month: "short" });
  const chip = (on: boolean, tone = "brand") =>
    `rounded-full px-3 py-1.5 text-sm ring-1 ${on ? (tone === "red" ? "bg-red-600 text-white ring-red-600" : "bg-brand-700 text-white ring-brand-700") : "bg-white text-slate-700 ring-slate-300"}`;

  return (
    <>
      <SchoolPageHeader title={`📅 ${t("Exam Study Planner", "परीक्षा टाइमटेबल")}`} subtitle={t("A day-by-day plan till your exam", "परीक्षा तक हर दिन का प्लान")} />
      <PageBody>
        <Link to={to("ai")} className="text-sm font-medium text-brand-600 hover:underline print:hidden">
          ← {t("All AI tools", "सभी AI टूल")}
        </Link>
        <div className="space-y-5 rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200 print:hidden">
          <div className="grid gap-4 sm:grid-cols-3">
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-slate-700">{t("Class", "कक्षा")}</span>
              <select
                value={cls}
                onChange={(e) => {
                  const c = Number(e.target.value);
                  setCls(c);
                  setChosen(subjectsFor(c).slice(0, 5));
                  setWeak([]);
                }}
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5"
              >
                {classes.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-slate-700">{t("Exam starts on", "परीक्षा की तारीख")}</span>
              <input type="date" value={exam} min={todayIso()} onChange={(e) => setExam(e.target.value)} className="w-full rounded-md border border-slate-300 px-3 py-2.5" />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-slate-700">
                {t("Study hours per day", "रोज़ पढ़ाई के घंटे")}: <strong>{hours}</strong>
              </span>
              <input type="range" min={1} max={6} value={hours} onChange={(e) => setHours(Number(e.target.value))} className="w-full accent-brand-700" />
            </label>
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-slate-700">{t("Subjects to study", "कौन-से विषय पढ़ने हैं")}</p>
            <div className="flex flex-wrap gap-2">
              {subjectsFor(cls).map((s) => (
                <button key={s} type="button" aria-pressed={chosen.includes(s)} onClick={() => toggle(chosen, setChosen, s)} className={chip(chosen.includes(s))}>
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-slate-700">{t("Which subjects are hard for you? (they get more time)", "कौन-से विषय कठिन लगते हैं? (उन्हें ज़्यादा समय मिलेगा)")}</p>
            <div className="flex flex-wrap gap-2">
              {chosen.map((s) => (
                <button key={s} type="button" aria-pressed={weak.includes(s)} onClick={() => toggle(weak, setWeak, s)} className={chip(weak.includes(s), "red")}>
                  {s}
                </button>
              ))}
            </div>
          </div>
          <button type="button" onClick={() => setShown(true)} disabled={!plan.length} className="rounded-md bg-brand-700 px-5 py-3 font-semibold text-white hover:bg-brand-800 disabled:opacity-50">
            {t("Make my timetable ›", "मेरा टाइमटेबल बनाएँ ›")}
          </button>
        </div>

        {shown && plan.length > 0 && (
          <section className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl font-bold text-brand-800">
                {t(`Your plan: ${plan.length} days`, `आपका प्लान: ${plan.length} दिन`)}
              </h2>
              <button type="button" onClick={() => window.print()} className="rounded-md px-4 py-2 font-semibold text-brand-700 ring-1 ring-brand-600 print:hidden">
                🖨 {t("Print / Save PDF", "प्रिंट / PDF सेव करें")}
              </button>
            </div>
            <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {plan.map((d) => (
                <li key={d.date.toISOString()} className={`rounded-lg p-3 ring-1 ${d.kind === "study" ? "bg-white ring-slate-200" : d.kind === "revision" ? "bg-amber-50 ring-amber-200" : "bg-green-50 ring-green-200"}`}>
                  <p className="text-xs font-semibold text-slate-500">{fmt(d.date)}</p>
                  {d.kind === "study" ? (
                    <ol className="mt-1 space-y-0.5 text-sm">
                      {d.slots.map((s, i) => (
                        <li key={i} className={weak.includes(s) ? "font-semibold text-red-700" : "text-slate-800"}>
                          {t(`Hour ${i + 1}`, `घंटा ${i + 1}`)}: {s}
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <p className="mt-1 text-sm font-medium text-slate-800">
                      {d.kind === "revision"
                        ? t("🔁 Weekly revision + one practice test", "🔁 हफ़्ते का दोहराव + एक अभ्यास टेस्ट")
                        : t("✅ Light revision of short notes, sleep well", "✅ छोटे नोट्स का हल्का दोहराव, अच्छी नींद लें")}
                    </p>
                  )}
                </li>
              ))}
            </ul>
            <div className="rounded-xl bg-brand-50 p-4 text-sm text-slate-700 ring-1 ring-brand-100">
              <p className="font-semibold text-brand-800">{t("Tips", "सुझाव")}</p>
              <ul className="mt-1 list-disc space-y-1 pl-5 marker:text-accent-500">
                <li>{t("Take a 10-minute break after every hour.", "हर घंटे के बाद 10 मिनट का ब्रेक लें।")}</li>
                <li>{t("Make short notes while studying; read them on revision days.", "पढ़ते समय छोटे नोट्स बनाएँ; दोहराव वाले दिन उन्हें पढ़ें।")}</li>
                <li>{t("Solve last years' question papers.", "पिछले सालों के प्रश्न-पत्र हल करें।")}</li>
                <li>{t("Sleep 7–8 hours. A fresh mind remembers more.", "7–8 घंटे सोएँ। ताज़ा दिमाग ज़्यादा याद रखता है।")}</li>
              </ul>
            </div>
          </section>
        )}
      </PageBody>
    </>
  );
}
