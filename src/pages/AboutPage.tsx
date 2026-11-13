import { SchoolPageHeader } from "../components/SchoolPageHeader";
import { InfoGrid, PageBody, Section } from "../components/ui";
import { ABOUT_CM_SOE, AFFILIATION, DEPARTMENT } from "../data/common";
import { classesLabel, principalLabel, schoolAddress, schoolLevel } from "../data/schools";
import { useSchool } from "../schoolContext";

export function AboutPage() {
  const school = useSchool();
  return (
    <>
      <SchoolPageHeader title="About School" subtitle="Basic facts about the school" />
      <PageBody>
        <Section title="School Details">
          <InfoGrid
            items={[
              { label: "School name", value: school.name },
              { label: "U-DISE code", value: school.udise },
              { label: "Address", value: schoolAddress(school) },
              { label: "Block / District", value: `${school.block} / ${school.district}` },
              { label: "State", value: "Jharkhand" },
              ...(school.established ? [{ label: "Year of establishment", value: school.established }] : []),
              { label: "School category", value: "CM School of Excellence" },
              { label: "School level", value: schoolLevel(school) },
              { label: "Classes available", value: classesLabel(school) },
              { label: "Principal / HM", value: principalLabel(school) },
              { label: "Managed by", value: `${DEPARTMENT}, ${AFFILIATION}` },
            ]}
          />
        </Section>
        <Section title="About CM Schools of Excellence">
          <p className="text-slate-700">{ABOUT_CM_SOE}</p>
        </Section>
      </PageBody>
    </>
  );
}
