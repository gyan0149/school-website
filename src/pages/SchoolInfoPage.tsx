import { LocationSection } from "../components/LocationSection";
import { SchoolPageHeader } from "../components/SchoolPageHeader";
import { DistanceList, SchoolPhotoFigure } from "../components/SchoolStory";
import { ComingSoonNote, InfoGrid, PageBody, Section } from "../components/ui";
import { STREAMS, welfareSchemes } from "../data/common";
import { classesLabel, principalLabel, schoolAddress } from "../data/schools";
import { useSchool } from "../schoolContext";

export function SchoolInfoPage() {
  const school = useSchool();
  return (
    <>
      <SchoolPageHeader title="School Information" subtitle="School profile" />
      <PageBody>
        <Section title="School Profile">
          <InfoGrid
            items={[
              { label: "Name", value: school.name },
              { label: "U-DISE code", value: school.udise },
              { label: "Address", value: schoolAddress(school) },
              { label: "Category", value: "CM School of Excellence" },
              { label: "Classes", value: classesLabel(school) },
              { label: "Principal / HM", value: principalLabel(school) },
              ...(school.established ? [{ label: "Established", value: school.established }] : []),
              ...(school.totalTeachers ? [{ label: "Total teachers", value: school.totalTeachers }] : []),
              ...(school.story ? school.story.history.slice(1).map((m) => ({ label: m.year, value: m.text })) : []),
            ]}
          />
        </Section>

        {school.photos?.length ? (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {[0, 1, 3, 4].map((i) => (
              <SchoolPhotoFigure key={i} index={i} />
            ))}
          </div>
        ) : null}

        <div className="grid gap-8 md:grid-cols-2">
          <Section title="Courses">
            <p className="text-slate-700">{classesLabel(school)}.</p>
            {school.classTo >= 12 && (
              <>
                <p className="mt-2 text-slate-700">Streams in Classes 11–12:</p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {STREAMS.map((s) => (
                    <li key={s} className="rounded bg-brand-50 px-3 py-1 text-sm font-medium text-brand-700">
                      {s}
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-xs text-slate-500">Streams available may vary; please confirm with the school.</p>
              </>
            )}
          </Section>
          <Section title="Student & Faculty Information">
            <ComingSoonNote text="Class-wise student strength and teacher details will be added here." />
          </Section>
        </div>

        {school.story && (
          <Section title="How to Reach">
            <p className="mb-3 text-slate-700">{school.story.location}</p>
            <DistanceList distances={school.story.distances} />
          </Section>
        )}

        <Section title="Facilities">
          <ComingSoonNote text="Details of classrooms, labs, library, drinking water, toilets and other facilities will be added here." />
        </Section>

        <Section title="Student Welfare Schemes (Government of Jharkhand)">
          <div className="grid gap-3 sm:grid-cols-2">
            {welfareSchemes.map((s) => (
              <div key={s.name} className="rounded-md border border-slate-200 p-3 transition hover:border-accent-500 hover:shadow-sm">
                <div className="font-medium text-brand-800">{s.name}</div>
                <div className="text-sm text-slate-600">{s.details}</div>
              </div>
            ))}
          </div>
        </Section>

        <LocationSection />
      </PageBody>
    </>
  );
}
