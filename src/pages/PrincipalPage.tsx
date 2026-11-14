import { SchoolPageHeader } from "../components/SchoolPageHeader";
import { ComingSoonNote, PageBody, Section } from "../components/ui";
import { PrincipalAvatar } from "../components/PrincipalAvatar";
import { HistoryTimeline, ObjectiveCards, SchoolPhotoFigure } from "../components/SchoolStory";
import { PRINCIPAL_PRIORITIES, samplePrincipalMessage } from "../data/principal";
import { displayPhone, principalLabel } from "../data/schools";
import { useSchool } from "../schoolContext";

function SampleTag() {
  return (
    <span
      title="To be replaced with the Principal's own words"
      className="shrink-0 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap text-amber-800 ring-1 ring-amber-200"
    >
      Sample text
    </span>
  );
}

export function PrincipalPage() {
  const school = useSchool();
  const name = principalLabel(school);

  return (
    <>
      <SchoolPageHeader title="Principal's Desk" subtitle={school.name} />
      <PageBody>
        {/* Profile band */}
        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="grid gap-6 bg-gradient-to-r from-brand-800 to-brand-600 p-6 text-white md:grid-cols-[auto_1fr_auto] md:items-center">
            <div className="flex flex-col items-center gap-2">
              <PrincipalAvatar className="h-32 w-32 ring-4 ring-accent-400" />
              <span className="text-xs text-brand-100">Photo coming soon</span>
            </div>
            <div className="text-center md:text-left">
              <p className="text-sm font-semibold tracking-wide text-accent-400 uppercase">Principal / Headmaster</p>
              <h2 className="text-2xl font-bold md:text-3xl">{name}</h2>
              <p className="mt-1 text-brand-100">{school.name}</p>
              <p className="text-sm text-brand-100">
                Block {school.block}, District {school.district}, Jharkhand
              </p>
            </div>
            <div className="flex flex-col items-center gap-2 rounded-lg bg-white/10 p-4 ring-1 ring-white/20 md:items-start">
              <span className="text-xs tracking-wide text-brand-100 uppercase">Contact</span>
              <a href={`tel:+91${school.hmPhone}`} className="text-xl font-semibold hover:underline">
                ☎ {displayPhone(school.hmPhone)}
              </a>
              <span className="text-xs text-brand-100">Please call before visiting</span>
            </div>
          </div>
        </section>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Message, styled as a letter */}
          <div className="lg:col-span-2">
            <Section title="From the Principal's Desk" action={<SampleTag />}>
              <article className="relative rounded-lg bg-amber-50/50 p-6 ring-1 ring-amber-100">
                <span className="absolute top-2 left-4 font-serif text-6xl leading-none text-accent-400/60" aria-hidden>
                  “
                </span>
                <p className="mt-6 font-semibold text-brand-800">Dear students and parents,</p>
                <div className="mt-3 space-y-3 leading-relaxed text-slate-700">
                  {samplePrincipalMessage(school).map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
                <div className="mt-6 border-t border-amber-200 pt-4">
                  <p className="text-slate-600">With best wishes,</p>
                  <p className="mt-1 text-lg font-semibold text-brand-800">{name}</p>
                  <p className="text-sm text-slate-600">Principal, {school.name}</p>
                </div>
              </article>
            </Section>
          </div>

          <aside className="space-y-8">
            <Section title="Meet the Principal">
              <ul className="space-y-3 text-sm text-slate-700">
                <li className="flex gap-3">
                  <span aria-hidden>🗓️</span>
                  <span>Parents can meet the Principal on school working days.</span>
                </li>
                <li className="flex gap-3">
                  <span aria-hidden>☎</span>
                  <span>
                    Call{" "}
                    <a href={`tel:+91${school.hmPhone}`} className="font-medium text-brand-600 hover:underline">
                      {displayPhone(school.hmPhone)}
                    </a>{" "}
                    to fix a time.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span aria-hidden>📍</span>
                  <span>
                    {school.name}, Block {school.block}, {school.district}
                  </span>
                </li>
              </ul>
            </Section>
            <Section title="Profile">
              <ComingSoonNote text="Qualifications, experience and achievements of the Principal will be added here." />
            </Section>
            {school.photos?.length ? (
              <Section title="Our Campus">
                <SchoolPhotoFigure index={1} />
              </Section>
            ) : null}
          </aside>
        </div>

        {school.story && (
          <>
            <Section title="Our Objective & Commitment">
              <ObjectiveCards story={school.story} />
            </Section>
            <Section title={`Our Journey since ${school.established}`}>
              <div className="grid gap-6 md:grid-cols-5">
                <div className="md:col-span-3">
                  <HistoryTimeline history={school.story.history} />
                </div>
                <SchoolPhotoFigure index={4} className="self-start md:col-span-2" />
              </div>
            </Section>
          </>
        )}

        <Section title="Our Priorities" action={<SampleTag />}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PRINCIPAL_PRIORITIES.map((p) => (
              <div key={p.title} className="rounded-lg border border-slate-200 p-4 transition hover:border-accent-500 hover:shadow-sm">
                <div className="text-2xl" aria-hidden>
                  {p.icon}
                </div>
                <h3 className="mt-2 font-semibold text-brand-800">{p.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{p.text}</p>
              </div>
            ))}
          </div>
        </Section>
      </PageBody>
    </>
  );
}
