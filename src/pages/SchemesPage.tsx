import { useState } from "react";
import { Link } from "react-router-dom";
import { SchoolPageHeader } from "../components/SchoolPageHeader";
import { PageBody, Section } from "../components/ui";
import { SCHEME_DOCUMENTS, SCHEMES, type Category, type WelfareScheme } from "../data/schemes";
import { useLang } from "../i18n";
import { useSchool, useSchoolPath } from "../schoolContext";

const CATEGORIES: { value: Category; en: string; hi: string }[] = [
  { value: "General", en: "General", hi: "सामान्य" },
  { value: "SC", en: "SC", hi: "अनुसूचित जाति (SC)" },
  { value: "ST", en: "ST", hi: "अनुसूचित जनजाति (ST)" },
  { value: "OBC", en: "OBC", hi: "पिछड़ा वर्ग (OBC)" },
  { value: "Minority", en: "Minority", hi: "अल्पसंख्यक" },
];

function eligible(s: WelfareScheme, cls: number, girl: boolean, cat: Category): boolean {
  if (cls < s.classFrom || cls > s.classTo) return false;
  if (s.girlsOnly && !girl) return false;
  if (s.categories && !s.categories.includes(cat)) return false;
  return true;
}

export function SchemeCard({ s }: { s: WelfareScheme }) {
  const { t } = useLang();
  return (
    <li className="flex flex-col rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
      <div className="flex items-start gap-3">
        <span className="text-2xl" aria-hidden>
          {s.icon}
        </span>
        <div className="min-w-0">
          <h3 className="font-semibold text-brand-800">{t(s.name.en, s.name.hi)}</h3>
          <p className="mt-1 text-sm text-slate-700">{t(s.benefit.en, s.benefit.hi)}</p>
        </div>
      </div>
      <dl className="mt-3 space-y-1.5 text-sm">
        <div>
          <dt className="inline font-medium text-slate-500">{t("Who: ", "किसके लिए: ")}</dt>
          <dd className="inline text-slate-700">{t(s.who.en, s.who.hi)}</dd>
        </div>
        <div>
          <dt className="inline font-medium text-slate-500">{t("How: ", "कैसे मिलेगा: ")}</dt>
          <dd className="inline text-slate-700">{t(s.how.en, s.how.hi)}</dd>
        </div>
      </dl>
      {s.link && (
        <a href={s.link} target="_blank" rel="noreferrer" className="mt-3 self-start text-sm font-medium text-brand-600 hover:underline">
          {t("Official website", "आधिकारिक वेबसाइट")} ↗
        </a>
      )}
    </li>
  );
}

export function SchemesPage() {
  const school = useSchool();
  const to = useSchoolPath();
  const { t } = useLang();
  const [cls, setCls] = useState(school.classFrom <= 8 && school.classTo >= 8 ? 8 : school.classFrom);
  const [girl, setGirl] = useState(false);
  const [cat, setCat] = useState<Category>("General");
  const [showAll, setShowAll] = useState(false);
  const classes = Array.from({ length: 13 }, (_, i) => i + 1);
  const matches = SCHEMES.filter((s) => eligible(s, cls, girl, cat));
  const shown = showAll ? SCHEMES : matches;
  const select = "w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-base focus:border-brand-600 focus:ring-2 focus:ring-brand-100 focus:outline-none";

  return (
    <>
      <SchoolPageHeader title={t("Government Welfare Schemes", "सरकारी कल्याण योजनाएँ")} subtitle={t("Free facilities and scholarships for students", "छात्रों के लिए मुफ़्त सुविधाएँ और छात्रवृत्तियाँ")} />
      <PageBody>
        <Section title={t("🔎 Find schemes for you", "🔎 अपने लिए योजना खोजें")}>
          <div className="grid gap-4 sm:grid-cols-3">
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-slate-700">{t("Class", "कक्षा")}</span>
              <select value={cls} onChange={(e) => setCls(Number(e.target.value))} className={select}>
                {classes.map((c) => (
                  <option key={c} value={c}>
                    {c === 13 ? t("After Class 12 (college)", "12वीं के बाद (कॉलेज)") : t(`Class ${c}`, `कक्षा ${c}`)}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-slate-700">{t("Category", "वर्ग")}</span>
              <select value={cat} onChange={(e) => setCat(e.target.value as Category)} className={select}>
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>
                    {t(c.en, c.hi)}
                  </option>
                ))}
              </select>
            </label>
            <fieldset>
              <legend className="mb-1 block text-sm font-medium text-slate-700">{t("Student", "छात्र")}</legend>
              <div className="flex gap-2">
                {[
                  [false, t("Boy", "लड़का")],
                  [true, t("Girl", "लड़की")],
                ].map(([v, label]) => (
                  <button
                    key={String(v)}
                    type="button"
                    onClick={() => setGirl(v as boolean)}
                    aria-pressed={girl === v}
                    className={`flex-1 rounded-md px-3 py-2.5 font-medium ring-1 ${girl === v ? "bg-brand-700 text-white ring-brand-700" : "bg-white text-slate-700 ring-slate-300"}`}
                  >
                    {label as string}
                  </button>
                ))}
              </div>
            </fieldset>
          </div>
          <p className="mt-4 rounded-md bg-green-50 px-3 py-2 text-sm font-medium text-green-800">
            {t(`${matches.length} schemes may be available for you.`, `आपके लिए ${matches.length} योजनाएँ हो सकती हैं।`)}{" "}
            <button type="button" onClick={() => setShowAll((v) => !v)} className="underline">
              {showAll ? t("Show only mine", "सिर्फ़ मेरी दिखाएँ") : t("Show all schemes", "सभी योजनाएँ दिखाएँ")}
            </button>
          </p>
        </Section>

        <ul className="grid gap-4 md:grid-cols-2">
          {shown.map((s) => (
            <SchemeCard key={s.id} s={s} />
          ))}
        </ul>

        <div className="grid gap-6 md:grid-cols-2">
          <Section title={t("Documents usually needed", "आमतौर पर ज़रूरी कागज़ात")}>
            <ul className="list-disc space-y-1.5 pl-5 text-slate-700 marker:text-accent-500">
              {SCHEME_DOCUMENTS.map((d) => (
                <li key={d.en}>{t(d.en, d.hi)}</li>
              ))}
            </ul>
          </Section>
          <Section title={t("Have a question?", "कोई सवाल है?")}>
            <p className="text-slate-700">
              {t(
                "Ask the AI scholarship helper in Hindi or English, or contact the school office.",
                "AI छात्रवृत्ति सहायक से हिंदी या अंग्रेज़ी में पूछें, या स्कूल कार्यालय से संपर्क करें।",
              )}
            </p>
            <Link to={to("ai/scholarship")} className="mt-3 inline-block rounded-md bg-brand-700 px-4 py-2.5 font-semibold text-white hover:bg-brand-800">
              ✨ {t("Ask AI", "AI से पूछें")}
            </Link>
          </Section>
        </div>

        <p className="text-sm text-slate-500">
          {t(
            "Amounts, income limits and dates change every year. Always check the official portal or ask the school before applying.",
            "राशि, आय सीमा और तारीखें हर साल बदल सकती हैं। आवेदन से पहले आधिकारिक पोर्टल देखें या स्कूल से पूछें।",
          )}
        </p>
      </PageBody>
    </>
  );
}
