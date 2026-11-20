import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { UploadList } from "../components/Uploads";
import { useUploads } from "../data/uploads";
import { LocationSection } from "../components/LocationSection";
import { PhotoSlideshow } from "../components/PhotoSlideshow";
import { PrincipalAvatar } from "../components/PrincipalAvatar";
import { SchoolGatePicture } from "../components/SchoolGatePicture";
import {
  DistanceList,
  HistoryTimeline,
  ObjectiveCards,
  SchoolPhotoFigure,
} from "../components/SchoolStory";
import {
  BulletList,
  ComingSoonNote,
  InfoGrid,
  Section,
} from "../components/ui";
import {
  ABOUT_CM_SOE,
  ABOUT_CM_SOE_HI,
  admissionGuidelines,
  admissionGuidelinesHi,
  requiredDocuments,
  requiredDocumentsHi,
  STREAMS,
  subjectGroups,
} from "../data/common";
import { samplePrincipalMessage } from "../data/principal";
import {
  classesLabel,
  displayPhone,
  imageUrl,
  mapLink,
  principalLabel,
  schoolAddress,
  schoolAddressHi,
  schoolLevel,
} from "../data/schools";
import { useSchool, useSchoolPath } from "../schoolContext";
import { useLang } from "../i18n";
import { NoticeTicker } from "../components/NoticeTicker";
import { SCHEMES } from "../data/schemes";
import { AI_TOOLS } from "../ai/tools";
import { AiToolCards } from "./ai/AiHubPage";
import { ActivityGrid } from "./ActivitiesPage";
import type { SchoolPhoto } from "../types/school";

// Rolling hills and sal trees along the bottom of the banner.
function Hills() {
  const trees = [6, 11, 15, 63, 68, 72, 88, 93];
  return (
    <svg
      viewBox="0 0 100 12"
      preserveAspectRatio="none"
      className="absolute inset-x-0 bottom-0 h-12 w-full md:h-24"
      aria-hidden
    >
      <path
        d="M0 8 Q12 2 25 6 T50 5 T75 4 T100 6 V12 H0Z"
        fill="#0b3320"
        opacity="0.35"
      />
      {trees.map((x) => (
        <path
          key={x}
          d={`M${x} 9 l1.2 -4 l1.2 4 Z`}
          fill="#0b3320"
          opacity="0.5"
        />
      ))}
      <path d="M0 10 Q20 6 40 9 T80 8 T100 9 V12 H0Z" fill="#f8fafc" />
    </svg>
  );
}

// Puts the banner photo (e.g. the gate) first in the slideshow.
function bannerFirst(photos: SchoolPhoto[], banner?: string): SchoolPhoto[] {
  const first = photos.filter((p) => p.src === banner);
  return [...first, ...photos.filter((p) => p.src !== banner)];
}

