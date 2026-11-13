import { SchoolPageHeader } from "../components/SchoolPageHeader";
import { BulletList, ComingSoonNote, PageBody, Section } from "../components/ui";
import { admissionGuidelines, requiredDocuments } from "../data/common";
import { classesLabel, displayPhone } from "../data/schools";
import { useSchool } from "../schoolContext";

export function AdmissionsPage() {
  const school = useSchool();
  return (
    <>
      <SchoolPageHeader title="Admissions" subtitle={`${classesLabel(school)} · as per Government of Jharkhand guidelines`} />
      <PageBody>
        <Section title="Admission Guidelines">
          <BulletList items={admissionGuidelines} />
        </Section>
        <div className="grid gap-8 lg:grid-cols-2">
          <Section title="Documents Usually Required">
            <BulletList items={requiredDocuments} />
          </Section>
          <Section title="Admission Schedule & Forms">
            <ComingSoonNote text="Admission dates, seats and forms for the next session will be published here." />
            <p className="mt-4 text-sm text-slate-700">
              For admission enquiries, contact the school:{" "}
              <a href={`tel:+91${school.hmPhone}`} className="font-medium text-brand-600 hover:underline">
                {displayPhone(school.hmPhone)}
              </a>
            </p>
          </Section>
        </div>
      </PageBody>
    </>
  );
}
