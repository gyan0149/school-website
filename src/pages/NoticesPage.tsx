import { useMemo, useState } from "react";
import { NoticeCard } from "../components/NoticeCard";
import { PageBody, PageHeader, Section } from "../components/ui";
import { notices } from "../data/schoolData";
import type { Notice, NoticeCategory } from "../types/school";

const CATEGORIES: (NoticeCategory | "All")[] = [
  "All",
  "General",
  "Holiday",
  "Examination",
  "Admission",
  "PTM",
  "Government Circular",
  "Academic",
  "Recruitment",
];

export function NoticesPage() {
  const [status, setStatus] = useState<Notice["status"]>("active");
  const [category, setCategory] = useState<NoticeCategory | "All">("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return notices
      .filter((n) => n.status === status)
      .filter((n) => category === "All" || n.category === category)
      .filter((n) => !q || n.title.toLowerCase().includes(q) || n.description.toLowerCase().includes(q))
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [status, category, query]);

  const tabClass = (active: boolean) =>
    `px-4 py-2 text-sm font-medium rounded-md ${active ? "bg-brand-700 text-white" : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50"}`;

  return (
    <>
      <PageHeader title="Notices & Circulars" subtitle="School notices, holiday notifications and government circulars" />
      <PageBody>
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-2" role="tablist">
            <button type="button" role="tab" aria-selected={status === "active"} className={tabClass(status === "active")} onClick={() => setStatus("active")}>
              Active ({notices.filter((n) => n.status === "active").length})
            </button>
            <button type="button" role="tab" aria-selected={status === "archived"} className={tabClass(status === "archived")} onClick={() => setStatus("archived")}>
              Archived ({notices.filter((n) => n.status === "archived").length})
            </button>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as NoticeCategory | "All")}
              className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm"
              aria-label="Filter by category"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c === "All" ? "All categories" : c}
                </option>
              ))}
            </select>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search notices…"
              className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm sm:w-64"
              aria-label="Search notices"
            />
          </div>
        </div>

        <Section title={`${status === "active" ? "Active" : "Archived"} notices (${filtered.length})`}>
          {filtered.length === 0 ? (
            <p className="py-6 text-center text-slate-500">No notices match the selected filters.</p>
          ) : (
            <div className="-my-4 divide-y divide-slate-100">
              {filtered.map((n) => (
                <NoticeCard key={n.id} notice={n} />
              ))}
            </div>
          )}
        </Section>
      </PageBody>
    </>
  );
}