function Banner() {
  const school = useSchool();
  const { t } = useLang();
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-brand-800 via-brand-700 to-brand-600 text-white">
      <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:24px_24px]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-6 px-4 pt-6 pb-16 md:grid-cols-2 md:gap-8 md:pt-16 md:pb-32">
        <div>
          <span className="mb-3 inline-block rounded-full bg-white/10 px-3 py-1 text-sm ring-1 ring-white/20">
            🙏 {t("Johar! Welcome", "जोहार! स्वागत है")}
          </span>
          <p className="text-xs font-semibold tracking-wide text-accent-400 uppercase sm:text-sm">
            {t("CM School of Excellence", "मुख्यमंत्री उत्कृष्ट विद्यालय")} · {t(classesLabel(school), `कक्षा ${school.classFrom} से ${school.classTo}`)}
            {school.established ? ` · ${t("Est.", "स्थापना")} ${school.established}` : ""}
          </p>
          <h1 className="mt-2 text-2xl leading-tight font-bold sm:text-3xl md:text-4xl">
            {school.name}
          </h1>
          <p className="mt-3 max-w-xl text-brand-100">
            {t(`Block ${school.block}, District ${school.district}, Jharkhand.`, `प्रखंड ${school.block}, ज़िला ${school.district}, झारखंड।`)}
            <span className="hidden sm:inline">
              {" "}
              {school.story?.objective ?? t(ABOUT_CM_SOE, ABOUT_CM_SOE_HI)}
            </span>
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={`tel:+91${school.hmPhone}`}
              data-tour="call"
              data-hint="क्लिक करें, स्कूल को फ़ोन लगेगा"
              className="relative rounded-md bg-accent-500 px-5 py-2.5 font-semibold text-brand-900 hover:bg-accent-400"
            >
              ☎ {t("Call school", "स्कूल को फ़ोन करें")}
            </a>
            <a
              href="#location"
              data-tour="location"
              data-hint="क्लिक करें, नक्शा और रास्ता देखें"
              className="relative rounded-md border border-white/40 px-5 py-2.5 font-semibold hover:bg-white/10"
            >
              📍 {t("Location", "लोकेशन")}
            </a>
          </div>
        </div>
        <div
          data-tour="photos"
          className="overflow-hidden rounded-lg shadow-xl ring-4 ring-white/20 transition duration-500 hover:rotate-0 md:rotate-1"
        >
          {school.photos?.length ? (
            <PhotoSlideshow
              photos={bannerFirst(school.photos, school.bannerPhoto)}
            />
          ) : school.bannerPhoto ? (
            <img
              src={imageUrl(school.bannerPhoto)}
              alt={`${school.name} main gate`}
              className="block aspect-[16/10] w-full object-cover"
            />
          ) : (
            <SchoolGatePicture
              name={school.name}
              place={`${school.block}, ${school.district}`}
            />
          )}
        </div>
      </div>
      <Hills />
    </div>
  );
}

