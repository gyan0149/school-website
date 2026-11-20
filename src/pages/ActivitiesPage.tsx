import { Link } from "react-router-dom";
import { SchoolPageHeader } from "../components/SchoolPageHeader";
import { PageBody, Section } from "../components/ui";
import { ACTIVITIES, SCHOOL_DAYS } from "../data/activities";
import { useLang } from "../i18n";
import { useSchoolPath } from "../schoolContext";

export function ActivityGrid({ limit }: { limit?: number }) {
  const { t } = useLang();
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {ACTIVITIES.slice(0, limit).map((a) => (
        <li key={a.name.en} className="flex items-start gap-3 rounded-lg bg-white p-3 ring-1 ring-slate-200">
          <span className="text-2xl" aria-hidden>
            {a.icon}
          </span>
          <div>
            <div className="font-semibold text-brand-800">{t(a.name.en, a.name.hi)}</div>
            <div className="text-sm text-slate-600">{t(a.text.en, a.text.hi)}</div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function ActivitiesPage() {
  const { t } = useLang();
  const to = useSchoolPath();
  return (
    <>
      <SchoolPageHeader title={t("Co-curricular Activities", "सह-पाठ्यक्रम गतिविधियाँ")} subtitle={t("Learning beyond the classroom", "कक्षा से बाहर की सीख")} />
      <PageBody>
        <Section title={t("Activities for students", "छात्रों के लिए गतिविधियाँ")}>
          <p className="mb-4 text-slate-700">
            {t(
              "CM Schools of Excellence encourage every child to take part in sports, arts, clubs and leadership activities along with studies.",
              "मुख्यमंत्री उत्कृष्ट विद्यालय हर बच्चे को पढ़ाई के साथ खेल, कला, क्लब और नेतृत्व की गतिविधियों में भाग लेने के लिए प्रोत्साहित करते हैं।",
            )}
          </p>
          <ActivityGrid />
        </Section>
        <div className="grid gap-6 md:grid-cols-2">
          <Section title={t("Important days we celebrate", "हम ये दिवस मनाते हैं")}>
            <ul className="divide-y divide-slate-100">
              {SCHOOL_DAYS.map((d) => (
                <li key={d.name.en} className="flex items-center justify-between gap-3 py-2.5 text-sm">
                  <span className="text-slate-800">{t(d.name.en, d.name.hi)}</span>
                  <span className="shrink-0 rounded bg-brand-50 px-2 py-0.5 text-xs font-semibold text-brand-700">{t(d.date.en, d.date.hi)}</span>
                </li>
              ))}
            </ul>
          </Section>
          <Section title={t("Photos of our activities", "हमारी गतिविधियों की फ़ोटो")}>
            <p className="text-slate-700">
              {t(
                "Photos of sports day, functions and competitions at this school are added to the photo gallery.",
                "इस स्कूल के खेल दिवस, समारोह और प्रतियोगिताओं की फ़ोटो फ़ोटो गैलरी में जोड़ी जाती हैं।",
              )}
            </p>
            <Link to={to("gallery")} className="mt-3 inline-block rounded-md bg-brand-700 px-4 py-2.5 font-semibold text-white hover:bg-brand-800">
              🖼 {t("Open photo gallery", "फ़ोटो गैलरी खोलें")}
            </Link>
          </Section>
        </div>
      </PageBody>
    </>
  );
}
