import { LocationSection } from "../components/LocationSection";
import { SchoolPageHeader } from "../components/SchoolPageHeader";
import { DistanceList, SchoolPhotoFigure } from "../components/SchoolStory";
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
        {school.story && (
          <div className="grid gap-8 md:grid-cols-5">
            <div className="md:col-span-3">
              <Section title="How to Reach">
                <p className="mb-3 text-slate-700">{school.story.location}</p>
                <DistanceList distances={school.story.distances} />
              </Section>
            </div>
            <SchoolPhotoFigure index={1} className="self-start md:col-span-2" />
          </div>
        )}
        <LocationSection />
      </PageBody>
    </>
  );
}
