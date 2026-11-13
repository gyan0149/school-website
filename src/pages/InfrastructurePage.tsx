import { DataTable, PageBody, PageHeader, Section } from "../components/ui";
import { facilities, infrastructure } from "../data/schoolData";

export function InfrastructurePage() {
  return (
    <>
      <PageHeader title="Infrastructure" subtitle="Facilities available in the school" />
      <PageBody>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {facilities.map((f) => (
            <div
              key={f.name}
              className={`rounded-lg border bg-white p-5 shadow-sm ${f.available ? "border-slate-200" : "border-dashed border-slate-300 opacity-70"}`}
            >
              <div className="flex items-start justify-between">
                <span className="text-3xl" aria-hidden>
                  {f.icon}
                </span>
                <span
                  className={`rounded px-2 py-0.5 text-xs font-medium ${f.available ? "bg-green-50 text-green-700" : "bg-slate-100 text-slate-500"}`}
                >
                  {f.available ? "Available" : "Not available"}
                </span>
              </div>
              <h3 className="mt-3 font-semibold text-brand-800">{f.name}</h3>
              <p className="mt-1 text-sm text-slate-600">{f.details}</p>
            </div>
          ))}
        </div>

        <Section title="Infrastructure Summary">
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
      </PageBody>
    </>
  );
}
