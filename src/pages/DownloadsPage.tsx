import { DataTable, DownloadLink, PageBody, PageHeader, Section } from "../components/ui";
import { downloads } from "../data/schoolData";
import { formatDate } from "../utils/format";

export function DownloadsPage() {
  const categories = [...new Set(downloads.map((d) => d.category))];
  return (
    <>
      <PageHeader title="Downloads" subtitle="Official forms, calendars, syllabus and circulars" />
      <PageBody>
        <nav className="flex flex-wrap gap-2" aria-label="Download categories">
          {categories.map((c) => (
            <a
              key={c}
              href={`#${c.toLowerCase().replace(/\s+/g, "-")}`}
              className="rounded-full bg-white px-4 py-1.5 text-sm font-medium text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50"
            >
              {c}
            </a>
          ))}
        </nav>
        {categories.map((c) => (
          <Section key={c} title={c} id={c.toLowerCase().replace(/\s+/g, "-")}>
            <DataTable
              rows={downloads.filter((d) => d.category === c)}
              rowKey={(r) => r.title}
              columns={[
                { header: "Document", render: (r) => <span className="font-medium">📄 {r.title}</span> },
                { header: "Size", render: (r) => r.size ?? "—", className: "whitespace-nowrap" },
                { header: "Updated", render: (r) => (r.updated ? formatDate(r.updated) : "—"), className: "whitespace-nowrap" },
                { header: "", render: (r) => <DownloadLink href={r.url} label="Download" />, className: "text-right" },
              ]}
            />
          </Section>
        ))}
      </PageBody>
    </>
  );
}
