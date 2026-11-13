import { InfoGrid, PageBody, PageHeader, Section } from "../components/ui";
import { principalMessage, school } from "../data/schoolData";

function initials(name: string) {
  return name
    .replace(/^(Dr|Mr|Mrs|Ms|Shri|Smt)\.?\s+/, "")
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2);
}

export function PrincipalPage() {
  const phoneHref = `tel:+91${school.phone.replace(/\D/g, "")}`;
  return (
    <>
      <PageHeader title="Principal" subtitle={`Head of ${school.shortName}`} />
      <PageBody>
        <div className="grid gap-8 lg:grid-cols-3">
          <Section title="Principal's Details">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-brand-700 to-brand-600 text-4xl font-bold text-white ring-4 ring-accent-400">
                {initials(school.principalName)}
              </div>
              <h2 className="mt-4 text-xl font-bold text-brand-800">{school.principalName}</h2>
              <p className="text-sm font-medium text-accent-600">Principal</p>
              <p className="mt-1 text-sm text-slate-500">{school.name}</p>
            </div>
            <div className="mt-5">
              <InfoGrid
                single
                items={[
                  {
                    label: "Contact number",
                    value: (
                      <a href={phoneHref} className="font-medium text-brand-600 hover:underline">
                        {school.phone}
                      </a>
                    ),
                  },
                  { label: "Office timings", value: school.officeTimings },
                ]}
              />
            </div>
          </Section>

          <div className="lg:col-span-2">
            <Section title="Message from the Principal">
              <div className="space-y-3 text-slate-700">
                {principalMessage.message.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <p className="mt-6 font-semibold text-brand-800">{school.principalName}</p>
              <p className="text-sm text-slate-500">Principal, {school.shortName}</p>
            </Section>
          </div>
        </div>
      </PageBody>
    </>
  );
}
