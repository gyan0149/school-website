import { SchoolPageHeader } from "../components/SchoolPageHeader";
import { DistanceList, HistoryTimeline, ObjectiveCards, SchoolPhotoFigure } from "../components/SchoolStory";
import { InfoGrid, PageBody, Section } from "../components/ui";
import { ABOUT_CM_SOE, AFFILIATION, DEPARTMENT } from "../data/common";
import { classesLabel, principalLabel, schoolAddress, schoolLevel } from "../data/schools";
import { useSchool } from "../schoolContext";

export function AboutPage() {
  const school = useSchool();
  const story = school.story;
  return (
    <>
      <SchoolPageHeader title="About School" subtitle="Basic facts about the school" />
      <PageBody>
        {story && (
          <>
            <Section title="Our School">
              <div className="grid gap-6 md:grid-cols-5">
                <div className="space-y-4 md:col-span-3">
                  <p className="leading-relaxed text-slate-700">{story.location}</p>
                  <h3 className="text-sm font-semibold tracking-wide text-slate-500 uppercase">How to reach</h3>
                  <DistanceList distances={story.distances} />
                </div>
                <SchoolPhotoFigure index={0} className="self-start md:col-span-2" />
              </div>
            </Section>
            <Section title="Objective & Commitment">
              <ObjectiveCards story={story} />
            </Section>
            <Section title="History of the School">
              <div className="grid gap-6 md:grid-cols-5">
                <div className="md:col-span-3">
                  <HistoryTimeline history={story.history} />
                </div>
                <div className="grid grid-cols-2 gap-3 self-start md:col-span-2 md:grid-cols-1">
                  <SchoolPhotoFigure index={3} />
                  <SchoolPhotoFigure index={2} />
                </div>
              </div>
            </Section>
          </>
        )}
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
