import { Link } from "react-router-dom";
import { NoticeCard } from "../components/NoticeCard";
import { DataTable, DownloadLink, PageBody, PageHeader, Section } from "../components/ui";
import {
  academicCalendar,
  boardResultsX,
  boardResultsXII,
  examSchedule,
  notices,
  questionPapers,
  school,
  schoolExamResults,
  streams,
  subjectGroups,
  syllabusLinks,
} from "../data/schoolData";
import type { DocumentLink } from "../types/school";

function DocList({ docs }: { docs: DocumentLink[] }) {
  return (
    <ul className="divide-y divide-slate-100">
      {docs.map((d) => (
        <li key={d.title} className="flex items-center justify-between gap-4 py-2.5 text-sm">
          <span>{d.title}</span>
          <DownloadLink href={d.url} label="PDF" />
        </li>
      ))}
    </ul>
  );
}

export function AcademicsPage() {
  const circulars = notices.filter((n) => n.category === "Academic" || n.category === "Examination");
  const latestX = boardResultsX[0];
  const latestXII = boardResultsXII[0];

  return (
    <>
      <PageHeader title="Academics" subtitle={`${school.board} · ${school.classes}`} />
      <PageBody>
        <Section title="Classes Offered & Subjects Taught">
          <DataTable
            rows={subjectGroups}
            rowKey={(r) => r.classes}
            columns={[
              { header: "Classes", render: (r) => <span className="font-medium whitespace-nowrap">{r.classes}</span> },
              { header: "Subjects", render: (r) => r.subjects.join(", ") },
            ]}
          />
        </Section>

        <Section title="Streams (Classes 11 – 12)">
          <div className="grid gap-4 md:grid-cols-3">
            {streams.map((s) => (
              <div key={s.name} className="rounded-md border border-slate-200 p-4">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-lg font-semibold text-brand-800">{s.name}</h3>
                  <span className="text-xs text-slate-500">{s.seats} seats</span>
                </div>
                <ul className="mt-2 space-y-1 text-sm text-slate-700">
                  {s.subjects.map((sub) => (
                    <li key={sub}>• {sub}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <div className="grid gap-8 lg:grid-cols-2">
          <Section title="Academic Calendar 2026–27" id="calendar">
            <ul className="divide-y divide-slate-100">
              {academicCalendar.map((m) => (
                <li key={m.month} className="flex gap-4 py-2.5 text-sm">
                  <span className="w-32 shrink-0 font-semibold text-brand-800">{m.month}</span>
                  <span className="text-slate-700">{m.events.join(" · ")}</span>
                </li>
              ))}
            </ul>
          </Section>
          <Section title="Examination Schedule" id="exams">
            <DataTable
              rows={examSchedule}
              rowKey={(r) => r.exam}
              columns={[
                { header: "Examination", render: (r) => <span className="font-medium">{r.exam}</span> },
                { header: "Classes", render: (r) => r.classes },
                { header: "Dates", render: (r) => r.dates },
              ]}
            />
          </Section>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <Section title="Class-wise Syllabus" id="syllabus">
            <DocList docs={syllabusLinks} />
          </Section>
          <Section title="Previous Year Question Papers">
            <DocList docs={questionPapers} />
          </Section>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <Section title="Board Examination Results">
            <div className="grid grid-cols-2 gap-4 text-center">
              {[
                { label: `CBSE Class 10 (${latestX.year})`, value: latestX.passPercentage },
                { label: `CBSE Class 12 (${latestXII.year})`, value: latestXII.passPercentage },
              ].map((r) => (
                <div key={r.label} className="rounded-md bg-brand-50 p-4">
                  <div className="text-3xl font-bold text-brand-700">{r.value}%</div>
                  <div className="text-sm text-slate-600">{r.label} pass percentage</div>
                </div>
              ))}
            </div>
            <Link to="/results" className="mt-3 inline-block text-sm font-medium text-brand-600 hover:underline">
              Detailed results →
            </Link>
          </Section>
          <Section title="School-level Examination Results">
            <DataTable
              rows={schoolExamResults}
              rowKey={(r) => r.className}
              columns={[
                { header: "Class", render: (r) => r.className },
                { header: "Examination", render: (r) => r.exam },
                { header: "Pass %", render: (r) => `${r.passPercentage}%`, className: "text-right" },
              ]}
            />
          </Section>
        </div>

        <Section title="Academic Circulars">
          <div className="-my-4 divide-y divide-slate-100">
            {circulars.map((n) => (
              <NoticeCard key={n.id} notice={n} />
            ))}
          </div>
        </Section>
      </PageBody>
    </>
  );
}
