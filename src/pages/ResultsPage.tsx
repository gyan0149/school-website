import { Badge, DataTable, PageBody, PageHeader, Section } from "../components/ui";
import { achievements, boardResultsX, boardResultsXII, toppers } from "../data/schoolData";
import type { Achievement, BoardResult } from "../types/school";

function BoardResultTable({ rows }: { rows: BoardResult[] }) {
  return (
    <DataTable
      rows={rows}
      rowKey={(r) => String(r.year)}
      columns={[
        { header: "Year", render: (r) => <span className="font-medium">{r.year}</span> },
        { header: "Appeared", render: (r) => r.appeared, className: "text-center" },
        { header: "Passed", render: (r) => r.passed, className: "text-center" },
        { header: "Above 75%", render: (r) => r.distinctions, className: "text-center" },
        {
          header: "Pass %",
          render: (r) => (
            <div className="flex items-center gap-2">
              <div className="h-2 w-20 overflow-hidden rounded bg-slate-200">
                <div className="h-full bg-green-600" style={{ width: `${r.passPercentage}%` }} />
              </div>
              <span className="font-semibold">{r.passPercentage}%</span>
            </div>
          ),
        },
      ]}
    />
  );
}

const ACHIEVEMENT_TONES: Record<Achievement["type"], "blue" | "green" | "amber"> = {
  Academic: "blue",
  Sports: "green",
  Award: "amber",
};

export function ResultsPage() {
  const latestYear = Math.max(...toppers.map((t) => t.year));
  const latestToppers = toppers.filter((t) => t.year === latestYear);

  return (
    <>
      <PageHeader title="Results & Achievements" subtitle="CBSE board results, school toppers and recognitions" />
      <PageBody>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Class 10 pass %", value: `${boardResultsX[0].passPercentage}%`, sub: boardResultsX[0].year },
            { label: "Class 12 pass %", value: `${boardResultsXII[0].passPercentage}%`, sub: boardResultsXII[0].year },
            { label: "Class 10 highest", value: `${Math.max(...latestToppers.filter((t) => t.className === "10").map((t) => t.percentage))}%`, sub: latestYear },
            { label: "Class 12 highest", value: `${Math.max(...latestToppers.filter((t) => t.className === "12").map((t) => t.percentage))}%`, sub: latestYear },
          ].map((s) => (
            <div key={s.label} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <div className="text-sm text-slate-500">{s.label}</div>
              <div className="mt-1 text-3xl font-bold text-brand-700">{s.value}</div>
              <div className="text-xs text-slate-400">CBSE {s.sub}</div>
            </div>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <Section title="CBSE Class 10 Results">
            <BoardResultTable rows={boardResultsX} />
          </Section>
          <Section title="CBSE Class 12 Results">
            <BoardResultTable rows={boardResultsXII} />
          </Section>
        </div>

        <Section title={`School Toppers ${latestYear}`}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {latestToppers.map((t, i) => (
              <div key={t.name} className="flex items-center gap-4 rounded-md border border-slate-200 p-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent-500 text-lg font-bold text-brand-900">
                  {i < 3 ? "🥇" : "🏅"}
                </div>
                <div>
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-sm text-slate-500">
                    Class {t.className}
                    {t.stream ? ` · ${t.stream}` : ""}
                  </div>
                  <div className="text-lg font-bold text-brand-700">{t.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Achievements, Awards & Recognitions">
          <div className="grid gap-4 md:grid-cols-2">
            {achievements.map((a) => (
              <div key={a.title} className="rounded-md border border-slate-200 p-4">
                <div className="mb-1 flex items-center gap-2">
                  <Badge tone={ACHIEVEMENT_TONES[a.type]}>{a.type}</Badge>
                  <span className="text-xs text-slate-500">{a.year}</span>
                </div>
                <h3 className="font-semibold">{a.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{a.description}</p>
              </div>
            ))}
          </div>
        </Section>
      </PageBody>
    </>
  );
}
