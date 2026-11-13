import { LocationSection } from "../components/LocationSection";
import { SchoolPageHeader } from "../components/SchoolPageHeader";
import { InfoGrid, PageBody, Section } from "../components/ui";
import { displayPhone, principalLabel, schoolAddress } from "../data/schools";
import { useSchool } from "../schoolContext";

export function ContactPage() {
  const school = useSchool();
  return (
    <>
      <SchoolPageHeader title="Contact Us" subtitle="Reach the school for enquiries" />
      <PageBody>
        <Section title="Contact Information">
          <InfoGrid
            items={[
              { label: "School", value: school.name },
              { label: "Address", value: schoolAddress(school) },
              {
                label: "Phone",
                value: (
                  <a href={`tel:+91${school.hmPhone}`} className="text-brand-600 hover:underline">
                    {displayPhone(school.hmPhone)}
                  </a>
                ),
              },
              { label: "Principal / HM", value: principalLabel(school) },
              { label: "U-DISE code", value: school.udise },
            ]}
          />
        </Section>
        <LocationSection />
      </PageBody>
    </>
  );
}
