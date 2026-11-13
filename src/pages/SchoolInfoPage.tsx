import { Link } from "react-router-dom";
import { DataTable, InfoGrid, PageBody, PageHeader, Section } from "../components/ui";
import { LocationSection } from "../components/LocationSection";
import { classStrength, facilities, infrastructure, school, streams, welfareSchemes } from "../data/schoolData";
import type { ClassStrength } from "../types/school";

export function SchoolInfoPage() {
  const totals = classStrength.reduce(
    (acc, c) => ({ sections: acc.sections + c.sections, boys: acc.boys + c.boys, girls: acc.girls + c.girls }),
    { sections: 0, boys: 0, girls: 0 },
  );

  return (
    <>
      <PageHeader title="School Information" subtitle="School profile as per UDISE+ and department records" />
      <PageBody>
        <Section title="School Profile">
          <InfoGrid
            items={[
              { label: "Name", value: school.name },
              { label: "UDISE code", value: school.udiseCode },
              { label: "Address", value: school.address },
              { label: "Category", value: `${school.category} · ${school.type}` },
              { label: "Total students", value: (totals.boys + totals.girls).toLocaleString("en-IN") },
              { label: "Total teachers", value: school.totalTeachers },
            ]}
          />
        </Section>

        <Section title="Infrastructure">
          <DataTable
            rows={infrastructure}
            rowKey={(r) => r.name}
            columns={[
              { header: "Item", render: (r) => <span className="font-medium">{r.name}</span> },
              { header: "Count", render: (r) => r.count, className: "text-center" },
              { header: "Details", render: (r) => r.details },
            ]}
          />
        </Section>

        <Section title="Student Information (Class-wise Strength)">
          <DataTable<ClassStrength>
            rows={classStrength}
            rowKey={(r) => r.className}
            columns={[
              { header: "Class", render: (r) => <span className="font-medium">{r.className}</span> },
              { header: "Sections", render: (r) => r.sections, className: "text-center" },
              { header: "Boys", render: (r) => r.boys, className: "text-center" },
              { header: "Girls", render: (r) => r.girls, className: "text-center" },
              { header: "Total", render: (r) => r.boys + r.girls, className: "text-center font-semibold" },
            ]}
            footer={
              <tr>
                <td className="px-4 py-2.5">Total</td>
                <td className="px-4 py-2.5 text-center">{totals.sections}</td>
                <td className="px-4 py-2.5 text-center">{totals.boys}</td>
                <td className="px-4 py-2.5 text-center">{totals.girls}</td>
                <td className="px-4 py-2.5 text-center">{totals.boys + totals.girls}</td>
              </tr>
            }
          />
        </Section>

        <div className="grid gap-8 md:grid-cols-2">
          <Section title="Faculty Information">
            <p className="text-slate-700">
              The school has <strong>{school.totalTeachers}</strong> teaching posts including +2 teachers, graduate
              teachers and primary teachers. The school is headed by the Principal, {school.principalName}.
            </p>
            <Link to="/principal" className="mt-3 inline-block text-sm font-medium text-brand-600 hover:underline">
              About the Principal →
            </Link>
          </Section>
          <Section title="Courses">
            <p className="text-slate-700">{school.classes}. Streams offered in Classes 11–12:</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {streams.map((s) => (
                <li key={s.name} className="rounded bg-brand-50 px-3 py-1 text-sm font-medium text-brand-700">
                  {s.name} ({s.seats} seats)
                </li>
              ))}
            </ul>
            <Link to="/academics" className="mt-3 inline-block text-sm font-medium text-brand-600 hover:underline">
              View Academics →
            </Link>
          </Section>
        </div>

        <Section title="Facilities">
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {facilities.map((f) => (
              <li key={f.name} className="flex items-center gap-2 text-sm">
                <span className={f.available ? "text-green-600" : "text-slate-400"}>{f.available ? "✔" : "✘"}</span>
                {f.name}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Student Welfare Schemes">
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