function Highlights() {
  const school = useSchool();
  const { t } = useLang();
  const items = [
    {
      icon: "🎒",
      label: t("Classes", "कक्षाएँ"),
      value: `${school.classFrom} – ${school.classTo}`,
    },
    { icon: "🗺️", label: t("District", "ज़िला"), value: school.district },
    { icon: "📍", label: t("Block", "प्रखंड"), value: school.block },
    { icon: "🔢", label: "U-DISE", value: school.udise },
    ...(school.established
      ? [
          {
            icon: "🏛️",
            label: t("Established", "स्थापना"),
            value: String(school.established),
          },
        ]
      : []),
    ...(school.totalTeachers
      ? [{ icon: "👩🏽‍🏫", label: t("Teachers", "शिक्षक"), value: String(school.totalTeachers) }]
      : []),
  ];
  return (
    <div className="relative mx-auto -mt-8 max-w-7xl px-4 md:-mt-12">
      <div
        data-tour="highlights"
        className="grid grid-cols-2 gap-px overflow-hidden rounded-lg bg-slate-200 shadow-md sm:grid-cols-3 lg:grid-flow-col lg:grid-cols-none"
      >
        {items.map((h) => (
          <div
            key={h.label}
            className="group bg-white px-3 py-4 text-center transition hover:bg-brand-50 md:px-4 md:py-5"
          >
            <div
              className="text-xl transition group-hover:scale-110 md:text-2xl"
              aria-hidden
            >
              {h.icon}
            </div>
            <div className="mt-1 text-base font-bold break-words text-brand-700 md:text-xl">
              {h.value}
            </div>
            <div className="mt-0.5 text-[11px] font-medium tracking-wide text-slate-500 uppercase md:text-xs">
              {h.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// In-page shortcuts so visitors can jump to any part of this long page.
function JumpLinks({
  hasPhotos,
  hasStory,
}: {
  hasPhotos: boolean;
  hasStory: boolean;
}) {
  const { t } = useLang();
  const links = [
    { id: "principal-desk", label: t("Principal", "प्रधानाध्यापक") },
    ...(hasPhotos ? [{ id: "photos", label: t("Photos", "फ़ोटो") }] : []),
    { id: "about", label: t("About", "परिचय") },
    ...(hasStory ? [{ id: "history", label: t("History", "इतिहास") }] : []),
    { id: "ai-corner", label: t("✨ AI Learning", "✨ AI पढ़ाई") },
    { id: "academics", label: t("Academics", "पढ़ाई") },
    { id: "admissions", label: t("Admissions", "एडमिशन") },
    { id: "schemes", label: t("Schemes", "योजनाएँ") },
    { id: "activities", label: t("Activities", "गतिविधियाँ") },
    { id: "location", label: t("Location", "लोकेशन") },
    { id: "contact", label: t("Contact", "संपर्क") },
  ];
  return (
    <nav
      aria-label="On this page"
      className="mx-auto max-w-7xl px-4 pt-6"
      data-tour="jump-links"
    >
      <ul className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] md:flex-wrap">
        {links.map((l) => (
          <li key={l.id} className="shrink-0">
            <a
              href={`#${l.id}`}
              className="block rounded-full bg-white px-4 py-1.5 text-sm font-medium text-brand-700 ring-1 ring-slate-200 hover:bg-brand-50 hover:ring-brand-600"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function DigitalServices() {
  const { t } = useLang();
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-dashed border-accent-500 bg-amber-50/60 p-5 sm:flex-row sm:items-center">
      <span className="self-start rounded-full bg-accent-500 px-2.5 py-0.5 text-xs font-bold text-brand-900 uppercase sm:self-center">
        {t("Coming soon", "जल्द")}
      </span>
      <div className="flex items-start gap-3">
        <span className="text-2xl" aria-hidden>
          💬
        </span>
        <div>
          <div className="font-semibold text-slate-900">{t("WhatsApp updates", "WhatsApp पर सूचनाएँ")}</div>
          <div className="text-sm text-slate-600">
            {t("Notices, holidays and exam updates for parents on WhatsApp.", "अभिभावकों को WhatsApp पर सूचनाएँ, छुट्टियाँ और परीक्षा की जानकारी।")}
          </div>
        </div>
      </div>
    </div>
  );
}

function MoreLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link
      to={to}
      className="mt-4 inline-block text-sm font-medium text-brand-600 hover:underline"
    >
      {children} →
    </Link>
  );
}

export function HomePage() {
  const school = useSchool();
  const to = useSchoolPath();
  const name = principalLabel(school);
  const { t, lang } = useLang();
  const message = samplePrincipalMessage(school, lang);
  const groups = subjectGroups.filter(
    (g) => g.to >= school.classFrom && g.from <= school.classTo,
  );
  const hasPhotos = Boolean(school.photos?.length);
  const story = school.story;
  const notices = useUploads(school.udise, "notice");

  return (
    <>
      <NoticeTicker />
      <Banner />
      <Highlights />
      <JumpLinks hasPhotos={hasPhotos} hasStory={Boolean(story)} />

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 md:gap-8 md:py-8 lg:grid-cols-3">
        <div className="min-w-0 space-y-6 md:space-y-8 lg:col-span-2">
          <div data-tour="principal">
            <Section title={t("From the Principal's Desk", "प्रधानाध्यापक की कलम से")} id="principal-desk">
              <div className="flex flex-col gap-5 sm:flex-row">
                <div className="flex shrink-0 flex-col items-center text-center sm:w-36">
                  <PrincipalAvatar className="h-24 w-24 ring-4 ring-accent-400" />
                  <span className="mt-1 text-[11px] text-slate-400">
                    {t("Photo coming soon", "फ़ोटो जल्द")}
                  </span>
                  <div className="mt-1 font-semibold text-brand-800">
                    {name}
                  </div>
                  <div className="text-xs text-slate-500">{t("Principal", "प्रधानाध्यापक")}</div>
                  <a
                    href={`tel:+91${school.hmPhone}`}
                    className="mt-1 text-sm text-brand-600 hover:underline"
                  >
                    ☎ {displayPhone(school.hmPhone)}
                  </a>
                </div>
                <div className="min-w-0 flex-1">
                  <blockquote className="space-y-2 border-l-4 border-accent-400 pl-4 text-slate-700 italic">
                    {message.slice(0, 3).map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </blockquote>
                  <p className="mt-2 text-xs text-amber-700">
                    {t("Sample message · the Principal's own message will be added.", "नमूना संदेश · प्रधानाध्यापक का अपना संदेश जोड़ा जाएगा।")}
                  </p>
                  <MoreLink to={to("principal")}>
                    {t("Read the full message", "पूरा संदेश पढ़ें")}
                  </MoreLink>
                </div>
              </div>
            </Section>
          </div>

          <div data-tour="ai">
          <Section
            title={t("✨ AI Learning Corner", "✨ AI से पढ़ाई")}
            id="ai-corner"
            action={
              <Link to={to("ai")} className="text-sm font-medium text-brand-600 hover:underline">
                {t("All tools", "सभी टूल")} →
              </Link>
            }
          >
            <p className="mb-4 text-slate-700">
              {t(
                "Free AI help for students: ask doubts, practise quizzes, plan exam study, practise English and get career guidance, in Hindi and English.",
                "छात्रों के लिए मुफ़्त AI मदद: सवाल पूछें, क्विज़ का अभ्यास करें, परीक्षा की तैयारी का प्लान बनाएँ, अंग्रेज़ी बोलना सीखें और करियर की सलाह लें, हिंदी और अंग्रेज़ी में।",
              )}
            </p>
            <AiToolCards tools={AI_TOOLS.filter((x) => x.group === "students").slice(0, 4)} compact />
          </Section>
          </div>

          {hasPhotos && (
            <Section title={t("Photo Gallery", "फ़ोटो गैलरी")} id="photos">
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                {school.photos!.map((p, i) => (
                  <Link
                    key={p.src}
                    to={to("gallery")}
                    className={`group relative overflow-hidden rounded-lg ring-1 ring-slate-200 ${i === 0 ? "col-span-2 md:col-span-1" : ""}`}
                  >
                    <img
                      src={imageUrl(p.src)}
                      alt={p.caption}
                      loading="lazy"
                      className="aspect-[4/3] w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                    <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-2 pt-6 pb-1.5 text-xs font-medium text-white">
                      {p.caption}
                    </span>
                  </Link>
                ))}
              </div>
              <MoreLink to={to("gallery")}>{t("Open photo gallery", "फ़ोटो गैलरी खोलें")}</MoreLink>
            </Section>
          )}

          <Section title={t("About the School", "स्कूल के बारे में")} id="about">
            {story ? (
              <div className="mb-5 space-y-5">
                <div className="grid gap-5 md:grid-cols-5">
                  <p className="leading-relaxed text-slate-700 md:col-span-3">
                    📍 {story.location}
                  </p>
                  <SchoolPhotoFigure index={0} className="md:col-span-2" />
                </div>
                <ObjectiveCards story={story} />
              </div>
            ) : (
              <p className="mb-4 text-slate-700">{t(ABOUT_CM_SOE, ABOUT_CM_SOE_HI)}</p>
            )}
            <InfoGrid
              items={[
                { label: t("School name", "स्कूल का नाम"), value: school.name },
                { label: t("U-DISE code", "U-DISE कोड"), value: school.udise },
                { label: t("Address", "पता"), value: t(schoolAddress(school), schoolAddressHi(school)) },
                { label: t("School level", "स्तर"), value: schoolLevel(school) },
                { label: t("Classes", "कक्षाएँ"), value: t(classesLabel(school), `कक्षा ${school.classFrom} से ${school.classTo}`) },
                ...(school.established
                  ? [{ label: t("Established", "स्थापना"), value: school.established }]
                  : []),
                ...(school.totalTeachers
                  ? [{ label: t("Teachers", "शिक्षक"), value: school.totalTeachers }]
                  : []),
                { label: t("Principal / HM", "प्रधानाध्यापक"), value: name },
              ]}
            />
            <MoreLink to={to("school-information")}>
              {t("Full school information", "स्कूल की पूरी जानकारी")}
            </MoreLink>
          </Section>

          {story && (
            <Section title={t("Our Journey since 1957", "1957 से हमारी यात्रा")} id="history">
              <div className="grid gap-6 md:grid-cols-5">
                <div className="md:col-span-3">
                  <HistoryTimeline history={story.history} />
                </div>
                <div className="space-y-4 md:col-span-2">
                  <SchoolPhotoFigure index={1} />
                  <SchoolPhotoFigure index={3} className="hidden md:block" />
                </div>
              </div>
              <MoreLink to={to("about")}>{t("Read more about the school", "स्कूल के बारे में और पढ़ें")}</MoreLink>
            </Section>
          )}

          <Section title={t("Academics", "पढ़ाई")} id="academics">
            <ul className="divide-y divide-slate-100">
              {groups.map((g) => (
                <li
                  key={g.from}
                  className="flex flex-col gap-1 py-2.5 sm:flex-row sm:gap-4"
                >
                  <span className="w-28 shrink-0 font-semibold text-brand-800">
                    {t("Class", "कक्षा")} {Math.max(g.from, school.classFrom)}–
                    {Math.min(g.to, school.classTo)}
                  </span>
                  <span className="text-sm text-slate-700">
                    {g.subjects.join(", ")}
                  </span>
                </li>
              ))}
            </ul>
            {school.classTo >= 12 && (
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium text-slate-600">
                  {t("Streams (Class 11–12):", "संकाय (कक्षा 11–12):")}
                </span>
                {STREAMS.map((s) => (
                  <span
                    key={s}
                    className="rounded-full bg-brand-50 px-3 py-1 text-sm font-medium text-brand-700"
                  >
                    {s}
                  </span>
                ))}
              </div>
            )}
            <div className="mt-4">
              <ComingSoonNote text={t("Academic calendar, exam schedule and syllabus will be published soon.", "शैक्षणिक कैलेंडर, परीक्षा कार्यक्रम और पाठ्यक्रम जल्द प्रकाशित होंगे।")} />
            </div>
            <MoreLink to={to("academics")}>{t("Academics page", "पढ़ाई का पेज")}</MoreLink>
          </Section>

          <Section title={t("Admissions", "एडमिशन")} id="admissions">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="min-w-0">
                <h3 className="mb-2 text-sm font-semibold tracking-wide text-slate-500 uppercase">
                  {t("Guidelines", "दिशानिर्देश")}
                </h3>
                <BulletList items={(lang === "hi" ? admissionGuidelinesHi : admissionGuidelines).slice(0, 4)} />
              </div>
              <div className="min-w-0">
                <h3 className="mb-2 text-sm font-semibold tracking-wide text-slate-500 uppercase">
                  {t("Documents usually required", "आमतौर पर ज़रूरी कागज़ात")}
                </h3>
                <BulletList items={lang === "hi" ? requiredDocumentsHi : requiredDocuments} />
              </div>
            </div>
            <p className="mt-4 rounded-md bg-brand-50 p-3 text-sm text-brand-800">
              {t("For admission enquiries, call the school:", "एडमिशन की जानकारी के लिए स्कूल को फ़ोन करें:")}{" "}
              <a
                href={`tel:+91${school.hmPhone}`}
                className="font-semibold underline"
              >
                {displayPhone(school.hmPhone)}
              </a>
            </p>
          </Section>

          <Section title={t("Government Welfare Schemes", "सरकारी कल्याण योजनाएँ")} id="schemes">
            <div className="grid gap-3 sm:grid-cols-2">
              {SCHEMES.filter((s) => s.classTo >= school.classFrom && s.classFrom <= school.classTo)
                .slice(0, 8)
                .map((s) => (
                  <div key={s.id} className="flex items-start gap-3 rounded-md border border-slate-200 p-3">
                    <span className="text-xl" aria-hidden>
                      {s.icon}
                    </span>
                    <div>
                      <div className="font-medium text-brand-800">{t(s.name.en, s.name.hi)}</div>
                      <div className="text-sm text-slate-600">{t(s.benefit.en, s.benefit.hi)}</div>
                    </div>
                  </div>
                ))}
            </div>
            <MoreLink to={to("schemes")}>{t("Find schemes for your class", "अपनी कक्षा की योजनाएँ खोजें")}</MoreLink>
          </Section>

          <Section title={t("Co-curricular Activities", "सह-पाठ्यक्रम गतिविधियाँ")} id="activities">
            <ActivityGrid limit={6} />
            <MoreLink to={to("activities")}>{t("All activities", "सभी गतिविधियाँ")}</MoreLink>
          </Section>

          <Section title={t("Latest Notices & Circulars", "ताज़ा सूचनाएँ व परिपत्र")} id="notices">
            <UploadList items={notices.slice(0, 3)} empty={t("No notices yet. Add a new notice on the Notices page.", "अभी कोई सूचना नहीं है। सूचना पेज पर नई सूचना जोड़ें।")} compact />
            <MoreLink to={to("notices")}>{t("All notices", "सभी सूचनाएँ")}</MoreLink>
          </Section>
        </div>

        <aside className="min-w-0 space-y-6 md:space-y-8">
          <Section title={t("Hon'ble Chief Minister", "माननीय मुख्यमंत्री")}>
            <div className="flex items-center gap-4">
              <img
                src={imageUrl("hemant-soren.jpg")}
                alt="Shri Hemant Soren"
                width={96}
                height={96}
                className="h-20 w-20 shrink-0 rounded-full object-cover ring-4 ring-accent-400 md:h-24 md:w-24"
              />
              <div>
                <div className="font-semibold text-brand-800">
                  Shri Hemant Soren
                </div>
                <div className="text-sm text-slate-600">
                  Hon'ble Chief Minister, Jharkhand
                </div>
                <div className="text-sm text-slate-500">
                  माननीय मुख्यमंत्री, झारखंड
                </div>
              </div>
            </div>
          </Section>

          <Section title={t("Contact the School", "स्कूल से संपर्क")} id="contact">
            <div className="space-y-3 text-sm text-slate-700">
              <a
                href={`tel:+91${school.hmPhone}`}
                className="flex items-center justify-center gap-2 rounded-md bg-brand-700 px-4 py-3 text-base font-semibold text-white hover:bg-brand-800"
              >
                ☎ {displayPhone(school.hmPhone)}
              </a>
              <a
                href={mapLink(school)}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-md border border-brand-600 px-4 py-2.5 font-semibold text-brand-700 hover:bg-brand-50"
              >
                📍 {t("Get directions", "रास्ता देखें")}
              </a>
              <p>
                <span className="font-medium">{t("Address:", "पता:")}</span>{" "}
                {t(schoolAddress(school), schoolAddressHi(school))}
              </p>
              <p>
                <span className="font-medium">{t("Principal:", "प्रधानाध्यापक:")}</span> {name}
              </p>
              <p>
                <span className="font-medium">U-DISE:</span> {school.udise}
              </p>
            </div>
          </Section>

          {story && (
            <Section title={t("How to Reach", "कैसे पहुँचें")}>
              <DistanceList distances={story.distances} />
            </Section>
          )}

          {hasPhotos && (
            <Section title={t("Life on Campus", "परिसर की झलक")}>
              <div className="space-y-3">
                <SchoolPhotoFigure index={2} />
                <SchoolPhotoFigure index={4} />
              </div>
            </Section>
          )}

          <div data-tour="updates">
            <Section title={t("Notices, Results & Downloads", "सूचना, रिज़ल्ट व डाउनलोड")}>
              <ul className="space-y-2 text-sm">
                {[
                  ["notices", "📢", "Notices & Circulars", "सूचनाएँ"],
                  ["results", "🏆", "Results & Achievements", "रिज़ल्ट"],
                  ["downloads", "⬇", "Downloads", "फ़ॉर्म डाउनलोड"],
                  ["gallery", "🖼", "Photo Gallery", "फ़ोटो"],
                ].map(([path, icon, label, hi]) => (
                  <li key={path}>
                    <Link
                      to={to(path)}
                      className="flex items-center gap-3 rounded-md px-2 py-2 text-brand-800 ring-1 ring-slate-200 hover:bg-brand-50 hover:ring-brand-600"
                    >
                      <span className="text-lg" aria-hidden>
                        {icon}
                      </span>
                      <span className="flex-1">
                        <span className="block font-medium">{t(label, hi)}</span>
                        <span className="block text-xs text-slate-500">{t("View and upload", "देखें और अपलोड करें")}</span>
                      </span>
                      <span aria-hidden>›</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Section>
          </div>
        </aside>
      </div>

      <div className="mx-auto max-w-7xl space-y-6 px-4 pb-6 md:space-y-8">
        <LocationSection />
        <DigitalServices />
      </div>
    </>
  );
}
