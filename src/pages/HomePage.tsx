import { Link } from "react-router-dom";
import { NoticeCard } from "../components/NoticeCard";
import { PhotoPlaceholder, Section } from "../components/ui";
import { achievements, gallery, highlights, notices, principalMessage, quickLinks, school } from "../data/schoolData";

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

const HIGHLIGHT_ICONS: Record<string, string> = {
  Established: "🏛️",
  Classes: "🎒",
  Students: "👧🏽",
  Teachers: "👩🏽‍🏫",
  Streams: "🔬",
  Board: "🎓",
};

function Banner() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-brand-800 via-brand-700 to-brand-600 text-white">
      <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:24px_24px]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-4 pt-12 pb-24 md:grid-cols-2 md:pt-16 md:pb-32">
        <div>
          <span className="mb-3 inline-block rounded-full bg-white/10 px-3 py-1 text-sm ring-1 ring-white/20">🙏 Johar! Welcome</span>
          <p className="text-sm font-semibold tracking-wide text-accent-400 uppercase">
            Est. {school.established} · {school.type} · {school.category}
          </p>
          <h1 className="mt-2 text-3xl leading-tight font-bold md:text-4xl">Welcome to {school.name}</h1>
          <p className="mt-4 max-w-xl text-brand-100">{school.vision}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/admissions" className="rounded-md bg-accent-500 px-5 py-2.5 font-semibold text-brand-900 hover:bg-accent-400">
              Admissions 2027–28
            </Link>
            <Link to="/about" className="rounded-md border border-white/40 px-5 py-2.5 font-semibold hover:bg-white/10">
              About the school
            </Link>
          </div>
        </div>
        <div className="overflow-hidden rounded-lg shadow-xl ring-4 ring-white/20 transition duration-500 hover:rotate-0 md:rotate-1">
          <PhotoPlaceholder label="School building (photo to be added)" seed={1} className="aspect-[16/10]" />
        </div>
      </div>
      <Hills />
    </div>
  );
}

function Highlights() {
  return (
    <div className="relative mx-auto -mt-12 max-w-7xl px-4">
      <div className="relative grid grid-cols-2 gap-px overflow-hidden rounded-lg bg-slate-200 shadow-md sm:grid-cols-3 lg:grid-cols-6">
        {highlights.map((h) => (
          <div key={h.label} className="group bg-white px-4 py-5 text-center transition hover:bg-brand-50">
            <div className="text-2xl transition group-hover:scale-110" aria-hidden>
              {HIGHLIGHT_ICONS[h.label]}
            </div>
            <div className="mt-1 text-2xl font-bold text-brand-700">{h.value}</div>
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

function ComingSoon() {
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
  const latestNotices = notices.filter((n) => n.status === "active").slice(0, 5);
  return (
    <>
      <Banner />
      <Highlights />
      <ComingSoon />
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <Section
            title="Latest Notices & Circulars"
            action={
              <Link to="/notices" className="text-sm font-medium text-brand-600 hover:underline">
                View all →
              </Link>
            }
          >
            <div className="-my-4 divide-y divide-slate-100">
              {latestNotices.map((n) => (
                <NoticeCard key={n.id} notice={n} />
              ))}
            </div>
          </Section>

          <Section
            title="Photo Gallery"
            action={
              <Link to="/gallery" className="text-sm font-medium text-brand-600 hover:underline">
                View all →
              </Link>
            }
          >
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {gallery.slice(4, 12).filter((_, i) => i % 2 === 0).map((g, i) => (
                <div key={g.id} className="overflow-hidden rounded-md">
                  <PhotoPlaceholder label={g.title} seed={i + 1} imageUrl={g.imageUrl} />
                </div>
              ))}
            </div>
          </Section>
        </div>

        <aside className="space-y-8">
          <Section title="Important Links">
            <div className="grid grid-cols-2 gap-3">
              {quickLinks.map((l) => {
                const cls =
                  "flex flex-col items-center gap-1 rounded-md border border-slate-200 p-3 text-center text-sm font-medium text-brand-800 transition hover:-translate-y-0.5 hover:border-accent-500 hover:bg-amber-50 hover:shadow-sm";
                const content = (
                  <>
                    <span className="text-2xl" aria-hidden>
                      {l.icon}
                    </span>
                    {l.label}
                  </>
                );
                return l.external ? (
                  <a key={l.label} href={l.to} target="_blank" rel="noreferrer" className={cls}>
                    {content}
                  </a>
                ) : (
                  <Link key={l.label} to={l.to} className={cls}>
                    {content}
                  </Link>
                );
              })}
            </div>
          </Section>

          <Section title="Principal's Message">
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xl font-bold text-brand-700">
                {principalMessage.name.replace(/^(Shri|Smt|Dr)\.?\s+/, "").split(" ").map((p) => p[0]).join("").slice(0, 2)}
              </div>
              <div>
                <div className="font-semibold">{principalMessage.name}</div>
                <div className="text-sm text-slate-500">{principalMessage.designation}</div>
              </div>
            </div>
            <div className="mt-4 space-y-2 text-sm text-slate-700 italic">
              {principalMessage.message.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <Link to="/principal" className="mt-3 inline-block text-sm font-medium text-brand-600 hover:underline">
              About the Principal →
            </Link>
          </Section>

          <Section title="Recent Achievements">
            <ul className="space-y-3">
              {achievements.slice(0, 3).map((a) => (
                <li key={a.title} className="text-sm">
                  <span className="font-medium text-slate-900">{a.title}</span>
                  <span className="text-slate-500"> · {a.year}</span>
                </li>
              ))}
            </ul>
            <Link to="/results" className="mt-3 inline-block text-sm font-medium text-brand-600 hover:underline">
              Results & achievements →
            </Link>
          </Section>
        </aside>
      </div>
    </>
  );
}
