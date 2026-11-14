import { Link } from "react-router-dom";
import { SchoolGatePicture } from "../components/SchoolGatePicture";
import { ComingSoonNote, Section } from "../components/ui";
import { ABOUT_CM_SOE } from "../data/common";
import { classesLabel, displayPhone, principalLabel } from "../data/schools";
import { useSchool, useSchoolPath } from "../schoolContext";

// Rolling hills and sal trees along the bottom of the banner.
function Hills() {
  const trees = [6, 11, 15, 63, 68, 72, 88, 93];
  return (
    <svg viewBox="0 0 100 12" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-16 w-full md:h-24" aria-hidden>
      <path d="M0 8 Q12 2 25 6 T50 5 T75 4 T100 6 V12 H0Z" fill="#0b3320" opacity="0.35" />
      {trees.map((x) => (
        <path key={x} d={`M${x} 9 l1.2 -4 l1.2 4 Z`} fill="#0b3320" opacity="0.5" />
      ))}
      <path d="M0 10 Q20 6 40 9 T80 8 T100 9 V12 H0Z" fill="#f8fafc" />
    </svg>
  );
}

function Banner() {
  const school = useSchool();
  const to = useSchoolPath();
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-brand-800 via-brand-700 to-brand-600 text-white">
      <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:24px_24px]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-4 pt-12 pb-24 md:grid-cols-2 md:pt-16 md:pb-32">
        <div>
          <span className="mb-3 inline-block rounded-full bg-white/10 px-3 py-1 text-sm ring-1 ring-white/20">🙏 Johar! Welcome</span>
          <p className="text-sm font-semibold tracking-wide text-accent-400 uppercase">
            CM School of Excellence · {classesLabel(school)}
            {school.established ? ` · Est. ${school.established}` : ""}
          </p>
          <h1 className="mt-2 text-3xl leading-tight font-bold md:text-4xl">{school.name}</h1>
          <p className="mt-4 max-w-xl text-brand-100">
            Block {school.block}, District {school.district}, Jharkhand. {ABOUT_CM_SOE}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to={to("admissions")} className="rounded-md bg-accent-500 px-5 py-2.5 font-semibold text-brand-900 hover:bg-accent-400">
              Admissions
            </Link>
            <Link to={to("contact")} className="rounded-md border border-white/40 px-5 py-2.5 font-semibold hover:bg-white/10">
              Contact & location
            </Link>
          </div>
        </div>
        <div className="overflow-hidden rounded-lg shadow-xl ring-4 ring-white/20 transition duration-500 hover:rotate-0 md:rotate-1">
          <SchoolGatePicture name={school.name} place={`${school.block}, ${school.district}`} />
        </div>
      </div>
      <Hills />
    </div>
  );
}

