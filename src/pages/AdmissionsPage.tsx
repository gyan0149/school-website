import { Link } from "react-router-dom";
import { NoticeCard } from "../components/NoticeCard";
import { BulletList, DataTable, PageBody, PageHeader, Section } from "../components/ui";
import {
  admissionClassGroups,
  admissionGuidelines,
  admissionLinks,
  admissionSchedule,
  notices,
  requiredDocuments,
} from "../data/schoolData";

export function AdmissionsPage() {
  const admissionNotices = notices.filter((n) => n.category === "Admission");
  return (
    <>
      <PageHeader title="Admissions" subtitle="Admission information as per School Education & Literacy Department, Jharkhand" />
      <PageBody>
        <div className="grid gap-4 sm:grid-cols-3">
          {admissionLinks.map((l) => {
            const cls =
              "flex items-center gap-3 rounded-lg border-2 border-accent-500 bg-white p-4 font-semibold text-brand-800 shadow-sm transition hover:-translate-y-0.5 hover:bg-amber-50 hover:shadow-md";
            const content = (
              <>
                <span className="text-2xl" aria-hidden>
                  {l.icon}
                </span>
                {l.label} {l.external && "↗"}
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

        <Section title="Admission Guidelines">
          <BulletList items={admissionGuidelines} />
        </Section>

        <Section title="Class-wise Admission Details & Eligibility">
          <DataTable
            rows={admissionClassGroups}
            rowKey={(r) => r.group}
            columns={[
              { header: "Group", render: (r) => <span className="font-medium">{r.group}</span> },
              { header: "Classes", render: (r) => r.classes },
              { header: "Eligibility", render: (r) => r.eligibility },
              { header: "Mode of admission", render: (r) => r.mode },
              { header: "Period", render: (r) => r.schedule },
            ]}
          />
        </Section>

        <div className="grid gap-8 lg:grid-cols-2">
          <Section title="Required Documents">
            <BulletList items={requiredDocuments} />
          </Section>
          <Section title="Admission Schedule 2027–28 (tentative)">
            <DataTable
              rows={admissionSchedule}
              rowKey={(r) => r.activity}
              columns={[
                { header: "Activity", render: (r) => r.activity },
                { header: "Date", render: (r) => <span className="whitespace-nowrap">{r.date}</span> },
              ]}
            />
          </Section>
        </div>

        <Section title="Admission Notices">
          <div className="-my-4 divide-y divide-slate-100">
            {admissionNotices.map((n) => (
              <NoticeCard key={n.id} notice={n} />
            ))}
          </div>
        </Section>
      </PageBody>
    </>
  );
}
