import { SchoolPageHeader } from "../components/SchoolPageHeader";
import { ComingSoonNote, InfoGrid, PageBody, Section } from "../components/ui";
import { displayPhone, principalLabel } from "../data/schools";
import { useSchool } from "../schoolContext";

function initials(name: string | null) {
  if (!name) return "HM";
  return name
    .replace(/^(Dr|Md)\.?\s+/i, "")
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2);
}

export function PrincipalPage() {
  const school = useSchool();
  return (
    <>
      <SchoolPageHeader title="Principal" subtitle={school.name} />
      <PageBody>
        <div className="grid gap-8 lg:grid-cols-3">
          <Section title="Principal's Details">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-brand-700 to-brand-600 text-4xl font-bold text-white ring-4 ring-accent-400">
                {initials(school.hmName)}
              </div>
              <h2 className="mt-4 text-xl font-bold text-brand-800">{principalLabel(school)}</h2>
              <p className="text-sm font-medium text-accent-600">Principal / Headmaster</p>
              <p className="mt-1 text-sm text-slate-500">{school.name}</p>
            </div>
            <div className="mt-5">
              <InfoGrid
                single
                items={[
                  {
                    label: "Contact number",
                    value: (
                      <a href={`tel:+91${school.hmPhone}`} className="font-medium text-brand-600 hover:underline">
                        {displayPhone(school.hmPhone)}
                      </a>
                    ),
                  },
                ]}
              />
            </div>
          </Section>
          <div className="lg:col-span-2">
            <Section title="Message from the Principal">
              <ComingSoonNote text="A message from the Principal will be added here." />
            </Section>
          </div>
        </div>
      </PageBody>
    </>
  );
}