function Highlights() {
  const school = useSchool();
  const items = [
    { icon: "🎒", label: "Classes", value: `${school.classFrom} – ${school.classTo}` },
    { icon: "🗺️", label: "District", value: school.district },
    { icon: "📍", label: "Block", value: school.block },
    { icon: "🔢", label: "U-DISE", value: school.udise },
    ...(school.established ? [{ icon: "🏛️", label: "Established", value: String(school.established) }] : []),
    ...(school.totalTeachers ? [{ icon: "👩🏽‍🏫", label: "Teachers", value: String(school.totalTeachers) }] : []),
  ];
  return (
    <div className="relative mx-auto -mt-12 max-w-7xl px-4">
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg bg-slate-200 shadow-md sm:grid-cols-3 lg:grid-flow-col lg:grid-cols-none">
        {items.map((h) => (
          <div key={h.label} className="group bg-white px-4 py-5 text-center transition hover:bg-brand-50">
            <div className="text-2xl transition group-hover:scale-110" aria-hidden>
              {h.icon}
            </div>
            <div className="mt-1 text-lg font-bold break-words text-brand-700 md:text-xl">{h.value}</div>
            <div className="mt-1 text-xs font-medium tracking-wide text-slate-500 uppercase">{h.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const UPCOMING_FEATURES = [
  { icon: "🤖", title: "AI help assistant", text: "Answers to common questions in Hindi and English." },
  { icon: "💬", title: "WhatsApp updates", text: "Notices, holidays and exam updates for parents on WhatsApp." },
];

function DigitalServices() {
  return (
    <div className="mx-auto max-w-7xl px-4 pt-8">
      <div className="flex flex-col gap-4 rounded-xl border border-dashed border-accent-500 bg-amber-50/60 p-5 md:flex-row md:items-center">
        <div className="shrink-0">
          <span className="rounded-full bg-accent-500 px-2.5 py-0.5 text-xs font-bold text-brand-900 uppercase">Coming soon</span>
          <p className="mt-2 font-semibold text-brand-800">New digital services</p>
        </div>
        <ul className="grid flex-1 gap-3 sm:grid-cols-2">
          {UPCOMING_FEATURES.map((f) => (
            <li key={f.title} className="flex items-start gap-3 rounded-lg bg-white p-3 ring-1 ring-amber-200">
              <span className="text-2xl" aria-hidden>
                {f.icon}
              </span>
              <div>
                <div className="text-sm font-semibold text-slate-900">{f.title}</div>
                <div className="text-sm text-slate-600">{f.text}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function HomePage() {
  const school = useSchool();
  const to = useSchoolPath();
  const quickLinks = [
    { label: "Admissions", path: "admissions", icon: "📝" },
    { label: "Academics", path: "academics", icon: "📚" },
    { label: "School Information", path: "school-information", icon: "🏫" },
    { label: "Principal", path: "principal", icon: "👤" },
    { label: "Location", path: "contact", icon: "📍" },
    { label: "Contact Us", path: "contact", icon: "☎️" },
  ];
  const name = principalLabel(school);
  const initials = school.hmName
    ? school.hmName.replace(/^(Dr|Md)\.?\s+/i, "").split(" ").map((p) => p[0]).join("").slice(0, 2)
    : "HM";

  return (
    <>
      <Banner />
      <Highlights />
      <DigitalServices />
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <Section title="Latest Notices & Circulars">
            <ComingSoonNote text="School notices, holidays and circulars will be published here." />
          </Section>
          <Section title="About the School">
            <p className="text-slate-700">
              <strong>{school.name}</strong> is a CM School of Excellence in Block {school.block}, District {school.district},
              Jharkhand, with classes from {school.classFrom} to {school.classTo}.
              {school.established ? ` The school was established in ${school.established}.` : ""}
            </p>
            <Link to={to("about")} className="mt-3 inline-block text-sm font-medium text-brand-600 hover:underline">
              Read more →
            </Link>
          </Section>
        </div>

        <aside className="space-y-8">
          <Section title="Principal">
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xl font-bold text-brand-700">
                {initials}
              </div>
              <div>
                <div className="font-semibold">{name}</div>
                <a href={`tel:+91${school.hmPhone}`} className="text-sm text-brand-600 hover:underline">
                  ☎ {displayPhone(school.hmPhone)}
                </a>
              </div>
            </div>
          </Section>
          <Section title="Important Links">
            <div className="grid grid-cols-2 gap-3">
              {quickLinks.map((l) => (
                <Link
                  key={l.label}
                  to={to(l.path)}
                  className="flex flex-col items-center gap-1 rounded-md border border-slate-200 p-3 text-center text-sm font-medium text-brand-800 transition hover:-translate-y-0.5 hover:border-accent-500 hover:bg-amber-50 hover:shadow-sm"
                >
                  <span className="text-2xl" aria-hidden>
                    {l.icon}
                  </span>
                  {l.label}
                </Link>
              ))}
            </div>
          </Section>
        </aside>
      </div>
    </>
  );
}
