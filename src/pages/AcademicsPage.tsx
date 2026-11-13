import { SchoolPageHeader } from "../components/SchoolPageHeader";
import { ComingSoonNote, DataTable, PageBody, Section } from "../components/ui";
import { STREAMS, subjectGroups } from "../data/common";
import { classesLabel } from "../data/schools";
import { useSchool } from "../schoolContext";

export function AcademicsPage() {
  const school = useSchool();
  const groups = subjectGroups.filter((g) => g.to >= school.classFrom && g.from <= school.classTo);
  return (
    <>
      <SchoolPageHeader title="Academics" subtitle={classesLabel(school)} />
      <PageBody>
        <Section title="Classes Offered & Subjects">
          <DataTable
            rows={groups}
            rowKey={(r) => `${r.from}-${r.to}`}
            columns={[
              {
                header: "Classes",
                render: (r) => <span className="font-medium whitespace-nowrap">{`${Math.max(r.from, school.classFrom)} – ${Math.min(r.to, school.classTo)}`}</span>,
              },
              { header: "Main subjects", render: (r) => r.subjects.join(", ") },
            ]}
          />
          <p className="mt-2 text-xs text-slate-500">General subject list; exact subjects may vary by school.</p>
        </Section>

        {school.classTo >= 12 && (
          <Section title="Streams (Classes 11 – 12)">
            <div className="grid gap-4 md:grid-cols-3">
              {STREAMS.map((s) => (
                <div key={s} className="rounded-md border border-slate-200 p-4 text-lg font-semibold text-brand-800">
                  {s}
                </div>
              ))}
            </div>
          </Section>
        )}

        <div className="grid gap-8 lg:grid-cols-2">
          <Section title="Academic Calendar" id="calendar">
            <ComingSoonNote text="The academic calendar for the session will be published here." />
          </Section>
          <Section title="Examination Schedule" id="exams">
            <ComingSoonNote text="Exam dates and date sheets will be published here." />
          </Section>
          <Section title="Syllabus">
            <ComingSoonNote text="Class-wise syllabus will be available here." />
          </Section>
          <Section title="Previous Year Question Papers">
            <ComingSoonNote text="Sample and previous year papers will be available here." />
          </Section>
        </div>
      </PageBody>
    </>
  );
}
