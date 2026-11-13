import { BulletList, InfoGrid, PageBody, PageHeader, Section } from "../components/ui";
import { school } from "../data/schoolData";

export function AboutPage() {
  return (
    <>
      <PageHeader title="About School" subtitle="Basic facts about the school" />
      <PageBody>
        <Section title="School Details">
          <InfoGrid
            items={[
              { label: "School name", value: school.name },
              { label: "UDISE code", value: school.udiseCode },
              { label: "Address", value: school.address },
              { label: "Block / District", value: `${school.block} / ${school.district}` },
              { label: "State", value: school.state },
              { label: "Year of establishment", value: school.established },
              { label: "School category", value: school.category },
              { label: "School type", value: school.type },
              { label: "Education board", value: school.board },
              { label: "Classes available", value: school.classes },
              { label: "Medium of instruction", value: school.medium.join(", ") },
              { label: "Shift", value: school.shift },
              { label: "Principal", value: school.principalName },
              { label: "Managed by", value: `${school.department}, ${school.affiliation}` },
            ]}
          />
        </Section>

        <Section title="School Timings">
          <InfoGrid items={school.timings.map((t) => ({ label: t.label, value: t.value }))} />
        </Section>

        <div className="grid gap-8 md:grid-cols-2">
          <Section title="Vision">
            <p className="text-slate-700">{school.vision}</p>
          </Section>
          <Section title="Objectives">
            <BulletList items={school.objectives} />
          </Section>
        </div>

        <Section title="History of the School">
          <ol className="relative space-y-5 border-l-2 border-brand-100 pl-6">
            {school.history.map((h) => (
              <li key={h} className="relative text-slate-700">
                <span className="absolute top-1.5 -left-[31px] h-3 w-3 rounded-full bg-accent-500 ring-4 ring-white" />
                {h}
              </li>
            ))}
          </ol>
        </Section>
      </PageBody>
    </>
  );
}
